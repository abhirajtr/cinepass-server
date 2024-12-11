import s3Client from "../config/s3ClientConfig";
import { GetObjectCommand, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const bucketName = process.env.AWS_BUCKET_NAME;


export const getObjectURL = async (key: string) => {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: `verification-docs/${key}`,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 5 });
    return url;
}

export const putObjectURL = async (filename: string, contentType: string) => {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: `verification-docs/${filename}`,
        ContentType: contentType,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    return url;
}

export const listObjects = async () => {
    const command = new ListObjectsV2Command({
        Bucket: bucketName,
    });
    const result = await s3Client.send(command);
    return result;
}

export const deleteObject = async (key: string) => {
    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
    });
    await s3Client.send(command);
}
