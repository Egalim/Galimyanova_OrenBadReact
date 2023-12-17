import React, { useState } from 'react'
import './Cards.css'
import Card from './Card/Card'
import img from '../assets/spirulina.png'

export default function Cards() {
    //const [Cards, setCards] = useState([])

    const arrayCards = [
        {
            id: '1',
            img: img,
            nameProduct: 'Спирулина ВЭЛ табл.',
            nameMaker: 'В-МИН ООО/ ДИОД ПАО',
            price: '355.00'
        },
        {
            id: '1',
            img: img,
            nameProduct: 'Спирулина ВЭЛ табл.',
            nameMaker: 'В-МИН ООО/ ДИОД ПАО',
            price: '355.00'
        },
        {
            id: '1',
            img: img,
            nameProduct: 'Спирулина ВЭЛ табл.',
            nameMaker: 'В-МИН ООО/ ДИОД ПАО',
            price: '355.00'
        },
        {
            id: '1',
            img: img,
            nameProduct: 'Спирулина ВЭЛ табл.',
            nameMaker: 'В-МИН ООО/ ДИОД ПАО',
            price: '355.00'
        }, {
            id: '1',
            img: img,
            nameProduct: 'Спирулина ВЭЛ табл.',
            nameMaker: 'В-МИН ООО/ ДИОД ПАО',
            price: '355.00'
        },
        {
            id: '1',
            img: img,
            nameProduct: 'Спирулина ВЭЛ табл.',
            nameMaker: 'В-МИН ООО/ ДИОД ПАО',
            price: '355.00'
        },
        {
            id: '1',
            img: img,
            nameProduct: 'Спирулина ВЭЛ табл.',
            nameMaker: 'В-МИН ООО/ ДИОД ПАО',
            price: '355.00'
        },
        {
            id: '1',
            img: img,
            nameProduct: 'Спирулина ВЭЛ табл.',
            nameMaker: 'В-МИН ООО/ ДИОД ПАО',
            price: '355.00'
        },
        {
            id: '1',
            img: img,
            nameProduct: 'Спирулина ВЭЛ табл.',
            nameMaker: 'В-МИН ООО/ ДИОД ПАО',
            price: '355.00'
        },
        {
            id: '1',
            img: img,
            nameProduct: 'Спирулина ВЭЛ табл.',
            nameMaker: 'В-МИН ООО/ ДИОД ПАО',
            price: '355.00'
        }
    ]
    return (

        <div>
            <div className="container_cards">
                {
                    arrayCards.map((e) => {
                        return <Card key={e.id} nameProduct={e.nameProduct} img={e.img} nameMaker={e.nameMaker} price={e.price} />
                    })
                }
            </div>
        </div>
    )
}

