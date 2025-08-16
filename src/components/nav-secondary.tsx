"use client"

import * as React from "react"
import { HelpCircle, Settings } from 'lucide-react';


import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SettingModal } from "./setting-modal";

type NavSecondaryProps = React.ComponentPropsWithoutRef<typeof SidebarGroup>;


/**
 * `NavSecondary` renders the secondary navigation group inside the sidebar.
 * It includes buttons for settings and help.
 *
 * @param {NavSecondaryProps} props - Props to customize the sidebar group.
 * @returns {JSX.Element} The rendered sidebar secondary navigation.
 */

export function NavSecondary (props: NavSecondaryProps) {
  return (
    <SidebarGroup className=" mt-auto" {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          
            <SidebarMenuItem >
              <SidebarMenuButton>
                <SettingModal>
                  <div className=" flex items-center gap-2">

                  <Settings className=" size-4" />
                  <span>Settings</span>
                  </div>
                </SettingModal>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem >
              <SidebarMenuButton >
                  <HelpCircle />
                  <span>Get Help</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
