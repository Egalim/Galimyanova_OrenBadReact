import React, { useEffect, useState } from 'react';
import '../../components/InfoOrder.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CardOrder from '../../components/CardOrder/CardOrder';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import url from '../../config';

export default function InfoOrder() {
  const { id } = useParams();
  console.log(id);
  const token = useSelector((state) => state.auth.token);
  const [OrderInfo, setOrderInfo] = useState([]);

  useEffect(() => {
    fetch(`${url}/getUserOrders/userOrder/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrderInfo(data); // Обновляем состояние заказов
      })
      .catch((error) => {
        console.error('Ошибка при получении данных о заказах:', error);
      });
  }, [token]);

  return (
    <>
      <Header />
      <div className='container'>
        <div className='content content_order'>
          <div className='row_header'>
            <Link className='linkHome txt_grey' to={`/account`}>
              Вернуться назад /{' '}
            </Link>
            <div className='txt_row head_order'>
              <h2 className='lettering_bold'>
                Заказ № {OrderInfo[0]?.id_order}
              </h2>
              <h3>от {OrderInfo[0]?.date_order.split('T')[0]}</h3>
            </div>
          </div>

          <div className='container_cards_order'>
            {OrderInfo.map((e) => (
              <CardOrder
                key={e.id}
                title={e.product_name}
                image={e.product_image}
                price={e.product_price}
                name_maker={e.maker_name}
                count={e.count}
              />
            ))}
          </div>

          <div className='info_order'>
            <div className='txt_row'>
              <h3 className='lettering_semi_bold'>Получатель:</h3>{' '}
              <p>{OrderInfo[0]?.nameuser_order}</p>
            </div>
            <div className='txt_row'>
              <h3 className='lettering_semi_bold'>Самовывоз:</h3>{' '}
              <p>{OrderInfo[0]?.pharm_name}</p>
            </div>
            <div className='txt_row'>
              <h3 className='lettering_semi_bold txt_green'>Итого:</h3>{' '}
              <h2 className='lettering_bold price'>{OrderInfo[0]?.price_order}</h2>
            </div>
            <div className='txt_row'>
              <p>Статус:</p>
              <h3 className='lettering_bold'>{OrderInfo[0]?.status_name}</h3>
            </div>
            <p className='txt_green'>
              Оплата производится при получении: Наличными, картой, по QR-коду
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}