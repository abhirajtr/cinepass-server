import { Show } from "../entities/Show";

export interface IShowRepository {
    createShow(show: Show): Promise<void>;
    getAllShowsByScreenId(screenId: string): Promise<Show[]>
}