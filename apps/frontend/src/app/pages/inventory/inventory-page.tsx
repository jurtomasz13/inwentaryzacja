import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table"
import { Edit, Plus, Trash2, View } from "lucide-react"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../../components/ui/dialog"
import { DialogHeader } from "../../components/ui/dialog"
import { Inventory } from "@/api/inventories"
import { useInventoryMutations, useInventories } from "@/hooks/inventories"
import { InventoryForm, InventoryFormValues } from "@/app/components/forms/inventory-form"
import { Link } from "react-router-dom"

export function InventoryPage() {
    // State
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingInventory, setEditingRoom] = useState<Inventory | null>(null);

    // Queries
    const { data: inventories = [], isLoading, error } = useInventories();

    // Mutations
    const { createInventoryMutation, deleteInventoryMutation, updateInventoryMutation } = useInventoryMutations();

    // TODO: add EDIT feature
    const handleEdit = (room: Inventory) => {
        setIsDialogOpen(true)
        setEditingRoom(room);
    }

    const handleDelete = (id: string) => {
        deleteInventoryMutation.mutate(id);
    }

    const handleSubmit = (data: InventoryFormValues, isEditing: boolean) => {
        if (isEditing && editingInventory?.id) {
            updateInventoryMutation.mutate({ id: editingInventory.id, updates: data }, {
                onSettled: () => setIsDialogOpen(false)
            });
        } else {
            createInventoryMutation.mutate(data, {
                onSettled: () => setIsDialogOpen(false)
            });
        }
        setIsDialogOpen(false);
    }

    const handleOpen = () => {
        setEditingRoom(null);
    }

    const handleCancel = () => {
        setIsDialogOpen(false);
        setEditingRoom(null);
    }

    return (
        <div className="mb-6">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Zarządzanie Inwentaryzacją</h1>
                    <p className="text-xl mt-2 mb-6 font-semibold">Dodawaj i zarządzaj inwentaryzacją w swoim sklepie</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleOpen} className="self-end mb-6">
                            <Plus className="h-4 w-4 mr-2" />
                            Dodaj Inwentaryzację
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingInventory ? "Edytuj Inwentaryzację" : "Dodaj Nowe Pomieszczenie"}</DialogTitle>
                            <DialogDescription>
                                {editingInventory ? "Zaktualizuj informacje o inwentaryzacji" : "Wprowadź dane nowej inwentaryzacji"}
                            </DialogDescription>
                        </DialogHeader>

                        <InventoryForm editingInventory={editingInventory} onSubmit={handleSubmit} onCancel={handleCancel} />
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                <CardTitle>Lista Inwentaryzacji</CardTitle>
                <CardDescription>Wszystkie inwentaryzacje w systemie ({inventories.length})</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Nazwa</TableHead>
                            <TableHead>Data</TableHead>
                            {/* <TableHead>Status</TableHead> */}
                            <TableHead className="text-right">Akcje</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {inventories.map((inventory) => (
                            <TableRow key={inventory.id}>
                                <TableCell className="font-medium">{inventory.name}</TableCell>
                                {/* <TableCell></TableCell> */}
                                <TableCell>{new Date(inventory.createdAt).toLocaleDateString("pl-PL")}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Link to={`./${inventory.id}`}>
                                            <Button variant="outline" size="sm">
                                                <View className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(inventory)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(inventory.id)}>
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

export default InventoryPage;
