import express from "express";
import multer from "multer";
import cors from "cors";
import { sql } from "./db.js";


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
app.use(express.static('punlic'))

const start = async () => {
    await sql`create table if not exists Roles(
        id SERIAL PRIMARY KEY NOT NULL,
        role varchar(255) NOT NULL
    )`
    //await sql`insert into Roles (role) values ('USER'), ('PHARM')`

    await sql`create table if not exists Users(
        id SERIAL PRIMARY KEY NOT NULL,
        name varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        roleid INT NOT NULL,
        FOREIGN KEY (roleid) REFERENCES Roles(id)
    )`

    await sql`create table if not exists Category(
        id SERIAL PRIMARY KEY NOT NULL,
        name varchar(255) NOT NULL
    )`
    await sql`create table if not exists Maker(
        id SERIAL PRIMARY KEY NOT NULL,
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
        name varchar(255) NOT NULL,
        image varchar(255) NOT NULL,
        descript varchar(255) NOT NULL,
        price money NOT NULL,
        categoryid INT NOT NULL,
        makerid INT NOT NULL,
        FOREIGN KEY (categoryid) REFERENCES Category(id),
        FOREIGN KEY (makerid) REFERENCES Maker(id)
    )`

    app.listen(5000, () => {
        console.log("ОН РАБОТАЕТ на порту 5000");
    })
}

start()