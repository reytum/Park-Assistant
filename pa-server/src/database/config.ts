import { Sequelize } from "sequelize";

const dbName = "park_assistant_db"
const dbUser = process.env.PG_USERNAME as string || "admin"
const dbPassword = process.env.PG_PASSWORD || "StrongPass"
const dbHost = process.env.PG_HOST || "localhost"
const dbPort = process.env.PG_PORT as unknown as number || 5432
const logging = process.env.PG_LOGGING as unknown as boolean || true
const environment = process.env.env || "dev"
const testStorage = environment === "test" ? ":memory:" : null

console.log(`Using environment: ${environment}`)

const sequelizeConnection = new Sequelize({
    dialect: "postgres",
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    logging: null,
    //storage: ":memory:" //UnComment for test
});

export default sequelizeConnection