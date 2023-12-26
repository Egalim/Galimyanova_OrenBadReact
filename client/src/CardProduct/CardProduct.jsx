import React, { useState } from 'react'
import './CardProduct.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Navigate from '../components/navigation/Navigate'
import FormSearch from '../components/FormSearch/FormSearch'
import Info_delivery from '../components/info_delivery/Info_delivery'
import img from '../assets/spirulina.png'
import Dropdown from '../components/dropdown/Dropdown'
import Btn from '../components/BTN/Btn'
import Counter from '../components/counter/Counter'
import { useParams } from 'react-router-dom'

//{nameProduct, price, instuction, quantity, img, nameMaker}
export default function CardProduct() {
    const [array, setArray] = useState([]);
    let { cardId } = useParams();
    const arrayCard = [
        {
            id: '1',
            img: img,
            instruction: 'Биологически активная добавка к пище — содержит микроводоросль Спирулины Платенсис, которая известна во всем мире как природное средство для укрепления иммунитета. Дополнительный источник фикоцианинов и бета-каротина.',
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
                    <div className="mar-35"></div>
                    {
                        arrayCard.map((e) => {
                            return (
                                <div className="main_block_catalog">
                                    <img src={e.img} alt="product" />

                                    <div className="info_product">
                                        <h1 className='lettering_bold'>{e.nameProduct}</h1>

                                        <div className="information">
                                            <div className="txt_row"><h3 className='lettering_semi_bold bottom-border'>Производитель:</h3> <p>{e.nameMaker}</p></div>
                                            <div className='block_txt'><h3 className='lettering_semi_bold bottom-border'>Показания:<br /> </h3> <p>{e.instruction}</p></div>
                                            <h3><a className="txt_green" href="https://www.rlsnet.ru/">Посмотреть больше информации о товаре</a></h3>

                                            <h1 className='lettering_bold price'>{e.price}</h1>
                                        </div>

                                        <div className="add_order information">
                                            <Dropdown />
                                            <p className='txt_row'>В наличии: <h3 className='lettering_semi_bold txt_green'>много</h3></p>
                                            <div className="row_counter">
                                                <Counter />
                                                <Btn name_btn={"В корзину"} />
                                            </div>
                                        </div>
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

