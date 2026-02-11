
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
    Menu,
    ShoppingCart,
    User as UserIcon,
    LogOut,
    LayoutDashboard,
} from "lucide-react";
import { MaritaniLogo } from "@/components/maritani-logo";
import type { Session } from "next-auth";
import { handleLogout } from "@/lib/actions";
import { useCartStore } from "@/hooks/use-cart-store";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Katalog", href: "/katalog" },
    { label: "Lelang", href: "/lelang" },
    { label: "Tentang", href: "/tentang" },
];

interface NavbarProps {
    session: Session | null;
}

export function Navbar({ session }: NavbarProps) {
    const user = session?.user;
    const totalItems = useCartStore((state) => state.totalItems());

    return (
        <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                        <MaritaniLogo size={22} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">
                        Mari<span className="text-primary">tani</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:left-1/4 hover:after:w-1/2"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="relative" asChild>
                        <Link href="/cart">
                            <ShoppingCart className="h-4 w-4" />
                            {totalItems > 0 && (
                                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center bg-accent text-accent-foreground">
                                    {totalItems}
                                </Badge>
                            )}
                        </Link>
                    </Button>

                    {/* Divider */}
                    <div className="hidden sm:block h-6 w-px bg-border" />

                    <div className="hidden sm:flex items-center gap-3">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8 border border-border">
                                            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                                            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <UserIcon className="mr-2 h-4 w-4" />
                                        <span>Profil</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="cursor-pointer w-full">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />
                                    <form action={handleLogout} className="contents">
                                        <DropdownMenuItem asChild>
                                            <button type="submit" className="w-full cursor-pointer">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Keluar</span>
                                            </button>
                                        </DropdownMenuItem>
                                    </form>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/login">
                                        Masuk
                                    </Link>
                                </Button>
                                <Button
                                    size="sm"
                                    className="rounded-full px-5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
                                    asChild
                                >
                                    <Link href="/register">
                                        Daftar
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-72">
                            <div className="flex flex-col gap-4 mt-8">
                                <Link href="/" className="flex items-center gap-2 mb-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                        <MaritaniLogo size={18} />
                                    </div>
                                    <span className="text-lg font-bold">
                                        Mari<span className="text-primary">tani</span>
                                    </span>
                                </Link>

                                {user && (
                                    <div className="flex items-center gap-3 mb-4 p-3 bg-muted/50 rounded-lg">
                                        <Avatar className="h-10 w-10 border border-border">
                                            <AvatarImage src={user.image || ""} />
                                            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm font-medium truncate">{user.name}</span>
                                            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                                        </div>
                                    </div>
                                )}

                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                <div className="border-t pt-4 flex flex-col gap-2 mt-2">
                                    {user ? (
                                        <form action={handleLogout} className="w-full">
                                            <Button
                                                type="submit"
                                                variant="destructive"
                                                className="w-full justify-start"
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Keluar
                                            </Button>
                                        </form>
                                    ) : (
                                        <>
                                            <Button variant="outline" className="w-full" asChild>
                                                <Link href="/login">
                                                    <UserIcon className="mr-2 h-4 w-4" />
                                                    Masuk
                                                </Link>
                                            </Button>
                                            <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30" asChild>
                                                <Link href="/register">
                                                    Daftar
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
