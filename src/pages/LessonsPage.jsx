import { useNavigate } from 'react-router-dom'
import { LuCheck } from 'react-icons/lu'
import { useProgress } from '../hooks/useProgress'
import './Dashboard.css'

export default function LessonsPage() {
  const { lessons, loading } = useProgress()
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>Lessons</h1>
        <p>Work through these in order — each one builds on the last.</p>
      </div>

      {loading && <p style={{ color: 'var(--color-muted)', marginTop: 24 }}>Loading lessons…</p>}

      <div className="lessons-grid">
        {lessons.map((lesson) => {
          const Icon = lesson.icon
          const statusLabel = lesson.completed
            ? 'Completed'
            : lesson.percent > 0
            ? `${lesson.percent}% in progress`
            : 'Not started'

          return (
            <div
              key={lesson.id}
              className="card lesson-tile"
              onClick={() => navigate(`/lessons/${lesson.id}`)}
            >
              <div className="lesson-tile-top">
                <div className={`lesson-status-icon ${lesson.completed ? 'done' : ''}`}>
                  {lesson.completed ? <LuCheck /> : <Icon />}
                </div>
              </div>
              <div className="lesson-tile-meta-row">
                <span>#{String(lesson.order).padStart(2, '0')}</span>
                <span className={`badge ${lesson.level === 'Intermediate' ? 'intermediate' : ''}`}>
                  {lesson.level}
                </span>
              </div>
              <h4>{lesson.title}</h4>
              <p className="lesson-row-meta">
                {lesson.topics} topics · {lesson.minutes} min
              </p>
              <span className={`lesson-tile-status ${!lesson.completed && !lesson.percent ? 'not-started' : ''}`}>
                {lesson.completed && <LuCheck size={14} />} {statusLabel}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
