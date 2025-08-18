import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { AppLayout } from "@/components/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IndicatorSection } from "@/components/indicators/IndicatorSection"
import { IndicatorCard } from "@/components/indicators/IndicatorCard"
import { Loader2 } from "lucide-react"

interface Operator {
  id: string
  name: string
}

interface Quarter {
  id: string
  year: number
  quarter: number
}

interface Indicator {
  id: string
  code: string
  name: string
  unit: string
  has_quarterly_data: boolean
  has_monthly_data: boolean
  has_annual_data: boolean
  order_index: number
}

interface IndicatorData {
  [key: string]: {
    quarter_1?: number
    quarter_2?: number
    quarter_3?: number
    quarter_4?: number
    observations?: string
  }
}

export default function TrafegoOriginadoPage() {
  const { toast } = useToast()
  const [operators, setOperators] = useState<Operator[]>([])
  const [quarters, setQuarters] = useState<Quarter[]>([])
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [selectedOperator, setSelectedOperator] = useState<string>("")
  const [selectedQuarter, setSelectedQuarter] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<number>(2024)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const form = useForm<IndicatorData>({
    defaultValues: {}
  })

  useEffect(() => {
    fetchOperators()
    fetchIndicators()
  }, [])

  useEffect(() => {
    fetchQuartersByYear(selectedYear)
  }, [selectedYear])

  useEffect(() => {
    if (selectedOperator && selectedQuarter) {
      loadExistingData()
    }
  }, [selectedOperator, selectedQuarter])

  const fetchOperators = async () => {
    try {
      const { data, error } = await supabase
        .from('operators')
        .select('id, name')
        .order('name')

      if (error) throw error
      setOperators(data || [])
    } catch (error) {
      console.error('Error fetching operators:', error)
      toast({
        title: "Erro",
        description: "Erro ao carregar operadores",
        variant: "destructive",
      })
    }
  }

  const fetchQuartersByYear = async (year: number) => {
    try {
      const { data, error } = await supabase
        .from('quarters')
        .select('id, year, quarter')
        .eq('year', year)
        .eq('is_active', true)
        .order('quarter')

      if (error) throw error
      setQuarters(data || [])
    } catch (error) {
      console.error('Error fetching quarters:', error)
      toast({
        title: "Erro",
        description: "Erro ao carregar trimestres",
        variant: "destructive",
      })
    }
  }

  const fetchIndicators = async () => {
    setLoading(true)
    try {
      const { data: section } = await supabase
        .from('indicator_sections')
        .select('id')
        .eq('section_code', 'trafego_originado')
        .single()

      if (!section) return

      const { data, error } = await supabase
        .from('indicators')
        .select('*')
        .eq('section_id', section.id)
        .eq('is_active', true)
        .order('order_index')

      if (error) throw error
      setIndicators(data || [])
    } catch (error) {
      console.error('Error fetching indicators:', error)
      toast({
        title: "Erro",
        description: "Erro ao carregar indicadores",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadExistingData = async () => {
    try {
      const { data, error } = await supabase
        .from('indicator_data')
        .select('indicator_id, quarter_1, quarter_2, quarter_3, quarter_4, observations')
        .eq('operator_id', selectedOperator)
        .eq('quarter_id', selectedQuarter)

      if (error) throw error

      const formData: IndicatorData = {}
      data?.forEach((item) => {
        const indicator = indicators.find(ind => ind.id === item.indicator_id)
        if (indicator) {
          formData[indicator.code] = {
            quarter_1: item.quarter_1 || undefined,
            quarter_2: item.quarter_2 || undefined,
            quarter_3: item.quarter_3 || undefined,
            quarter_4: item.quarter_4 || undefined,
            observations: item.observations || undefined,
          }
        }
      })

      form.reset(formData)
    } catch (error) {
      console.error('Error loading existing data:', error)
    }
  }

  const onSubmit = async (data: IndicatorData) => {
    if (!selectedOperator || !selectedQuarter) {
      toast({
        title: "Erro",
        description: "Selecione um operador e trimestre",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      for (const indicatorCode of Object.keys(data)) {
        const indicator = indicators.find(ind => ind.code === indicatorCode)
        if (!indicator) continue

        const indicatorData = data[indicatorCode]
        if (!indicatorData) continue

        const { error } = await supabase
          .from('indicator_data')
          .upsert({
            operator_id: selectedOperator,
            quarter_id: selectedQuarter,
            indicator_id: indicator.id,
            quarter_1: indicatorData.quarter_1,
            quarter_2: indicatorData.quarter_2,
            quarter_3: indicatorData.quarter_3,
            quarter_4: indicatorData.quarter_4,
            observations: indicatorData.observations,
            status: 'draft'
          }, {
            onConflict: 'operator_id,quarter_id,indicator_id'
          })

        if (error) throw error
      }

      toast({
        title: "Sucesso",
        description: "Dados salvos com sucesso",
      })
    } catch (error) {
      console.error('Error saving data:', error)
      toast({
        title: "Erro",
        description: "Erro ao salvar dados",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const years = [2023, 2024, 2025, 2026]

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AppLayout>
    )
  }

  // Group indicators by main sections
  const comunicacoesVoz = indicators.filter(ind => ind.code.startsWith('1.1'))
  const volumeTrafegoVoz = indicators.filter(ind => ind.code.startsWith('2.1'))
  const servicoSMS = indicators.filter(ind => ind.code.startsWith('3.1'))
  const servicoMMS = indicators.filter(ind => ind.code.startsWith('4.1'))

  return (
    <AppLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">B. TRÁFEGO ORIGINADO</h1>
            <p className="text-muted-foreground">
              Gestão de dados de tráfego originado por operador e trimestre
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Seleção de Parâmetros</CardTitle>
            <CardDescription>
              Selecione o operador, ano e trimestre para inserir os dados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Operador</label>
                <Select value={selectedOperator} onValueChange={setSelectedOperator}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar operador" />
                  </SelectTrigger>
                  <SelectContent>
                    {operators.map((operator) => (
                      <SelectItem key={operator.id} value={operator.id}>
                        {operator.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ano</label>
                <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Trimestre</label>
                <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar trimestre" />
                  </SelectTrigger>
                  <SelectContent>
                    {quarters.map((quarter) => (
                      <SelectItem key={quarter.id} value={quarter.id}>
                        T{quarter.quarter} ({quarter.year})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedOperator && selectedQuarter && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <IndicatorSection title="1. Número de Comunicações de Voz">
                <div className="space-y-4">
                  {comunicacoesVoz.map((indicator) => (
                    <IndicatorCard
                      key={indicator.id}
                      indicator={indicator}
                      form={form}
                    />
                  ))}
                </div>
              </IndicatorSection>

              <IndicatorSection title="2. Volume de Tráfego de Voz (Minutos)">
                <div className="space-y-4">
                  {volumeTrafegoVoz.map((indicator) => (
                    <IndicatorCard
                      key={indicator.id}
                      indicator={indicator}
                      form={form}
                    />
                  ))}
                </div>
              </IndicatorSection>

              <IndicatorSection title="3. Serviço de Mensagens SMS">
                <div className="space-y-4">
                  {servicoSMS.map((indicator) => (
                    <IndicatorCard
                      key={indicator.id}
                      indicator={indicator}
                      form={form}
                    />
                  ))}
                </div>
              </IndicatorSection>

              <IndicatorSection title="4. Serviço de Mensagens MMS">
                <div className="space-y-4">
                  {servicoMMS.map((indicator) => (
                    <IndicatorCard
                      key={indicator.id}
                      indicator={indicator}
                      form={form}
                    />
                  ))}
                </div>
              </IndicatorSection>

              <div className="flex justify-end pt-6">
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="min-w-[120px]"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    'Salvar Dados'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </AppLayout>
  )
}