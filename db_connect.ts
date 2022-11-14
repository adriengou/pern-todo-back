import {DB_PASSWORD, DB_USER, DB_HOST, DB_PORT, DB_NAME} from "./environment";
import {Pool} from "pg"


//connect to the database
export const pool = new Pool({
    user:DB_USER,
    password:DB_PASSWORD,
    host:DB_HOST,
    port:DB_PORT,
    database: DB_NAME
})