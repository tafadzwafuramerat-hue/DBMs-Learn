import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMail } from 'react-icons/hi'
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import {LuDatabase} from 'react-icons/lu'
import { supabase } from '../lib/supabaseClient'
import './Auth.css'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your account email address.' })
      return
    }

    setSubmitting(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim())
    setSubmitting(false)

    if (error) {
      setMessage({ type: 'error', text: error.message })
      return
    }

    setMessage({ type: 'success', text: 'Check your email for a password reset link.' })
  }

  return (
    <div className="auth-page">
      <div className="auth-wrap">
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <LuDatabase />
          </div>
          <h1>Reset your password</h1>
          <p>We'll email you a link to get back in</p>
        </div>

        <div className="auth-card">
          {message && (
            <div className={message.type === 'error' ? 'form-error-banner' : 'form-success-banner'}>
              {message.type === 'error' ? <FiAlertCircle size={16} /> : <FiCheckCircle size={16} />}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">Email</label>
              <div className="input-shell">
                <HiOutlineMail className="leading-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send reset link'}
            </button>
          </form>

          <div className="auth-switch">
            <Link to="/login">Back to log in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
