import { api } from "@/lib/axios";
import type { Unit } from ".prisma/client";

export type CreateCategory = {
    name: string;
    code: string;
    unit: Unit;
    categoryId: string;
}

export type UpdateCategory = CreateCategory;

export type Category = {
    id: string;
    name: string;
    // description: string;
    createdAt: string;
}

export const QUERY_KEY_CATEGORIES = ["categories"] as const

export async function fetchCategories(): Promise<Category[]> {
    const res = await api.get<Category[]>("/category");
    return res.data;
}

export async function fetchCategory(id: string): Promise<Category> {
    const res = await api.get<Category>(`/category/${id}`);
    return res.data;
}

export async function createCategory(
    category: Omit<Category, "id" | "createdAt">
): Promise<Category> {
    const res = await api.post<Category>("/category", category)
    return res.data
}

export async function updateCategory(
    id: string,
    updates: Partial<Omit<Category, "id" | "createdAt">>
): Promise<Category> {
    const res = await api.patch<Category>(`/category/${id}`, updates)
    return res.data
}

export async function deleteCategory(id: string): Promise<{ success: boolean }> {
    const res = await api.delete<{ success: boolean }>(`/category/${id}`)
    return res.data
}
