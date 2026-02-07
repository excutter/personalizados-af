'use client'

import Image from "next/image";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import logo from "@/public/logo.svg"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LucideHouse, User } from "lucide-react";

type SidebarMenuItem = {
    title: string;
    icon: React.ComponentType;
    path: string;
}

const data: SidebarMenuItem[] = [
    {
        title: "Inicio",
        icon: LucideHouse,
        path: "/dashboard"
    },
    {
        title: "Alumnos",
        icon: User,
        path: "/dashboard/users"
    }
]

export function AppSidebar() {
    const pathname = usePathname()
    return (
        <Sidebar>
            <SidebarHeader className="flex flex-row justify-center p-5">
                <Image style={{ width: 72 }} src={logo} alt="Personalizados AF" />
            </SidebarHeader>
            <SidebarContent className="text-white pt-5 p-3">
                <SidebarMenu className="gap-5">
                    {data.map(item => (
                        <SidebarMenuItem key={item.path}>
                            <SidebarMenuButton className="cursor-pointer" isActive={item.path == pathname}>
                                <Link className="w-100 flex items-center gap-2" href={item.path}>
                                    <item.icon />
                                    {item.title}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}