import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const WASABI_REGION = process.env.WASABI_REGION;
const WASABI_ENDPOINT = process.env.WASABI_ENDPOINT;
const WASABI_BUCKET_NAME = process.env.WASABI_BUCKET_NAME;

const wasabiClient = new S3Client({
  region: WASABI_REGION,
  endpoint: WASABI_ENDPOINT,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.WASABI_SECRET_ACCESS_KEY as string,
  },
});

export async function generateSignedUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: WASABI_BUCKET_NAME,
    Key: key,
  });

  const signedUrl = await getSignedUrl(wasabiClient, command, {
    expiresIn: expiresIn,
  });

  return signedUrl;
}
