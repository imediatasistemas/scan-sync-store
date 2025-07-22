import { BarChart3, TrendingUp, Users, Package, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";

export const ReportsPanel = () => {
  const stats = [
    {
      title: "Produtos Escaneados",
      value: "1,247",
      change: "+12%",
      positive: true,
      icon: Package
    },
    {
      title: "Sessões Ativas",
      value: "15",
      change: "+3",
      positive: true,
      icon: BarChart3
    },
    {
      title: "Operadores Online",
      value: "8",
      change: "-2",
      positive: false,
      icon: Users
    },
    {
      title: "Produtividade",
      value: "94%",
      change: "+8%",
      positive: true,
      icon: TrendingUp
    }
  ];

  const topOperators = [
    { name: "João Silva", products: 156, sessions: 3 },
    { name: "Maria Santos", products: 143, sessions: 2 },
    { name: "Pedro Costa", products: 98, sessions: 2 },
    { name: "Ana Oliveira", products: 87, sessions: 1 }
  ];

  const recentSessions = [
    { id: "INV-003", store: "Loja Centro", products: 45, time: "14:30" },
    { id: "INV-002", store: "Loja Shopping", products: 32, time: "13:15" },
    { id: "INV-001", store: "Loja Norte", products: 67, time: "11:45" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header title="Relatórios" showMenu={true} />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Filters */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filtros</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-1 h-3 w-3" />
                Hoje
              </Button>
              <Button variant="outline" size="sm">
                Última Semana
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-brand">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <span className={`text-xs font-medium ${
                    stat.positive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top Operators */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5" />
              Top Operadores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topOperators.map((operator, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                <div>
                  <p className="font-medium text-foreground">{operator.name}</p>
                  <p className="text-sm text-muted-foreground">{operator.sessions} sessões</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{operator.products}</p>
                  <p className="text-xs text-muted-foreground">produtos</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="h-5 w-5" />
              Sessões Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                <div>
                  <p className="font-medium text-foreground">{session.id}</p>
                  <p className="text-sm text-muted-foreground">{session.store}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-secondary">{session.products}</p>
                  <p className="text-xs text-muted-foreground">{session.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-16 flex-col gap-1">
            <Package className="h-5 w-5" />
            <span className="text-xs">Exportar Produtos</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-1">
            <Users className="h-5 w-5" />
            <span className="text-xs">Relatório Equipe</span>
          </Button>
        </div>
      </div>
    </div>
  );
};