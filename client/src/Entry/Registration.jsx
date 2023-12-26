import React, { useState } from 'react'

export default function Registration() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Проведем простую проверку данных
        if (login && password) {
            alert(`Данные отправлены: Логин - ${login}, Пароль - ${password}`);
            // Здесь обычно вы бы отправили данные на сервер для регистрации/авторизации
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    };

    const toggleForm = () => {
        setIsRegistered(!isRegistered);
    };
    return (
        <div className="app">
            <h1>{isRegistered ? 'Вход' : 'Регистрация'}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Логин:
                    <input type="text" value={login} onChange={handleLoginChange} />
                </label>
                <label>
                    Пароль:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <button type="submit">{isRegistered ? 'Войти' : 'Зарегистрироваться'}</button>
            </form>
            <p>
                {isRegistered ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                <button type="button" onClick={toggleForm}>
                    {isRegistered ? 'Зарегистрироваться' : 'Войти'}
                </button>
            </p>
        </div>
    );
};

