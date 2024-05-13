import { sql } from "../db.js"
import jwt from "jsonwebtoken";

class BasketOrderController {
    async AddProduct(req, res) {
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
            res.status(401).send({ "message": "Error token" });
        }
    }

    async getBasket(req, res) {
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

    async UpdateQuantity(req, res) {
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

    async DeleteBasket(req, res) {
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

    async postOrder(req, res) {
        const token = req.body.token
        const { nameUser, telUser, totalPrice, userId, productId, pharmId, statusId, count } = req.body;
        try {
            const user = jwt.verify(token, "KEY");
            const userIDBasket = await sql`select id from basket where userid = ${user.id}`
            const now = new Date();

            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const number = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000

            for (let index = 0; index < productId.length; index++) {
                const element = productId[index];
                const count_product = count[index];
                console.log(element);
                await sql`
                    INSERT INTO orders_product_id (productid, count, key)
                    VALUES (${element}, ${count_product}, ${number}); `;
            }
            
            // Вставляем данные заказа в таблицу Orders
            const result = await sql`
                INSERT INTO Orders (date, price, nameUser, telUser, userid, order_product_id, pharmid, statusid)
                VALUES (${date}, ${totalPrice}, ${nameUser}, ${telUser}, ${userId}, ${number}, ${pharmId}, ${statusId})
                RETURNING id; `;
                 
            await sql`DELETE FROM basket_products WHERE basketid = ${userIDBasket[0]["id"]}`;

            res.status(200).send({ "message": "Заказ успешно оформлен", "orderId": result[0].id });
        } catch (error) {
            console.error("Error while placing order:", error);
            res.status(500).send({ "message": "Ошибка сервера при оформлении заказа" });
        }
    }

    async getUserOrders(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1]; // Извлекаем токен из заголовка Authorization
            const user = jwt.verify(token, "KEY");
            const id = req.params.id;
            const data = await sql`
            SELECT 
            Orders.id,
            Orders.date,
            Orders.price,
            Orders.nameUser,
            Orders.telUser,
            Orders.order_product_id,
            Pharm.name as pharm_name,
            Statuses.status as status_name
        FROM Orders
        INNER JOIN Pharm ON Orders.pharmid = Pharm.id
        INNER JOIN Statuses ON Orders.statusid = Statuses.id
        WHERE Orders.userid = ${id}
        ORDER BY Orders.date DESC`;
            // Отправляем данные о заказах обратно в клиентский интерфейс
        res.status(200).send({ "order": data });
        } catch (error) {
            console.error("Error getting user orders:", error);
            res.status(500).send({ "message": "Ошибка сервера при получении заказов пользователя" });
        }
    }
    async getUserOrdersID(req, res) {
        try {
            const id = req.params.id;
            const data = await sql`
            SELECT
            count,
            Orders.id as id_order,
            Orders.date as date_order,
            Orders.price as price_order,
            Orders.nameuser as nameuser_order,
            Products.price as product_price,
            Products.title AS product_name, 
            Products.image AS product_image, 
            Maker.name AS maker_name, 
            Pharm.name AS pharm_name, 
            Statuses.status AS status_name
        FROM Orders
        INNER JOIN orders_product_id ON Orders.order_product_id = orders_product_id.key 
        INNER JOIN Products ON orders_product_id.productid = Products.id 
        INNER JOIN Maker ON Products.makerid = Maker.id_maker 
        INNER JOIN Pharm ON Orders.pharmid = Pharm.id 
        INNER JOIN Statuses ON Orders.statusid = Statuses.id 
        WHERE orders_product_id.key = ${id}
        ORDER BY Orders.date DESC;`;

            // Отправляем данные о заказах обратно в клиентский интерфейс
            res.status(200).send(data);
            console.log(data);
        } catch (error) {
            console.error("Error getting user orders:", error);
            res.status(500).send({ "message": "Ошибка сервера при получении заказов пользователя" });
        }
    }
}
export const basketOrderController = new BasketOrderController()