import React, { ReactNode } from 'react'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from '../SidebarComp'

export const SideBarProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
