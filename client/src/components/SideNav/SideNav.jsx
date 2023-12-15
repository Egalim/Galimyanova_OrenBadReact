import React from 'react'
import './SideNav.css'

export default function SideNav() {
    const sideNavArr = [{
        name: 'Аминоскислоты'
    },
    {
        name: 'Для иммуной системы'
    },
    {
        name: 'Для мам'
    },
    {
        name: 'Для детей и подростков'
    },
    {
        name: 'Для работы мозга'
    },
    {
        name: 'Для органов зрения'
    },
    {
        name: 'Для сердца, сосудов и вен'
    },
    {
        name: 'Для кожи, ногтей, волос'
    },
    {
        name: 'Для пищеварения'
    },
    {
        name: 'Для опорно-двигательного аппарата и суставов'
    },
    {
        name: 'Для мочеполовой ситемы'
    },
    {
        name: 'Другие'
    }]
  return (
    <div className='sideNav'>
        {
            sideNavArr.map((e) => {
                return (
                    <div class="sidenav_item">
                            <a href= '#'> 
                            <p>{e.name}</p>
                             </a>
                            <hr />
                        </div>
                )
            })
        }

    </div>
  )
}

