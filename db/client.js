// connection to the db
import pg from "pg";

const {Client} = pg

let DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost:5432/luigis_pizzeria"

const client = new Client({connectionString:DATABASE_URL, ssl:process.env.NODE_ENV ==="production"? {rejectUnauthorized:false}:undefined})

export default client