import { sql } from "../db.js"

class Profile{
    async PharmProfileAll(req, res) {
        const userId = req.params.id
        const data = await sql`select 
        Pharm.id as id_pharm,
        Pharm.name as pharm_name,
        Orders.nameuser as nameuser,
        Orders.id as id_order,
        Orders.date as date_order,
        Orders.teluser as teluser,
        Orders.nameuser as nameuser,
        Orders.price as order_price,
        Statuses.status as status
        from Pharm 
        INNER JOIN Orders ON Pharm.id = Orders.pharmid 
        INNER JOIN Statuses ON Orders.statusid = Statuses.id 
        where Pharm.userid = ${userId}
        ORDER BY 
        CASE
        WHEN Statuses.status = 'В ожидании' THEN 1
        WHEN Statuses.status = 'Готов к получению' THEN 2
        WHEN Statuses.status = 'Отклонён' THEN 3
        WHEN Statuses.status = 'Получен' THEN 4
        ELSE 5
    END ASC,
        Orders.date DESC`

        const products = await sql`select
        Products.id as product_id,
        Products.title as product_title,
        Products.image as product_image,
        Products.price as product_price,
        Products.count as product_count
        from Orders  
        INNER JOIN orders_product_id ON Orders.order_product_id = orders_product_id.key 
        INNER JOIN Products ON orders_product_id.productid = Products.id 
        where Orders.pharmid = ${data[0].id_pharm} 
        GROUP BY Products.id`

        res.send({"data": data, "products": products})
    }
    async PharmProfile(req, res) {
        const Id = req.params.id
        const userId = req.params.pharmId; 
        const orderId = req.params.orderId; 
        console.log(userId, orderId);
        const data = await sql`select    
        Pharm.id as id_pharm,
        Pharm.name as pharm_name,
        Orders.nameuser as nameuser,
        Orders.id as id_order,
        Orders.date as date_order,
        Orders.teluser as teluser,  
        Orders.nameuser as nameuser,
        Orders.price as order_price,
        Statuses.status as status
        from Pharm 
        INNER JOIN Orders ON Pharm.id = Orders.pharmid 
        INNER JOIN Statuses ON Orders.statusid = Statuses.id 
        where Pharm.userid = ${Id}`;
        console.log(data);
    
        const products = await sql`select
        Products.id as product_id,
        Products.title as product_title,
        Products.image as product_image,
        Products.price as product_price,
        Orders_Product_Id.count as product_count
        from Orders  
        INNER JOIN orders_product_id ON Orders.order_product_id = orders_product_id.key 
        INNER JOIN Products ON orders_product_id.productid = Products.id 
        where Orders.pharmid = ${userId} and Orders.id = ${orderId}
        GROUP BY Products.id, Orders_Product_Id.count`;
      
        res.send({"data": data, "products": products});
    }

    async PharmProfileSuccess(req, res) {
        const status_id = req.params.statusid
        const order_id = req.params.orderid

        if(status_id == 3) {
          const stats = await sql`SELECT * FROM Orders 
          WHERE Orders.id = ${order_id}`;

          const product_stats = await sql`SELECT * FROM orders_product_id 
          WHERE orders_product_id.key = ${stats[0]['order_product_id']}`;

          for (let index = 0; index < product_stats.length; index++) {
            const item = product_stats[index];
            
            const product_quantity = await sql`
                    SELECT * FROM quantity
                    WHERE productid = ${item['productid']} and pharmid = ${stats[0]['pharmid']}`;

            const new_count = product_quantity[0]['quantity'] + item['count']

            await sql`
                    UPDATE quantity
                    SET quantity = ${new_count} 
                    WHERE productid = ${item['productid']} and pharmid = ${stats[0]['pharmid']}`;
          }
        }

        const products = await sql`Update Orders SET statusid = ${status_id} WHERE id = ${order_id}`
        res.send({"data": "test"})
    }

    async getUserProfile(req, res)  {
        const id = req.params.id
        const data = await sql`select * from Users where id = ${id}`
        res.send(data)
    }

    async updateUserProfile(req, res) {
        const id = req.params.id;
        const { name, tel } = req.body;
        try {
          await sql`
            UPDATE Users 
            SET name = ${name}, tel = ${tel}
            WHERE id = ${id}
          `;
          res.status(200).send({ message: "Профиль успешно обновлен" });
        } catch (error) {
          console.error("Ошибка при обновлении профиля:", error);
          res.status(500).send({ message: "Ошибка сервера при обновлении профиля" });
        }
      }
}
export const profile = new Profile()