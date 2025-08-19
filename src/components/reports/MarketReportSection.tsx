import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface MarketReportSectionProps {
  selectedYear?: string
  selectedQuarter?: string
  selectedOperator?: string
}

export function MarketReportSection({ selectedYear, selectedQuarter, selectedOperator }: MarketReportSectionProps) {
  // Get market data
  const { data: marketData } = useQuery({
    queryKey: ['market-data', selectedYear, selectedQuarter, selectedOperator],
    queryFn: async () => {
      // This would fetch actual data from indicators
      // For now using mock data based on the specification
      return {
        assinantes: [
          { periodo: 'T1 2023', mtn: 621005, orange: 1227633, total: 1848638 },
          { periodo: 'T2 2023', mtn: 552357, orange: 1255547, total: 1807904 },
          { periodo: 'T3 2023', mtn: 544310, orange: 1224417, total: 1768727 },
          { periodo: 'T4 2023', mtn: 615201, orange: 1270669, total: 1885870 }
        ],
        marketShare: [
          { name: 'Orange', value: 67, color: '#FF6600' },
          { name: 'MTN', value: 33, color: '#FFCC00' }
        ],
        trafego: [
          { 
            periodo: 'T4 2023',
            mtn_on_net: 312,
            mtn_off_net: 124.6,
            mtn_internacional: 3.9,
            orange_on_net: 4336,
            orange_off_net: 1.25,
            orange_internacional: 21.3
          }
        ]
      }
    }
  })

  const COLORS = {
    mtn: '#FFCC00',
    orange: '#FF6600',
    positivo: '#28A745',
    negativo: '#DC3545'
  }

  return (
    <div className="space-y-6">
      {/* Panorama Geral do Mercado */}
      <Card>
        <CardHeader>
          <CardTitle>Panorama Geral do Mercado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Evolução de Assinantes */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Número e Crescimento de Assinantes</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData?.assinantes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [value.toLocaleString(), '']}
                    labelFormatter={(label) => `Período: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="mtn" 
                    stroke={COLORS.mtn} 
                    strokeWidth={3}
                    name="MTN"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orange" 
                    stroke={COLORS.orange} 
                    strokeWidth={3}
                    name="Orange"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#6C757D" 
                    strokeWidth={2}
                    name="Total"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quota de Mercado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quota de Mercado</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketData?.marketShare}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {marketData?.marketShare.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Taxa de Penetração</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Taxa Atual</span>
                    <span className="text-2xl font-bold text-primary">91%</span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Meta Regional</span>
                    <span className="text-lg font-semibold text-muted-foreground">95%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">4pp para atingir a meta</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tráfego de Voz */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Tráfego de Voz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Volume de Tráfego por Tipo</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketData?.trafego}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value}M min`, '']}
                  />
                  <Legend />
                  <Bar dataKey="mtn_on_net" stackId="mtn" fill={COLORS.mtn} name="MTN On-net" />
                  <Bar dataKey="mtn_off_net" stackId="mtn" fill="#FFF299" name="MTN Off-net" />
                  <Bar dataKey="mtn_internacional" stackId="mtn" fill="#CCAA00" name="MTN Internacional" />
                  <Bar dataKey="orange_on_net" stackId="orange" fill={COLORS.orange} name="Orange On-net" />
                  <Bar dataKey="orange_off_net" stackId="orange" fill="#FF9966" name="Orange Off-net" />
                  <Bar dataKey="orange_internacional" stackId="orange" fill="#CC5500" name="Orange Internacional" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribuição de Tráfego */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <h4 className="font-semibold text-primary text-2xl">94%</h4>
              <p className="text-sm text-muted-foreground">On-net</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <h4 className="font-semibold text-orange-600 text-2xl">3%</h4>
              <p className="text-sm text-muted-foreground">Off-net</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg text-center">
              <h4 className="font-semibold text-purple-600 text-2xl">3%</h4>
              <p className="text-sm text-muted-foreground">Internacional</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}