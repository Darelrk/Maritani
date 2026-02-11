
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Edit } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { deleteProduct } from "@/lib/actions";

export default async function SellerProductsPage() {
    const session = await auth();

    if (!session?.user || session.user.role !== "SELLER") {
        redirect("/dashboard");
    }

    const sellerProfile = await prisma.sellerProfile.findUnique({
        where: { userId: session.user.id },
        include: {
            products: {
                orderBy: { createdAt: "desc" }
            }
        }
    });

    if (!sellerProfile) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Profil Toko Belum Lengkap</CardTitle>
                        <CardDescription>Silakan lengkapi profil toko Anda terlebih dahulu.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    const products = sellerProfile.products;

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Produk Saya</h1>
                    <p className="text-muted-foreground">Kelola katalog produk toko Anda.</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/products/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Produk
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Foto</TableHead>
                                <TableHead>Nama Produk</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Harga</TableHead>
                                <TableHead>Stok</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                        Belum ada produk. Silakan tambah produk pertama Anda.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <div className="h-12 w-12 bg-muted rounded overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={product.images || "https://placehold.co/100"}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{product.category}</Badge>
                                        </TableCell>
                                        <TableCell>{formatRupiah(product.price)} / {product.unit}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell>
                                            <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                                                {product.stock > 0 ? "Aktif" : "Habis"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" disabled title="Edit Coming Soon">
                                                    <Edit className="h-4 w-4 text-muted-foreground" />
                                                </Button>
                                                <form action={deleteProduct}>
                                                    <input type="hidden" name="productId" value={product.id} />
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" type="submit">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </form>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
