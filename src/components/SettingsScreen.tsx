import { Settings, User, Bell, Shield, HelpCircle, LogOut, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Header } from "@/components/Header";

export const SettingsScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header title="Configurações" showMenu={true} />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Profile Section */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <User className="h-5 w-5" />
              Perfil do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">João Silva</p>
                <p className="text-sm text-muted-foreground">joao.silva@empresa.com</p>
              </div>
              <Button variant="outline" size="sm">
                Editar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Notificações Push</p>
                <p className="text-sm text-muted-foreground">Receber alertas em tempo real</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Sincronização</p>
                <p className="text-sm text-muted-foreground">Sincronizar dados automaticamente</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Modo Offline</p>
                <p className="text-sm text-muted-foreground">Trabalhar sem conexão</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Shield className="h-5 w-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="mr-2 h-4 w-4" />
              Alterar Senha
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Gerenciar Permissões
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Palette className="h-5 w-5" />
              Aparência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Tema Escuro</p>
                <p className="text-sm text-muted-foreground">Ativar modo escuro</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <HelpCircle className="h-5 w-5" />
              Suporte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Central de Ajuda
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Sobre o Coletor X
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardContent className="p-4">
            <Button variant="destructive" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sair da Conta
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>Coletor X v1.0.0</p>
          <p>Desenvolvido para varejo moderno</p>
        </div>
      </div>
    </div>
  );
};