import React from 'react'
import './Info_delivery.css'
import { Link } from 'react-router-dom'

export default function Info_delivery() {
    return (
        <div className='info_delivery'>
            <div className="row_delivery">
                <span className='lettering_bold'>Доставка:</span>
                <p>В одну из <Link to='/contact' className='txt_green lettering_bold'>29 аптек</Link> в Оренбурге</p>
                <p>Доставка на дом (300р)</p>
            </div>
            <div className="row_delivery">
                <span className='lettering_bold'>Оплата:</span>
                <p>Наличными, картой, по QR-коду</p>
            </div>
        </div>
    )
}

