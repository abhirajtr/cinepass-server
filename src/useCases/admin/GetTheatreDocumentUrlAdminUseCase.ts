import { getObjectURL } from "../../utils/s3Utils";

export class GetTheatreDocumentUrlAdminUseCase {
    async execute(verificationDocument: string): Promise<string> {
        return await getObjectURL(verificationDocument);
    }
}