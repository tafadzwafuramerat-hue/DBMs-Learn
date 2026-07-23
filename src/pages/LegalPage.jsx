import { Link } from 'react-router-dom'

export default function LegalPage({ title, children }) {
  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>{title}</h1>
      </div>
      <div className="card" style={{ padding: 28, marginTop: 20, lineHeight: 1.7, color: 'var(--color-ink)' }}>
        {children}
      </div>
      <Link to="/signup" style={{ color: 'var(--color-teal-dark)', fontWeight: 600, display: 'inline-block', marginTop: 18 }}>
        Back to sign up
      </Link>
    </div>
  )
}
