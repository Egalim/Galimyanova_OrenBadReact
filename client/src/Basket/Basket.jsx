import React from 'react'
import './Basket.css'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Navigate from '../components/navigation/Navigate'
import FormSearch from '../components/FormSearch/FormSearch'
import Cart from './Cart'
import img from '../assets/1.png'
import Info_delivery from '../components/info_delivery/Info_delivery'

const Basket = () => {
  const array = [
    {
      image: img,
      title: "Атероклефит био капс. n60",
      name: "Эвалар ЗАО",
      pharm: "Аптека Невельская 24",
      price: "630.00"
    },
    {
      image: img,
      title: "Атероклефит био капс. n60",
      name: "Эвалар ЗАО",
      pharm: "Аптека Невельская 24",
      price: "630.00"
    },
  ]
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
          <div className="cart">
            {
              array.map((e) => {

                return (
                  <div key={e.id}><Cart key={e.id} image={e.image} title={e.title} name_maker={e.name} pharm={e.pharm} price={e.price} />
                  </div>
                )
              })
            }
          </div>
          <Info_delivery />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Basket