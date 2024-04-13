import React from 'react'
import './Navigate.css'
import { Link, useLocation, useParams } from 'react-router-dom'

export default function Navigate({ categoryProduct }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const categoryId = searchParams.get('categoryId');
    return (
        <p className="pathPage txt_grey">
            <Link className="linkHome" to={`/`}>Главная/ </Link>
            <Link className="linkHome" to={`../category/${categoryId}`}>{categoryProduct}</Link>
        </p>
    )
}