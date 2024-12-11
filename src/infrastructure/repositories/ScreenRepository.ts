import { IScreenRepository } from "../../domain/interfaces/IScreenRepository";
import { Screen } from "../../domain/entities/Screen";
import { ScreenModel } from "../models/ScreenModel";

export class ScreenRepository implements IScreenRepository {
    async createScreen(screen: Screen): Promise<Screen> {
        const savedScreen = await ScreenModel.create(screen);
        return savedScreen.toObject() as Screen;
    }
    async getAllScreens(theatreId: string): Promise<Screen[]> {
        return await ScreenModel.find({ theatreId });
    }

    async getScreenById(screenId: string): Promise<Screen | null> {
        return await ScreenModel.findOne({ id: screenId });
    }
}