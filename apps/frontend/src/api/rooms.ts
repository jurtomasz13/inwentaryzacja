import { RoomFormValues } from "@/app/components/forms/room-form";
import { api } from "@/lib/axios";

export type CreateRoom = {
    name: string;
    description: string;
}

export type UpdateRoom = CreateRoom;

export type Room = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

export const QUERY_KEY_ROOMS = ["rooms"] as const

export async function fetchRooms(): Promise<Room[]> {
    const res = await api.get<Room[]>("/room");
    return res.data;
}

export async function fetchRoom(id: string): Promise<Room> {
    const res = await api.get<Room>(`/room/${id}`);
    return res.data;
}

export async function createRoom(
    category: RoomFormValues
): Promise<Room> {
    const res = await api.post<Room>("/room", category)
    return res.data
}

export async function updateRoom(
    id: string,
    updates: Partial<RoomFormValues>
): Promise<Room> {
    const res = await api.patch<Room>(`/room/${id}`, updates)
    return res.data
}

export async function deleteRoom(id: string): Promise<{ success: boolean }> {
    const res = await api.delete<{ success: boolean }>(`/room/${id}`)
    return res.data
}
