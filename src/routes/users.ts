import z from "zod";
import { FastifyTypedInstance } from "../types";
import { UserController } from "../controllers/userController";

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
          name: z.string(),
          email: z
            .string()
            .email({ message: "Invalid email" })
            .describe("User email"),
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
      const { name, email } = req.body;
      const newUser = userController.createUser({ name, email });
      reply.code(201).send(newUser);
    }
  );
}
