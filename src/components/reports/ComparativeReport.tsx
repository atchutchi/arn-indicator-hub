import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"

interface ComparativeReportProps {
  selectedYear?: string
  selectedQuarter?: string
}

export function ComparativeReport({ selectedYear, selectedQuarter }: ComparativeReportProps) {
  // Mock comparative data
  const indicadoresPrincipais = [
    {
      indicador: "Assinantes",
      mtn: "615.201",
      orange: "1.270.669",
      diferenca: "-655.468",
      percentualMtn: "33%",
      percentualOrange: "67%",
      tendencia: "down"
    },
    {
      indicador: "Market Share",
      mtn: "33%",
      orange: "67%",
      diferenca: "-34pp",
      percentualMtn: "33%",
      percentualOrange: "67%",
      tendencia: "down"
    },
    {
      indicador: "Tráfego Voz (M min)",
      mtn: "440",
      orange: "4.359",
      diferenca: "-3.919",
      percentualMtn: "9%",
      percentualOrange: "91%",
      tendencia: "down"
    },
    {
      indicador: "Receitas (M FCFA)",
      mtn: "10.180",
      orange: "38.295",
      diferenca: "-28.115",
      percentualMtn: "21%",
      percentualOrange: "79%",
      tendencia: "down"
    }
  ]

  const crescimentoAnual = [
    {
      metrica: "Assinantes",
      periodo: "2019-2023",
      mtn: "-12%",
      orange: "+113%",
      gap: "125pp"
    },
    {
      metrica: "Tráfego",
      periodo: "2019-2023",
      mtn: "-23%",
      orange: "+555%",
      gap: "578pp"
    },
    {
      metrica: "Receitas",
      periodo: "2019-2023",
      mtn: "-15%",
      orange: "+45%",
      gap: "60pp"
    }
  ]

  const evoluçãoTrimestral = [
    { periodo: 'T1 2023', mtn: 621005, orange: 1227633 },
    { periodo: 'T2 2023', mtn: 552357, orange: 1255547 },
    { periodo: 'T3 2023', mtn: 544310, orange: 1224417 },
    { periodo: 'T4 2023', mtn: 615201, orange: 1270669 }
  ]

  const COLORS = {
    mtn: '#FFCC00',
    orange: '#FF6600',
    positivo: '#28A745',
    negativo: '#DC3545'
  }

  return (
    <div className="space-y-6">
      {/* Tabela Comparativa Principal */}
      <Card>
        <CardHeader>
          <CardTitle>Indicadores Principais - Comparação por Operador</CardTitle>
          <p className="text-sm text-muted-foreground">
            Dados do último trimestre disponível
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indicador</TableHead>
                <TableHead className="text-center">MTN</TableHead>
                <TableHead className="text-center">Orange</TableHead>
                <TableHead className="text-center">Diferença</TableHead>
                <TableHead className="text-center">Participação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {indicadoresPrincipais.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.indicador}</TableCell>
                  <TableCell className="text-center">
                    <span className="font-semibold" style={{ color: COLORS.mtn }}>
                      {item.mtn}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-semibold" style={{ color: COLORS.orange }}>
                      {item.orange}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {item.tendencia === 'down' ? (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      )}
                      <span className={item.tendencia === 'down' ? 'text-red-600' : 'text-green-600'}>
                        {item.diferenca}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Badge 
                        variant="secondary" 
                        style={{ backgroundColor: `${COLORS.mtn}33`, color: COLORS.mtn }}
                      >
                        {item.percentualMtn}
                      </Badge>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <Badge 
                        variant="secondary"
                        style={{ backgroundColor: `${COLORS.orange}33`, color: COLORS.orange }}
                      >
                        {item.percentualOrange}
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Evolução Trimestral */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução Trimestral de Assinantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evoluçãoTrimestral}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodo" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [value.toLocaleString(), '']}
                />
                <Legend />
                <Bar dataKey="mtn" fill={COLORS.mtn} name="MTN" />
                <Bar dataKey="orange" fill={COLORS.orange} name="Orange" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Análise de Crescimento */}
      <Card>
        <CardHeader>
          <CardTitle>Crescimento Anual (2019-2023)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Métrica</TableHead>
                <TableHead>Período</TableHead>
                <TableHead className="text-center">MTN</TableHead>
                <TableHead className="text-center">Orange</TableHead>
                <TableHead className="text-center">Gap</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crescimentoAnual.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.metrica}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.periodo}</TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={item.mtn.startsWith('-') ? 'destructive' : 'default'}
                    >
                      {item.mtn}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={item.orange.startsWith('-') ? 'destructive' : 'default'}
                    >
                      {item.orange}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-semibold text-orange-600">
                      {item.gap}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Análise Detalhada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pontos Fortes por Operador</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2" style={{ color: COLORS.orange }}>Orange</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Líder absoluto de mercado (67%)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Crescimento sustentado de assinantes (+113% em 4 anos)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Domínio em tráfego de voz (91% do total)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Base de receitas sólida (79% do mercado)
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2" style={{ color: COLORS.mtn }}>MTN</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Base sólida de clientes (615K assinantes)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Recuperação no T4 2023
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Presença estabelecida no mercado
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Desafios e Oportunidades</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-orange-600">Desafios MTN</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Perda de market share (-12% assinantes)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Declínio no tráfego de voz (-23%)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Redução de receitas (-15%)
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-green-600">Oportunidades</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Crescimento do mercado total (+28% tráfego)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Potencial para serviços de dados
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Mobile Money em expansão
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}