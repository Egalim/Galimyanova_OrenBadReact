import { sql } from "../db.js"

class Profile{
    async PharmProfile(req, res) {
        const PharmId = req.params.id
        const data = await sql`select * from Pharm where userid = ${PharmId}`
        res.send(data)
    }

    async getUserProfile(req, res)  {
        const id = req.params.id
        const data = await sql`select * from Users where id = ${id}`
        res.send(data)
    }
}
export const profile = new Profile()