import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { LoginForm } from "@/components/LoginForm";
import { InventoryScanner } from "@/components/InventoryScanner";
import { SessionHistory } from "@/components/SessionHistory";
import { UserManagement } from "@/components/UserManagement";
import { ReportsPanel } from "@/components/ReportsPanel";
import { SettingsScreen } from "@/components/SettingsScreen";
import { Navigation } from "@/components/Navigation";

type AppScreen = "welcome" | "login" | "scanner" | "history" | "users" | "reports" | "settings";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("welcome");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen("scanner");
  };

  const handleNavigate = (screen: AppScreen) => {
    if (screen === "login") {
      setCurrentScreen("login");
    } else if (screen === "scanner" && !isLoggedIn) {
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

  return (
    <div className="pb-20">
      {renderScreen()}
      {isLoggedIn && currentScreen !== "login" && (
        <Navigation currentScreen={currentScreen} onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default Index;
