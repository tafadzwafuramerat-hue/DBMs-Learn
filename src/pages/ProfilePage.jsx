import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiAlertCircle, FiCheckCircle, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'
import './Dashboard.css'

export default function ProfilePage() {
  const { user, profile, refreshProfile, signOut } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [detailsMessage, setDetailsMessage] = useState(null)
  const [savingDetails, setSavingDetails] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState(null)
  const [savingPassword, setSavingPassword] = useState(false)

  useEffect(() => {
    setFullName(profile?.full_name || '')
    setEmail(profile?.email || user?.email || '')
  }, [profile, user])

  const joinedLabel = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
    : ''

  const initials = (fullName || user?.email || '?')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleSaveDetails = async (e) => {
    e.preventDefault()
    setDetailsMessage(null)

    if (!fullName.trim() || !email.trim()) {
      setDetailsMessage({ type: 'error', text: 'Full name and email cannot be empty.' })
      return
    }

    setSavingDetails(true)
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName.trim(), email: email.trim() })
      .eq('id', user.id)
    setSavingDetails(false)

    if (error) {
      setDetailsMessage({ type: 'error', text: error.message })
      return
    }

    await refreshProfile()
    setDetailsMessage({ type: 'success', text: 'Your details were saved.' })
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setPasswordMessage(null)

    if (!currentPassword.trim() || !newPassword.trim() || !confirmNewPassword.trim()) {
      setPasswordMessage({
        type: 'error',
        text: 'Please fill in your current password, new password, and confirmation.',
      })
      return
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters.' })
      return
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' })
      return
    }

    setSavingPassword(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setSavingPassword(false)

    if (error) {
      setPasswordMessage({ type: 'error', text: error.message })
      return
    }

    setCurrentPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
    setPasswordMessage({ type: 'success', text: 'Your password was updated.' })
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>Profile</h1>
        <p>Your account details</p>
      </div>

      <div className="card profile-header-card">
        <div className="avatar-circle">{initials}</div>
        <div>
          <h3>{fullName || 'Your name'}</h3>
          <p className="sub">Student · joined {joinedLabel}</p>
          <span className="change-photo">Change photo</span>
        </div>
      </div>

      <div className="card section-card">
        <h3>Edit Details</h3>
        {detailsMessage && (
          <div className={detailsMessage.type === 'error' ? 'form-error-banner' : 'form-success-banner'}>
            {detailsMessage.type === 'error' ? <FiAlertCircle size={16} /> : <FiCheckCircle size={16} />}
            <span>{detailsMessage.text}</span>
          </div>
        )}
        <form className="form-grid" onSubmit={handleSaveDetails}>
          <div className="plain-field">
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="plain-field">
            <label htmlFor="email">Email</label>
            <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <button type="submit" className="btn btn-primary" disabled={savingDetails}>
              {savingDetails ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <div className="card section-card">
        <h3>Change Password</h3>
        {passwordMessage && (
          <div className={passwordMessage.type === 'error' ? 'form-error-banner' : 'form-success-banner'}>
            {passwordMessage.type === 'error' ? <FiAlertCircle size={16} /> : <FiCheckCircle size={16} />}
            <span>{passwordMessage.text}</span>
          </div>
        )}
        <form className="form-grid" onSubmit={handleUpdatePassword}>
          <div className="plain-field">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="plain-field">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="plain-field">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-dark" disabled={savingPassword}>
              {savingPassword ? 'Updating…' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      <div className="card sign-out-card" onClick={handleSignOut}>
        <FiLogOut style={{ verticalAlign: 'middle', marginRight: 6 }} />
        Sign out
      </div>
    </div>
  )
}
