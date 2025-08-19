import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { AppLayout } from "@/components/AppLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, BarChart3, PieChart, TrendingUp, Download, Calendar, Users, Phone, DollarSign } from "lucide-react"
import { MarketReportSection } from "@/components/reports/MarketReportSection"
import { ExecutiveDashboard } from "@/components/reports/ExecutiveDashboard"
import { ComparativeReport } from "@/components/reports/ComparativeReport"
import { TrendsReport } from "@/components/reports/TrendsReport"

export default function RelatoriosPage() {
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [selectedQuarter, setSelectedQuarter] = useState<string>("")
  const [selectedOperator, setSelectedOperator] = useState<string>("")

  // Get years
  const { data: years } = useQuery({
    queryKey: ['years'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quarters')
        .select('year')
        .eq('is_active', true)
        .order('year', { ascending: true })
      
      if (error) throw error
      
      const uniqueYears = [...new Set(data.map(q => q.year))]
      return uniqueYears
    }
  })

  // Get quarters based on selected year
  const { data: quarters } = useQuery({
    queryKey: ['quarters', selectedYear],
    queryFn: async () => {
      let query = supabase
        .from('quarters')
        .select('*')
        .eq('is_active', true)
      
      if (selectedYear) {
        query = query.eq('year', parseInt(selectedYear))
      }
      
      const { data, error } = await query.order('quarter', { ascending: true })
      
      if (error) throw error
      return data
    },
    enabled: !!selectedYear
  })

  // Get operators
  const { data: operators } = useQuery({
    queryKey: ['operators'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('operators')
        .select('*')
        .order('name')
      
      if (error) throw error
      return data
    }
  })

  const reportTypes = [
    {
      id: "market",
      title: "Relatório de Mercado",
      description: "Evolução do Mercado de Telecomunicações",
      icon: BarChart3,
      color: "bg-blue-500"
    },
    {
      id: "executive",
      title: "Dashboard Executivo",
      description: "KPIs principais e indicadores em tempo real",
      icon: TrendingUp,
      color: "bg-green-500"
    },
    {
      id: "comparative",
      title: "Análise Comparativa",
      description: "Comparação entre operadores",
      icon: PieChart,
      color: "bg-purple-500"
    },
    {
      id: "trends",
      title: "Tendências e Projeções",
      description: "Análise de tendências futuras",
      icon: TrendingUp,
      color: "bg-orange-500"
    }
  ]

  const handleExportReport = (format: string) => {
    // TODO: Implement export functionality
    console.log(`Exporting report in ${format} format`)
  }

  return (
    <AppLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sistema de Relatórios ARN</h1>
            <p className="text-muted-foreground">
              Geração automática de relatórios e visualizações do mercado de telecomunicações
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedOperator} onValueChange={setSelectedOperator}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todos os Operadores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os Operadores</SelectItem>
                {operators?.map((operator) => (
                  <SelectItem key={operator.id} value={operator.id}>
                    {operator.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                {years?.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedQuarter} onValueChange={setSelectedQuarter} disabled={!selectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Trimestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                {quarters?.map((quarter) => (
                  <SelectItem key={quarter.id} value={quarter.id}>
                    T{quarter.quarter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExportReport('pdf')}
              >
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExportReport('excel')}
              >
                <Download className="w-4 h-4 mr-2" />
                Excel
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Assinantes</p>
                <p className="text-2xl font-bold">1.884.022</p>
                <p className="text-xs text-green-600">+5% vs período anterior</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa Penetração</p>
                <p className="text-2xl font-bold">91%</p>
                <p className="text-xs text-green-600">+2pp vs período anterior</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Volume Tráfego</p>
                <p className="text-2xl font-bold">4.799M min</p>
                <p className="text-xs text-green-600">+28% vs período anterior</p>
              </div>
              <Phone className="h-8 w-8 text-purple-500" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                <p className="text-2xl font-bold">48.475M FCFA</p>
                <p className="text-xs text-green-600">+7% vs período anterior</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </CardContent>
          </Card>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTypes.map((reportType) => {
            const IconComponent = reportType.icon
            return (
              <Card key={reportType.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${reportType.color}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{reportType.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {reportType.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="secondary">Atualizado</Badge>
                    <span className="text-xs text-muted-foreground">há 2h</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Reports Content */}
        <Tabs defaultValue="market" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="market">
              <BarChart3 className="w-4 h-4 mr-2" />
              Mercado
            </TabsTrigger>
            <TabsTrigger value="executive">
              <TrendingUp className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="comparative">
              <PieChart className="w-4 h-4 mr-2" />
              Comparativo
            </TabsTrigger>
            <TabsTrigger value="trends">
              <FileText className="w-4 h-4 mr-2" />
              Tendências
            </TabsTrigger>
          </TabsList>

          <TabsContent value="market">
            <MarketReportSection 
              selectedYear={selectedYear}
              selectedQuarter={selectedQuarter}
              selectedOperator={selectedOperator}
            />
          </TabsContent>

          <TabsContent value="executive">
            <ExecutiveDashboard 
              selectedYear={selectedYear}
              selectedQuarter={selectedQuarter}
              selectedOperator={selectedOperator}
            />
          </TabsContent>

          <TabsContent value="comparative">
            <ComparativeReport 
              selectedYear={selectedYear}
              selectedQuarter={selectedQuarter}
            />
          </TabsContent>

          <TabsContent value="trends">
            <TrendsReport 
              selectedYear={selectedYear}
              selectedQuarter={selectedQuarter}
              selectedOperator={selectedOperator}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}