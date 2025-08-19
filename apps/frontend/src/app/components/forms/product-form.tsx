import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect } from "react";
import { Category } from "@/api/categories";

const productSchema = z.object({
  name: z.string().min(2, "Nazwa produktu musi mieć co najmniej 2 znaki"),
  code: z.string().min(1, "Kod produktu jest wymagany"),
  unit: z.string().min(1, "Jednostka jest wymagana"),
  categoryId: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

type ProductFormProps = {
    editingProduct?: Partial<ProductFormValues> | null;
    categories: Category[],
    onSubmit: (data: ProductFormValues, isEditing: boolean) => void;
    onCancel: () => void;
}

export function ProductForm({ editingProduct, categories, onSubmit, onCancel }: ProductFormProps) {
    const { control, register, handleSubmit, reset, formState: { errors }} = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: editingProduct || { name: "", code: "", unit: "", categoryId: "" }
    });
    
    const isEditing = !!editingProduct;
    const units = [
        { id: "KILOGRAM", name: "KILOGRAMY" },
        { id: "PIECE", name: "SZTUKI"},
        { id: "LITER", name: "LITRY"},
    ];
    
    useEffect(() => {
        reset(editingProduct || {});
    }, [editingProduct, reset]);
    
    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data, isEditing ))} className="space-y-4">
            <div>
                <Label htmlFor="name">Nazwa produktu</Label>
                <Input id="name" placeholder="np. Mięso wołowe" {...register("name")} />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div>
                <Label htmlFor="code">Kod produktu</Label>
                <Input id="code" placeholder="np. MEAT001" {...register("code")} />
                {errors.code && <span className="text-red-500">{errors.code.message}</span>}
            </div>

            <div>
                <Label htmlFor="unit">Jednostka</Label>
                <Controller
                    name="unit"
                    control={control}
                    rules={{ required: "Wybierz jednostkę" }}
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                        <SelectTrigger>
                            <SelectValue placeholder="Wybierz jednostkę" />
                        </SelectTrigger>
                        <SelectContent>
                            {units.map((unit) => (
                                <SelectItem key={unit.id} value={unit.id} className="cursor-pointer">
                                    {unit.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    )}
                />
                {errors.unit && <span className="text-red-500">{errors.unit.message}</span>}
            </div>

            <div>
                <Label htmlFor="category">Kategoria</Label>
                <Controller
                    name="categoryId"
                    control={control}
                    rules={{ required: "Wybierz kategorię" }}
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                        <SelectTrigger>
                            <SelectValue placeholder="Wybierz kategorię" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id} className="cursor-pointer">
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    )}
                />
                {errors.unit && <span className="text-red-500">{errors.unit.message}</span>}
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
