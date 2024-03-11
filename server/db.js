import postgres from "postgres";

export const sql = postgres({
    host:"localhost",
    port: 5432,
    db: "OrenBad",
    username: "postgres",
    password:"root"
})