import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

// Conectar a base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    //console.log(colors.magenta.bold("Conexión exitosa a la base de datos"));
  } catch (e) {
    console.log(e);
    console.log(
      colors.red.bold("Hubo un error al conectar a la base de datos"),
    );
  }
}

connectDB();

const server = express();

server.use(express.json());
server.use("/api/products", router);

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
