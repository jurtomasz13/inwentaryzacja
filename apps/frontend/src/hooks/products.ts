import { createProduct, deleteProduct, fetchProduct, fetchProducts, QUERY_KEY_PRODUCTS, updateProduct } from "@/api/products";
import { ProductFormValues } from "@/app/components/forms/product-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProducts = () => {
    return useQuery({ queryKey: QUERY_KEY_PRODUCTS, queryFn: fetchProducts });
};

export const useProduct = (id: string) => {
    return useQuery({ queryKey: [...QUERY_KEY_PRODUCTS, id], queryFn: () => fetchProduct(id) });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY_PRODUCTS }),
    })
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: ProductFormValues }) =>
        updateProduct(id, updates),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY_PRODUCTS }),
    })
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY_PRODUCTS }),
    })
};

export const useProductMutations = () => ({
    createProductMutation: useCreateProduct(),
    updateProductMutation: useUpdateProduct(),
    deleteProductMutation: useDeleteProduct(),
});
