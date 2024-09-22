import { IPasswordHashingService } from "../../domain/interfaces/IPasswordHashingService";
import bcrypt from "bcrypt";

export class PasswordHashingService implements IPasswordHashingService {
    private saltRounds = 10;
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }
    async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }
}