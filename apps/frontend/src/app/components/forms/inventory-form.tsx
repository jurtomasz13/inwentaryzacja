import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect } from "react";

const inventorySchema = z.object({
    date: z.date(),
    name: z.string().min(2, "Nazwa inwentaryzacji musi mieć co najmniej 2 znaki"),
});

export type InventoryFormValues = z.infer<typeof inventorySchema>;

type InventoryFormProps = {
    onSubmit: (data: InventoryFormValues, isEditing: boolean) => void;
    onCancel: () => void;
    editingInventory?: Partial<InventoryFormValues> | null;
}

export function InventoryForm({ editingInventory, onSubmit, onCancel }: InventoryFormProps) {
    const { register, handleSubmit, reset, formState: { errors }} = useForm<InventoryFormValues>({
        resolver: zodResolver(inventorySchema),
        defaultValues: editingInventory || { name: "" }
    });
    
    const isEditing = !!editingInventory;
    
    useEffect(() => {
        reset(editingInventory|| {});
    }, [editingInventory, reset]);
    
    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data, isEditing))} className="space-y-4">
            <div>
                <Label htmlFor="date">Data inwentaryzacji</Label>
                <Input id="date" placeholder="np. 13.11.2000" {...register("date")} />
                {errors.date && <span className="text-red-500">{errors.date.message}</span>}
            </div>

            <div>
                <Label htmlFor="description">Nazwa inwentaryzacji</Label>
                <Input id="description" placeholder="Inwentaryzacja nr. 1" {...register("name")} />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
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
