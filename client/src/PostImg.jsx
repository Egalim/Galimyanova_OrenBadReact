import React, { useEffect, useState } from 'react'

export default function PostImg() {
    const [getInfo, setGetInfo] = useState([]);
    const [postInfo, setPostInfo] = useState({
        nameProduct: '',
        price: '',
        quantity: '',
        maker: '',
        category: '',
    });
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('')

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostInfo({ ...postInfo, [name]: value });
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/getProduct')
            .then((response) => response.json())
            .then((json) => setGetInfo(json));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('file', image); // imageFile - объект File вашего изображения
            formData.append('imageName', imageName);
            formData.append('nameProduct', postInfo.nameProduct);
            formData.append('price', postInfo.price);
            formData.append('quantity', postInfo.quantity);
            formData.append('maker', postInfo.maker);
            formData.append('category', postInfo.category);


            const response = await fetch('http://localhost:8080/api/postProduct', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Данные успешно отправлены на сервер');

                // очистка полей формы после успешной отправки формы
                setPostInfo({
                    nameProduct: '',
                    price: '',
                    quantity: '',
                    maker: '',
                    category: '',
                });
                setImage(null);
                setImageName('');
            } else {
                console.error('Ошибка при отправке данных на сервер');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    }

    return (
        <div className='container'>
            <h1>Список фильмов</h1>
            <div className="filmList">
                {getInfo.map(el => (
                    <div className="cardFilm" key={el.idProduct}>
                        <div className="cardFilmImage">
                            <img
                                src={'img' + el.img}
                                alt="image"
                            />
                        </div>
                        <h3>{el.nameProduct}</h3>
                        <p>{el.price}</p>
                        <p>{el.quantity}</p>
                        <p>{el.maker}</p>
                        <p>{el.category}</p>

                    </div>
                ))}
            </div>


            <div className="formAddFilm">
                <h2>Добавить продукт</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Название:
                    </label>
                    <input
                        type="text"
                        name="nameProduct"
                        value={postInfo.nameProduct}
                        onChange={handleChange}
                        required
                    />
                    <label>
                        цена:
                    </label>
                    <input
                        type="text"
                        name="price"
                        value={postInfo.price}
                        onChange={handleChange}
                        required
                    />
                    <label>
                        количество:
                    </label>
                    <input
                        type="text"
                        name="quantity"
                        value={postInfo.quantity}
                        onChange={handleChange}
                        required
                    />
                    <label>
                        производитель:
                    </label>
                    <input
                        type="text"
                        name="maker"
                        value={postInfo.maker}
                        onChange={handleChange}
                        required
                    />
                    <label>
                        категория:
                    </label>
                    <input
                        type="text"
                        name="category"
                        value={postInfo.category}
                        onChange={handleChange}
                        required
                    />
                    <label>
                        Изображение:
                    </label>
                    <input
                        type="file"
                        name="img"
                        onChange={handleImageChange}
                        required
                    />
                    <button type="submit">Отправить</button>
                </form>
            </div>
        </div>
    )
}

