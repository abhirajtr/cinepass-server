import { IShowRepository } from "../../domain/interfaces/IShowRepository";
import { ShowModel } from "../../infrastructure/models/ShowModel";

export class GetSeatLayoutUseCase {
    constructor(
        private showRepository: IShowRepository,
    ) {}

    async execute(showId: string) {
        return await ShowModel.findOne({showId})
        .populate({
            path: "theatreId",
            select: "name latitude longitude city",
            localField: "theatreId",
            foreignField: "theatreId",
            model: "theatre",
        })
    }
}