export const schema = {
  type: "object",
  required: ["SERVER_PORT", "SERVER_URL"],
  properties: {
    SERVER_PORT: {
      type: "string",
      default: 3333,
    },
    SERVER_URL: {
      type: "string",
      default: "http://localhost",
    },
  },
};

export const options = {
  confKey: "config",
  schema: schema,
  dotenv: true,
};
