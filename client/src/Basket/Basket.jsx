import React, { useState, useEffect } from 'react'
import './Basket.css'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Navigate from '../components/navigation/Navigate'
import FormSearch from '../components/FormSearch/FormSearch'
import Cart from './Cart'
import Info_delivery from '../components/info_delivery/Info_delivery'
import { useSelector } from 'react-redux'

const Basket = () => {
  const token = useSelector((state) => state.auth.token)
  const [array, setArray] = useState([])


useEffect(() => {
    fetch(`http://localhost:8080/basket`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            { 
              "token": token, 
            }
          )
        })
          .then(response => response.json())
          .then(data => {
              setArray(data.items)
          })
          
}, []);

function drop_product(product_id) {
   const new_array = array.filter((a) => {  
     return product_id != a.id
     })
     setArray(new_array)
  
 fetch(`http://localhost:8080/basket_delete`, {
           method: "POST",
           mode: "cors",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(
             { 
               "token": token,
               "product_id":  product_id
             }
           )
         })
           .then(response => response.json())
           .then(data => {
           })
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
        {array.length === 0 ? (
          <h2 className='lettering_bold txt_grey' style={{textAlign: "center"}}>Корзина пуста</h2>
        ) : (
          <div className="cart">
            {array.map((e) => (
              <div key={e.id}>
                <Cart key={e.id} drop_product={drop_product} id={e.id} image={e.image} title={e.title} name_maker={e.maker_name} pharm={e.pharm_name} pharmid={e.pharm_id} price={e.price} count={e.count} />
              </div>
            ))}
          </div>
        )}
        {array.length !== 0 && <Info_delivery />}
      </div>
    </div>
    <Footer />
  </>
)
}

export default Basket;