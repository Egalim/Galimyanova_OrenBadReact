import React from 'react'
import './Basket.css'
import Counter from '../components/counter/Counter'
import trash from '../assets/icons/trash.svg'

export default function Cart({ image, title, name_maker, pharm, price }) {
    return (
        <div className="container_cart ">
            <img src={image} alt="product" className='cart_img' />

            <div className="info_cart">
                <h2 className='lettering_semi_bold'>{title}</h2>
                <div className="txt_row">
                    <p className='lettering_semi_bold'>Производитель:</p>
                    <p>{name_maker}</p>
                </div>
                <a href="" className='txt_green'>Посмотреть больше информации о товаре</a>
                <div className="txt_row" style={{marginTop: "2vh"}}>
                    <h3 className='lettering_bold'>Аптека:</h3>
                    <h3 className='lettering_semi_bold'>{pharm}</h3>
                </div>

                <div className="row_counter">
                    <Counter />
                    <h2 className='lettering_bold price'>{price}</h2>
                </div>
            </div>

            <button>
                <img src={trash} alt="delete" className='delete_img'/>
            </button>

        </div>
    )
}

