import { createRoom, deleteRoom, fetchRoom, fetchRooms, QUERY_KEY_ROOMS, updateRoom, type Room } from "@/api/rooms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRooms = () => {
    return useQuery({ queryKey: QUERY_KEY_ROOMS, queryFn: fetchRooms });
};

export const useRoom = (id: string) => {
    return useQuery({ queryKey: [...QUERY_KEY_ROOMS, id], queryFn: () => fetchRoom(id) });
};

export const useCreateRoom = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createRoom,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY_ROOMS }),
    })
};

export const useUpdateRoom = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<Room> }) =>
        updateRoom(id, updates),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY_ROOMS }),
    })
};

export const useDeleteRoom = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteRoom,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY_ROOMS }),
    })
};

export const useRoomMutations = () => {
    return {
        createRoomMutation: useCreateRoom(),
        updateRoomMutation: useUpdateRoom(),
        deleteRoomMutation: useDeleteRoom(),
    }
}
