import React, { useEffect, useState } from 'react'
import './Account.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import edit from '../assets/icons/edit.svg'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import url from '../config'

export default function Account() {
  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate()
  const id = useSelector((state) => state.auth.id)
  const [profile, setprofile] = useState('')
  useEffect(() => {
    fetch(`${url}/profile/${id}`, {
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then(response => response.json())
      .then(data => {
        setprofile(data); // Обновите состояние продуктов
      })
      .catch(error => {
        console.error('Ошибка при получении данных о продуктах:', error);
      });
  }, [id]);

  const [Orders, setOrders] = useState('')
  useEffect(() => {
    fetch(`${url}/getUserOrders/${id}`, {
        method: 'GET',
        headers: {
          "ngrok-skip-browser-warning": "69420",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Передаем токен авторизации в заголовке
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setOrders(data); // Обновляем состояние заказов
    })
    .catch(error => {
        console.error('Ошибка при получении данных о заказах:', error);
    });
}, [token]);

  return (
    <>
      <Header />
      <div className='container'>
        <div className="content">

          <div className="head_account">
            <h1 className='headline lettering_bold'>Личный кабинет</h1>
            <div className="container_head">
              <h3 className='lettering_bold'>{profile[0]?.name}</h3>
              <div className="row_counter"><h4>{profile[0]?.tel}</h4>
              <Link to={'/changeAccount'}><img src={edit} alt="edit, please" /></Link>
              </div>
            </div>
          </div>

          {/* {JSON.stringify(Orders.order)} */}
        {Orders.length === 0 ?(
        <div className="order">
            <h2 className='lettering_bold txt_grey'>Заказов пока нет</h2>
          </div>):(

          <div className="container_orders">
            {
              Orders.order.map((e) => (
                <div className="container_order txt_white" key={e.id}>
                    <div className="txt_row header_order">
                      <h3 className='lettering_semi_bold'>Заказ № {e.id}</h3>
                      <p>от {e.date.split('T')[0]}</p>
                    </div>
                    <div className="info_order">
                      <div className="txt_row">
                        <h3 className='lettering_semi_bold'>Получатель:</h3> <p>{e.nameuser}</p>
                      </div>
                      <div className="txt_row">
                        <h3 className='lettering_semi_bold'>Самовывоз:</h3> <p>{e.pharm_name}</p>
                      </div>
                      <div className="txt_row">
                        <h3 className='lettering_semi_bold txt_green'>Итого:</h3> <h2 className='lettering_bold price'>{e.price}</h2>
                      </div>
                      <button onClick={()=>{
                        navigate(`/order/${e.order_product_id}`)
                        }}><p className='txt_green'>Посмотреть детали заказа </p></button>
                    </div>
                    <div className="info_order right_info">
                      <div className="txt_row"><p>Статус:</p><h3 className='lettering_bold'>{e.status_name}</h3></div>
                    <p className='txt_green'>Оплата производится при получении: Наличными, картой, по QR-коду</p>
                    </div>
                </div>
              ))
            }
          </div>
          )}

        </div>

      </div>
      <Footer />
    </>
  )
}

