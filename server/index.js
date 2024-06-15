import express from "express";
import multer from "multer";
import cors from "cors";
import { sql } from "./db.js";
import { reg } from "./controllers/reg.js"
import { auth } from "./controllers/auth.js"
// import { uploadFiles } from "./controllers/uploadFiles.js";
import { productController } from "./controllers/porducts.js";
import { profile } from "./controllers/profile.js";
import { basketOrderController } from "./controllers/basket_order.js";
// import { postController } from "./controllers/postController.js";


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

app.get('/category', productController.getCategory)
app.get('/category/:id', productController.getCategoryId);
app.get('/pharms',productController.getPharm)

app.get('/products', productController.getAllProduct)
app.get('/product/:id', productController.getProductId)
app.get('/products/:id/pharm', productController.getProductPharm);
app.get('/products/:productId/:pharmId/quantity', productController.getProductPharmQuantity);
app.get('/search', productController.Search);


app.post('/reg', reg)
app.post('/auth', auth)

// app.post('/newproduct', upload.single("image"), uploadFiles);
// app.post('/category', postController.postCategory)
// app.post('/maker', postController.postMaker)


app.post('/add', basketOrderController.AddProduct)
app.post('/basket', basketOrderController.getBasket)
app.post('/update_quantity', basketOrderController.UpdateQuantity);
app.post('/basket_delete', basketOrderController.DeleteBasket)
app.post('/order', basketOrderController.postOrder)

app.get('/getUserOrders/:id', basketOrderController.getUserOrders)
app.get('/getUserOrders/userOrder/:id', basketOrderController.getUserOrdersID)

   
app.get('/pharm/:id', profile.PharmProfileAll)
app.get('/pharm/:pharmId/:orderId/:id', profile.PharmProfile) 
app.get('/success/:orderid/:statusid', profile.PharmProfileSuccess)
app.get('/profile/:id', profile.getUserProfile)
app.put('/changeAccount/:id', profile.updateUserProfile)

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
    //await sql`insert into Statuses (status) values ('В ожидании'), ('Готов к получению'), ('Отклонён'), ('Получен')`

    await sql`CREATE TABLE IF NOT EXISTS Orders (
        id SERIAL PRIMARY KEY NOT NULL,
        date TIMESTAMP WITH TIME ZONE DEFAULT timezone('Asia/Yekaterinburg', CURRENT_TIMESTAMP),
        price numeric NOT NULL, 
        nameUser varchar(255) not null,
        telUser varchar(255) not null,
        userid INT NOT NULL,
        order_product_id INT NOT NULL,
        pharmid INT NOT NULL,
        statusid INT NOT NULL,  
        FOREIGN KEY (userid) REFERENCES Users(id),
        FOREIGN KEY (pharmid) REFERENCES Pharm(id),
        FOREIGN KEY (statusid) REFERENCES Statuses(id)
    )` 

    await sql`CREATE TABLE IF NOT EXISTS Orders_Product_Id (
        id SERIAL PRIMARY KEY NOT NULL,
        productid INT NOT NULL,
        count INT NOT NULL,
        key INT NOT NULL,
        FOREIGN KEY (productid) REFERENCES Products(id)
    )`

    app.listen(8080, () => {
        console.log("ОН РАБОТАЕТ на порту 8080");
    })
}

start()