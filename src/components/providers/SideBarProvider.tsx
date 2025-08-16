import React, { ReactNode } from 'react'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from '../SidebarComp'
import { cookies } from "next/headers";
import { User } from '@/types/type';

export const SideBarProvider = async ({ children }: { children: ReactNode }) => {
    const cookieStore = await cookies();
    const storedUser = cookieStore.get("travo-user")?.value;

    let user: User | null = null
    if (storedUser) {
        try {
        user = JSON.parse(storedUser) as User
        } catch (err) {
        console.error("Invalid travo-user cookie:", err)
        }
    }

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" user={user} />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
