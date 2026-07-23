import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi'
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi'
import { LuDatabase } from 'react-icons/lu'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    // Require full credentials before attempting to log in.
    if (!email.trim() || !password.trim()) {
      setFormError('Please enter both your email and password to log in.')
      return
    }

    setSubmitting(true)
    const { error } = await signIn({ email: email.trim(), password })
    setSubmitting(false)

    if (error) {
      setFormError(
        error.message?.toLowerCase().includes('invalid')
          ? 'That email or password is incorrect. Please try again.'
          : error.message
      )
      return
    }

    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="auth-page">
      <div className="auth-wrap">
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <LuDatabase />
          </div>
          <h1>DBMS Learn</h1>
          <p>Your beginner-friendly database learning site</p>
        </div>

        <div className="auth-card">
          {formError && (
            <div className="form-error-banner">
              <FiAlertCircle size={16} style={{ marginTop: 1, flexShrink: 0 }} />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">Email</label>
              <div className={`input-shell ${!email && formError ? 'invalid' : ''}`}>
                <HiOutlineMail className="leading-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className={`input-shell has-toggle ${!password && formError ? 'invalid' : ''}`}>
                <HiOutlineLockClosed className="leading-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-toggle-btn"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="field-row-between">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'Logging in…' : 'Log in'}
            </button>
          </form>

          <div className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up free</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
