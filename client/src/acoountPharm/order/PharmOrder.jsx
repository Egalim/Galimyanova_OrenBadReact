import React, { useEffect, useState } from 'react'
import img from '../../assets/spirulina.png'
import { Link, useParams } from 'react-router-dom';
import CardOrder from '../../components/CardOrder/CardOrder';
import logo from '../../assets/icons/logo.svg'
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/authSlice';
import url from '../../config';

export default function PharmOrder() {
    const dispatch = useDispatch()
    const id = useSelector((state) => state.auth.id)
    const { pharmId, orderId  } = useParams(); 
    console.log(orderId, pharmId);
    const [Pharm, setPharm] = useState([])
    const [orderCard, setorderCard] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/pharm/${pharmId}/${orderId}/${id}`, {
                    headers: new Headers({
                      "ngrok-skip-browser-warning": "69420",
                    }),
                  });
                const data = await response.json();
                console.log(data);
                setPharm(data.data)
                setorderCard(data.products)
            } catch (error) {
                console.error('Ошибка при получении данных о фармацевте:', error);
            }
        };
        fetchData();
    }, [id])
    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="logo">
                        <Link to='/'>
                            <img src={logo} alt='logo' />
                        </Link>
                    </div>
                    <div>
                        {Pharm.length > 0 && (
                            <h3 className='lettering_semi_bold txt_white'>{Pharm[0].pharm_name}</h3>
                        )}
                    </div>
                    <button onClick={() => {
                        dispatch(logOut())
                    }}><p className=' txt_semi_bold txt_white lettering_semi_bold'>Выйти</p></button>
                </div>
            </div >
            <div className='container'>
                <div className="content content_order">
                    <div className="row_header">
                        <Link className="linkHome txt_grey" to={`/`}>Вернуться назад </Link>
                        <div className="txt_row head_order"><h2 className='lettering_bold'>Заказ № {Pharm[0]?.id_order}</h2>
                            <h3>от {Pharm[0]?.date_order.split('T')[0]}</h3></div>
                    </div>

                    <div className="container_cards_order">
                        {
                            orderCard.map((e) => {
                                return (
                                    <CardOrder key={e.id} id_product={e.id} title={e.product_title} image={e.product_image}
                                     price={e.product_price} name_maker={e.name_maker} count={e.product_count} />
                                )
                            })
                        }
                    </div>

                    <div className="info_order">
                        <div className="txt_row">
                            <h3 className='lettering_semi_bold'>Получатель:</h3> <p>{Pharm[0]?.nameuser}</p>
                        </div>
                        <div className="txt_row">
                            <h3 className='lettering_semi_bold txt_green'>Итого:</h3> <h2 className='lettering_bold price'>{Pharm[0]?.order_price}</h2>
                        </div>
                        <div className="txt_row">
                            <h3 className='lettering_semi_bold'>Телефон:</h3> <p>{Pharm[0]?.teluser}</p>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
