const { parse } = require("pg-connection-string");
 
module.exports = ({ env }) => {
  const { host, port, database, user, password } = parse(env("DATABASE_URL"));
 
  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "postgres",
          host,
          port,
          database,
          username: user,
          password,
          ssl: {
            // For self-signed certificates
            rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false), 
          },
          options: {
            ssl: true,
          },
        },
      },
    },
  };
};