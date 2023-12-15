import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg'
import user from '../../assets/icons/user.svg'
import cart from '../../assets/icons/cart.svg'

export default function Header() {
    return (
        <div className="header">
            <div class="container">
                <div className="logo">
                    <Link to='/'>
                        <img src={logo} alt='logo' />
                    </Link>
                </div>

                <ul className="nav txt_white">
                    <li><Link to='/'>Главная</Link></li>
                    <li><Link to='/article'>Про БАДы</Link></li>
                    <li><Link to='/contact'>Контакты</Link></li>
                </ul>

                <div className="icons">
                    <Link to='/account'><img src={user} /></Link>
                    <a href="account.html"><img src={cart} /></a>
                </div>
            </div>
        </div>
    )
}

