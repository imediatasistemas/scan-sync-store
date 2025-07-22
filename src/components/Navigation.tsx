import { QrCode, History, Users, BarChart3, Settings, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export const Navigation = ({ currentScreen, onNavigate }: NavigationProps) => {
  const menuItems = [
    { id: "welcome", label: "Início", icon: Home },
    { id: "scanner", label: "Scanner", icon: QrCode },
    { id: "history", label: "Histórico", icon: History },
    { id: "users", label: "Usuários", icon: Users },
    { id: "reports", label: "Relatórios", icon: BarChart3 },
    { id: "settings", label: "Config", icon: Settings },
  ];

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-card border-0 rounded-t-2xl shadow-glow">
      <div className="max-w-md mx-auto px-2 py-3">
        <div className="flex items-center justify-around">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentScreen === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex-col gap-1 h-auto py-2 px-3 ${
                currentScreen === item.id 
                  ? "bg-gradient-primary text-white shadow-brand" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};