import React, { useState, useEffect } from 'react';
import './Dropdown.css';
import Counter from '../counter/Counter';
import { useSelector } from 'react-redux'
import { RiCloseFill } from "react-icons/ri";
import { useParams, redirect, useNavigate } from 'react-router-dom';
import url from '../../config';


export default function Dropdown({ pharmacies, productCount }) {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [quantity, setquantity] = useState(null)
  let navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [ArrayBasket, setArrayBasket] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = useSelector((state) => state.auth.token)
  const [ModalOpen, setModalOpen] = useState(false)
  let { productId } = useParams();

  const handleCounterChange = (count) => {
    setCount(count);
  };

  const handleCartClick = async (pharm, product_id, token_user) => {
    if (!token) {
      setModalOpen(true);
    } else {
      if (ArrayBasket.length > 0) {
        const pharmacyInCart = ArrayBasket[0].pharm_id;
        if (pharm !== pharmacyInCart) {
          setIsModalOpen(true);
          return;
        }
      }
      await fetch(`${url}/add`, {
        method: "POST",
        mode: "cors",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "productId": Number(product_id),
          "token": token_user,
          "count": count,
          "pharm": pharm,
        })
      })
        .then(response => response.json())
        .then(data => {
          navigate("/basket");
        });
    }
  }

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
        setArrayBasket(data.items);
      })
      .catch(error => console.error('Error fetching basket:', error));
  }, [token]);

  const handleSelectPharmacy = (pharmId, quantity) => {
    const selected = pharmacies.find((pharm) => pharm.pharm_id === pharmId);
    setSelectedPharmacy(selected);
    setquantity(quantity)
  };

  return (
    <>
      <div className="dropdown">
        <h3 className='lettering_semi_bold txt_row'>Выберете адрес аптечного пункта
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
            <path d="M9.65813 0.832924C9.59523 0.754817 9.52041 0.692822 9.43796 0.650515C9.35552 0.608207 9.26709 0.586426 9.17778 0.586426C9.08846 0.586426 9.00004 0.608207 8.91759 0.650515C8.83515 0.692822 8.76032 0.754817 8.69743 0.832924L5.59882 4.64958C5.53593 4.72769 5.4611 4.78968 5.37866 4.83199C5.29621 4.8743 5.20779 4.89608 5.11847 4.89608C5.02916 4.89608 4.94073 4.8743 4.85829 4.83199C4.77584 4.78968 4.70102 4.72769 4.63812 4.64958L1.53952 0.832924C1.47662 0.754817 1.4018 0.692822 1.31935 0.650515C1.23691 0.608207 1.14848 0.586426 1.05917 0.586426C0.969854 0.586426 0.881425 0.608207 0.798981 0.650515C0.716537 0.692822 0.64171 0.754817 0.578816 0.832924C0.452808 0.989059 0.38208 1.20027 0.38208 1.42042C0.38208 1.64058 0.452808 1.85179 0.578816 2.00792L3.68418 5.83291C4.06475 6.30108 4.58061 6.56405 5.11847 6.56405C5.65633 6.56405 6.1722 6.30108 6.55276 5.83291L9.65813 2.00792C9.78414 1.85179 9.85487 1.64058 9.85487 1.42042C9.85487 1.20027 9.78414 0.989059 9.65813 0.832924Z" fill="#40394A" />
          </svg>
        </h3>
        <div className="dropdown-content">
          {pharmacies.length > 0 ? (
            pharmacies.map((e) => (
              <div key={e.pharm_id}>
                <a onClick={() => handleSelectPharmacy(e.pharm_id, e.quantity)}> {/* Передаем также значение count */}
                  {e.pharm_name}
                </a>
              </div>
            ))
          ) : (
            <h3 className='lettering_semi_bold'>Данный товар в аптеках закончился</h3>
          )}
        </div>
      </div>
      {selectedPharmacy && (
        <>
          <div className='selected'>
            <h3 className='lettering_semi_bold'>Вы выбрали аптеку:</h3>
            <p>{selectedPharmacy.pharm_name}</p>
          </div>
          <p className='txt_row'>В наличии: {quantity < 5 ? <h3 className='lettering_semi_bold txt_red'> Мало</h3> : <h3 className='lettering_semi_bold txt_green'>Много</h3>}</p>

          <div className="row_counter">
            <Counter quantity={quantity} onCounterChange={handleCounterChange} number={1} />
            {/* В фукнцию передать id */}
            <button
              onClick={() => handleCartClick(selectedPharmacy.pharm_id, productId, token)}
              className='my_button lettering_semi_bold'>В корзину</button>
          </div>
        </>
      )}
      {!token && ModalOpen && (
        <div className="modal_container">
          <div className="modal">
            <button className='close_btn' onClick={() => setModalOpen(false)}>
              <RiCloseFill className='close' />
            </button>
            <h2 className='txt_white lettering_semi_bold'>Для добавления товара в корзину, пожалуйста, авторизируйтесь</h2>
            <button className='my_button' onClick={() => { navigate('/auth') }}> <h3 className='lettering_semi_bold'>Перейти к авторизации</h3></button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="modal_container">
          <div className="modal">
            <button className='close_btn' onClick={() => setIsModalOpen(false)}>
              <RiCloseFill className='close' />
            </button>
            <h2 className='txt_white lettering_semi_bold'>В корзине есть продукт из другой аптеки. <br></br> Нельзя выбрать продукты из разных аптек!</h2>
            <button className='my_button' onClick={() => setIsModalOpen(false)}> <h3 className='lettering_semi_bold'>Ок</h3></button>
          </div>
        </div>
      )}
    </>
  );
}