import { useState, useEffect } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { LoginForm } from "@/components/LoginForm";
import { InventoryScanner } from "@/components/InventoryScanner";
import { SessionHistory } from "@/components/SessionHistory";
import { UserManagement } from "@/components/UserManagement";
import { ReportsPanel } from "@/components/ReportsPanel";
import { SettingsScreen } from "@/components/SettingsScreen";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";

type AppScreen = "welcome" | "login" | "scanner" | "history" | "users" | "reports" | "settings";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("welcome");
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      setCurrentScreen("scanner");
    } else if (!loading) {
      setCurrentScreen("welcome");
    }
  }, [user, loading]);

  const handleLogin = () => {
    // Authentication is now handled by useAuth hook
    setCurrentScreen("scanner");
  };

  const handleNavigate = (screen: AppScreen) => {
    if (screen === "login") {
      setCurrentScreen("login");
    } else if (screen === "scanner" && !user) {
      setCurrentScreen("login");
    } else {
      setCurrentScreen(screen);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onNavigate={handleNavigate} />;
      case "login":
        return (
          <LoginForm 
            onBack={() => setCurrentScreen("welcome")}
            onLogin={handleLogin}
          />
        );
      case "scanner":
        return <InventoryScanner />;
      case "history":
        return <SessionHistory />;
      case "users":
        return <UserManagement />;
      case "reports":
        return <ReportsPanel />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <WelcomeScreen onNavigate={handleNavigate} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {renderScreen()}
      {user && currentScreen !== "login" && (
        <Navigation currentScreen={currentScreen} onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default Index;
