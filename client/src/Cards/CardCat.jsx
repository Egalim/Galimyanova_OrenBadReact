import React, { useEffect, useState } from 'react';
import './Cards.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Card from './Card/Card';
import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import Navigate from '../components/navigation/Navigate';
import FormSearch from '../components/FormSearch/FormSearch';
import Footer from '../components/Footer/Footer';

export default function CardCat() {
    const location = useLocation();
    localStorage.setItem('lastVisitedPage', location.pathname);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { categoryId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8080/category/${categoryId}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data); // Обновите состояние продуктов
            })
            .catch(error => {
                console.error('Ошибка при получении данных о продуктах:', error);
            });
    }, [categoryId]);

    return (
        <div>
            <Header />
            <div className="container">
                <div className="content catalog">
                    <SideNav />
                    <div className="catalogCards">
                        <div className="search_row">
                            <Navigate/>
                            <FormSearch />
                        </div>
                        <div className="mar-35"></div>
                        <div className="container_cards">
                            {products.map(e => (
                                <div key={e.id} onClick={() => navigate(`../product/${e.id}?categoryId=${categoryId}`)}>
                                    <Card
                                        nameProduct={e.title}
                                        img={e.image}
                                        price={e.price}
                                        instruction={e.descript}
                                        maker={e.name}
                            
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}