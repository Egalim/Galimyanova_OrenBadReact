import React, { useEffect, useState } from 'react';
import './CardProduct.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Navigate from '../components/navigation/Navigate';
import FormSearch from '../components/FormSearch/FormSearch';
import Info_delivery from '../components/info_delivery/Info_delivery';
import Dropdown from '../components/dropdown/Dropdown';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export default function CardProduct() {
    const location = useLocation();
    localStorage.setItem('lastVisitedPage', location.pathname);
    const [product, setProduct] = useState({});
    const [categoryName, setCategoryName] = useState('');
    const { productId } = useParams();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const categoryId = searchParams.get('categoryId');

    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/product/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data); // Обновите состояние продукта
            })
            .catch(error => {
                console.error('Ошибка при получении данных о продукте:', error);
            });
    }, [productId]);

    const [pharm, setPharm] = useState([]);
    useEffect(() => {
        if (productId) {
          fetch(`http://localhost:8080/products/${productId}/pharm`)
            .then(response => response.json())
            .then(data => {
              setPharm(data); // Установка данных в состояние
            })
            .catch(error => console.error('Error getting pharmacies:', error));
        }
      }, [productId]);

    useEffect(() => {
        if (categoryId) {
            fetch(`http://localhost:8080/category/${categoryId}`)
                .then(response => response.json())
                .then(data => {
                    setCategoryName(data[0]?.name_cat);
                })
                .catch(error => {
                    console.error('Ошибка при получении данных о категории:', error);
                });
        }
    }, [categoryId]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <Header />
            <div className='container'>
                <div className="content">
                    <div className="search_row center">
                        <Navigate categoryProduct={categoryName} />
                        <FormSearch />
                    </div>
                    <div className="mar-35"></div>

                    <div className="main_block_catalog">
                        <img src={`http://localhost:8080/` + `${product[0]?.image}`} alt="product" />

                        <div className="info_product">
                            <h1 className='lettering_bold'>{product[0]?.title}</h1>

                            <div className="information"> 
                                <div className="txt_row">
                                    <h3 className='lettering_semi_bold bottom-border'>Производитель:</h3>
                                    <p>{product[0]?.maker_name}</p>
                                </div>
                                <div className='block_txt'>
                                    <h3 className='lettering_semi_bold bottom-border'>Показания:<br /> </h3>
                                    <p className={isExpanded ? '' : 'line-clamp'}>
                                        {product[0]?.descript}
                                    </p>
                                    <button onClick={toggleExpand} className='expand-button'>
                                        {isExpanded ? 'Показать меньше' : 'Показать еще'}
                                    </button>
                                </div>
                                <h3>
                                    <a className="txt_green" href="https://www.rlsnet.ru/">Посмотреть больше информации о товаре</a>
                                </h3>
                                <h1 className='lettering_bold price'>{product[0]?.price}</h1>
                            </div>

                            <div className="add_order information">
                            <Dropdown pharmacies={pharm} />  {/* Передаем состояние productCount в Dropdown */}
                                
                            </div>
                        </div>
                    </div>

                    <Info_delivery />
                </div>
            </div>
            <Footer />
        </>
    );
}