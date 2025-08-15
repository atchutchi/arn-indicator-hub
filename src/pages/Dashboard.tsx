import { AppLayout } from "@/components/AppLayout"
import { MetricCard } from "@/components/ui/metric-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Phone, 
  Users, 
  TrendingUp, 
  DollarSign,
  Download,
  Filter,
  Calendar
} from "lucide-react"

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard Principal">
      <div className="p-6 space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Visão Geral dos Indicadores</h2>
            <p className="text-muted-foreground">Acompanhe os principais indicadores de telecomunicações</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Q4 2024
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Estações Móveis Ativas"
            value="2.4M"
            icon={<Phone className="h-4 w-4" />}
            trend="up"
            trendValue="+12.5%"
            description="vs trimestre anterior"
          />
          <MetricCard
            title="Utilizadores de Voz"
            value="1.8M"
            icon={<Users className="h-4 w-4" />}
            trend="up"
            trendValue="+8.3%"
            description="vs trimestre anterior"
          />
          <MetricCard
            title="Receitas Totais"
            value="45.2B"
            icon={<DollarSign className="h-4 w-4" />}
            trend="up"
            trendValue="+15.7%"
            description="F CFA (milhões)"
          />
          <MetricCard
            title="Tráfego de Dados"
            value="892TB"
            icon={<TrendingUp className="h-4 w-4" />}
            trend="up"
            trendValue="+23.1%"
            description="vs trimestre anterior"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Evolução de Estações Móveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de evolução trimestral</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Receitas por Operador</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Gráfico de receitas por operador</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Alertas Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning mb-2">3</div>
              <p className="text-sm text-muted-foreground">Relatórios aguardando validação</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Próximo Prazo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">7 dias</div>
              <p className="text-sm text-muted-foreground">Submissão Q1 2025</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Status Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-xl font-bold text-foreground">Online</span>
              </div>
              <p className="text-sm text-muted-foreground">Todos os serviços operacionais</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}