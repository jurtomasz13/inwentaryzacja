import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table"
import { Edit, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../components/ui/dialog"
import { DialogHeader } from "../components/ui/dialog"
import { CategoryForm } from "../components/forms/category-form"
import { useCategories, useCategoryMutations } from "@/hooks/categories"
import { Category } from "@/api/categories"
import { CategoryFormValues } from "../components/forms/category-form"

export function CategoriesPage() {
    // State
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    // Queries
    const { data: categories = [], isLoading, error } = useCategories();

    // Mutations
    const { createCategoryMutation, updateCategoryMutation, deleteCategoryMutation } = useCategoryMutations();

    const handleEdit = (category: Category) => {
        setIsDialogOpen(true)
        setEditingCategory(category);
    }

    const handleDelete = (id: string) => {
        deleteCategoryMutation.mutate(id);
    }

    const handleSubmit = (data: CategoryFormValues, isEditing: boolean) => {
        console.log('submit');
        if (isEditing && editingCategory?.id) {
            updateCategoryMutation.mutate({ id: editingCategory.id, updates: data }, {
                onSettled: () => setIsDialogOpen(false)
            });
        } else {
            createCategoryMutation.mutate(data, {
                onSettled: () => setIsDialogOpen(false)
            });
        }
    }

    const handleOpen = () => {
        setEditingCategory(null);
    }

    const handleCancel = () => {
        setIsDialogOpen(false);
        setEditingCategory(null);
    }

    return (
        <div className="mb-6">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Zarządzanie Kategoriami</h1>
                    <p className="text-xl mt-2 mb-6 font-semibold">Dodawaj i zarządzaj kategoriami w swoim sklepie</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleOpen} className="self-end mb-6">
                            <Plus className="h-4 w-4 mr-2" />
                            Dodaj Kategorię
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingCategory ? "Edytuj Kategorię" : "Dodaj Nową Kategorię"}</DialogTitle>
                            <DialogDescription>
                                {editingCategory ? "Zaktualizuj informacje o kategorii" : "Wprowadź dane nowej Kategorii"}
                            </DialogDescription>
                        </DialogHeader>

                        <CategoryForm editingCategory={editingCategory} onSubmit={handleSubmit} onCancel={handleCancel} />
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                <CardTitle>Lista Kategorii</CardTitle>
                <CardDescription>Wszystkie kategorie w systemie ({categories.length})</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Nazwa</TableHead>
                            {/* <TableHead>Opis</TableHead> */}
                            <TableHead>Data dodania</TableHead>
                            <TableHead className="text-right">Akcje</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                {/* <TableCell>{category.description}</TableCell> */}
                                <TableCell>{new Date(category.createdAt).toLocaleDateString("pl-PL")}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(category.id)}>
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

export default CategoriesPage;
