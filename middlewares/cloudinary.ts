import path from "path";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { Request } from "express";
import { ICloudinaryFile } from "../utils/types";
import dotenv from "dotenv";

dotenv.config();

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});


// Create Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, file: ICloudinaryFile) => {
    const ext = path.extname(file.originalname).toLowerCase();
    let resourceType: "auto" | "raw" | "video" = "auto";
    
    if (ext === ".pdf" || ext === ".docx" || ext === ".xlsx" || ext === ".csv") {
      resourceType = "raw";
    } else if (ext === ".mp4" || ext === ".avi" || ext === ".mov") {
      resourceType = "video";
    }
    
    return {
      folder: "HackIt",
      public_id: `${Date.now()}_${file.originalname.split('.')[0]}`,
      resource_type: resourceType,
      allowed_formats: ["jpg", "jpeg", "png", "mp4", "avi", "mov", "pdf"],
      type: "upload"
    };
  },
});

// Create multer upload middleware
const upload = multer({ storage }).single("attachedFile");

export default upload;