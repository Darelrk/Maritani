
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/utils";
import { Package, ShoppingBag, Store, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/login?callbackUrl=/dashboard");
    }

    const { user } = session;
    const isSeller = user.role === "SELLER";
    // cast to any to avoid ts error for now, or fix interface
    const isBusiness = (user as any).accountType === "BUSINESS";

    // --- FETCH DATA ---

    // 1. Buyer Data (Always fetch if not seller, or just fetch empty if seller)
    // Optimization: If seller, don't fetch buyer orders as they shouldn't have any (or we hide them)
    let buyerOrders: any[] = [];
    if (!isSeller) {
        buyerOrders = await prisma.order.findMany({
            where: { userId: user.id },
            include: {
                items: { include: { product: true } },
            },
            orderBy: { createdAt: "desc" },
        });
    }

    // 2. Seller Data (Only if SELLER)
    let sellerStats = { revenue: 0, totalSales: 0, activeProducts: 0 };
    let sellerIncomingOrders: any[] = [];
    let sellerProfile: any = null;

    if (isSeller) {
        sellerProfile = await prisma.sellerProfile.findUnique({
            where: { userId: user.id },
            include: { products: true }
        });

        if (sellerProfile) {
            // Stats
            sellerStats.activeProducts = sellerProfile.products.length;
            sellerStats.totalSales = sellerProfile.products.reduce((acc: number, p: any) => acc + p.sold, 0);

            // Fetch incoming orders (Orders containing my products)
            const myOrderItems = await prisma.orderItem.findMany({
                where: {
                    product: { sellerId: sellerProfile.id }
                },
                include: {
                    product: true,
                    order: true
                },
                orderBy: { order: { createdAt: 'desc' } }
            });

            sellerIncomingOrders = myOrderItems;

            // Calculate Revenue from sold items
            sellerStats.revenue = myOrderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">
                        Dashboard {isSeller ? "Toko" : (isBusiness ? "Bisnis" : "Personal")}
                    </h1>
                    <p className="text-muted-foreground">
                        Selamat datang kembali, {user.name}
                    </p>
                </div>
                {isSeller && (
                    <Button asChild>
                        <Link href="/dashboard/products/new">
                            + Tambah Produk Baru
                        </Link>
                    </Button>
                )}
            </div>

            {/* SELLER VIEW */}
            {isSeller ? (
                <div className="space-y-6">
                    {/* Seller Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatRupiah(sellerStats.revenue)}</div>
                                <p className="text-xs text-muted-foreground">Dari {sellerStats.totalSales} produk terjual</p>
                            </CardContent>
                        </Card>
                        <Link href="/dashboard/products" className="block h-full">
                            <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Produk Aktif</CardTitle>
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{sellerStats.activeProducts}</div>
                                    <p className="text-xs text-muted-foreground">Kelola produk toko &rarr;</p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pesanan Masuk</CardTitle>
                                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{sellerIncomingOrders.length}</div>
                                <p className="text-xs text-muted-foreground">Item perlu diproses</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Seller Profile Card */}
                        <div className="md:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profil Toko</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                            <Store size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold">{sellerProfile?.storeName || "Toko Anda"}</h3>
                                            <Badge variant="secondary">{sellerProfile?.type || "UMKM"}</Badge>
                                        </div>
                                    </div>
                                    <div className="text-sm space-y-2 text-muted-foreground">
                                        <p>{sellerProfile?.description || "Belum ada deskripsi toko."}</p>
                                        <p>{sellerProfile?.city || "Kota belum diatur"}</p>
                                    </div>
                                    <Button variant="outline" className="w-full" size="sm">Edit Profil Toko</Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Incoming Orders List */}
                        <div className="md:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pesanan Masuk Terbaru</CardTitle>
                                    <CardDescription>Barang yang dibeli pelanggan dari toko Anda.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {sellerIncomingOrders.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">Belum ada pesanan masuk.</div>
                                    ) : (
                                        <div className="space-y-4">
                                            {sellerIncomingOrders.slice(0, 5).map((item: any) => (
                                                <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                                                    <div className="flex gap-4 items-center">
                                                        <div className="h-10 w-10 bg-muted rounded overflow-hidden">
                                                            {/* Image placeholder */}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm">{item.product.name}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Order #{item.orderId.slice(-4)} • {item.qty} {item.product.unit}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-sm">{formatRupiah(item.price * item.qty)}</p>
                                                        <Badge variant="outline" className="text-xs">{item.order.status}</Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            ) : (
                /* BUYER VIEW */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="md:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profil {isBusiness ? "Bisnis" : "Personal"}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center text-center">
                                <Avatar className="h-24 w-24 mb-4 border-2 border-primary/20">
                                    <AvatarImage src={user.image || ""} />
                                    <AvatarFallback className="text-2xl">{user.name?.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                                <h2 className="text-xl font-bold">{user.name}</h2>
                                <p className="text-muted-foreground mb-4">{user.email}</p>

                                <div className="w-full space-y-2 text-left mt-4 border-t pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tipe Akun</span>
                                        <Badge variant={isBusiness ? "default" : "secondary"}>
                                            {isBusiness ? "BUSINESS" : "PERSONAL"}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Role</span>
                                        <Badge variant="outline">{user.role}</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Statistik Belanja</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                                        <ShoppingBag size={24} />
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Total Pesanan</p>
                                        <p className="font-bold text-xl">{buyerOrders.length}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
                                        <Package size={24} />
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Total Pengeluaran</p>
                                        <p className="font-bold text-xl">
                                            {formatRupiah(buyerOrders.reduce((acc, order) => acc + order.totalAmount, 0))}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order History */}
                    <div className="md:col-span-2">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Riwayat Pembelian</CardTitle>
                                <CardDescription>Transaksi yang Anda lakukan sebagai pembeli.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {buyerOrders.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <ShoppingBag className="mx-auto h-12 w-12 mb-3 opacity-20" />
                                        <p>Belum ada riwayat belanja.</p>
                                        <Button variant="link" asChild className="mt-2">
                                            <Link href="/katalog">Mulai Belanja</Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {buyerOrders.map((order) => (
                                            <div key={order.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                                                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                                                    <div>
                                                        <p className="font-semibold text-sm">Order #{order.id.slice(-6).toUpperCase()}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {new Date(order.createdAt).toLocaleDateString("id-ID", {
                                                                day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge className={
                                                            order.status === "PAID" ? "bg-green-500 hover:bg-green-600" :
                                                                order.status === "PENDING" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-500"
                                                        }>
                                                            {order.status}
                                                        </Badge>
                                                        <span className="font-bold">
                                                            {formatRupiah(order.totalAmount)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="flex justify-between text-sm items-center py-1 border-t pt-2 first:border-0 first:pt-0">
                                                            <div className="flex items-center gap-2">
                                                                <span>{item.product.name} <span className="text-muted-foreground">x{item.qty}</span></span>
                                                            </div>
                                                            <span>{formatRupiah(item.price * item.qty)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
