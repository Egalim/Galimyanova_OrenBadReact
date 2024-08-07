import React, { useEffect, useState } from 'react'
import logo from '../assets/icons/logo.svg'
import './Pharm.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../redux/authSlice'
import Footer from '../components/Footer/Footer'
import url from '../config'

const Pharm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useSelector((state) => state.auth.id)
    const [Pharm, setPharm] = useState([])
    console.log(Pharm);

    async function Submits(e, params) {
        try {
            const response = await fetch(`${url}/success/${params[1]}/${params[0]}`, {
                headers: new Headers({
                  "ngrok-skip-browser-warning": "69420",
                }),
              });
            const data = await response.json();
            console.log(data);
            location.reload();
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/pharm/${id}`, {
                    headers: new Headers({
                      "ngrok-skip-browser-warning": "69420",
                    }),
                  });
                const data = await response.json();
                console.log(data);
                setPharm(data.data);
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
                <div className="content">
                    <div className="container_orders">
                        {
                            Pharm.map((e) => (
                                <div className="container_order txt_white" key={e.id_order}>
                                    <div className="header_pharm_order">
                                        <div className="txt_row">
                                            <p className='lettering_bold'>Статус:</p> <p>{e.status}</p>
                                        </div>
                                        <div className="txt_row header_order">
                                            <h3 className='lettering_semi_bold'>Заказ № {e.id_order}</h3>
                                            <p>от {e.date_order.split('T')[0]}</p>
                                        </div>
                                    </div>
                                    <div className="info_order">
                                        <div className="txt_row">
                                            <h3 className='lettering_semi_bold'>Получатель:</h3> <p>{e.nameuser}</p>
                                        </div>
                                        <div className="txt_row">

                                            <h3 className='lettering_semi_bold'>Телефон:</h3> <p>{e.teluser}</p>
                                        </div>
                                        <div className="txt_row">
                                            <h3 className='lettering_semi_bold txt_green'>Итого:</h3> <h2 className='lettering_bold price'>{e.order_price}</h2>
                                        </div>
                                        <button onClick={() => {
                                            navigate(`/PharmOrder/${e.id_pharm}/${e.id_order}`)
                                        }}><p className='txt_green'>Посмотреть детали заказа </p></button>
                                    </div>
                                    <div className="row_btns">
                                        {e.status !== "Получен" && e.status !== "Отклонён" &&(
                                            <div className="row_btn">
                                                {e.status !== "Готов к получению" && (<button
                                                    className='btn_green lettering_semi_bold'
                                                    onClick={(m) => { Submits(m, [2, e.id_order]) }}>
                                                    Собран
                                                </button>)}
                                                <button
                                                    className='btn_grey'
                                                    onClick={(m) => { Submits(m, [3, e.id_order]) }}>
                                                    Отклонить заказ
                                                </button>
                                            </div>
                                        )}
                                        {e.status !== "Получен" && e.status !== "Отклонён" && e.status == "Готов к получению" &&(
                                            <button
                                                className='btn_purple'
                                                onClick={(m) => { Submits(m, [4, e.id_order]) }}>
                                                <h2 className='lettering_semi_bold'>Получен</h2>
                                            </button>
                                        )}
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