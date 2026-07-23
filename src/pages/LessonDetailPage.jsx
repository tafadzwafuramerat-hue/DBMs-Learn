import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import { useProgress } from '../hooks/useProgress'
import './Dashboard.css'

export default function LessonDetailPage() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { lessons, loading, setLessonProgress } = useProgress()

  const lesson = lessons.find((l) => l.id === lessonId)

  if (loading) {
    return (
      <div className="page-container">
        <p style={{ color: 'var(--color-muted)' }}>Loading lesson…</p>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="page-container">
        <p>Lesson not found.</p>
        <Link to="/lessons" className="view-all-link" style={{ marginTop: 12, display: 'inline-flex' }}>
          Back to lessons
        </Link>
      </div>
    )
  }

  const Icon = lesson.icon

  const markProgress = async (percent) => {
    await setLessonProgress(lesson.id, percent)
  }

  return (
    <div className="page-container">
      <button
        type="button"
        className="btn btn-ghost"
        style={{ marginBottom: 20 }}
        onClick={() => navigate('/lessons')}
      >
        <FiArrowLeft /> Back to lessons
      </button>

      <div className="page-heading">
        <h1>
          {lesson.title}
        </h1>
        <p>
          {lesson.topics} topics · {lesson.minutes} min · {lesson.level}
        </p>
      </div>

      <div className="card" style={{ padding: 28, marginTop: 20 }}>
        <div className={`lesson-status-icon ${lesson.completed ? 'done' : ''}`} style={{ marginBottom: 16 }}>
          {lesson.completed ? <FiCheck /> : <Icon />}
        </div>
        <p style={{ color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: 20 }}>
          This is a placeholder for the "{lesson.title}" lesson content. Connect your real
          lesson material here — text, code samples, or embedded exercises.
        </p>

        <div className="progress-track" style={{ background: 'var(--color-border)', maxWidth: 320 }}>
          <div className="progress-fill" style={{ width: `${lesson.percent}%` }} />
        </div>
        <p style={{ fontSize: 13, color: 'var(--color-muted)', margin: '8px 0 20px' }}>
          {lesson.percent}% complete
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-ghost" onClick={() => markProgress(50)}>
            Mark 50% done
          </button>
          <button type="button" className="btn btn-primary" onClick={() => markProgress(100)}>
            <FiCheck /> Mark as Complete
          </button>
        </div>
      </div>
    </div>
  )
}
