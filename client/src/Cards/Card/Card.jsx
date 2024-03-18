import React, { useEffect } from 'react'
import './Card.css'

export default function Card({ img, nameProduct, maker, price}) {

  return (
      <div class="product_card"
 >

        <img src={`http://localhost:8080/` + `${img}`} alt="product" />
        <div class="row_card_product">
          <div class="name_product">
            <h3 class="lettering_semi_bold texturl">
              <div class="texturl">{nameProduct}
              </div>
            </h3>
          </div>
          <h4>{maker}</h4>
          <h2 class="lettering_bold product_rub">{price}</h2>
          <button type="button" class="card_product_btn">
            <span class="lettering_semi_bold">Выбрать товар</span>
          </button>
        </div>

      </div>
  )
}

