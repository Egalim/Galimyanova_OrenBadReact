import React, { useEffect, useState } from 'react'
import img from '../../assets/spirulina.png'
import { Link } from 'react-router-dom';
import CardOrder from '../../components/CardOrder/CardOrder';
import logo from '../../assets/icons/logo.svg'
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/authSlice';

export default function PharmOrder() {
    const dispatch = useDispatch()
    const id = useSelector((state) => state.auth.id)
    const order = [{
        id_order: "1",
        date_order: "14.04.2024",
        name: "Галимьянова Элеонора ",
        price: "1500",
        tel: "89873435055"
}]
    const orderCard = [
        {
            id: "1",
            title: "Спирулина ВЭЛ табл. 500 мг",
            image: img,
            price: "710.00",
            name_maker: "В-МИН ООО/ ДИОД ПАО",
            count: "2"
        },
        {
            id: "2",
            title: "Спирулина ВЭЛ табл. 500 мг",
            image: img,
            price: "710.00",
            name_maker: "В-МИН ООО/ ДИОД ПАО",
            count: "2"
        },
        {
            id: "2",
            title: "Спирулина ВЭЛ табл. 500 мг",
            image: img,
            price: "710.00",
            name_maker: "В-МИН ООО/ ДИОД ПАО",
            count: "2"
        },
        {
            id: "3",
            title: "Спирулина ВЭЛ табл. 500 мг",
            image: img,
            price: "710.00",
            name_maker: "В-МИН ООО/ ДИОД ПАО",
            count: "2"
        }
    ]
    const [Pharm, setPharm] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8080/pharm/${id}`)
            .then(response => response.json())
            .then(data => {
                setPharm(data)
                console.log(data)
            })
    }, [])
    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="logo">
                        <Link to='/'>
                            <img src={logo} alt='logo' />
                        </Link>
                    </div>
                    <div>{
                        Pharm.map((e) => (
                            <h3 className='lettering_semi_bold txt_white'>{e.name}</h3>
                        ))}
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
                        <div className="txt_row head_order"><h2 className='lettering_bold'>Заказ № {order[0].id_order}</h2>
                            <h3>от {order[0].date_order}</h3></div>
                    </div>

                    <div className="container_cards_order">
                        {
                            orderCard.map((e) => {
                                return (
                                    <CardOrder key={orderCard[0].id} id_product={orderCard[0].id} title={orderCard[0].title} image={orderCard[0].image} price={orderCard[0].price} name_maker={orderCard[0].name_maker} count={orderCard[0].count} />
                                )
                            })
                        }
                    </div>

                    <div className="info_order">
                        <div className="txt_row">
                            <h3 className='lettering_semi_bold'>Получатель:</h3> <p>{order[0].name}</p>
                        </div>
                        <div className="txt_row">
                            <h3 className='lettering_semi_bold txt_green'>Итого:</h3> <h2 className='lettering_bold price'>{order[0].price}</h2>
                        </div>
                        <div className="txt_row">
                            <h3 className='lettering_semi_bold'>Телефон:</h3> <p>{order[0].tel}</p>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
