import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { authThunk } from '../redux/authSlice.js'
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import '../components/form/Form.css'

export default function Auth() {
    const [password, setPassword] = useState('')
    const [tel, setTel] = useState('')

    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const path = useLocation()

    return (
        authState.loading ? <p>Loading...</p> :
            <>
                <Header />
                <div className='container'>

                    <div className="content">

                        <form className='form-at'>
                            <h1 className='lettering_semi_bold txt_white' style={{ marginBottom: "5vh"}}>Авторизация</h1>
                            <div className="form-content">
                                <div className="validate-input-at " data-validate="Обязательное поле">
                                    <input className="input-at"
                                        placeholder="Введите номер телефона:"
                                        type="tel"
                                        id="tel"
                                        name="tel"
                                        value={tel}
                                        onChange={e => setTel(e.target.value)}
                                        required
                                    />
                                    <span className="focus-input-at"></span>
                                </div>
                                <div className="validate-input-at " data-validate="Обязательное поле">
                                    <input className="input-at"
                                        placeholder="Введите пароль:"
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
                                dispatch(authThunk({
                                    tel: tel,
                                    password: password
                                }))
                            }}>Войти</button><br></br>
                            <Link to={'/reg'}
                                className={path == "/reg" ? "location" : '' }><p style={{ marginTop: "1vh", color: "#F5F7F7" }}>Регистрация</p></Link>

                        </form>
                        {
                            authState.error ? <p>{authState.error}</p> : <></>
                        }
                    </div>
                </div>
            </>
    )
}

