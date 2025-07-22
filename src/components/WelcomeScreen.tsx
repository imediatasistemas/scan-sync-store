import { QrCode, Users, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-scanner.jpg";

interface WelcomeScreenProps {
  onNavigate: (screen: "login" | "scanner") => void;
}

export const WelcomeScreen = ({ onNavigate }: WelcomeScreenProps) => {
  const features = [
    {
      icon: QrCode,
      title: "Scanner Inteligente",
      description: "Use a câmera do celular para escanear códigos de barras rapidamente"
    },
    {
      icon: Users,
      title: "Equipe Conectada",
      description: "Sincronização em tempo real entre todos os operadores"
    },
    {
      icon: BarChart3,
      title: "Relatórios Detalhados",
      description: "Acompanhe a produtividade e exporte dados facilmente"
    },
    {
      icon: Settings,
      title: "Campos Personalizados",
      description: "Configure campos específicos para cada inventário"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-primary text-white">
          <div className="max-w-md mx-auto px-4 py-12 text-center">
            <div className="mb-8">
              <img 
                src={heroImage} 
                alt="Scanner Hero" 
                className="w-full h-48 object-cover rounded-2xl shadow-glow mx-auto mb-6"
              />
            </div>
            <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Coletor X</h1>
            <p className="text-white/90 mb-8 text-lg">
              A plataforma mais eficiente para inventário de varejo
            </p>
            <div className="space-y-3">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full text-lg py-6"
                onClick={() => onNavigate("scanner")}
              >
                <QrCode className="mr-2 h-5 w-5" />
                Iniciar Nova Sessão
              </Button>
              <Button 
                variant="scanner" 
                size="lg" 
                className="w-full"
                onClick={() => onNavigate("login")}
              >
                Entrar na Conta
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-md mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-center mb-6 text-foreground">
          Recursos Principais
        </h2>
        <div className="grid gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-brand hover:shadow-glow transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-primary p-2 rounded-lg text-white">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-4 pb-8">
        <h2 className="text-xl font-semibold text-center mb-6 text-foreground">
          Acesso Rápido
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-20 flex-col gap-2">
            <BarChart3 className="h-6 w-6" />
            <span className="text-sm">Relatórios</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Users className="h-6 w-6" />
            <span className="text-sm">Usuários</span>
          </Button>
        </div>
      </div>
    </div>
  );
};