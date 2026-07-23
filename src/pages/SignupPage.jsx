import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi'
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import { LuDatabase } from 'react-icons/lu'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function SignupPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [touchedInvalid, setTouchedInvalid] = useState({})

  const validate = () => {
    const missing = {}
    if (!fullName.trim()) missing.fullName = true
    if (!email.trim()) missing.email = true
    if (!password) missing.password = true
    if (!confirmPassword) missing.confirmPassword = true

    if (Object.keys(missing).length > 0) {
      setTouchedInvalid(missing)
      return 'Please fill in your full name, email, password, and confirm password before creating an account.'
    }

    setTouchedInvalid({})

    if (password.length < 6) {
      return 'Your password must be at least 6 characters long.'
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match. Please re-enter them.'
    }

    if (!agreed) {
      return 'Please agree to the Terms of Service and Privacy Policy to continue.'
    }

    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setSuccessMessage('')

    const validationMessage = validate()
    if (validationMessage) {
      setFormError(validationMessage)
      return
    }

    setSubmitting(true)
    const { error } = await signUp({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
    })
    setSubmitting(false)

    if (error) {
      setFormError(error.message)
      return
    }

    setSuccessMessage(
      'Account created! Check your email to confirm your address, then log in to start learning.'
    )
    setTimeout(() => navigate('/login'), 2500)
  }

  return (
    <div className="auth-page">
      <div className="auth-wrap">
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <LuDatabase />
          </div>
          <h1>Create an account</h1>
          <p>Start learning databases for free</p>
        </div>

        <div className="auth-card">
          {formError && (
            <div className="form-error-banner">
              <FiAlertCircle size={16} style={{ marginTop: 1, flexShrink: 0 }} />
              <span>{formError}</span>
            </div>
          )}
          {successMessage && (
            <div className="form-success-banner">
              <FiCheckCircle size={16} style={{ marginTop: 1, flexShrink: 0 }} />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="fullName">Full Name</label>
              <div className={`input-shell ${touchedInvalid.fullName ? 'invalid' : ''}`}>
                <HiOutlineUser className="leading-icon" />
                <input
                  id="fullName"
                  type="text"
                  placeholder="Amara Okonkwo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <div className={`input-shell ${touchedInvalid.email ? 'invalid' : ''}`}>
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
              <div className={`input-shell has-toggle ${touchedInvalid.password ? 'invalid' : ''}`}>
                <HiOutlineLockClosed className="leading-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
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

            <div className="field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={`input-shell ${touchedInvalid.confirmPassword ? 'invalid' : ''}`}>
                <HiOutlineLockClosed className="leading-icon" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <label className="terms-row">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
                <Link to="/privacy">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <div className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
