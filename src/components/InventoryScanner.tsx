import { useState, useEffect } from "react";
import { QrCode, Plus, Minus, Package, MessageSquare, Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const InventoryScanner = () => {
  const [quantity, setQuantity] = useState(1);
  const [scannedCode, setScannedCode] = useState("");
  const [observations, setObservations] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [scannedCount, setScannedCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadCurrentSession();
    }
  }, [user]);

  const loadCurrentSession = async () => {
    try {
      const { data, error } = await supabase
        .from('inventory_sessions')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading session:', error);
        return;
      }

      if (data) {
        setCurrentSession(data);
        loadScannedCount(data.id);
      } else {
        // Create new session if none exists
        await createNewSession();
      }
    } catch (error) {
      console.error('Error loading session:', error);
    }
  };

  const createNewSession = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user?.id)
        .single();

      if (!profile?.company_id) {
        toast({
          title: "Erro",
          description: "Perfil de usuário não encontrado",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('inventory_sessions')
        .insert({
          name: `Sessão ${new Date().toLocaleDateString()}`,
          company_id: profile.company_id,
          created_by: user?.id,
          status: 'active'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating session:', error);
        toast({
          title: "Erro",
          description: "Erro ao criar sessão de inventário",
          variant: "destructive",
        });
        return;
      }

      setCurrentSession(data);
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const loadScannedCount = async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('scanned_products')
        .select('id', { count: 'exact' })
        .eq('session_id', sessionId);

      if (!error && data) {
        setScannedCount(data.length);
      }
    } catch (error) {
      console.error('Error loading scanned count:', error);
    }
  };

  const handleScan = () => {
    setShowScanner(true);
  };

  const handleBarcodeScanned = (barcode: string) => {
    setScannedCode(barcode);
    setShowScanner(false);
    toast({
      title: "Código escaneado!",
      description: `Código: ${barcode}`,
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleSaveProduct = async () => {
    if (!currentSession || !scannedCode || !user) {
      toast({
        title: "Erro",
        description: "Dados incompletos para salvar produto",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('scanned_products')
        .insert({
          session_id: currentSession.id,
          barcode: scannedCode,
          quantity: quantity,
          notes: observations,
          scanned_by: user.id,
        });

      if (error) {
        console.error('Error saving product:', error);
        toast({
          title: "Erro",
          description: "Erro ao salvar produto",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Produto salvo!",
        description: "Produto adicionado ao inventário",
      });

      // Reset form
      setScannedCode("");
      setQuantity(1);
      setObservations("");
      
      // Update scanned count
      setScannedCount(prev => prev + 1);
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao salvar produto",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header title="Scanner" showMenu={true} />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Scanner Card */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-foreground">
              <QrCode className="h-5 w-5" />
              Scanner de Código de Barras
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-primary p-8 rounded-xl text-center text-white relative overflow-hidden">
              <div className="space-y-4">
                <QrCode className="h-12 w-12 mx-auto" />
                <p className="text-lg font-medium">Toque para escanear</p>
                <p className="text-white/80 text-sm">Posicione o código de barras na câmera</p>
              </div>
            </div>
            
            <Button 
              onClick={handleScan}
              variant="hero"
              size="lg"
              className="w-full"
            >
              Iniciar Scanner
            </Button>
            
            {scannedCode && (
              <div className="bg-muted/50 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Código escaneado:</p>
                <p className="font-mono text-lg font-semibold text-foreground">{scannedCode}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Info Card */}
        {scannedCode && (
          <Card className="bg-gradient-card border-0 shadow-brand">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Package className="h-5 w-5" />
                Informações do Produto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Código de Barras</Label>
                <Input 
                  value={scannedCode}
                  onChange={(e) => setScannedCode(e.target.value)}
                  className="h-12 font-mono"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Quantidade</Label>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={decrementQuantity}
                    className="h-12 w-12"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input 
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-center h-12 text-lg font-semibold"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={incrementQuantity}
                    className="h-12 w-12"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Observações
                </Label>
                <Textarea 
                  placeholder="Adicione observações sobre o produto..."
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              
              <Button 
                onClick={handleSaveProduct}
                disabled={isSaving}
                variant="default"
                size="lg"
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Salvando..." : "Salvar Produto"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Session Info */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardContent className="p-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Sessão Atual:</span>
              <span className="font-medium text-foreground">
                {currentSession?.name || "Carregando..."}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-muted-foreground">Produtos Escaneados:</span>
              <span className="font-semibold text-primary">{scannedCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {showScanner && (
        <BarcodeScanner
          onScan={handleBarcodeScanned}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
};