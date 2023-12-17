import React from 'react'
import './Navigate.css'
import { Link } from 'react-router-dom'

export default function Navigate({categoryProduct}) {
    return (
        <p className="pathPage txt_grey">
            <Link className="linkHome" to={`/`}>Главная/ </Link>
            <Link className="linkHome" to={`/`}>{categoryProduct}</Link></p>
    )
}

