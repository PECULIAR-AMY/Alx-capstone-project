import { useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail, UserRound, UtensilsCrossed } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const passwordMessage = 'Use at least 8 characters, including a number.';

const AuthPage = ({ mode }) => {
  const isSignUp = mode === 'signup';
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setFormError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSignUp && form.name.trim().length < 2) return setFormError('Please enter your name.');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setFormError('Enter a valid email address.');
    if (isSignUp && !/(?=.*\d).{8,}/.test(form.password)) return setFormError(passwordMessage);
    setIsSubmitting(true);
    try {
      if (isSignUp) await signUp(form);
      else await signIn(form);
      navigate(location.state?.from?.pathname || '/');
    } catch (error) {
      setFormError(error.message || 'We could not complete that request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-intro" aria-label="Recipe Finder welcome">
        <Link to="/" className="auth-brand"><UtensilsCrossed size={28} /> Recipe Finder</Link>
        <div>
          <p className="auth-kicker">YOUR NEXT FAVORITE DISH</p>
          <h1>Good food starts with a great idea.</h1>
          <p>Save recipes you love and keep your kitchen inspiration close at hand.</p>
        </div>
      </section>
      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-card-heading">
            <span className="auth-icon"><LockKeyhole size={22} /></span>
            <h2>{isSignUp ? 'Create your account' : 'Welcome back'}</h2>
            <p>{isSignUp ? 'Start saving recipes in a few seconds.' : 'Sign in to continue cooking with us.'}</p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            {isSignUp && <label className="auth-label">Name<div className="auth-field"><UserRound size={18} /><input name="name" autoComplete="name" value={form.name} onChange={updateField} placeholder="Your name" required /></div></label>}
            <label className="auth-label">Email address<div className="auth-field"><Mail size={18} /><input name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} placeholder="you@example.com" required /></div></label>
            <label className="auth-label">Password<div className="auth-field"><LockKeyhole size={18} /><input name="password" type={showPassword ? 'text' : 'password'} autoComplete={isSignUp ? 'new-password' : 'current-password'} value={form.password} onChange={updateField} placeholder="••••••••" required /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
            {isSignUp && <p className="auth-hint">{passwordMessage}</p>}
            {formError && <p className="auth-error" role="alert">{formError}</p>}
            <button className="auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}</button>
          </form>
          <p className="auth-switch">{isSignUp ? 'Already have an account?' : 'New to Recipe Finder?'} <Link to={isSignUp ? '/login' : '/signup'}>{isSignUp ? 'Sign in' : 'Create an account'}</Link></p>
        </div>
      </section>
    </main>
  );
};

AuthPage.propTypes = { mode: (props, propName, componentName) => ['login', 'signup'].includes(props[propName]) ? null : new Error(`Invalid ${propName} supplied to ${componentName}.`) };
export default AuthPage;
