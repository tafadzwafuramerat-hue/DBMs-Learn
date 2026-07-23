import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="loading-screen" style={{ flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}>Page not found</h2>
      <Link to="/" style={{ color: 'var(--color-teal-dark)', fontWeight: 600 }}>
        Back to home
      </Link>
    </div>
  )
}
