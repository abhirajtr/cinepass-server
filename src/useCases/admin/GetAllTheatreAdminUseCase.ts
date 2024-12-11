import { ItheatreRepository } from "../../domain/interfaces/ITheatreRepository";

export class GetAllTheatreAdminUseCase {
    constructor(
        private theatreRepository: ItheatreRepository,
    ) { }

    async execute(searchTerm: string, status: string) {
        // Construct the query object dynamically
        const query: Record<string, any> = {};
        if (searchTerm) {
            query.name = { $regex: searchTerm, $options: 'i' };
        }
        switch (status) {
            case "pending":
                query.status = "pending";
                break;
            case "verified":
                query.status = "verified";
                break;
            case "rejected":
                query.status = "rejected";
                break;
            case "all":
            default:
                break;
        }

        return await this.theatreRepository.findAll(query);
    }
}