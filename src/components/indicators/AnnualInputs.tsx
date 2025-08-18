import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UseFormReturn } from "react-hook-form"

interface AnnualInputsProps {
  form: UseFormReturn<any>
  indicatorCode: string
  className?: string
  selectedYear?: string
}

export function AnnualInputs({ form, indicatorCode, className, selectedYear }: AnnualInputsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <FormField
        control={form.control}
        name={`${indicatorCode}.annual_value`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-muted-foreground">
              Valor Anual ({selectedYear || '2024'})
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="0"
                className="bg-background border-border"
                {...field}
                onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name={`${indicatorCode}.observations`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-muted-foreground">
              Observações
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Adicione observações sobre este indicador..."
                className="bg-background border-border min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}