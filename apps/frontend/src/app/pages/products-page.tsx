import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table"
import { Edit, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../components/ui/dialog"
import { DialogHeader } from "../components/ui/dialog"
import { useCreateProduct, useDeleteProduct, useProducts, useUpdateProduct } from "@/hooks/products"
import { Product } from "@/api/products"
import { ProductForm, ProductFormValues } from "../components/forms/product-form"
import { useCategories } from "@/hooks/categories"
import { Unit } from ".prisma/client";

export function ProductsPage() {
    // State
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Queries
    const { data: products = [], isLoading: isLoadingProducts, error: errorProducts } = useProducts();
    const { data: categories = [], isLoading: isLoadingCategories, error: errorCategories } = useCategories();

    // Mutations
    const createProductMutation = useCreateProduct();
    const updateProductMutation = useUpdateProduct();
    const deleteProductMutation = useDeleteProduct();

    const handleEdit = (product: Product) => {
        setIsDialogOpen(true)
        setEditingProduct(product);
    }

    const handleDelete = (id: string) => {
        deleteProductMutation.mutate(id);
    }

    const getCategoryName = (categoryId: string) => {
        const category = categories.find((c) => c.id === categoryId)
        return category ? category.name : "Brak kategorii"
    }

    const getUnitName = (unit: Unit) => {
        const units: Record<Unit, string> = {
            LITER: "l",
            KILOGRAM: "kg",
            PIECE: "szt",
        };

        return units[unit];
    }

    const handleSubmit = (data: ProductFormValues, isEditing: boolean) => {
        if (isEditing && editingProduct?.id) {
            updateProductMutation.mutate({ id: editingProduct.id, updates: data }, {
                onSettled: () => setIsDialogOpen(false)
            });
        } else {
            createProductMutation.mutate(data, {
                onSettled: () => setIsDialogOpen(false)
            });
        }
    }

    const handleOpen = () => {
        setEditingProduct(null);
    }

    const handleCancel = () => {
        setIsDialogOpen(false);
        setEditingProduct(null);
    }

    return (
        <div className="mb-6">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Zarządzanie Produktami</h1>
                    <p className="text-xl mt-2 mb-6 font-semibold">Dodawaj i zarządzaj produktami w swoim sklepie</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleOpen} className="self-end mb-6">
                            <Plus className="h-4 w-4 mr-2" />
                            Dodaj Produkt
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingProduct ? "Edytuj Produkt" : "Dodaj Nowy Produkt"}</DialogTitle>
                            <DialogDescription>
                                {editingProduct ? "Zaktualizuj informacje o produkcie" : "Wprowadź dane nowego produktu"}
                            </DialogDescription>
                        </DialogHeader>

                        <ProductForm editingProduct={editingProduct} onSubmit={handleSubmit} onCancel={handleCancel} categories={categories}/>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                <CardTitle>Lista Produktów</CardTitle>
                <CardDescription>Wszystkie produkty w systemie ({products.length})</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Nazwa</TableHead>
                            <TableHead>Kod</TableHead>
                            <TableHead>Kategoria</TableHead>
                            <TableHead>Jednostka</TableHead>
                            <TableHead>Data dodania</TableHead>
                            <TableHead className="text-right">Akcje</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.code}</TableCell>
                                <TableCell>{getCategoryName(product.categoryId)}</TableCell>
                                <TableCell>{getUnitName(product.unit as Unit)}</TableCell>
                                <TableCell>{new Date(product.createdAt).toLocaleDateString("pl-PL")}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductsPage;
