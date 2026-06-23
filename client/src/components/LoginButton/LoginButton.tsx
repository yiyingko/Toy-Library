import { useAuth0 } from '@auth0/auth0-react';
import './LoginButton.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button onClick={() => loginWithRedirect()} className="button__login">
      Log In
    </button>
  );
};

export default LoginButton;
