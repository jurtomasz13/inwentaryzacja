import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { Room } from "@/api/rooms";

const roomSchema = z.object({
    name: z.string().min(2, "Nazwa pomieszczenia musi mieć co najmniej 2 znaki"),
    description: z.string(),
});

export type RoomFormValues = z.infer<typeof roomSchema>;

type RoomFormProps = {
    onSubmit: (data: RoomFormValues, isEditing: boolean) => void;
    onCancel: () => void;
    editingRoom?: Partial<RoomFormValues> | null;
}

export function RoomForm({ editingRoom, onSubmit, onCancel }: RoomFormProps) {
    const { register, handleSubmit, reset, formState: { errors }} = useForm<RoomFormValues>({
        resolver: zodResolver(roomSchema),
        defaultValues: editingRoom || { name: "" }
    });
    
    const isEditing = !!editingRoom;
    
    useEffect(() => {
        reset(editingRoom|| {});
    }, [editingRoom, reset]);
    
    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data, isEditing))} className="space-y-4">
            <div>
                <Label htmlFor="name">Nazwa pomieszczenia</Label>
                <Input id="name" placeholder="np. Lada" {...register("name")} />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div>
                <Label htmlFor="description">Opis pomieszczenia</Label>
                <Input id="description" placeholder="np. Produkty wystawione na sklepie" {...register("description")} />
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </div>

            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Anuluj
                </Button>
                <Button type="submit">{isEditing ? "Zaktualizuj" : "Dodaj"}</Button>
            </div>
        </form>
    )
}
