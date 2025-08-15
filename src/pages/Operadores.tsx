import { useState, useEffect } from "react"
import { AppLayout } from "@/components/AppLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Operator {
  id: string
  name: string
  address: string
  contact_name: string
  contact_phone: string
  contact_email: string
  created_at: string
}

export default function Operadores() {
  const [operators, setOperators] = useState<Operator[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingOperator, setEditingOperator] = useState<Operator | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_name: "",
    contact_phone: "",
    contact_email: ""
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchOperators()
  }, [])

  const fetchOperators = async () => {
    try {
      const { data, error } = await supabase
        .from('operators')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOperators(data || [])
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar operadores",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingOperator) {
        const { error } = await supabase
          .from('operators')
          .update(formData)
          .eq('id', editingOperator.id)

        if (error) throw error
        
        toast({
          title: "Sucesso",
          description: "Operador atualizado com sucesso"
        })
      } else {
        const { error } = await supabase
          .from('operators')
          .insert([formData])

        if (error) throw error
        
        toast({
          title: "Sucesso",
          description: "Operador cadastrado com sucesso"
        })
      }

      setDialogOpen(false)
      setEditingOperator(null)
      setFormData({
        name: "",
        address: "",
        contact_name: "",
        contact_phone: "",
        contact_email: ""
      })
      fetchOperators()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar operador",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (operator: Operator) => {
    setEditingOperator(operator)
    setFormData({
      name: operator.name,
      address: operator.address,
      contact_name: operator.contact_name,
      contact_phone: operator.contact_phone,
      contact_email: operator.contact_email
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este operador?")) return

    try {
      const { error } = await supabase
        .from('operators')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      toast({
        title: "Sucesso",
        description: "Operador deletado com sucesso"
      })
      fetchOperators()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar operador",
        variant: "destructive"
      })
    }
  }

  return (
    <AppLayout title="Cadastro de Operadores">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Operadores de Telecomunicações</h2>
            <p className="text-muted-foreground">Gerencie os operadores do sistema ARN</p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Operador
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>
                  {editingOperator ? "Editar Operador" : "Novo Operador"}
                </DialogTitle>
                <DialogDescription>
                  Preencha as informações do operador de telecomunicações
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome da Empresa *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Orange Bissau SA"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Endereço completo da empresa"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact_name">Nome do Contato</Label>
                    <Input
                      id="contact_name"
                      value={formData.contact_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact_name: e.target.value }))}
                      placeholder="Nome do responsável"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact_phone">Telefone</Label>
                    <Input
                      id="contact_phone"
                      value={formData.contact_phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
                      placeholder="+245 xxx xxx xxx"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact_email">Email</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={formData.contact_email}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
                      placeholder="contato@operador.com"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {editingOperator ? "Atualizar" : "Cadastrar"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Operadores Cadastrados</CardTitle>
            <CardDescription>
              Lista de todos os operadores registrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">Carregando...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-24">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operators.map((operator) => (
                    <TableRow key={operator.id}>
                      <TableCell className="font-medium">{operator.name}</TableCell>
                      <TableCell>{operator.contact_name}</TableCell>
                      <TableCell>{operator.contact_phone}</TableCell>
                      <TableCell>{operator.contact_email}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(operator)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(operator.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}