import React, { useEffect, useState } from 'react';
import './Cards.css';
import { useParams, useNavigate } from 'react-router-dom';
import Card from './Card/Card';

export default function CardCat() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { categoryId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8080/category/${categoryId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Проверьте структуру данных
                setProducts(data); // Обновите состояние продуктов
            })
            .catch(error => {
                console.error('Ошибка при получении данных о продуктах:', error);
            });
    }, [categoryId]);

    return (
        <div className="container_cards">
            {products.map(product => (
                <div key={product.id_cat} onClick={() => navigate(`/${product.id}`)}>
                    <Card
                        nameProduct={product.title}
                        img={product.image}
                        price={product.price}
                        instruction={product.descript}
                        maker={product.name}
                    />
                </div>
            ))}
        </div>
    );
}