import { useState } from "react";
import { QrCode, Plus, Minus, Package, MessageSquare, Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";

export const InventoryScanner = () => {
  const [quantity, setQuantity] = useState(1);
  const [scannedCode, setScannedCode] = useState("");
  const [observations, setObservations] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simular scan
    setTimeout(() => {
      setScannedCode("7891000053904");
      setIsScanning(false);
    }, 2000);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

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
              {isScanning ? (
                <div className="space-y-4">
                  <div className="animate-pulse">
                    <Camera className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-lg font-medium">Escaneando...</p>
                  </div>
                  <div className="bg-white/20 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <QrCode className="h-12 w-12 mx-auto" />
                  <p className="text-lg font-medium">Toque para escanear</p>
                  <p className="text-white/80 text-sm">Posicione o código de barras na câmera</p>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleScan}
              disabled={isScanning}
              variant="hero"
              size="lg"
              className="w-full"
            >
              {isScanning ? "Escaneando..." : "Iniciar Scanner"}
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
                variant="default"
                size="lg"
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar Produto
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Session Info */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardContent className="p-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Sessão Atual:</span>
              <span className="font-medium text-foreground">INV-001</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-muted-foreground">Produtos Escaneados:</span>
              <span className="font-semibold text-primary">0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};