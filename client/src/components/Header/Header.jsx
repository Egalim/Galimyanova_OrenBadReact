import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/authSlice'
import logo from '../../assets/icons/logo.svg'
import user from '../../assets/icons/user.svg'
import cart from '../../assets/icons/cart.svg'
import { useSelector } from 'react-redux';
import { RiCloseFill } from "react-icons/ri";

export default function Header() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [timerId, setTimerId] = useState(null);


    const handleCartClick = () => {
        if (!token) {
            setIsModalOpen(true);
        } else {
            navigate("/basket");
        }
    };


    const handleMouseEnter = () => {
        setIsOpen(true);
        clearTimeout(timerId); // Очищаем предыдущий таймер, если он был запущен
    };

    const handleMouseLeave = () => {
        // Устанавливаем таймер для закрытия списка через 300 миллисекунд (0.3 секунды)
        const id = setTimeout(() => {
            setIsOpen(false);
        }, 700);
        setTimerId(id);
    };



    return (
        <div className="header">
            <div className="container">
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
                    <button onClick={handleCartClick}>
                        <img src={cart} alt="Cart" />
                    </button>

                    <div className="dropdown">
                        <button className="dropdown-toggle" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <img src={user}></img>
                        </button>
                        {isOpen && (
                            <div className="dropdown-menu">
                                {token ? (
                                    <>
                                        <Link to="/account"><p>Личный кабинет</p></Link>
                                        <button onClick={() => {
                                            dispatch(logOut())
                                        }}><p className=' txt_semi_bold'>Выйти</p></button>
                                    </>
                                ) : (
                                    <p>
                                        <Link to='/auth'>Войти</Link>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {!token && isModalOpen && (
                <div className="modal_container">
                    <div className="modal">
                        <button className='close_btn' onClick={() => setIsModalOpen(false)}>
                        <RiCloseFill className='close'/>
                        </button>
                        <h2 className='txt_white lettering_semi_bold'>Для доступа к корзине необходимо авторизоваться</h2>
                        <button className='my_button' onClick={() => { navigate('/auth') }}> <h3 className='lettering_semi_bold'>Перейти к авторизации</h3></button>
                    </div>
                </div>
            )}
        </div >
    )
}

