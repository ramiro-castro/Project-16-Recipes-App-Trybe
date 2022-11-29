// import { useState } from 'react';

// const INITIAL_USER_STATE = {
//  email: '',
// };

function Login() {
//  const [user, setUser] = useState(INITIAL_USER_STATE);

  return (
    <div>
      <input
        placeholder="Email"
        type="text"
        data-testid="email-input"
      />
      <input
        type="password"
        placeholder="Senha"
        data-testid="password-input"
      />
      <button data-testid="login-submit-btn" type="button">Enter</button>
    </div>
  );
}

export default Login;
