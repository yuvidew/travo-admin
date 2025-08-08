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

            <SidebarMenuItem >
              <SidebarMenuButton >
                <SearchModal>
                  <div className=" flex items-center gap-2">
                    <Search className=" size-4" />
                    <span>Search</span>
                  </div>
                </SearchModal>
              </SidebarMenuButton>
            </SidebarMenuItem>
          {/* ))} */}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
