import React from 'react'
import './CardOrder.css'

export default function CardOrder({id_product, title,image,price,name_maker,count})  {
  return (
    <div className='container_card_order' key={id_product}>
        <img src={image} alt="product" />
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

