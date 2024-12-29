import { exit } from "node:process";
import db from "../config/db";

async function clearDB() {
  try {
    await db.sync({ force: true });
    console.log("Datos eliminados correctamente");
    exit(0);
  } catch (e) {
    console.log(e);
    exit(1);
  }
}

if (process.argv[2] == "--clear") {
  clearDB();
}
