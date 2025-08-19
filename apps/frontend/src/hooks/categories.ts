import { createCategory, deleteCategory, fetchCategory, fetchCategories, QUERY_KEY_CATEGORIES, updateCategory, type Category } from "@/api/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCategories = () => {
    return useQuery({ queryKey: QUERY_KEY_CATEGORIES, queryFn: fetchCategories });
};

export const useCategory = (id: string) => {
    return useQuery({ queryKey: [...QUERY_KEY_CATEGORIES, id], queryFn: () => fetchCategory(id) });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY_CATEGORIES }),
    })
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<Category> }) =>
        updateCategory(id, updates),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY_CATEGORIES }),
    })
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY_CATEGORIES }),
    })
};

export const useCategoryMutations = () => {
    return {
        createCategoryMutation: useCreateCategory(),
        updateCategoryMutation: useUpdateCategory(),
        deleteCategoryMutation: useDeleteCategory(),
    }
}
