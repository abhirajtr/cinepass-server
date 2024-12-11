import { ItheatreRepository } from "../../domain/interfaces/ITheatreRepository";

export class RejectTheatreAdminUseCase {
    constructor(
        private theatreRepository: ItheatreRepository,
    ) { }

    async execute(theatreId: string, reason: string) {
        await this.theatreRepository.updateByTheatreId(theatreId, { status: "rejected", rejectionReason: reason });
    }
}