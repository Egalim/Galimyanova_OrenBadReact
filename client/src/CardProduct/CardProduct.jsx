import React, { useEffect, useState } from 'react';
import './CardProduct.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Navigate from '../components/navigation/Navigate';
import FormSearch from '../components/FormSearch/FormSearch';
import Info_delivery from '../components/info_delivery/Info_delivery';
import Dropdown from '../components/dropdown/Dropdown';
import Btn from '../components/BTN/Btn';
import Counter from '../components/counter/Counter';
import { useParams  } from 'react-router-dom';

export default function CardProduct() {
    const [product, setProduct] = useState({});
    let { productId } = useParams();
    
    useEffect(() => {
        fetch(`http://localhost:8080/product/${productId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Проверьте структуру данных
                setProduct(data); // Обновите состояние продукта
            })
            .catch(error => {
                console.error('Ошибка при получении данных о продукте:', error);
            });
    }, [productId]);

    async function add(product_id) {
        // const user_id = localStorage.getItem('user_id')
        await fetch(`http://localhost:8080/add`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({product_id: product_id, count: 1})
        })
        then(response => response.json())
        .then(data => {
            // "/basket"
        })

    }
    return (
        <>
            <Header />
            <div className='container'>
                <div className="content">
                    <div className="search_row center">
                        <Navigate />
                        <FormSearch />
                    </div>
                    <div className="mar-35"></div>

                    <div className="main_block_catalog">
                    <img src={ `http://localhost:8080/` + `${product[0]?.image}`} alt="product" />

                        <div className="info_product">
                            <h1 className='lettering_bold'>{product[0]?.title}</h1>

                            <div className="information">
                                <div className="txt_row"><h3 className='lettering_semi_bold bottom-border'>Производитель:</h3> <p>{product[0]?.name}</p></div>
                                <div className='block_txt'><h3 className='lettering_semi_bold bottom-border'>Показания:<br /> </h3> <p>{product[0]?.descript}</p></div>
                                <h3><a className="txt_green" href="https://www.rlsnet.ru/">Посмотреть больше информации о товаре</a></h3>

                                <h1 className='lettering_bold price'>{product[0]?.price}</h1>
                            </div>

                            <div className="add_order information">
                                <Dropdown />
                                <p className='txt_row'>В наличии: <h3 className='lettering_semi_bold txt_green'>много</h3></p>
                                <div className="row_counter">
                                    <Counter />
                                    {/* В фукнцию передать id */}
                                    <button 
                                    // onClick={add(2)} 
                                    className='button'>В корзину</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Info_delivery />
                </div>
            </div>
            <Footer />
        </>
    )
}