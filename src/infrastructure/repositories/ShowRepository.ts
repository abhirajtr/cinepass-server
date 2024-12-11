import { Show } from "../../domain/entities/Show";
import { IShowRepository } from "../../domain/interfaces/IShowRepository";
import { ShowModel } from "../models/ShowModel";

export class ShowRepository implements IShowRepository {
    async createShow(show: Show): Promise<void> {
        console.log("data to save:", show);        
        await ShowModel.create(show);
    }
}