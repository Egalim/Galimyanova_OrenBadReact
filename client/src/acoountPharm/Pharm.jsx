import React, { useEffect, useState } from 'react'
import logo from '../assets/icons/logo.svg'
import './Pharm.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../redux/authSlice'
import Footer from '../components/Footer/Footer'

const Pharm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useSelector((state) => state.auth.id)
    const [Pharm, setPharm] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8080/pharm/${id}`)
            .then(response => response.json())
            .then(data => {
                setPharm(data)
                console.log(data)
            })
    }, [])
    const Orders = [
        {
            id_order: "1",
            date_order: "14.04.2024",
            price: "1500",
            name: "Галимьянова Элеонора ",
            tel: "89873435055",
            status: "В обработке"
        },
        {
            id: "2",
            date_order: "14.04.2024",
            price: "1500",
            name: "Галимьянова Элеонора ",
            tel: "89873435055",
            status: "В обработке"
        }
    ]
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
                <div className="content">
                    <div className="container_orders">
                        {
                            Orders.map((e) => (
                                <div className="container_order txt_white" key={e.id_order}>
                                    <div className="header_pharm_order">
                                        <div className="txt_row">
                                            <p className='lettering_bold'>Статус:</p> <p>{e.status}</p>
                                        </div>
                                        <div className="txt_row header_order">
                                            <h3 className='lettering_semi_bold'>Заказ № {e.id_order}</h3>
                                            <p>от {e.date_order}</p>
                                        </div>
                                    </div>
                                    <div className="info_order">
                                        <div className="txt_row">
                                            <h3 className='lettering_semi_bold'>Получатель:</h3> <p>{e.name}</p>
                                        </div>
                                        <div className="txt_row">
                                            <h3 className='lettering_semi_bold'>Телефон:</h3> <p>{e.tel}</p>
                                        </div>
                                        <div className="txt_row">
                                            <h3 className='lettering_semi_bold txt_green'>Итого:</h3> <h2 className='lettering_bold price'>{e.price}</h2>
                                        </div>
                                        <button onClick={() => {
                                            navigate(`/PharmOrder/${e.id_order}`)
                                        }}><p className='txt_green'>Посмотреть детали заказа </p></button>
                                    </div>
                                    <div className="row_btns">
                                        <div className="row_btn">
                                            <button className='btn_green lettering_semi_bold'>Собран</button>
                                            <button className='btn_grey'>Отклонить заказ</button>
                                        </div>
                                        <button className='btn_purple'><h2 className='lettering_semi_bold'>Получен</h2></button>
                                    </div>

                                </div>
                            ))

                        }
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default Pharm