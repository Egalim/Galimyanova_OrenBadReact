import { db } from "../db.js";
import fs from "fs";

class OrenBadControllerClass {
    async getCategory(req, res) {
        try {
            console.log("Connecting to the database...");
            const category = await db.query('SELECT * FROM public."category"');
            res.status(200).json(category.rows);
        } catch (error) {
            console.error("Error fetching category:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getPharmacy(req, res) {
        try {
            console.log("Connecting to the database...");
            const category = await db.query('SELECT * FROM public."pharmacy" ORDER BY "namePharmacy"');
            res.status(200).json(category.rows);
        } catch (error) {
            console.error("Error fetching category:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async uploadProduct(req, res) {
        try {
            const { name, description, price } = req.body;
            const image = req.files ? req.files.image : null;

            if (!image) {
                return res.status(400).json({ error: "No image uploaded" });
            }

            // Handle the image upload and store the file
            const imageName = `${Date.now()}_${image.name}`;
            const imagePath = `path/to/your/image/directory/${imageName}`;
            image.mv(imagePath, (err) => {
                if (err) {
                    console.error("Error saving image:", err);
                    return res.status(500).json({ error: "Error saving image" });
                }

                // Insert product data into the database
                db.query(
                    'INSERT INTO products (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *',
                    [name, description, price, imageName],
                    (error, result) => {
                        if (error) {
                            console.error("Error inserting product:", error);
                            return res.status(500).json({ error: "Error inserting product into the database" });
                        }

                        // Remove the image from the server if needed (optional)
                        fs.unlinkSync(imagePath);

                        res.json({ success: true, product: result.rows[0] });
                    }
                );
            });
        } catch (error) {
            console.error("Error handling product upload:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export const OrenBadController = new OrenBadControllerClass();