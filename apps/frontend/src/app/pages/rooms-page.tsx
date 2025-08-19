import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table"
import { Edit, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../components/ui/dialog"
import { DialogHeader } from "../components/ui/dialog"
import { Room } from "@/api/rooms"
import { RoomForm, RoomFormValues } from "../components/forms/room-form"
import { useRoomMutations, useRooms } from "@/hooks/rooms"

export function RoomsPage() {
    // State
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);

    // Queries
    const { data: rooms = [], isLoading, error } = useRooms();

    // Mutations
    const { createRoomMutation, updateRoomMutation, deleteRoomMutation } = useRoomMutations();

    const handleEdit = (room: Room) => {
        setIsDialogOpen(true)
        setEditingRoom(room);
    }

    const handleDelete = (id: string) => {
        deleteRoomMutation.mutate(id);
    }

    const handleSubmit = (data: RoomFormValues, isEditing: boolean) => {
        if (isEditing && editingRoom?.id) {
            updateRoomMutation.mutate({ id: editingRoom.id, updates: data }, {
                onSettled: () => setIsDialogOpen(false)
            });
        } else {
            createRoomMutation.mutate(data, {
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
                    <h1 className="text-3xl font-bold">Zarządzanie Pomieszczeniami</h1>
                    <p className="text-xl mt-2 mb-6 font-semibold">Dodawaj i zarządzaj pomieszczeniami w swoim sklepie</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleOpen} className="self-end mb-6">
                            <Plus className="h-4 w-4 mr-2" />
                            Dodaj Pomieszczenie
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingRoom ? "Edytuj Pomieszczenie" : "Dodaj Nowe Pomieszczenie"}</DialogTitle>
                            <DialogDescription>
                                {editingRoom ? "Zaktualizuj informacje o pomieszczeniu" : "Wprowadź dane nowego pomieszczeenia"}
                            </DialogDescription>
                        </DialogHeader>

                        <RoomForm editingRoom={editingRoom} onSubmit={handleSubmit} onCancel={handleCancel} />
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                <CardTitle>Lista Pomieszczeń</CardTitle>
                <CardDescription>Wszystkie pomieszczenia w systemie ({rooms.length})</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Nazwa</TableHead>
                            <TableHead>Opis</TableHead>
                            <TableHead>Data dodania</TableHead>
                            <TableHead className="text-right">Akcje</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {rooms.map((room) => (
                            <TableRow key={room.id}>
                                <TableCell className="font-medium">{room.name}</TableCell>
                                <TableCell>{room.description}</TableCell>
                                <TableCell>{new Date(room.createdAt).toLocaleDateString("pl-PL")}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(room)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(room.id)}>
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

export default RoomsPage;
