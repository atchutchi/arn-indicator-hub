import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { TrendingUp, TrendingDown, Users, Phone, DollarSign, BarChart3 } from "lucide-react"

interface ExecutiveDashboardProps {
  selectedYear?: string
  selectedQuarter?: string
  selectedOperator?: string
}

export function ExecutiveDashboard({ selectedYear, selectedQuarter, selectedOperator }: ExecutiveDashboardProps) {
  // Mock data for dashboard
  const kpis = [
    {
      title: "Total Assinantes",
      value: "1.884.022",
      change: "+5%",
      trend: "up",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Taxa de Penetração",
      value: "91%",
      change: "+2pp",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-600"
    },
    {
      title: "Volume Tráfego",
      value: "4.799M min",
      change: "+28%",
      trend: "up",
      icon: Phone,
      color: "text-green-600"
    },
    {
      title: "Receita Total",
      value: "48.475M FCFA",
      change: "+7%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    }
  ]

  const sparklineData = [
    { month: 'Jan', value: 1750 },
    { month: 'Fev', value: 1780 },
    { month: 'Mar', value: 1848 },
    { month: 'Abr', value: 1807 },
    { month: 'Mai', value: 1825 },
    { month: 'Jun', value: 1808 },
    { month: 'Jul', value: 1768 },
    { month: 'Ago', value: 1790 },
    { month: 'Set', value: 1769 },
    { month: 'Out', value: 1820 },
    { month: 'Nov', value: 1850 },
    { month: 'Dez', value: 1885 }
  ]

  const marketShareData = [
    { name: 'Orange', value: 67 },
    { name: 'MTN', value: 33 }
  ]

  return (
    <div className="space-y-6">
      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const IconComponent = kpi.icon
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown
          
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {kpi.title}
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {kpi.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendIcon className={`h-4 w-4 ${kpi.color}`} />
                      <span className={`text-sm font-medium ${kpi.color}`}>
                        {kpi.change}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        vs período anterior
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <IconComponent className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Widgets Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Share Gauge */}
        <Card>
          <CardHeader>
            <CardTitle>Market Share por Operador</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Orange</span>
                  <span className="text-sm font-bold">67%</span>
                </div>
                <Progress value={67} className="h-3" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">MTN</span>
                  <span className="text-sm font-bold">33%</span>
                </div>
                <Progress value={33} className="h-3" />
              </div>
            </div>
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground">
                Orange mantém liderança com crescimento de 2pp no último trimestre
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tendência Mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Assinantes (Últimos 12 Meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <XAxis dataKey="month" hide />
                  <YAxis hide />
                  <Tooltip 
                    formatter={(value: number) => [`${(value / 1000).toFixed(0)}K`, 'Assinantes']}
                    labelFormatter={(label) => `Mês: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Jan 2023</span>
              <Badge variant="secondary">+7.7% YoY</Badge>
              <span className="text-muted-foreground">Dez 2023</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mapa de Calor - Simulado com cards */}
      <Card>
        <CardHeader>
          <CardTitle>Mapa de Calor - Volume por Serviço e Operador</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {/* Headers */}
            <div className="font-semibold text-sm">Serviço / Operador</div>
            <div className="font-semibold text-sm text-center">MTN</div>
            <div className="font-semibold text-sm text-center">Orange</div>
            <div className="font-semibold text-sm text-center">Total</div>
            
            {/* Voz */}
            <div className="text-sm">Voz</div>
            <div className="text-center p-2 bg-yellow-200 rounded text-sm">Médio</div>
            <div className="text-center p-2 bg-green-400 rounded text-sm">Alto</div>
            <div className="text-center p-2 bg-green-300 rounded text-sm">Alto</div>
            
            {/* Dados */}
            <div className="text-sm">Dados</div>
            <div className="text-center p-2 bg-red-200 rounded text-sm">Baixo</div>
            <div className="text-center p-2 bg-green-400 rounded text-sm">Alto</div>
            <div className="text-center p-2 bg-yellow-300 rounded text-sm">Médio</div>
            
            {/* SMS */}
            <div className="text-sm">SMS</div>
            <div className="text-center p-2 bg-yellow-200 rounded text-sm">Médio</div>
            <div className="text-center p-2 bg-yellow-300 rounded text-sm">Médio</div>
            <div className="text-center p-2 bg-yellow-300 rounded text-sm">Médio</div>
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs">
            <span>Intensidade:</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-200 rounded"></div>
              <span>Baixo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-300 rounded"></div>
              <span>Médio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <span>Alto</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alertas e Notificações */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas e Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Taxa de crescimento dentro do esperado</p>
                <p className="text-xs text-muted-foreground">Assinantes cresceram 5% no último trimestre</p>
              </div>
              <Badge variant="secondary">Normal</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Meta de penetração próxima</p>
                <p className="text-xs text-muted-foreground">Faltam 4pp para atingir os 95% de penetração</p>
              </div>
              <Badge variant="outline">Atenção</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Relatório mensal gerado</p>
                <p className="text-xs text-muted-foreground">Último relatório gerado há 2 horas</p>
              </div>
              <Badge variant="secondary">Informação</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}