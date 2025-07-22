import { Calendar, Download, Package, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";

export const SessionHistory = () => {
  const sessions = [
    {
      id: "INV-003",
      date: "2024-01-22",
      time: "14:30",
      products: 156,
      operators: 3,
      status: "completed",
      store: "Loja Centro"
    },
    {
      id: "INV-002", 
      date: "2024-01-21",
      time: "09:15",
      products: 89,
      operators: 2,
      status: "completed",
      store: "Loja Shopping"
    },
    {
      id: "INV-001",
      date: "2024-01-20",
      time: "16:45",
      products: 234,
      operators: 4,
      status: "completed",
      store: "Loja Centro"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "in-progress":
        return "Em andamento";
      default:
        return "Pendente";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header title="Histórico de Sessões" showMenu={true} />
      
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Summary Card */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardHeader>
            <CardTitle className="text-center text-foreground">Resumo Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">3</p>
                <p className="text-sm text-muted-foreground">Sessões</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-secondary">479</p>
                <p className="text-sm text-muted-foreground">Produtos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sessions List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Sessões Recentes</h2>
          {sessions.map((session) => (
            <Card key={session.id} className="bg-gradient-card border-0 shadow-brand hover:shadow-glow transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{session.id}</h3>
                    <p className="text-sm text-muted-foreground">{session.store}</p>
                  </div>
                  <Badge className={getStatusColor(session.status)}>
                    {getStatusText(session.status)}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{session.date} às {session.time}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span className="text-foreground font-medium">{session.products} produtos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-secondary" />
                      <span className="text-foreground font-medium">{session.operators} operadores</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Detalhes
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Export Options */}
        <Card className="bg-gradient-card border-0 shadow-brand">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Download className="h-5 w-5" />
              Exportar Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Exportar como TXT
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Exportar como Excel
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Exportar como PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};