import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

export const WASABI_REGION = process.env.WASABI_REGION as string;
export const WASABI_ENDPOINT = process.env.WASABI_ENDPOINT as string;
export const WASABI_BUCKET_NAME = process.env.WASABI_BUCKET_NAME as string;

export const wasabiClient = new S3Client({
  region: WASABI_REGION,
  endpoint: WASABI_ENDPOINT,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.WASABI_SECRET_ACCESS_KEY as string,
  },
});

// تقدر تظل تستخدمه في أي مكان آخر (لتحميل ملفات، صور، الخ)
export async function generateSignedUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: WASABI_BUCKET_NAME,
    Key: key,
  });

  const signedUrl = await getSignedUrl(wasabiClient, command, {
    expiresIn,
  });

  return signedUrl;
}
