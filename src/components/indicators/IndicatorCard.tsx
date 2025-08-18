import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QuarterlyInputs } from "./QuarterlyInputs"
import { MonthlyInputs } from "./MonthlyInputs"
import { AnnualInputs } from "./AnnualInputs"
import { MobileStationsInputs } from "./MobileStationsInputs"
import { UseFormReturn } from "react-hook-form"

interface IndicatorCardProps {
  indicator: {
    id: string
    code: string
    name: string
    unit: string
    has_quarterly_data: boolean
    has_monthly_data: boolean
    has_annual_data: boolean
  }
  form: UseFormReturn<any>
  selectedYear?: string
}

export function IndicatorCard({ indicator, form, selectedYear }: IndicatorCardProps) {
  const getInputType = () => {
    if (indicator.has_annual_data) return 'annual'
    if (indicator.has_monthly_data) return 'monthly'
    if (indicator.has_quarterly_data) return 'quarterly'
    return 'quarterly' // default
  }

  const inputType = getInputType()
  
  // Check if this is a mobile stations indicator that needs special treatment
  const isMobileStationsIndicator = indicator.code.match(/^1\.[1-4]\.?[a]?$/)
  const needsSpecialMonthlyInputs = isMobileStationsIndicator && inputType === 'monthly'

  return (
    <Card className="bg-card border-border hover:bg-muted/30 transition-colors">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs font-mono">
                {indicator.code}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {indicator.unit}
              </Badge>
            </div>
            <CardTitle className="text-sm font-medium text-foreground leading-5">
              {indicator.name}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {inputType === 'quarterly' && (
          <QuarterlyInputs 
            form={form} 
            indicatorCode={indicator.code} 
          />
        )}
        
        {inputType === 'monthly' && !needsSpecialMonthlyInputs && (
          <MonthlyInputs 
            form={form} 
            indicatorCode={indicator.code} 
          />
        )}
        
        {needsSpecialMonthlyInputs && (
          <MobileStationsInputs 
            form={form} 
            indicatorCode={indicator.code} 
          />
        )}
        
        {inputType === 'annual' && (
          <AnnualInputs 
            form={form} 
            indicatorCode={indicator.code}
            selectedYear={selectedYear}
          />
        )}
      </CardContent>
    </Card>
  )
}