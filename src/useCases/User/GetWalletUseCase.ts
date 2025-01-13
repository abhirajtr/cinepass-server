import { IWalletRepository } from "../../domain/interfaces/IWalletRepository";

export class GetWalletUseCase {
    constructor(
        private walletRepository: IWalletRepository,
    ) { }

    async execute(userId: string) {
        const wallet = await this.walletRepository.findByUserId(userId);
        if (!wallet) {
            return {
                userId,
                balance: 0,
                transaction: []
            }
        }
        return wallet;
    }
}