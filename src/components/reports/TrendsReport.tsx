import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Calendar } from "lucide-react"

interface TrendsReportProps {
  selectedYear?: string
  selectedQuarter?: string
  selectedOperator?: string
}

export function TrendsReport({ selectedYear, selectedQuarter, selectedOperator }: TrendsReportProps) {
  // Mock trend data
  const tendenciaLinear = [
    { mes: 'Jan 2024', projecao: 1920, real: null },
    { mes: 'Fev 2024', projecao: 1935, real: null },
    { mes: 'Mar 2024', projecao: 1950, real: null },
    { mes: 'Abr 2024', projecao: 1965, real: null }
  ]

  const historicoTendencia = [
    { periodo: 'T1 2023', valor: 1848, tendencia: 'stable' },
    { periodo: 'T2 2023', valor: 1807, tendencia: 'down' },
    { periodo: 'T3 2023', valor: 1768, tendencia: 'down' },
    { periodo: 'T4 2023', valor: 1885, tendencia: 'up' }
  ]

  return (
    <div className="space-y-6">
      {/* Análise de Tendências */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Tendências Futuras</CardTitle>
          <p className="text-sm text-muted-foreground">
            Projeções baseadas em dados históricos e modelos estatísticos
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tendenciaLinear}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${(value / 1000).toFixed(0)}K`, 'Assinantes']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="projecao" 
                  stroke="#8884d8" 
                  strokeDasharray="5 5"
                  name="Projeção (ARIMA)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* KPIs de Previsão */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Crescimento Previsto</p>
              <p className="text-2xl font-bold text-green-600">+3.5%</p>
              <p className="text-xs text-muted-foreground">Próximos 4 trimestres</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Meta 2024</p>
              <p className="text-2xl font-bold text-blue-600">2.0M</p>
              <p className="text-xs text-muted-foreground">Assinantes totais</p>
            </div>
            <Target className="h-8 w-8 text-blue-500" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Confiança</p>
              <p className="text-2xl font-bold text-purple-600">95%</p>
              <p className="text-xs text-muted-foreground">Intervalo de confiança</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </CardContent>
        </Card>
      </div>

      {/* Sazonalidade */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Sazonalidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-700">T1</h4>
              <p className="text-sm text-muted-foreground">Crescimento forte</p>
              <Badge variant="secondary">+2.1%</Badge>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-700">T2</h4>
              <p className="text-sm text-muted-foreground">Estabilização</p>
              <Badge variant="outline">-2.2%</Badge>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-700">T3</h4>
              <p className="text-sm text-muted-foreground">Declínio sazonal</p>
              <Badge variant="destructive">-2.1%</Badge>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-700">T4</h4>
              <p className="text-sm text-muted-foreground">Recuperação</p>
              <Badge variant="default">+6.6%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}