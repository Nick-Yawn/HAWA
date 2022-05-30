import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import './Combo.css';

export default function LoginSignUpCombo() {
  return (
    <div className="auth-main">
    <div className="auth-forms-container">
      <LoginForm />
      <SignUpForm />
    </div>
    </div>
  )
}
