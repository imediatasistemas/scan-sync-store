import { ScanLine, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export const Header = ({ title, showMenu = false, onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-gradient-primary text-white p-4 shadow-glow">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-3">
          {showMenu && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="text-white hover:bg-white/20"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <ScanLine className="h-6 w-6" />
            <h1 className="text-lg font-bold">Coletor X</h1>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};