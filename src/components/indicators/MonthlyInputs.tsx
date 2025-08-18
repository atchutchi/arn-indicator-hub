import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"

interface MonthlyInputsProps {
  form: UseFormReturn<any>
  indicatorCode: string
  className?: string
}

export function MonthlyInputs({ form, indicatorCode, className }: MonthlyInputsProps) {
  const months = [
    { key: 'january', label: 'Janeiro' },
    { key: 'february', label: 'Fevereiro' },
    { key: 'march', label: 'Março' },
    { key: 'april', label: 'Abril' },
    { key: 'may', label: 'Maio' },
    { key: 'june', label: 'Junho' },
    { key: 'july', label: 'Julho' },
    { key: 'august', label: 'Agosto' },
    { key: 'september', label: 'Setembro' },
    { key: 'october', label: 'Outubro' },
    { key: 'november', label: 'Novembro' },
    { key: 'december', label: 'Dezembro' }
  ]

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
      {months.map((month) => (
        <FormField
          key={month.key}
          control={form.control}
          name={`${indicatorCode}.${month.key}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-muted-foreground">
                {month.label}
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