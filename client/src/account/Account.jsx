import React from 'react'
import './Account.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
export default function Account() {
  return (
    <>
      <Header />
      <div className='container'>
        <div className="content">

          <div className="head_account">
            <h1 className='headline lettering_bold'>Личный кабинет</h1>
            <h4 className='lettering_bold'>pochta@gmail.com</h4>
          </div>

          <div className="order">
            <h2 className='lettering_bold txt_grey'>Заказов пока нет</h2>
          </div>

        </div>

      </div>
      <Footer />
    </>
  )
}

