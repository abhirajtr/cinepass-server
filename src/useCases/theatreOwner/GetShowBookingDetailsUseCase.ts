import { IShowRepository } from "../../domain/interfaces/IShowRepository";

export class GetShowBookingDetailsUseCase {
    constructor(
        private showRepository: IShowRepository
    ) {}

    async execute(showId: string) {
        return await this.showRepository.findById(showId);
    }
}