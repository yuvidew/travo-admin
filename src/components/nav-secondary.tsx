"use client"

import * as React from "react"
import { HelpCircle, Search, Settings } from 'lucide-react';


import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SettingModal } from "./setting-modal";
import { SearchModal } from "./search-modal";
// import { SettingModal } from "./setting-modal";

type NavSecondaryProps = React.ComponentPropsWithoutRef<typeof SidebarGroup>;

export function NavSecondary (props: NavSecondaryProps) {
  return (
    <SidebarGroup className=" mt-auto" {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* {items.map((item) => ( */}
          
            <SidebarMenuItem >
              <SidebarMenuButton>
                <SettingModal>
                  <Settings className=" size-4" />
                  <span>Settings</span>
                </SettingModal>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem >
              <SidebarMenuButton >
                  <HelpCircle />
                  <span>Get Help</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem >
              <SidebarMenuButton >
                <SearchModal>
                    <Search className=" size-4" />
                    <span>Search</span>
                </SearchModal>
              </SidebarMenuButton>
            </SidebarMenuItem>
          {/* ))} */}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
