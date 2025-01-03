import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
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

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
};

server.use(morgan("dev"));
server.use(express.json());
server.use(cors(corsOptions));
server.use("/api/products", router);

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
