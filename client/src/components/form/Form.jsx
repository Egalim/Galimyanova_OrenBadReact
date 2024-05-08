import React, { useState } from 'react'
import './Form.css'

export default function Form() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
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
    
      const handleSubmit = (e) => {
        e.preventDefault();
        //вызов функции для отправки данных на сервер
        console.log('Отправка данных:', formData);
      };

  return (
    <div>
        <div className="container-message">
              <div className="form-at">
                <div className="validate-input-at w-50" data-validate="Обязательное поле">
                  <input
                    className="input-at"
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <span className="focus-input-at"></span>
                </div>
                <div className="validate-input-at w-50" data-validate="Обязательное поле">
                  <input
                    className="input-at"
                    type="text"
                    name="email"
                    placeholder="Ваш email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <span className="focus-input-at"></span>
                </div>
                <div className="validate-input-at" data-validate="Обязательное поле">
                  <textarea
                    className="input-at"
                    name="message"
                    placeholder="Ваше сообщение"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
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
                  <a href="#rules" style={{borderBottom: '1px solid'}}>пользовательским соглашением</a>
                </label>
                <input type="hidden" name="subject" value="Тема формы" />
                <button
                  id="submit-at"
                  className={`form-at-btn `}
                  disabled={!isCheckboxChecked}
                  onClick={handleSubmit}>
                  <h3 className="lettering_semi_bold"> Отправить</h3>
                </button>
              </div>
              <div className="result-at"></div>
            </div>

    </div>
  )
}

