import { IShowRepository } from "../../domain/interfaces/IShowRepository";

export class GetAllShowByScreenUseCase {
    constructor(
        private showRepository: IShowRepository,
    ) { }

    async execute(screenId: string) {
        return await this.showRepository.getAllShowsByScreenId(screenId);
    }
}