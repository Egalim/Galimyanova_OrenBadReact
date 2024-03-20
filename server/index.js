import express from "express";
import multer from "multer";
import cors from "cors";
import { sql } from "./db.js";
import {reg} from "./controllers/reg.js"
import {auth} from "./controllers/auth.js"
import { postController } from "./controllers/postController.js";
import { uploadFiles } from "./controllers/uploadFiles.js";


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

app.get('/category', async (req,res) =>{
    const data = await sql`select * from Category `
    res.send(data)
})
app.get('/products', async (req, res) => {
    const id = req.params.id
    const data = await sql`SELECT * FROM Products 
    INNER JOIN Maker ON Products.makerid = Maker.id_maker
    INNER JOIN Category ON Products.categoryid = Category.id_cat`
    console.log(data);
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
    const data = await sql`select * from Products where id = ${id}`
    console.log(data);
    res.send(data)
})

app.post('/reg', reg)
app.post('/auth', auth)
app.post('/newproduct', upload.single("image"), uploadFiles);

app.post('/category', postController.postCategory)
app.post('/maker', postController.postMaker)

// app.post('/add', async (req, res) => {
//     const product_id = req.body.product_id
//     const count = req.body.count
//     // const user_id = req.body.user_id
//     const data = await sql`insert into basket_products (basketid, productid, count) VALUES (1, ${product_id}, ${count})`
//     res.send(data)
// })

// app.post('/select', async (req, res) => {
//     const product_id = req.body.product_id
//     const count = req.body.count
//     // const user_id = req.body.user_id
//     const data = await sql`insert into basket_products (basketid, productid, count) VALUES (1, ${product_id}, ${count})`
//     res.send(data)
// })
    
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
        basketid INT NOT NULL,
        FOREIGN KEY (productid) REFERENCES Products(id),
        FOREIGN KEY (basketid) REFERENCES Basket(id)
    )`
    await sql`create table if not exists Statuses(
        id SERIAL PRIMARY KEY NOT NULL,
        status varchar(255) NOT NULL
    )`
    await sql`create table if not exists Orders(
        id SERIAL PRIMARY KEY NOT NULL,
        userid INT NOT NULL,
        productid INT NOT NULL,
        pharmid INT NOT NULL,
        statusid INT NOT NULL,
        FOREIGN KEY (userid) REFERENCES Users(id),
        FOREIGN KEY (productid) REFERENCES Products(id),
        FOREIGN KEY (pharmid) REFERENCES Pharm(id),
        FOREIGN KEY (statusid) REFERENCES Statuses(id)
    )`
    await sql`create table if not exists Order_Products(
        id SERIAL PRIMARY KEY NOT NULL,
        count INT NOT NULL,
        productid INT NOT NULL,
        orderid INT NOT NULL,
        FOREIGN KEY (productid) REFERENCES Products(id),
        FOREIGN KEY (orderid) REFERENCES Orders(id)
    )`

    app.listen(8080, () => {
        console.log("ОН РАБОТАЕТ на порту 8080");
    })
}

start()