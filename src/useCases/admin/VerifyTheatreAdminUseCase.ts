import { ItheatreRepository } from "../../domain/interfaces/ITheatreRepository";

export class VerifyTheatreAdminUseCase {
    constructor(
        private theatreRepository: ItheatreRepository,
    ) { }

    async execute(theatreId: string) {
        await this.theatreRepository.updateByTheatreId(theatreId, { status: "verified" });
    }
}