import React from 'react'
import './CardOrder.css'
import url from '../../config'

export default function CardOrder({title,image,price,name_maker,count})  {
  return (
    <div className='container_card_order'>
        <img src={`${url}/` + `${image}`} alt="product" />
        <div class="row_card_product">
          <div class="name_product">
            <h3 class="lettering_semi_bold texturl">
              <div class="texturl">{title}
              </div>
            </h3>
          </div>
          <h4>{name_maker}</h4>
          <h4 className='lettering_semi_bold'>{count} шт.</h4>
          <h3 class="lettering_bold price">{price}</h3>
        </div>
    </div>
  )
}

