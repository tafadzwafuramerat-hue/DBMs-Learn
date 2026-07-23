import { Link, useNavigate } from 'react-router-dom'
import { FiChevronRight, FiPlay } from 'react-icons/fi'
import { LuBookOpen, LuGlobe, LuTrophy, LuCheck } from 'react-icons/lu'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../hooks/useProgress'
import './Dashboard.css'

export default function HomePage() {
  const { profile, user } = useAuth()
  const navigate = useNavigate()
  const { lessons, loading, completedCount, totalLessons, quizScore, dayStreak, inProgressLesson } =
    useProgress()

  const displayName = profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there'
  const continueLesson = inProgressLesson || lessons.find((l) => !l.completed)

  return (
    <div className="page-container">
      <div className="hero-panel">
        <p className="hero-eyebrow">Welcome back, {displayName}</p>
        <h2>Keep learning — you're doing great.</h2>
        <p className="hero-sub">
          You've completed {completedCount} of {totalLessons} lessons. Pick up where you left off.
        </p>

        {continueLesson && (
          <div className="continue-card">
            <p className="eyebrow">Continue</p>
            <h3>{continueLesson.title}</h3>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${continueLesson.percent}%` }} />
            </div>
            <p className="percent-label">{continueLesson.percent}% complete</p>
          </div>
        )}

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => continueLesson && navigate(`/lessons/${continueLesson.id}`)}
        >
          <FiPlay /> Continue Lesson
        </button>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-icon">
            <LuBookOpen />
          </div>
          <div className="stat-value">
            {completedCount} / {totalLessons}
          </div>
          <div className="stat-label">Lessons Done</div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon">
            <LuGlobe />
          </div>
          <div className="stat-value">{quizScore != null ? `${quizScore}%` : '—'}</div>
          <div className="stat-label">Quiz Score</div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon">
            <LuTrophy />
          </div>
          <div className="stat-value">{dayStreak} days</div>
          <div className="stat-label">Day Streak</div>
        </div>
      </div>

      <div className="section-header-row">
        <h3>All Lessons</h3>
        <Link to="/lessons" className="view-all-link">
          View all <FiChevronRight />
        </Link>
      </div>

      <div className="lesson-list">
        {loading && <p style={{ color: 'var(--color-muted)' }}>Loading lessons…</p>}
        {!loading &&
          lessons.slice(0, 4).map((lesson) => {
            const Icon = lesson.icon
            return (
              <div
                key={lesson.id}
                className="card lesson-row"
                onClick={() => navigate(`/lessons/${lesson.id}`)}
              >
                <div className={`lesson-status-icon ${lesson.completed ? 'done' : ''}`}>
                  {lesson.completed ? <LuCheck /> : <Icon />}
                </div>
                <div className="lesson-row-body">
                  <h4>{lesson.title}</h4>
                  <p className="lesson-row-meta">
                    {lesson.topics} topics · {lesson.minutes} min
                  </p>
                  {lesson.percent > 0 && !lesson.completed && (
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${lesson.percent}%` }} />
                    </div>
                  )}
                </div>
                <FiChevronRight className="lesson-chevron" />
              </div>
            )
          })}
      </div>
    </div>
  )
}
