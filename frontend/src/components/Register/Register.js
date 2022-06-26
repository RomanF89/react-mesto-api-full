import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Register({ handleRegister }) {

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;
    handleRegister(email, password);
  }

  return (
    <div onSubmit={handleSubmit} className="registration__container">
      <form name="registration-form" className="registration__form">
        <h2 className="registration__title">Регистрация</h2>
        <fieldset className="registration__field-container">
          <input id="user-mail" name="email" type="email" className="registration__field "
            required placeholder="Email" onChange={handleChange}></input>
          <input id="user-password" name="password" type="password" className="registration__field "
            required placeholder="Пароль" onChange={handleChange}></input>
        </fieldset>
        <button type="submit" className="registration__submit-button" aria-label="Зарегистрироваться">Зарегистрироваться</button>
        <div className="registration__login-redirect">Уже зарегистрированы?
          <Link className="registration__login-redirect_link"to="/sign-in">Войти</Link></div>
      </form>
    </div>
  )
}

export default Register;
