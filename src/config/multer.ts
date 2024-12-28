import multer from "fastify-multer";
import crypto from "crypto";
import path from "path";

const FILE_SIZE_LIMIT = 50 * 1024 * 1024; // 50MB

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Get the file extension
    const fileExt = path.extname(file.originalname);
    // Generate random filename while preserving extension
    const uniqueFilename = crypto.randomBytes(16).toString("hex") + fileExt;
    cb(null, uniqueFilename);
  },
});

// Update the upload middleware with the storage configuration
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: FILE_SIZE_LIMIT, // 50MB limit from your existing code
  },
  fileFilter: function (req, file, cb) {
    // Check if the file is a video
    if (!file.mimetype.startsWith("video/")) {
      return cb(new Error("Invalid file type. Only video files are allowed."));
    }
    cb(null, true);
  },
});
