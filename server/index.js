import express from "express";
import multer from "multer";
import cors from "cors";
import { sql } from "./db.js";
import { reg } from "./controllers/reg.js"
import { auth } from "./controllers/auth.js"
import { postController } from "./controllers/postController.js";
import { uploadFiles } from "./controllers/uploadFiles.js";
import jwt from "jsonwebtoken";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})


const upload = multer({ storage });
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.get('/category', async (req, res) => {
    const data = await sql`select * from Category `
    res.send(data)
})
app.get('/pharms', async (req, res) => {
    const data = await sql`select * from Pharm `
    res.send(data)
})

app.get('/products/:id/pharm', async (req, res) => {
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
});

app.get('/products/:productId/:pharmId/quantity', async (req, res) => {
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
});

app.get('/products', async (req, res) => {
    const data = await sql`SELECT * FROM Products 
    INNER JOIN Maker ON Products.makerid = Maker.id_maker
    INNER JOIN Category ON Products.categoryid = Category.id_cat`
    res.send(data)
})
app.get('/category/:id', async (req, res) => {
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
});


app.get('/product/:id', async (req, res) => {
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
})

app.post('/reg', reg)
app.post('/auth', auth)
app.post('/newproduct', upload.single("image"), uploadFiles);

app.post('/category', postController.postCategory)
app.post('/maker', postController.postMaker)

app.post('/add', async (req, res) => {
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
})

app.post('/basket', async (req, res) => { 
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
            console.log(item)
        } 
        res.status(200).send({ "items": products }); 
    } catch (error) { 
        res.status(401).send({ "message": "Error token" }); 
    } 
})

app.post('/update_quantity', async (req, res) => {
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
});

app.post('/basket_delete', async (req, res) => {
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
})

const start = async () => {
    await sql`create table if not exists Roles(
        id SERIAL PRIMARY KEY NOT NULL,
        role varchar(255) NOT NULL
    )`
    //await sql`insert into Roles (role) values ('USER'), ('PHARM'), ('ADMIN')`

    await sql`create table if not exists Users(
        id SERIAL PRIMARY KEY NOT NULL,
        name varchar(255) NOT NULL,
        tel varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        roleid INT NOT NULL,
        FOREIGN KEY (roleid) REFERENCES Roles(id)
    )`

    await sql`create table if not exists Category(
        id_cat SERIAL PRIMARY KEY NOT NULL,
        name_cat varchar(255) NOT NULL
    )`
    await sql`create table if not exists Maker(
        id_maker SERIAL PRIMARY KEY NOT NULL,
        name varchar(255) NOT NULL
    )`

    await sql`create table if not exists Pharm(
        id SERIAL PRIMARY KEY NOT NULL,
        name varchar(255) NOT NULL,
        is24 boolean NOT NULL,
        userid INT NOT NULL,
        FOREIGN KEY (userid) REFERENCES Users(id)
    )`
    await sql`create table if not exists Products(
        id SERIAL PRIMARY KEY NOT NULL,
        title varchar(255) NOT NULL,
        image varchar(255) NOT NULL,
        descript varchar(255) NOT NULL,
        price numeric NOT NULL,
        categoryid INT NOT NULL,
        makerid INT NOT NULL,
        FOREIGN KEY (categoryid) REFERENCES Category(id),
        FOREIGN KEY (makerid) REFERENCES Maker(id)
    )`
    await sql`create table if not exists Quantity(
        id SERIAL PRIMARY KEY NOT NULL,
        quantity INT NOT NULL,
        productid INT NOT NULL,
        pharmid INT NOT NULL,
        FOREIGN KEY (productid) REFERENCES Products(id),
        FOREIGN KEY (pharmid) REFERENCES Pharm(id)
    )`
    await sql`create table if not exists Basket(
        id SERIAL PRIMARY KEY NOT NULL,
        userid INT NOT NULL,
        FOREIGN KEY (userid) REFERENCES Users(id)
    )`
    await sql`create table if not exists Basket_Products(
        id SERIAL PRIMARY KEY NOT NULL,
        count INT NOT NULL,
        productid INT NOT NULL,
        pharmid INT NOT NULL,
        basketid INT NOT NULL,
        FOREIGN KEY (productid) REFERENCES Products(id),
        FOREIGN KEY (pharmid) REFERENCES Pharm(id),
        FOREIGN KEY (basketid) REFERENCES Basket(id)
    )`
    await sql`create table if not exists Statuses(
        id SERIAL PRIMARY KEY NOT NULL,
        status varchar(255) NOT NULL
    )`
    await sql`CREATE TABLE IF NOT EXISTS Orders (
        id SERIAL PRIMARY KEY NOT NULL,
        date TIMESTAMP WITH TIME ZONE DEFAULT timezone('Asia/Yekaterinburg', CURRENT_TIMESTAMP),
        userid INT NOT NULL,
        productid INT NOT NULL,
        pharmid INT NOT NULL,
        statusid INT NOT NULL,
        FOREIGN KEY (userid) REFERENCES Users(id),
        FOREIGN KEY (productid) REFERENCES Products(id),   
        FOREIGN KEY (pharmid) REFERENCES Pharm(id),
        FOREIGN KEY (statusid) REFERENCES Statuses(id)
    )`

    app.listen(8080, () => {
        console.log("ОН РАБОТАЕТ на порту 8080");
    })
}

start()