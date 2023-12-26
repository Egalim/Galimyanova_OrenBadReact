import React from 'react'
import './Btn.css'

export default function Btn({name_btn}) {
  return (
    <button className='button'><h3 className='lettering_semi_bold'>{name_btn}</h3></button>
  )
}

