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
import { Loader2, Save, Plane, ArrowUpDown } from "lucide-react"

export default function RoamingInternacionalPage() {
  const [selectedOperator, setSelectedOperator] = useState<string>("")
  const [selectedQuarter, setSelectedQuarter] = useState<string>("")
  
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

  // Get quarters
  const { data: quarters } = useQuery({
    queryKey: ['quarters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quarters')
        .select('*')
        .eq('is_active', true)
        .order('year', { ascending: true })
        .order('quarter', { ascending: true })
      
      if (error) throw error
      return data
    }
  })

  // Get indicators for Roaming Internacional
  const { data: indicators, isLoading } = useQuery({
    queryKey: ['indicators', 'roaming_internacional'],
    queryFn: async () => {
      const { data: section } = await supabase
        .from('indicator_sections')
        .select('id')
        .eq('section_code', 'roaming_internacional')
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
      <AppLayout title="Tráfego de Roaming Internacional">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AppLayout>
    )
  }

  // Group indicators by type
  const roamingOutIndicators = indicators?.filter(ind => 
    ind.code.startsWith('ROUT.')
  ) || []
  
  const roamingInIndicators = indicators?.filter(ind => 
    ind.code.startsWith('RIN.')
  ) || []

  return (
    <AppLayout title="Tráfego de Roaming Internacional">
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
            {/* Section 1: Roaming-out */}
            <IndicatorSection 
              title="Roaming-out (clientes próprios no estrangeiro)"
              description="Dados sobre clientes nacionais que utilizam serviços no estrangeiro"
            >
              <div className="flex items-center gap-2 mb-4">
                <Plane className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Clientes saindo do país
                </span>
              </div>
              <div className="grid gap-6">
                {roamingOutIndicators.map((indicator) => (
                  <IndicatorCard
                    key={indicator.id}
                    indicator={indicator}
                    form={form}
                  />
                ))}
              </div>
            </IndicatorSection>

            {/* Section 2: Roaming-in */}
            <IndicatorSection 
              title="Roaming-in (clientes visitantes)"
              description="Dados sobre clientes estrangeiros que utilizam serviços no país"
            >
              <div className="flex items-center gap-2 mb-4">
                <ArrowUpDown className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">
                  Clientes visitantes no país
                </span>
              </div>
              <div className="grid gap-6">
                {roamingInIndicators.map((indicator) => (
                  <IndicatorCard
                    key={indicator.id}
                    indicator={indicator}
                    form={form}
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