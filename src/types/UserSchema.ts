import z from "zod";

export const UserSchemaResponse200 = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  country: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const UserSchemaResponse400 = z
  .object({
    message: z.string(),
    statusCode: z
      .number()
      .min(200, { message: "HTTP Status code minimum 200" })
      .max(512, { message: "HTTP Status code maximum 512" })
      .describe("HTTP Status Code"),
    error: z.string(),
  })
  .describe("Bad Request");

export const UserSchemaResponse404 = z
  .object({
    message: z.string().default("User not found"),
    statusCode: z
      .number()
      .min(200, { message: "HTTP Status code minimum 200" })
      .max(512, { message: "HTTP Status code maximum 512" })
      .default(404)
      .describe("HTTP Status Code"),
    error: z.string().default("Not Found"),
  })
  .describe("Not Found");
