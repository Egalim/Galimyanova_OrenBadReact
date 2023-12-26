import pg from "pg"
export const db = new pg.Pool({
    user: "postgres",
    password: 'root',
    host: "localhost",
    port: 5432,
    database: "OrenBad"
})