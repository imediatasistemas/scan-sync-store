import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface LoginFormProps {
  onBack: () => void;
  onLogin?: () => void;
}

export const LoginForm = ({ onBack, onLogin }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao Coletor X",
        });
        onLogin?.();
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-card border-0 shadow-glow">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-primary p-3 rounded-xl text-white">
              <ScanLine className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Coletor X</CardTitle>
          </div>
          <p className="text-muted-foreground">Entre na sua conta</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-0 bg-background/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 border-0 bg-background/50 backdrop-blur-sm"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-12 w-12 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          
          <div className="text-center space-y-3">
            <Button variant="link" className="text-primary">
              Esqueceu a senha?
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Button variant="link" className="text-primary p-0 h-auto font-medium">
                Solicite acesso
              </Button>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={onBack}
            className="w-full"
          >
            Voltar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};