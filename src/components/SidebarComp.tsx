"use client"

import * as React from "react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Box, Camera, File, HelpCircle, ListCheck, Search, Settings, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { NavSecondary } from "./nav-secondary";
import { User } from "@/types/type"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: Box,
        },
        {
            title: "Trips",
            url: "/trips",
            icon: ListCheck,
        },
        {
            title: "Users",
            url: "/users",
            icon: Users,
        },
    ],
    navClouds: [
        {
            title: "Capture",
            icon: Camera,
            isActive: true,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Proposal",
            icon: File,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Prompts",
            icon: File,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
        {
            title: "Get Help",
            url: "#",
            icon: HelpCircle,
        },
        {
            title: "Search",
            url: "#",
            icon: Search,
        },
    ],
}


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user?: User | null
}

export const AppSidebar = ({ user, ...props }: AppSidebarProps) => {

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link href="/">
                                <Image
                                    src={"/logo.png"}
                                    alt="Travo"
                                    width={20}
                                    height={20}
                                />
                                <span className="text-base font-semibold">
                                    Trao
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary />
            </SidebarContent>
            <SidebarFooter>
                {!user ? null :  <NavUser user={user} />}
            </SidebarFooter>
        </Sidebar>
    )
}
