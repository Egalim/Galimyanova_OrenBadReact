import { db } from "../db.js";
import fs from "fs";
import path from "path";

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

    async postProduct(req, res) {
        try {
            const { nameProduct, price, quantity, maker, category} = req.body;
            const img = req.files ? req.files.img : null;

            if (!img) {
                return res.status(400).json({ error: "No image uploaded" });
            }

            // Handle the image upload and store the file
            const imageName = `${Date.now()}_${img.name}`;
            const imagePath = `D:/REACT/OrenBadReact/server/img/${imageName}`;
            img.mv(imagePath, (err) => {
                if (err) {
                    console.error("Error saving image:", err);
                    return res.status(500).json({ error: "Error saving image" });
                }

                // Insert product data into the database
                db.query(
                    'INSERT INTO public."product" ( nameProduct, price, quantity, maker, category, img ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                    [ nameProduct, price, quantity, maker, category, imageName],
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

    async getProduct(req, res) {
        try {
            console.log("Connecting to the database...");
            const products = await db.query//('SELECT * FROM public."product"');
            ('SELECT public."product".*, public."maker"."nameMaker" AS "maker" FROM public."product" LEFT JOIN public."maker" ON public."product"."maker" = public."maker"."idMaker" ');
            res.status(200).json(products.rows);
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getProductId(req, res) {
        try {
            const { productId } = req.params;
            console.log("Connecting to the database...");
            const product = await db.query('SELECT public."product".*, public."maker"."nameMaker" AS "maker" FROM public."product" LEFT JOIN public."maker" ON public."product"."maker" = public."maker"."idMaker" WHERE product."productId" = $1', [productId]);
    
            if (product.rows.length === 0) {
                return res.status(404).json({ error: "Product not found" });
            }
    
            res.status(200).json(product.rows[0]);
        } catch (error) {
            console.error("Error fetching product:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export const OrenBadController = new OrenBadControllerClass();