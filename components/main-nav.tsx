"use client"

import { cn } from "@/lib/utils";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";

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
        }
]
    console.log(params)
    return (
        <nav
        className={cn("flex items-center spzce-4-x lg:space-x-6", className)}
        >
            {routes.map((route) => (
                <Link
                key={route.href}
                href={route.href}
                className={cn("text-sm font-meium transition-colors hover;text-promary",
                route.active ? "text-black dark:text-white": "text-muted-foreground")}
                >{route.label}</Link>
            ))}


        </nav>
    )
}