import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"

interface MobileStationsInputsProps {
  form: UseFormReturn<any>
  indicatorCode: string
  className?: string
}

export function MobileStationsInputs({ form, indicatorCode, className }: MobileStationsInputsProps) {
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
    <div className={`space-y-6 ${className}`}>
      {/* Monthly inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

      {/* Additional mobile stations specific fields */}
      {!indicatorCode.includes('1.3') && !indicatorCode.includes('1.4') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
          <FormField
            control={form.control}
            name={`${indicatorCode}.desativacoes`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-muted-foreground">
                  Desativações
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
            name={`${indicatorCode}.total`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-muted-foreground">
                  Total
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
        </div>
      )}
    </div>
  )
}