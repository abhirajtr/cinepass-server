import { Theatre } from "../domain/entities/Theatre";
import { IGetTheatresParams, ITheatreRepository } from "../domain/interfaces/ITheatreRepository";

export class GetTheatresUseCase {
    constructor(
        private theatreRepository: ITheatreRepository,
    ) { }

    async execute(searchTerm: string, verified: string, sortby: string, currentPage: number, limit: number): Promise<Theatre[]> {
        // const { searchTerm, filter, sort, skip, limit } = params;

        const query: any = {}
        if (verified === 'true') {
            query.isVerified = true;
        } else if (verified === 'false') {
            query.isVerified = false;
        }
        if (searchTerm !== "") {
            query.theatreName = { $regex: searchTerm, $options: 'i' };
        }

        const sortCriteria: any = {};
        const skip = (currentPage - 1) * limit;
        // if (sort) {
        //     sortCriteria[sort] = 1;  // Ascending order by the specified field
        // }
        console.log('query in usecase',query);
        

        const theatres = await this.theatreRepository.getTheatres(query, sortCriteria, skip, limit);

        return theatres;
    }

}