import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { regThunk } from "../redux/regSlice.js"
import Header from '../components/Header/Header.jsx'

export default function Reg() {
  const [Tel, setTel] = useState('')
  const [FullName, setFullName] = useState('')
  const [Pass, setPass] = useState('')
  const [ConfirmPass, setConfirmPass] = useState('')

  const regState = useSelector((state) => state.reg)
  const dispatch = useDispatch(); // Добавляем dispatch

  const [formData, setFormData] = useState({
    message: '',
    checkbox: false,
  });
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : e.target.value,
    });
    setIsCheckboxChecked(checked);
  };

  const nav = useNavigate()

  useEffect(() => {
    if (regState.message) {
      nav('/auth')
    }
  }, [regState])

  return (
    regState.loading ? <p>Loading...</p> :
      <>
        <Header />
        <div className='container'>

          <div className="content">

            <form className='form-at' onSubmit={(e) => {
              e.preventDefault(); 
              if (Pass !== ConfirmPass) {
                setFormData({
                  ...formData,
                  message: 'Пароли не совпадают',
                });
              } else {
                dispatch(regThunk({
                  tel: Tel,
                  name: FullName,
                  password: Pass
                }));
              }}
            } >
              <h1 className='txt_semi_bold lettering_semi_bold txt_white' style={{ marginBottom: "5vh" }}>Регистрация</h1>
              <div className="form-content">
                <div className="validate-input-at " data-validate="Обязательное поле">
                  <input className="input-at"
                    placeholder="Введите номер телефона:"
                    type="Tel"
                    id="Tel"
                    onChange={e => setTel(e.target.value)}
                    name="Tel"
                    value={Tel}
                    required
                  />
                  <span className="focus-input-at"></span>
                </div>
                <div className="validate-input-at " data-validate="Обязательное поле">
                  <input className="input-at"
                    placeholder="Введите вашу Фамилию Имя:"
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={FullName}
                    onChange={e => setFullName(e.target.value)}
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
                    value={Pass}
                    onChange={e => setPass(e.target.value)}
                    required
                  />
                  <span className="focus-input-at"></span>
                </div>
                <div className="validate-input-at " data-validate="Обязательное поле">
                  <input className="input-at"
                    placeholder="Повторите пароль:"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={ConfirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    required
                  />
                  <span className="focus-input-at"></span>
                </div>
                <input
                  className="input-at"
                  id="checkbox-at"
                  type="checkbox"
                  name="checkbox"
                  checked={formData.checkbox}
                  onChange={handleChange}
                />
                <label htmlFor="checkbox-at">
                  Настоящим подтверждаю, что я ознакомлен и согласен с{' '}
                  <a href="#rules" style={{ borderBottom: '1px solid' }}>пользовательским соглашением</a>
                </label>
                <input type="hidden" name="subject" value="Тема формы" />
              </div>
              <button className='form-at-btn lettering_semi_bold'
                disabled={!isCheckboxChecked} type="submit" >
                Зарегистрироваться
              </button>
              {formData.message && <h3 style={{color: '#CA7E7E', marginTop: '1vh'}}>{formData.message}</h3>}
            </form>
            {
              regState.error ? <p>{regState.error}</p> : <></>
            }
          </div>
        </div>
      </>
  )
}