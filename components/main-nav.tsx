"use client"

import { cn } from "@/lib/utils";
import { usePathname, useParams } from "next/navigation";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()
    const params = useParams()
    const routes = [
        {
            href: `/${params.storeid}`,
            label: 'Overview',
            active: pathname === `/${params.storeid}`
        },
        {
            href: `/${params.storeid}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeid}/settings`
        },
        {
            href: `/${params.storeid}/billboards`,
            label: 'Billboards',
            active: pathname === `/${params.storeid}/billboards`
        },
        {
            href: `/${params.storeid}/categories`,
            label: 'Categories',
            active: pathname === `/${params.storeid}/categories`
        },
        {
            href: `/${params.storeid}/products`,
            label: 'Products',
            active: pathname === `/${params.storeid}/products`
        },
        {
            href: `/${params.storeid}/sizes`,
            label: 'Sizes',
            active: pathname === `/${params.storeid}/sizes`
        },
        {
            href: `/${params.storeid}/colors`,
            label: 'Colors',
            active: pathname === `/${params.storeid}/colors`
        },
        {
            href: `/${params.storeid}/orders`,
            label: 'Orders',
            active: pathname === `/${params.storeid}/orders`
        }
]
 let title = routes.find(route => route.active === true)?.label;


    return (
        <nav
        className={cn("flex items-center spzce-4-x lg:space-x-6", className)}
        >
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm ">
                   <div className="flex items-center p-2 align-center ">
                       {title}
                    <ChevronDown />
                    </div>
               </DropdownMenuTrigger>
             <DropdownMenuContent>
            <DropdownMenuSeparator />
                {routes.map((route) => (
                  <DropdownMenuItem key={route.href}>
                    <Link
                    key={route.href}
                    href={route.href}
                    className={cn("text-sm font-meium transition-colors hover;text-promary",
                    route.active ? "text-black dark:text-white": "text-muted-foreground")}
                    >{route.label}</Link>
                </DropdownMenuItem>
             ))}
             </DropdownMenuContent>
            </DropdownMenu>
           </nav>
    )
}