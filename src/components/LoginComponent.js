import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'; 

const LoginComponent = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.includes('@') && password) {
      setIsLoggedIn(true);
    } else {
      setErrorMessage('Будь ласка, введіть дійсний email і пароль.');
    }
  };

  return (
    <div className="login-page container">
      <h1 className="text-center">Вікторина про квіти</h1>
      <p className="text-center">Перевірте свої знання про квіти!</p>
      <form id="loginForm" onSubmit={handleSubmit} className="form-group">
        <div className="login-field form-group">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введіть ваш email"
            className="form-control"
          />
        </div>
        <div className="login-field form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введіть ваш пароль"
            className="form-control"
          />
        </div>
        <Button type="submit" className="btn-login" variant="primary">Зареєструватися</Button> {}
      </form>
      {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
    </div>
  );
};

export default LoginComponent;
