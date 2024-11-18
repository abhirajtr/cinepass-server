import { ITheatreOwnerRepository } from "../../domain/interfaces/ITheatreOwnerRepository";

export class ToggleBlockTheatreOwnerAdminUseCase {
    constructor(
        private theatreOwnerRepository: ITheatreOwnerRepository,
    ) { }

    async execute(userId: string, blockStatus: boolean) {
        await this.theatreOwnerRepository.updateById(userId, { isBlocked: blockStatus });
    }
}