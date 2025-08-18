import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"

interface QuarterlyInputsProps {
  form: UseFormReturn<any>
  indicatorCode: string
  className?: string
}

export function QuarterlyInputs({ form, indicatorCode, className }: QuarterlyInputsProps) {
  const quarters = [
    { key: 'quarter_1', label: 'T1 (Jan-Mar)' },
    { key: 'quarter_2', label: 'T2 (Abr-Jun)' },
    { key: 'quarter_3', label: 'T3 (Jul-Set)' },
    { key: 'quarter_4', label: 'T4 (Out-Dez)' }
  ]

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {quarters.map((quarter) => (
        <FormField
          key={quarter.key}
          control={form.control}
          name={`${indicatorCode}.${quarter.key}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-muted-foreground">
                {quarter.label}
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
      ))}
    </div>
  )
}