import { useProgress } from '../hooks/useProgress'
import './Dashboard.css'

export default function ProgressPage() {
  const { lessons, loading, completedCount, totalLessons, overallPercent, dayStreak, quizScore, timeSpentMinutes } =
    useProgress()

  const timeLabel =
    timeSpentMinutes >= 60 ? `${Math.round(timeSpentMinutes / 60)}h` : `${timeSpentMinutes}m`

  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>My Progress</h1>
        <p>See how far you've come.</p>
      </div>

      <div className="overall-progress-panel">
        <p className="eyebrow">Overall progress</p>
        <div className="overall-progress-value">
          <span className="big-number">{overallPercent}%</span>
          <span className="sub-label">
            {completedCount} of {totalLessons} lessons done
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${overallPercent}%` }} />
        </div>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-value">{dayStreak}</div>
          <div className="stat-label">Day Streak</div>
          <div className="stat-label" style={{ fontSize: 11.5 }}>
            days in a row
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">{quizScore != null ? `${quizScore}%` : '—'}</div>
          <div className="stat-label">Quiz Score</div>
          <div className="stat-label" style={{ fontSize: 11.5 }}>
            last attempt
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">{timeLabel}</div>
          <div className="stat-label">Time Spent</div>
          <div className="stat-label" style={{ fontSize: 11.5 }}>
            total
          </div>
        </div>
      </div>

      <div className="card breakdown-card">
        <h3>Lesson breakdown</h3>
        {loading && <p style={{ color: 'var(--color-muted)' }}>Loading…</p>}
        {!loading &&
          lessons.map((lesson) => {
            const Icon = lesson.icon
            return (
              <div key={lesson.id} className="breakdown-row">
                <div className={`lesson-status-icon ${lesson.completed ? 'done' : ''}`}>
                  {lesson.completed ? '✓' : <Icon />}
                </div>
                <div className="breakdown-row-body">
                  <h4>{lesson.title}</h4>
                  <div className="progress-track" style={{ background: 'var(--color-border)' }}>
                    <div className="progress-fill" style={{ width: `${lesson.percent}%` }} />
                  </div>
                </div>
                <div className="breakdown-percent">{lesson.percent}%</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
