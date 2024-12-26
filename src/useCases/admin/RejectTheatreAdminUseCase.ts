import { NotFoundError } from "../../domain/errors/NotFoundError";
import { ItheatreRepository } from "../../domain/interfaces/ITheatreRepository";
import { sendEmail } from "../../utils/emailUtils";

export class RejectTheatreAdminUseCase {
    constructor(
        private theatreRepository: ItheatreRepository,
    ) { }

    async execute(theatreId: string, reason: string) {
        const theatre = await this.theatreRepository.updateByTheatreId(theatreId, { status: "rejected", rejectionReason: reason });
        if (!theatre) {
            throw new NotFoundError("Theatre not found");
        }
        await sendEmail(theatre.email, "Theatre verification", `<div>Theatre Verification rejected</div>`)
    }
}