import React, { useState, useEffect } from 'react';
import './Basket.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Navigate from '../components/navigation/Navigate';
import FormSearch from '../components/FormSearch/FormSearch';
import Cart from './Cart';
import Info_delivery from '../components/info_delivery/Info_delivery';
import { useSelector } from 'react-redux';

const Basket = () => {
  const token = useSelector((state) => state.auth.token);
  const [array, setArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');

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
    fetch(`http://localhost:8080/basket`, {
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
        // checkPharm(data.items);
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

    fetch(`http://localhost:8080/basket_delete`, {
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
                <button
                  className='my_button lettering_semi_bold'>Оформить заказ</button>
              </div>
            </div>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Basket;