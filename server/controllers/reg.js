import { sql } from "../db.js";
import bcrypt from "bcryptjs"
import { generateAccessToken } from "../utils/generateToken.js";

export const reg = async (req, res) => {
    const { name, tel, password } = req.body

    const candidate = await sql`select * from Users where tel = ${tel}`

    if (candidate[0]) {
        res.status(400).send({ 
            message: "Пользователь уже существует"
        })
    } else {
        const hashPassword = bcrypt.hashSync(password, 7)
        try {
            const user = await sql`insert into Users (name, roleid, tel, password) values (${name}, 1, ${tel}, ${hashPassword}) RETURNING id`;
            console.log('user:', user); // Добавим этот console.log для отладки
            
            // Получаем id нового пользователя
            const userId = user[0].id;
            console.log('userId:', userId); // Добавим этот console.log для отладки

            // Добавляем запись в таблицу Basket
            await sql`insert into Basket (userid) values (${userId})`; 
            
            // Генерация токена
            const token = generateAccessToken(user.id, user.role) 
            res.send({ message: "Пользователь успешно зарегистрирован", user: user, token: token })
        } catch (error) {
            console.error("Ошибка при регистрации пользователя:", error);
            res.status(500).send({ message: "Ошибка при регистрации пользователя" });
        }
    }
}