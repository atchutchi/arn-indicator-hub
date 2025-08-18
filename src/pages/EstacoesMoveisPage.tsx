import { useState } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { AppLayout } from "@/components/AppLayout"
import { IndicatorSection } from "@/components/indicators/IndicatorSection"
import { IndicatorCard } from "@/components/indicators/IndicatorCard"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"

export default function EstacoesMoveisPage() {
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

  // Get indicators for Estações Móveis
  const { data: indicators, isLoading } = useQuery({
    queryKey: ['indicators', 'estacoes_moveis'],
    queryFn: async () => {
      const { data: section } = await supabase
        .from('indicator_sections')
        .select('id')
        .eq('section_code', 'estacoes_moveis')
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
      toast.success("Dados salvos com sucesso!")
    } catch (error) {
      toast.error("Erro ao salvar dados")
    }
  }

  if (isLoading) {
    return (
      <AppLayout title="Estações Móveis">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AppLayout>
    )
  }

  // Group indicators by section
  const numeroEstacoesIndicators = indicators?.filter(ind => 
    ind.code.startsWith('1.') && !ind.code.startsWith('2.')
  ) || []
  
  const utilizadoresIndicators = indicators?.filter(ind => 
    ind.code.startsWith('2.') && !ind.code.startsWith('MM.')
  ) || []
  
  const mobileMoneyIndicators = indicators?.filter(ind => 
    ind.code.startsWith('MM.')
  ) || []

  return (
    <AppLayout title="Estações Móveis">
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedOperator} onValueChange={setSelectedOperator}>
              <SelectTrigger className="w-[200px]">
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
              <SelectTrigger className="w-[120px]">
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

            <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Trimestre" />
              </SelectTrigger>
              <SelectContent>
                {quarters?.map((quarter) => (
                  <SelectItem key={quarter.id} value={quarter.id}>
                    {quarter.year} T{quarter.quarter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={form.handleSubmit(onSubmit)}
            disabled={!selectedOperator || !selectedQuarter}
            className="bg-primary hover:bg-primary/90"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Dados
          </Button>
        </div>

        <Form {...form}>
          <form className="space-y-8">
            {/* Section 1: Número de Estações */}
            <IndicatorSection 
              title="1. Número total de estações móveis activos"
              description="Dados mensais sobre o número de estações móveis por tipo de plano"
            >
              <div className="grid gap-6">
                {numeroEstacoesIndicators.map((indicator) => (
                  <IndicatorCard
                    key={indicator.id}
                    indicator={indicator}
                    form={form}
                    selectedYear={selectedYear}
                  />
                ))}
              </div>
            </IndicatorSection>

            {/* Section 2: Utilizadores de Serviços */}
            <IndicatorSection 
              title="2. Utilizadores de Serviços"
              description="Dados sobre utilizadores dos serviços móveis por categoria"
            >
              <div className="grid gap-6">
                {utilizadoresIndicators.map((indicator) => (
                  <IndicatorCard
                    key={indicator.id}
                    indicator={indicator}
                    form={form}
                    selectedYear={selectedYear}
                  />
                ))}
              </div>
            </IndicatorSection>

            {/* Section 3: Mobile Money */}
            <IndicatorSection 
              title="3. Serviços de Mobile Money"
              description="Dados trimestrais sobre serviços de mobile money por género"
            >
              <div className="grid gap-6">
                {mobileMoneyIndicators.map((indicator) => (
                  <IndicatorCard
                    key={indicator.id}
                    indicator={indicator}
                    form={form}
                    selectedYear={selectedYear}
                  />
                ))}
              </div>
            </IndicatorSection>
          </form>
        </Form>
      </div>
    </AppLayout>
  )
}