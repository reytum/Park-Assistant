"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbName = "park_assistant_db";
const dbUser = process.env.PG_USERNAME || "admin";
const dbPassword = process.env.PG_PASSWORD || "StrongPass";
const dbHost = process.env.PG_HOST || "localhost";
const dbPort = process.env.PG_PORT || 5432;
const logging = process.env.PG_LOGGING || true;
const environment = process.env.env || "dev";
console.log(`Using environment: ${environment}`);
const sequelizeConnection = new sequelize_1.Sequelize({
    dialect: "postgres",
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    logging: console.log,
});
exports.default = sequelizeConnection;
//# sourceMappingURL=config.js.map