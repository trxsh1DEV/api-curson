import z from "zod";
import { FastifyTypedInstance } from "../types";
import { UserController } from "../controllers/userController";

const FILE_SIZE_LIMIT = 1 * 1024 * 1024; // 100MB

export async function Users(app: FastifyTypedInstance) {
  const userController = new UserController();

  app.get(
    "/users",
    {
      schema: {
        description: "List users",
        tags: ["users"],
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
            })
          ),
        },
      },
    },
    async (req, reply) => {
      const users = await userController.getUsers();
      reply.send(users);
    }
  );

  app.post(
    "/users",
    {
      schema: {
        description: "Create a user",
        tags: ["users"],
        body: z.object({
          firstName: z.string(),
          lastName: z.string(),
          email: z
            .string()
            .email({ message: "Invalid email" })
            .describe("User email"),
          country: z.string(),
          street: z.string(),
          city: z.string(),
          state: z.string(),
          zip: z.string(),
          // video: z
          //   .instanceof(File)
          //   .refine((file) => file.size <= FILE_SIZE_LIMIT, {
          //     message: `File size must be less than ${FILE_SIZE_LIMIT}`,
          //   }),
        }),
        response: {
          201: z
            .object({
              id: z.string().uuid().describe("User ID"),
            })
            .describe("User created"),
        },
      },
    },
    async (req, reply) => {
      const { firstName, lastName, email } = req.body;
      console.log(req.body);
      const newUser = userController.createUser({
        name: firstName + lastName,
        email,
      });
      reply.code(201).send(newUser);
    }
  );
}
