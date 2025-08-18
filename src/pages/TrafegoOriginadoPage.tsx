import { useState } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { AppLayout } from "@/components/AppLayout"
import { IndicatorSection } from "@/components/indicators/IndicatorSection"
import { QuarterlyInputs } from "@/components/indicators/QuarterlyInputs"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"

export default function TrafegoOriginadoPage() {
  const [selectedOperator, setSelectedOperator] = useState<string>("")
  const [selectedQuarter, setSelectedQuarter] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")
  
  const form = useForm()

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
      
      // Get unique years
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

  // Get indicators for Tráfego Originado
  const { data: indicators, isLoading } = useQuery({
    queryKey: ['indicators', 'trafego_originado'],
    queryFn: async () => {
      const { data: section } = await supabase
        .from('indicator_sections')
        .select('id')
        .eq('section_code', 'trafego_originado')
        .single()

      if (!section) throw new Error('Section not found')

      const { data, error } = await supabase
        .from('indicators')
        .select('*')
        .eq('section_id', section.id)
        .order('order_index')
      
      if (error) throw error
      return data
    }
  })

  const onSubmit = async (data: any) => {
    if (!selectedOperator || !selectedQuarter) {
      toast.error("Selecione um operador e trimestre")
      return
    }

    try {
      for (const [indicatorCode, indicatorData] of Object.entries(data)) {
        const indicator = indicators?.find(ind => ind.code === indicatorCode)
        if (!indicator || !indicatorData || typeof indicatorData !== 'object') continue

        const values = indicatorData as any

        await supabase
          .from('indicator_data')
          .upsert({
            operator_id: selectedOperator,
            quarter_id: selectedQuarter,
            indicator_id: indicator.id,
            quarter_1: values.quarter_1 || null,
            quarter_2: values.quarter_2 || null,
            quarter_3: values.quarter_3 || null,
            quarter_4: values.quarter_4 || null,
          }, {
            onConflict: 'operator_id,quarter_id,indicator_id'
          })
      }

      toast.success("Dados salvos com sucesso!")
    } catch (error) {
      console.error('Error saving data:', error)
      toast.error("Erro ao salvar dados")
    }
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AppLayout>
    )
  }

  // Group indicators by main sections
  const comunicacoesVoz = indicators?.filter(ind => ind.code.startsWith('1.1')) || []
  const volumeTrafegoVoz = indicators?.filter(ind => ind.code.startsWith('2.1')) || []
  const servicoSMS = indicators?.filter(ind => ind.code.startsWith('3.1')) || []
  const servicoMMS = indicators?.filter(ind => ind.code.startsWith('4.1')) || []

  return (
    <AppLayout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">B. TRÁFEGO ORIGINADO</h1>
            <p className="text-muted-foreground">
              Gestão de dados de tráfego originado por operador e trimestre
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedOperator} onValueChange={setSelectedOperator}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecionar Operador" />
              </SelectTrigger>
              <SelectContent>
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
                {quarters?.map((quarter) => (
                  <SelectItem key={quarter.id} value={quarter.id}>
                    T{quarter.quarter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={form.handleSubmit(onSubmit)}
              disabled={!selectedOperator || !selectedQuarter}
              className="bg-primary hover:bg-primary/90"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Dados
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            <IndicatorSection title="1. Número de Comunicações de Voz">
              <div className="space-y-6">
                {comunicacoesVoz.map((indicator) => (
                  <div key={indicator.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">{indicator.code}</span>
                      <span className="text-sm text-muted-foreground">|</span>
                      <span className="text-sm font-medium">{indicator.name}</span>
                      <span className="text-sm text-muted-foreground">({indicator.unit})</span>
                    </div>
                    <QuarterlyInputs
                      form={form}
                      indicatorCode={indicator.code}
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>
            </IndicatorSection>

            <IndicatorSection title="2. Volume de Tráfego de Voz (Minutos)">
              <div className="space-y-6">
                {volumeTrafegoVoz.map((indicator) => (
                  <div key={indicator.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">{indicator.code}</span>
                      <span className="text-sm text-muted-foreground">|</span>
                      <span className="text-sm font-medium">{indicator.name}</span>
                      <span className="text-sm text-muted-foreground">({indicator.unit})</span>
                    </div>
                    <QuarterlyInputs
                      form={form}
                      indicatorCode={indicator.code}
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>
            </IndicatorSection>

            <IndicatorSection title="3. Serviço de Mensagens SMS">
              <div className="space-y-6">
                {servicoSMS.map((indicator) => (
                  <div key={indicator.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">{indicator.code}</span>
                      <span className="text-sm text-muted-foreground">|</span>
                      <span className="text-sm font-medium">{indicator.name}</span>
                      <span className="text-sm text-muted-foreground">({indicator.unit})</span>
                    </div>
                    <QuarterlyInputs
                      form={form}
                      indicatorCode={indicator.code}
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>
            </IndicatorSection>

            <IndicatorSection title="4. Serviço de Mensagens MMS">
              <div className="space-y-6">
                {servicoMMS.map((indicator) => (
                  <div key={indicator.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">{indicator.code}</span>
                      <span className="text-sm text-muted-foreground">|</span>
                      <span className="text-sm font-medium">{indicator.name}</span>
                      <span className="text-sm text-muted-foreground">({indicator.unit})</span>
                    </div>
                    <QuarterlyInputs
                      form={form}
                      indicatorCode={indicator.code}
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>
            </IndicatorSection>
          </form>
        </Form>
      </div>
    </AppLayout>
  )
}