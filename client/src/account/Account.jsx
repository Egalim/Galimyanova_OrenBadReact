import React, { useEffect, useState } from 'react'
import './Account.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import edit from '../assets/icons/edit.svg'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Account() {
  const navigate = useNavigate()
  const order = [
    {
      id_order: "1",
      date_order: "14.04.2024",
      price: "1500",
      name: "Галимьянова Элеонора ",
      pharm: "Аптечный пункт Пролетарская 265",
      status: "В обработке"
    },
    {
      id: "2",
      date_order: "14.04.2024",
      price: "1500",
      name: "Галимьянова Элеонора ",
      pharm: "Аптечный пункт Пролетарская 265",
      status: "Отклонен"
    }
  ];
  const id = useSelector((state) => state.auth.id)
  const [profile, setprofile] = useState('')
  useEffect(() => {
    fetch(`http://localhost:8080/profile/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setprofile(data); // Обновите состояние продуктов
      })
      .catch(error => {
        console.error('Ошибка при получении данных о продуктах:', error);
      });
  }, [id]);

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
                <button><img src={edit} alt="edit, please" /></button>
              </div>
            </div>
          </div>
        {order.length === 0 ?(
        <div className="order">
            <h2 className='lettering_bold txt_grey'>Заказов пока нет</h2>
          </div>):(

          <div className="container_orders">
            {
              order.map((e) => (
                <div className="container_order txt_white" key={e.id_order}>
                    <div className="txt_row header_order">
                      <h3 className='lettering_semi_bold'>Заказ № {e.id_order}</h3>
                      <p>от {e.date_order}</p>
                    </div>
                    <div className="info_order">
                      <div className="txt_row">
                        <h3 className='lettering_semi_bold'>Получатель:</h3> <p>{e.name}</p>
                      </div>
                      <div className="txt_row">
                        <h3 className='lettering_semi_bold'>Самовывоз:</h3> <p>{e.pharm}</p>
                      </div>
                      <div className="txt_row">
                        <h3 className='lettering_semi_bold txt_green'>Итого:</h3> <h2 className='lettering_bold price'>{e.price}</h2>
                      </div>
                      <button onClick={()=>{
                        navigate(`/order/${e.id_order}`)
                        }}><p className='txt_green'>Посмотреть детали заказа </p></button>
                    </div>
                    <div className="info_order right_info">
                      <div className="txt_row"><p>Статус:</p><h3 className='lettering_bold'>{e.status}</h3></div>
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

