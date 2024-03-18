import { sql } from "../db.js";

export async function uploadFiles(req, res) {
    try {
        const { title, descript, price, categoryid, makerid } = req.body;
        const filename = req.file.filename;
        console.log({ filename, file: req.file });
        
        // Выводим значения перед выполнением SQL-запроса для отладки
        console.log({ title, filename, descript, price, categoryid, makerid });

        // Проверяем, что все поля заполнены
        if (!title || !filename || !descript || !price || !categoryid || !makerid) {
            throw new Error('Не все поля заполнены');
        }

        const data = await sql`insert into Products (title, image, descript, price, categoryid, makerid) values (${title}, ${filename}, ${descript}, ${price}, ${categoryid}, ${makerid}) RETURNING *`;
        console.log({ data });
        res.send(data);
    } catch (error) {
        console.error('Ошибка при добавлении данных:', error);
        res.status(400).send({ error: error.message });
    }
}