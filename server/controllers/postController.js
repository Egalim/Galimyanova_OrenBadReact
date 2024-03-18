import { sql } from "../db.js";

class PostController {
    async postCategory(req, res) {
        try {
            const { name } = req.body;
            await sql`INSERT INTO Category (name) VALUES (${name})`;
            res.json("done");
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async postMaker(req, res) {
        try {
            const { name } = req.body;
            await sql`INSERT INTO Maker (name) VALUES (${name})`;
            res.json("done");
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export const postController = new PostController();