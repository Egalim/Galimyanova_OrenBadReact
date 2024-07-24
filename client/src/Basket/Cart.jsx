import React, { useState, useEffect } from 'react'
import './Basket.css'
import Counter from '../components/counter/Counter'
import trash from '../assets/icons/trash.svg'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import url from '../config'

export default function Cart({ drop_product, id, image, title, name_maker, pharmid, pharm, price, count, onQuantityChange }) {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState([]);
  const token = useSelector((state) => state.auth.token)
  const [count1, setCount1] = useState('')
  const [newPrice, setnewPrice] = useState(price * count)

  const handleCounterChange = (count, price) => {
    setCount1(count);
    setnewPrice(count * price)
    fetch(`${url}/update_quantity`, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        product_id: id,
        new_quantity: count, 
      }),
    })
      .then((response) => response.json())
      .then(() => {
        onQuantityChange(id, count); 
      })
      .catch((error) => console.error("Error updating quantity:", error));
  };

  useEffect(() => {
    if (id) {
      fetch(`${url}/products/${id}/${pharmid}/quantity`,{
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
        .then(response => response.json())
        .then(data => {
          setQuantity(data);
        })
        .catch(error => console.error('Error getting pharmacies:', error));
    }
  }, [productId])


  return (
    <div className="container_cart ">
      <img src={`${url}/` + image} alt="product" className='cart_img' />

      <div className="info_cart">
        <h2 className='lettering_semi_bold'>{title}</h2>
        <div className="txt_row">
          <p className='lettering_semi_bold'>Производитель:</p>
          <p>{name_maker}</p>
        </div>
        <a href="https://www.rlsnet.ru/" className='txt_green'>Посмотреть больше информации о товаре</a>
        <div className="txt_row" style={{ marginTop: "2vh" }}>
          <h3 className='lettering_bold'>Аптека:</h3>
          <h3 className='lettering_semi_bold'>{pharm}</h3>
        </div>

        <div className="row_counter" style={{ marginTop: "2vh" }}>
          <Counter number={count} quantity={quantity.quantity} onCounterChange={handleCounterChange} price={price} />
          <h2 className='lettering_bold price'>{newPrice}</h2>
        </div>
      </div>

      <button onClick={() => drop_product(id)}>
        <img src={trash} alt="delete" className='delete_img' />
      </button>

    </div>
  )
}