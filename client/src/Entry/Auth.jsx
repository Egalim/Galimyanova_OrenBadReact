import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { authThunk } from '../redux/authSlice.js'
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import '../components/form/Form.css'
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [password, setPassword] = useState('')
    const [tel, setTel] = useState('')
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate()

    const authState = useSelector((state) => state.auth)
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()

    const path = useLocation()

    useEffect(() => {
        if (redirect && token) {
            const lastVisitedPage = localStorage.getItem('lastVisitedPage') || '/';
            if (lastVisitedPage) {
                localStorage.removeItem('lastVisitedPage');
                navigate(lastVisitedPage);
            } else {
                navigate('/');
            }
        }
    }, [redirect, navigate, token]);



    return (
        authState.loading ? <p>Loading...</p> :
            <>
                <Header />
                <div className='container'>

                    <div className="content">

                        <form className='form-at'>
                            <h1 className='lettering_semi_bold txt_white' style={{ marginBottom: "5vh" }}>Авторизация</h1>
                            <div className="form-content">

                            <label className='txt_white'>Введите номер телефона:</label>
                                <div className="validate-input-at" data-validate="Обязательное поле">
                                    <input className="input-at"
                                        placeholder="+7(XXX)-XXX-XX-XX:"
                                        type="tel"
                                        id="tel"
                                        name="tel"
                                        value={tel}
                                        onChange={e => setTel(e.target.value)}
                                        required
                                    />
                                    <span className="focus-input-at"></span>
                                </div>

                                <label className='txt_white'>Введите пароль:</label>
                                <div className="validate-input-at" data-validate="Обязательное поле">
                                    <input className="input-at"
                                        placeholder="Ваш пароль:"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                    <span className="focus-input-at"></span>
                                </div>
                            </div>

                            <button className='form-at-btn lettering_semi_bold' type="submit" onClick={() => {
                                if (!redirect) {
                                    dispatch(authThunk({
                                        tel: tel,
                                        password: password
                                    })).then(() => {
                                        setRedirect(true);
                                    });
                                }
                            }}>Войти</button><br></br>
                            {
                                authState.error ? <p style={{color: '#CA7E7E', marginTop: '1vh'}}>{authState.error}</p> : <></>
                            }
                            <Link to={'/reg'}
                                className={path == "/reg" ? "location" : ''}>
                                <p style={{ marginTop: "2vh", color: "#F5F7F7" }}>Регистрация</p>
                            </Link>

                        </form>

                    </div>
                </div>
            </>
    )
}

