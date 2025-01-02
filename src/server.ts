import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { Users } from "./routes/users";
import { Courses } from "./routes/courses";
import path from "path";
import fastifyEnv from "@fastify/env";
import { options } from "./config/env";

async function bootstrap() {
  const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // Register env plugin first
  await app.register(fastifyEnv, options);

  // Register db plugin

  // Register plugins
  await app.register(fastifyCors, { origin: "*" });
  await app.register(require("@fastify/multipart"));
  await app.register(require("@fastify/static"), {
    root: path.join(__dirname, "..", "uploads"),
    prefix: "/static/",
  });

  // Register Swagger
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Typed API",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });
  await app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });

  // Register routes
  await app.register(Users);
  await app.register(Courses);

  try {
    await app.listen({ port: Number(app.config.SERVER_PORT) });
    console.log(
      `Server is running on ${app.config.SERVER_URL}:${app.config.SERVER_PORT}`
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

bootstrap();
