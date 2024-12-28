// filepath: src/routes/courses.ts
import z from "zod";
import { FastifyTypedInstance } from "../types";
import fs from "fs";
import path from "path";
import { upload } from "../config/multer";

const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

export async function Courses(app: FastifyTypedInstance) {
  app.post(
    "/courses",
    { preHandler: upload.single("file") },
    // {
    // schema: {
    //   description: "Create a new course",
    //   tags: ["courses"],
    //   body: z.object({
    //     video: z.any(),
    // .refine(
    //   (file) => {
    //     return file ? file.type === "file" : undefined;
    //     // return file ? file["0"] instanceof File : undefined;
    //   },
    //   {
    //     message: "Must be a valid file",
    //   }
    // )
    // .refine(
    //   (file) =>
    //     [
    //       "video/mp4",
    //       "video/webm",
    //       "video/ogg",
    //       "video/quicktime",
    //       "video/mpeg",
    //       "video/mpg",
    //       "video/avi",
    //       "video/m4v",
    //       "video/wmv",
    //       "video/ogm",
    //       "video/mov",
    //     ].includes(file.mimetype),
    //   {
    //     message:
    //       "Invalid file type. Only MP4, WEBM, OGG, Quicktime and others files are allowed.",
    //   }
    // ),
    //   }),
    //   response: {
    //     201: z
    //       .object({
    //         message: z.string(),
    //         filename: z.string(),
    //       })
    //       .describe("Video Added"),
    //     400: z
    //       .object({
    //         message: z.string(),
    //         statusCode: z
    //           .number()
    //           .min(200, { message: "HTTP Status code minimum 200" })
    //           .max(512, { message: "HTTP Status code maximum 512" })
    //           .describe("HTTP Status Code"),
    //         error: z.string(),
    //       })
    //       .describe("Bad Request"),
    //   },
    // },
    // },
    async (req: any, reply) => {
      console.log(req);
      const file = req.file;
      if (!file) {
        return reply.code(400).send({ error: "No file uploaded" });
      }

      const fileUrl = `/static/${file.filename}`;

      return {
        message: "File uploaded successfully",
        filename: file.filename,
        originalName: file.originalname,
        url: fileUrl,
        mimetype: file.mimetype,
        size: file.size,
      };
    }
  );
}
