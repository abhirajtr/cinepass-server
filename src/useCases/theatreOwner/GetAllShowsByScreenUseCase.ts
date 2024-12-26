import { IMovieRepository } from "../../domain/interfaces/IMovieRepository";
import { IShowRepository } from "../../domain/interfaces/IShowRepository";

interface Request {
    screenId: string;
    search: string | undefined;
    date: string | undefined;
}


export class GetAllShowsByScreenUseCase {
    constructor(
        private showRepository: IShowRepository,
    ) { }


    async execute(request: Request) {
        console.log(request);

        const query: { [key: string]: any } = { screenId: request.screenId };
        if (request.search) {
            query.movieTitle = { $regex: request.search, $options: 'i' };
        }
        if (request.date) {
            const startOfDay = new Date(request.date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(request.date);
            endOfDay.setHours(23, 59, 59, 999);

            query.startTime = { $gte: startOfDay, $lte: endOfDay };
        }
        return await this.showRepository.getShows(query);
    }
}