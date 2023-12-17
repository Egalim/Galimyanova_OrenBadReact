import React from 'react'
import './Card.css'

export default function Card({ img, nameProduct, nameMaker, price }) {
  return (
      <div class="product_card"
        // onClick={
             // () => {
                 // navigate(`/${e.id}`)
             // }}
      >

        <img src={img} alt="product" />
        <div class="row_card_product">
          <div class="name_product">
            <h3 class="lettering_semi_bold">
              <a class="texturl">{nameProduct}
              </a>
            </h3>
          </div>
          <h4>{nameMaker}</h4>
          <h2 class="lettering_bold product_rub">{price}</h2>
          <button type="button" class="card_product_btn">
            <span class="lettering_semi_bold">В корзину</span>
          </button>
        </div>

      </div>
  )
}

