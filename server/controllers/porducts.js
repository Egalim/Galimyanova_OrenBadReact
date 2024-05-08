import { sql } from "../db.js"

class ProductController {
    async getCategory(req, res) {
        const data = await sql`select * from Category ORDER BY name_cat ASC `
        res.send(data)
    }

    async getPharm(req, res) {
        const data = await sql`select * from Pharm `
        res.send(data)
    }

    async getProductPharm(req, res) {
        const productId = req.params.id;
        try {
            const data = await sql`
                SELECT  Pharm.id AS pharm_id,  Pharm.name AS pharm_name, Quantity.quantity
                FROM Products 
                INNER JOIN Quantity ON Products.id = Quantity.productid
                INNER JOIN Pharm ON Quantity.pharmid = Pharm.id
                WHERE Products.id = ${productId} 
                AND Quantity.quantity > 0`;

            if (data.length === 0) {
                res.status(404).json({ error: 'Товар не найден или его нет в наличии в аптеках' });
            } else {
                res.json(data);
            }
        } catch (error) {
            console.error('Error getting product with pharmacies:', error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async getProductPharmQuantity(req, res) {
        const productId = req.params.productId;
        const pharmId = req.params.pharmId;
        try {
            const data = await sql`
                SELECT Quantity.quantity
                FROM Quantity
                WHERE Quantity.productid = ${productId} 
                AND Quantity.pharmid = ${pharmId}`;

            if (data.length === 0) {
                res.status(404).json({ error: 'Товар не найден или его нет в наличии в данной аптеке' });
            } else {
                res.json(data[0]); // Возвращаем только количество товара
            }
        } catch (error) {
            console.error('Error getting product quantity in pharmacy:', error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async getAllProduct(req, res) {
        const data = await sql`SELECT * FROM Products 
        INNER JOIN Maker ON Products.makerid = Maker.id_maker
        INNER JOIN Category ON Products.categoryid = Category.id_cat`
        res.send(data)
    }

    async getProductId(req, res) {
        const id = req.params.id
        const data = await sql` SELECT 
        Products.id, 
        Products.title, 
        Products.image, 
        Products.descript, 
        Products.price, 
        Maker.name AS maker_name 
    FROM Products 
    INNER JOIN Maker ON Products.makerid = Maker.id_maker where id = ${id}`
        res.send(data)
    }

    async getCategoryId(req, res) {
        const categoryId = req.params.id;
        try {
            // Выполнить SQL-запрос для выбора продуктов из указанной категории
            const data = await sql`select * from Products INNER JOIN Category ON Products.categoryid = Category.id_cat WHERE Category.id_cat = ${categoryId}`;
            // Отправить данные клиенту
            res.send(data);
        } catch (error) {
            // Обработать возможные ошибки
            console.error('Ошибка при получении продуктов по категории:', error);
            res.status(500).send('Ошибка сервера');
        }
    }

    async Search(req, res)  {
        const searchTerm = req.query.term; // Получаем поисковый запрос из параметров запроса
        try {
            // Выполнить SQL-запрос для поиска продуктов
            const data = await sql`
                SELECT * 
                FROM Products 
                WHERE title ILIKE ${`%${searchTerm}%`}`; // Поиск по названию товара (можно также добавить поиск по другим полям)
            // Отправить данные клиенту
            res.send(data);
        } catch (error) {
            // Обработать возможные ошибки
            console.error('Ошибка при выполнении поиска продуктов:', error);
            res.status(500).send('Ошибка сервера');
        }
    }
}

export const productController = new ProductController()