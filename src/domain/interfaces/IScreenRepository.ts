import { Screen } from "../entities/Screen";

export interface IScreenRepository {
    createScreen(screen: Screen): Promise<Screen>;
    getAllScreens(theatreId: string): Promise<Screen[]>;
    getScreenById(screenId: string): Promise<Screen | null>;
}