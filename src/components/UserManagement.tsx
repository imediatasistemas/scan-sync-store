import { UserPlus, Shield, User, Mail, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Header } from "@/components/Header";

export const UserManagement = () => {
  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao.silva@empresa.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-22 14:30",
      sessionsCount: 15
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria.santos@empresa.com",
      role: "operator",
      status: "active",
      lastLogin: "2024-01-22 13:45",
      sessionsCount: 8
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro.costa@empresa.com",
      role: "operator",
      status: "inactive",
      lastLogin: "2024-01-20 16:20",
      sessionsCount: 3
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "operator":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "operator":
        return "Operador";
      default:
        return "Usuário";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      default:
        return "Pendente";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header title="Gerenciar Usuários" showMenu={true} />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Add User Button */}
        <Button variant="hero" size="lg" className="w-full">
          <UserPlus className="mr-2 h-5 w-5" />
          Adicionar Novo Usuário
        </Button>

        {/* Stats Card */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-xl font-bold text-primary">{users.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold text-green-600">
                  {users.filter(u => u.status === 'active').length}
                </p>
                <p className="text-xs text-muted-foreground">Ativos</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold text-purple-600">
                  {users.filter(u => u.role === 'admin').length}
                </p>
                <p className="text-xs text-muted-foreground">Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Equipe</h2>
          {users.map((user) => (
            <Card key={user.id} className="bg-gradient-card border-0 shadow-brand hover:shadow-glow transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{user.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getRoleColor(user.role)}>
                        <Shield className="mr-1 h-3 w-3" />
                        {getRoleText(user.role)}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {getStatusText(user.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Último acesso:</span>
                        <p className="font-medium text-foreground">{user.lastLogin}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sessões:</span>
                        <p className="font-medium text-foreground">{user.sessionsCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Permissions Info */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground text-lg">
              <Shield className="h-5 w-5" />
              Permissões
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Administrador:</span>
              <span className="text-foreground">Acesso total ao sistema</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Operador:</span>
              <span className="text-foreground">Pode escanear e registrar produtos</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};