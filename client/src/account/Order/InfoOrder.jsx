import React from 'react'
import '../../components/InfoOrder.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import CardOrder from '../../components/CardOrder/CardOrder'
import img from '../../assets/spirulina.png'
import { Link } from 'react-router-dom'

export default function InfoOrder() {
  const order = [
    {
      id_order: "1",
      date_order: "14.04.2024",
      price: "1500",
      name: "Галимьянова Элеонора ",
      pharm: "Аптечный пункт Пролетарская 265",
      status: "В обработке"
    }
  ];
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
  ];
  return (
    <>
      <Header />
      <div className='container'>
        <div className="content content_order">
          <div className="row_header">
            <Link className="linkHome txt_grey" to={`/account`}>Вернуться назад / </Link>
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
              <h3 className='lettering_semi_bold'>Самовывоз:</h3> <p>{order[0].pharm}</p>
            </div>
            <div className="txt_row">
              <h3 className='lettering_semi_bold txt_green'>Итого:</h3> <h2 className='lettering_bold price'>{order[0].price}</h2>
            </div>
            <div className="txt_row"><p>Статус:</p><h3 className='lettering_bold'>{order[0].status}</h3></div>
            <p className='txt_green'>Оплата производится при получении: Наличными, картой, по QR-коду</p>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}
