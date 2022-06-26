import React, { useState } from 'react';


function Login({handleLogin}) {

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(inputs.email, inputs.password)
  }

  return (
    <div onSubmit={handleSubmit} className="login__container">
      <form name="login-form" className="login__form">
        <h2 className="login__title">Вход</h2>
        <fieldset className="login__field-container">
          <input id="user-mail" name="email" type="email" className="login__field" required placeholder="Email"
          onChange={handleChange}></input>
          <input id="user-password" name="password" type="password" className="login__field" required placeholder="Пароль"
          onChange={handleChange}></input>
        </fieldset>
        <button type="submit" className="login__submit-button" aria-label="Войти" >Войти</button>
      </form>
    </div>
  )
}

export default Login;
