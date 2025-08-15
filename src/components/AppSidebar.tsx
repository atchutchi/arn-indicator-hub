import { useState } from "react"
import { 
  BarChart3, 
  Database, 
  Users, 
  Phone, 
  ArrowUpDown, 
  Radio, 
  Globe, 
  TrendingUp, 
  DollarSign, 
  Settings,
  Building,
  Briefcase,
  Target,
  Wifi
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Operadores", url: "/operadores", icon: Building },
  { title: "Estações Móveis", url: "/estacoes-moveis", icon: Phone },
  { title: "Tráfego Originado", url: "/trafego-originado", icon: ArrowUpDown },
  { title: "Tráfego Terminado", url: "/trafego-terminado", icon: ArrowUpDown },
  { title: "Roaming Internacional", url: "/roaming-internacional", icon: Globe },
  { title: "Internet Fixo", url: "/internet-fixo", icon: Wifi },
  { title: "Tráfego de Internet", url: "/trafego-internet", icon: TrendingUp },
  { title: "Receitas", url: "/receitas", icon: DollarSign },
  { title: "Tarifário", url: "/tarifario-voz", icon: Target },
  { title: "Largura de Banda", url: "/largura-banda", icon: Radio },
  { title: "Empregos", url: "/empregos", icon: Briefcase },
  { title: "Investimentos", url: "/investimentos", icon: Database },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} bg-sidebar border-r border-border`}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar">
        <div className="p-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ARN</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">ARN Indicators</h2>
                <p className="text-xs text-muted-foreground">Sistema de Indicadores 2024</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <span className="text-primary-foreground font-bold text-sm">ARN</span>
            </div>
          )}
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavCls({ isActive })}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}