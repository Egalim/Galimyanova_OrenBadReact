import React from 'react'
import './CardProduct.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Navigate from '../components/navigation/Navigate'
import FormSearch from '../components/FormSearch/FormSearch'
import Info_delivery from '../components/info_delivery/Info_delivery'
import img from '../assets/spirulina.png'

//{nameProduct, price, instuction, quantity, img, nameMaker}
export default function CardProduct() {
    const arrayCard = [
        {
            id: '1',
            img: img,
            insruction: 'Биологически активная добавка к пище — содержит микроводоросль Спирулины Платенсис, которая известна во всем мире как природное средство для укрепления иммунитета. Дополнительный источник фикоцианинов и бета-каротина.',
            nameProduct: 'Спирулина ВЭЛ табл.',
            nameMaker: 'В-МИН ООО/ ДИОД ПАО',
            quantity: '10',
            price: '355.00'
        }
    ]
    return (
        <>
            <Header />
            <div className='container'>
                <div className="content">
                    <div className="search_row">
                        <Navigate categoryProduct='Для органов зрения' />
                        <FormSearch />
                    </div>
                    {
                        arrayCard.map((e) => {
                            return (
                                <div className="main_block_catalog">
                                    <img src={img} alt="product" />
                                    <div className="info_product">
                                        <h1 className='lettering_bold'>{nameProduct}</h1>
                                    </div>
                                </div>
                            )
                        })
                    }


                    <Info_delivery />
                </div>
            </div>
            <Footer />
        </>
    )
}

