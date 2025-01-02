import z from "zod";
import { FastifyTypedInstance } from "../types";
import { UserController } from "../controllers/UserController";
import {
  UserSchemaResponse200,
  UserSchemaResponse404,
} from "../types/UserSchema";

export async function Users(app: FastifyTypedInstance) {
  const userController = new UserController();

  app.get(
    "/users",
    {
      schema: {
        description: "List users",
        tags: ["users"],
        response: {
          200: z.array(UserSchemaResponse200),
        },
      },
    },
    async (req, reply) => {
      const users = await userController.getUsers();
      reply.code(200).send(users);
    }
  );

  app.get(
    "/users/:id",
    {
      schema: {
        description: "Get a user by ID",
        tags: ["users"],
        params: z.object({
          id: z.string().transform((val) => parseInt(val, 10)),
        }),
        response: {
          200: UserSchemaResponse200,
          404: UserSchemaResponse404,
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      const user = await userController.getUserById(id);
      if (user) {
        reply.code(200).send(user);
      } else {
        reply.code(404).send(UserSchemaResponse404.parse({}));
      }
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
        }),
        response: {
          201: z
            .object({
              id: z.number().describe("User ID"),
            })
            .describe("User created"),
        },
      },
    },
    async (req, reply) => {
      const { firstName, lastName, email, country, street, city, state, zip } =
        req.body;
      const newUser = await userController.createUser({
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email,
        country,
        street,
        city,
        state,
        zip,
      });
      reply.code(201).send(newUser);
    }
  );

  app.patch(
    "/users/:id",
    {
      schema: {
        description: "Update a user",
        tags: ["users"],
        params: z.object({
          id: z.string().transform((val) => parseInt(val, 10)),
        }),
        body: z.object({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          email: z.string().email({ message: "Invalid email" }).optional(),
          country: z.string().optional(),
          street: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          zip: z.string().optional(),
        }),
        response: {
          200: UserSchemaResponse200,
          404: UserSchemaResponse404,
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      const updatedUser = await userController.updateUser(id, req.body);
      if (updatedUser) {
        reply.code(200).send(updatedUser);
      } else {
        reply.code(404).send(UserSchemaResponse404.parse({}));
      }
    }
  );

  app.delete(
    "/users/:id",
    {
      schema: {
        description: "Delete a user",
        tags: ["users"],
        params: z.object({
          id: z.string().transform((val) => parseInt(val, 10)),
        }),
        response: {
          200: UserSchemaResponse200,
          404: UserSchemaResponse404,
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      const deletedUser = await userController.deleteUser(id);
      if (deletedUser) {
        reply.code(200).send(deletedUser);
      } else {
        reply.code(404).send(UserSchemaResponse404.parse({}));
      }
    }
  );
}
