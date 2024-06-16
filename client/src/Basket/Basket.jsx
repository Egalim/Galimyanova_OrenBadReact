import React, { useState, useEffect } from 'react';
import './Basket.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Navigate from '../components/navigation/Navigate';
import FormSearch from '../components/FormSearch/FormSearch';
import Cart from './Cart';
import Info_delivery from '../components/info_delivery/Info_delivery';
import { useSelector } from 'react-redux';
import { RiCloseFill } from "react-icons/ri";
import url from '../config';

const Basket = () => {
  const token = useSelector((state) => state.auth.token);
  const [array, setArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState({
    nameUser: '',
    telUser: ''
  });
  
  const id = useSelector((state) => state.auth.id)
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${url}/profile/${id}`)
      .then(response => response.json())
      .then(data => {
        setProfile(data); 
        setBuyerInfo({
          nameUser: data[0]?.name,
          telUser: data[0]?.tel
        });
      })
      .catch(error => {
        console.error('Ошибка при получении данных о продуктах:', error);
      });
  }, [id]);

  function calculateTotalPrice(items) {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.count;
    });
    setTotalPrice(total);
  }

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedArray = array.map(item => {
      if (item.id === productId) {
        return { ...item, count: newQuantity };
      }
      return item;
    });
    setArray(updatedArray);
    calculateTotalPrice(updatedArray);
  };

  useEffect(() => {
    fetch(`${url}/basket`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "token": token,
      })
    })
      .then(response => response.json())
      .then(data => {
        setArray(data.items);
        calculateTotalPrice(data.items);
      })
      .catch(error => console.error('Error fetching basket:', error));
  }, [token]);

  useEffect(() => {
    calculateTotalPrice(array);
  }, [array]);

  function drop_product(product_id) {
    const new_array = array.filter((a) => {
      return product_id !== a.id;
    });
    setArray(new_array);

    fetch(`${url}/basket_delete`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "token": token,
        "product_id": product_id
      })
    })
      .then(response => response.json())
      .catch(error => console.error('Error deleting product from basket:', error));
  }

  const handleNameChange = (e) => {
    setBuyerInfo({ ...buyerInfo, nameUser: e.target.value });
  };

  const handleTelChange = (e) => {
    setBuyerInfo({ ...buyerInfo, telUser: e.target.value });
  };


  const handleOrderSubmit = async () => {
    try {
      const response = await fetch(`${url}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          nameUser: buyerInfo.nameUser,
          telUser: buyerInfo.telUser,
          totalPrice: totalPrice,
          userId: id, 
          productId: array.map(item => item.id),
          count: array.map(item => item.count),
          pharmId: array[0]?.pharm_id, 
          statusId: 1, 
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Заказ успешно оформлен:', data);
        setArray([]);
        setIsModalOpen(false);
      } else {
        console.error('Ошибка при оформлении заказа:', data.message);
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
};

  return (
    <>
      <Header />
      <div className="container">
        <div className="content">
          <div className="search_row center">
            <Navigate />
            <FormSearch />
          </div>
          <div className="mar-35"></div>
          {!array || array.length === 0 ? (
            <h2 className='lettering_bold txt_grey' style={{ textAlign: "center" }}>Корзина пуста</h2>
          ) : (
            <div className="cart">
              {array.map((e) => (
                <div key={e.id}>
                  <Cart
                    key={e.id}
                    drop_product={drop_product}
                    id={e.id}
                    image={e.image}
                    title={e.title}
                    name_maker={e.maker_name}
                    pharm={e.pharm_name}
                    pharmid={e.pharm_id}
                    price={e.price}
                    count={e.count}
                    onQuantityChange={handleQuantityChange}
                  />
                </div>
              ))}
            </div>
          )}
          {array.length !== 0 &&
            <div className="container_basket">
              <Info_delivery />
              <div className="container_price">
                <div className="txt_row">
                  <p>Итого:</p><h1 className='lettering_bold price'>{totalPrice}</h1>
                </div>
                <button onClick={() => setIsModalOpen(true)}
                  className='my_button lettering_semi_bold'>Оформить заказ</button>
              </div>
            </div>}
        </div>
      </div>
      <Footer />
      {isModalOpen && (
        <div className="modal_container" >
          <div className="modal" style={{width: "70vw", gap:"2vh", padding: "3%"}}>
            <button className='close_btn' onClick={() => setIsModalOpen(false)}>
              <RiCloseFill className='close' />
            </button>
            <h1 className='txt_white lettering_semi_bold'>Оформление заказа</h1>
            <form className='form-at'>
                <label><p className='txt_white' style={{marginBottom: '5px'}}>Фамилия имя получателя:</p></label>
              <div className="validate-input-at" data-validate="Обязательное поле">
                <input className="input-at"
                  type="text"
                  id="nameUser"
                  name="nameUser"
                  value={buyerInfo.nameUser}
                  onChange={handleNameChange}
                  required
                />
                <span className="focus-input-at"></span>
              </div>
              <label><p className='txt_white' style={{marginBottom: '5px'}}>Номер телфона получателя:</p></label>
              <div className="validate-input-at" data-validate="Обязательное поле">
                <input className="input-at"
                  type="tel"
                  id="tel"
                  name="tel"
                  value={buyerInfo.telUser}
                  onChange={handleTelChange}
                  required
                />
                <span className="focus-input-at"></span>
              </div>

              <div className="txt_row">
                  <h2 className='txt_green lettering_semi_bold'>Итого:</h2><h1 className='lettering_bold price txt_white'>{totalPrice}</h1>
              </div>
              <div className="txt_row">
                  <h2 className='txt_green lettering_semi_bold'>Место получения заказа:</h2>
                  <h3 className='lettering_semi_bold txt_white'>{array[0]?.pharm_name}</h3>
                </div>
                <p className='txt_white' style={{marginTop:'10px', marginBottom:"5vh"}}>С момента оформления заказа товар хранится в атечном пункте 7 дней</p>
            <button className='my_button' style={{padding: '15px 100px'}} onClick={handleOrderSubmit}> <h3 className='lettering_semi_bold'>Оформить заказ</h3></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Basket;