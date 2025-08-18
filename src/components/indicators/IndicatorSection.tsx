import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface IndicatorSectionProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function IndicatorSection({ title, description, children, className }: IndicatorSectionProps) {
  return (
    <Card className={`bg-card border-border ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  )
}