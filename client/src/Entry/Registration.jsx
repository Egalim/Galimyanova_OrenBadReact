import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { regThunk } from "../redux/regSlice.js";
import Header from '../components/Header/Header.jsx';

export default function Reg() {
  const [Tel, setTel] = useState('');
  const [FullName, setFullName] = useState('');
  const [Pass, setPass] = useState('');
  const [ConfirmPass, setConfirmPass] = useState('');

  const regState = useSelector((state) => state.reg);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    message: '',
    checkbox: false,
  });
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [errors, setErrors] = useState({
    phone: false,
    fullName: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (type === 'checkbox') {
      setIsCheckboxChecked(checked);
    }
  };

  const nav = useNavigate();

  useEffect(() => {
    if (regState.message) {
      nav('/auth');
    }
  }, [regState, nav]);

  const handleName = (e) => {
    const input = e.target.value;
    const cleanedName = input.replace(/[^a-zA-Zа-яА-ЯёЁ -]/g, '');
    setFullName(cleanedName);
  };

  const formatPhoneNumber = (input) => {
    const numbers = input.replace(/\D/g, '');

    let formatted = '+7';
    if (numbers.length > 1) {
      formatted += `(${numbers.slice(1, 4)}`;
    }
    if (numbers.length > 4) {
      formatted += `)-${numbers.slice(4, 7)}`;
    }
    if (numbers.length > 7) {
      formatted += `-${numbers.slice(7, 9)}`;
    }
    if (numbers.length > 9) {
      formatted += `-${numbers.slice(9, 11)}`;
    }

    return formatted;
  };

  const handleChangePhone = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setTel(formatted);
    setErrors((prev) => ({ ...prev, phone: e.target.value.replace(/[^0-9+]/g, '').length <= 11 }));
  };

  const handleChangePassword = (e) => {
    const input = e.target.value;
    setPass(input);
    setErrors((prev) => ({ ...prev, password: input.length < 6 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (Pass !== ConfirmPass) {
      setErrors((prev) => ({ ...prev, confirmPassword: true }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: false }));
    }

    if (!FullName) {
      setErrors((prev) => ({ ...prev, fullName: true }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, fullName: false }));
    }

    if (!isCheckboxChecked) {
      setFormData((prevData) => ({
        ...prevData,
        message: 'Вы должны согласиться с пользовательским соглашением',
      }));
      valid = false;
    } else {
      setFormData((prevData) => ({
        ...prevData,
        message: '',
      }));
    }

    // Submit if valid
    if (valid) {
      dispatch(regThunk({
        tel: Tel,
        name: FullName,
        password: Pass,
      }));
    }
  };

  return (
    regState.loading ? <p>Loading...</p> :
    <>
      <Header />
      <div className='container'>
        <div className="content">
          <form className='form-at' onSubmit={handleSubmit}>
            <h1 className='txt_semi_bold lettering_semi_bold txt_white' style={{ marginBottom: "5vh" }}>Регистрация</h1>

            <div className="form-content">
              <label className='txt_white'>Введите номер телефона:</label>
                {errors.phone && <p className="txt_red"  style={{ margin: '10px 0' }}>Введите корректный номер телефона</p>}
              <div className="validate-input-at" data-validate="Обязательное поле">
                <input className="input-at"
                  placeholder="+7(XXX)-XXX-XX-XX"
                  type="tel"
                  id="Tel"
                  onChange={handleChangePhone}
                  name="Tel"
                  value={Tel}
                  required
                />
                <span className="focus-input-at"></span>
              </div>

              <label className='txt_white'>Введите вашу Фамилию Имя:</label>
                {errors.fullName && <p className="txt_red"  style={{ margin: '10px 0' }}>Введите ваше имя и фамилию</p>}
              <div className="validate-input-at" data-validate="Обязательное поле">
                <input className="input-at"
                  placeholder="Ваши Фамилия Имя:"
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={FullName}
                  onChange={handleName}
                  required
                />
                <span className="focus-input-at"></span>
              </div>

              <label className='txt_white'>Введите пароль:</label>
                {errors.password &&<p className="txt_red"  style={{ margin: '10px 0' }}>Пароль должен быть не менее 6 символов</p>}
              <div className="validate-input-at" data-validate="Обязательное поле">
                <input className="input-at"
                  placeholder="Ваш пароль:"
                  type="password"
                  id="password"
                  name="password"
                  value={Pass}
                  onChange={handleChangePassword}
                  required
                />
                <span className="focus-input-at"></span>
              </div>

              <label className='txt_white'>Повторите пароль:</label>
              <div className="validate-input-at" data-validate="Обязательное поле">
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

            <button className='form-at-btn lettering_semi_bold' disabled={!isCheckboxChecked} type="submit">
              Зарегистрироваться
            </button>
            {formData.message && <h3 style={{ color: '#CA7E7E', marginTop: '1vh' }}>{formData.message}</h3>}
            {regState.error && <p className="error-message">{regState.error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}