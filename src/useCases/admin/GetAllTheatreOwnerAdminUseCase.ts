import { ITheatreOwnerRepository } from "../../domain/interfaces/ITheatreOwnerRepository";

export class GetAllTheatreOwnersAdminUseCase {
    constructor(
        private theatreOwnerRepository: ITheatreOwnerRepository,
    ) { }

    async execute(search: string, status: string, usersPerPage: number, currentPage: number) {
        console.log("search:", search, "status:", status, usersPerPage, currentPage);
        const skip = (currentPage - 1) * usersPerPage;
        const query: any = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
            ]
        }
        if (status !== "all" || "") {
            if (status === "active") query.isBlocked = false;
            if (status === "blocked") query.isBlocked = true;
        }
        const [users, totalUsers] = await Promise.all([
            this.theatreOwnerRepository.findAll(query, skip, usersPerPage),
            this.theatreOwnerRepository.findAllCount(query)
        ]);
        return { users, totalUsers };
    }
}