import { sql } from "../db.js"
import jwt from "jsonwebtoken";

class BasketOrderController{
    async AddProduct(req, res)  {
        const productId = req.body.productId
        const count = req.body.count
        const pharm = req.body.pharm
        const token = req.body.token
    
        try {
        const user = jwt.verify(token, "KEY")
        const userID = await sql`select id from basket where userid = ${user.id}`
        let vers = await sql`select * from basket_products WHERE productid = ${productId} and pharmid = ${pharm} and basketid = ${userID[0]["id"]}`
        if (vers[0]) {
            res.status(200).send({ "message": "Товар есть в корзине" });
        } else {
            await sql`insert into basket_products (basketid, productid, count, pharmid) VALUES (${userID[0]["id"]}, ${productId}, ${count}, ${pharm})`
            res.status(200).send({ "message": "Все добавленно" });
        }
        } catch (error) {
         res.status(401).send({"message":"Error token"});
        }
    }

    async getBasket (req, res)  { 
        const token = req.body.token 
        try { 
            let products = [] 
            const user = jwt.verify(token, "KEY") 
            const userID = await sql`select id from basket where userid = ${user.id}` 
            const data = await sql`select * FROM basket_products WHERE basketid = ${userID[0]["id"]}` 
     
            for (let index = 0; index < data.length; index++) { 
                const element = data[index]; 
                const pharm = await sql`select * FROM Pharm WHERE id = ${element.pharmid}` 
                const item = await sql`select   
                Products.id,  
                Products.title,  
                Products.image,  
                Products.descript,  
                Products.price,  
                Maker.name AS maker_name  
                FROM Products  
                INNER JOIN Maker ON Products.makerid = Maker.id_maker  
                WHERE id = ${element.productid}` 
                item[0]["pharm_name"] = pharm[0].name 
                item[0]["pharm_id"] = pharm[0].id 
                item[0]["count"] = element.count
                products.push(item[0]) 
            } 
            res.status(200).send({ "items": products }); 
        } catch (error) { 
            res.status(401).send({ "message": "Error token" }); 
        } 
    }

    async UpdateQuantity(req, res)  {
        const token = req.body.token; // Получаем токен из запроса
        const product_id = req.body.product_id; // Получаем идентификатор товара из запроса
        const new_quantity = req.body.new_quantity; // Получаем новое количество товара из запроса
        try {
            const user = jwt.verify(token, "KEY"); 
            const userID = user.id;
            const basket = await sql`SELECT * FROM Basket WHERE userid = ${userID}`;
            if (!basket[0]) {
                return res.status(401).send({ "message": "Пользователь не авторизован" });
            }
            const product = await sql`SELECT * FROM basket_products WHERE productid = ${product_id} AND basketid = ${basket[0].id}`;
            if (!product[0]) {
                return res.status(404).send({ "message": "Товар не найден в корзине пользователя" });
            }
            await sql`
                UPDATE basket_products 
                SET count = ${new_quantity} 
                WHERE productid = ${product_id} AND basketid = ${basket[0].id}`;
            res.status(200).send({ "message": "Количество товара успешно обновлено" });
        } catch (error) {
            console.error("Error updating quantity:", error);
            res.status(500).send({ "message": "Ошибка сервера" });
        }
    }

    async DeleteBasket (req, res)  {
        const token = req.body.token
        const product_id = req.body.product_id
        try {
            const user = jwt.verify(token, "KEY")
            const userID = await sql`select id from basket where userid = ${user.id}`
            await sql`DELETE FROM basket_products WHERE basketid = ${userID[0]["id"]} and productid = ${product_id}`
    
            res.status(200).send({ "message": "Товар удален" });
        } catch (error) {
            res.status(401).send({ "message": "Error token" });
        }
    }
}
export const basketOrderController = new BasketOrderController()