import { useState } from 'react'
import { LuBrain } from 'react-icons/lu'
import { FiClock, FiStar } from 'react-icons/fi'
import { QUIZ_QUESTIONS } from '../data/lessons'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'
import './Dashboard.css'

const STAGE = { INTRO: 'intro', QUESTION: 'question', RESULT: 'result' }

export default function QuizPage() {
  const { user, refreshProfile } = useAuth()
  const [stage, setStage] = useState(STAGE.INTRO)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [saving, setSaving] = useState(false)

  const question = QUIZ_QUESTIONS[currentIndex]
  const isLast = currentIndex === QUIZ_QUESTIONS.length - 1

  const startQuiz = () => {
    setStage(STAGE.QUESTION)
    setCurrentIndex(0)
    setAnswers([])
    setSelected(null)
  }

  const chooseOption = (optionIndex) => {
    if (selected !== null) return
    setSelected(optionIndex)
  }

  const goNext = async () => {
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)

    if (isLast) {
      const correctCount = newAnswers.filter(
        (ans, i) => ans === QUIZ_QUESTIONS[i].answerIndex
      ).length
      const scorePercent = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100)

      if (user) {
        setSaving(true)
        await supabase
          .from('profiles')
          .update({ quiz_score: scorePercent })
          .eq('id', user.id)
        await refreshProfile()
        setSaving(false)
      }

      setStage(STAGE.RESULT)
      return
    }

    setCurrentIndex((i) => i + 1)
    setSelected(null)
  }

  const correctSoFar = answers.filter((ans, i) => ans === QUIZ_QUESTIONS[i].answerIndex).length
  const finalCorrect =
    answers.length === QUIZ_QUESTIONS.length
      ? correctSoFar
      : correctSoFar + (selected === question?.answerIndex ? 1 : 0)
  const finalScorePercent = Math.round((finalCorrect / QUIZ_QUESTIONS.length) * 100)

  return (
    <div className="page-container">
      <div className="page-heading">
        <h1>Quiz</h1>
        <p>Test what you know about databases and SQL.</p>
      </div>

      {stage === STAGE.INTRO && (
        <div className="card quiz-intro-card">
          <div className="quiz-icon-circle">
            <LuBrain />
          </div>
          <h3>DBMS Quick Quiz</h3>
          <p className="quiz-desc">
            {QUIZ_QUESTIONS.length} questions · about {QUIZ_QUESTIONS.length} minutes
          </p>
          <div className="quiz-meta-row">
            <span>
              <FiClock /> 5 min
            </span>
            <span>
              <FiStar /> Beginner level
            </span>
          </div>
          <button type="button" className="btn btn-primary" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      )}

      {stage === STAGE.QUESTION && question && (
        <div className="card quiz-question-card">
          <p className="quiz-progress-label">
            Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
          </p>
          <h3>{question.question}</h3>
          {question.options.map((option, i) => {
            let cls = 'quiz-option'
            if (selected !== null) {
              if (i === question.answerIndex) cls += ' correct'
              else if (i === selected) cls += ' incorrect'
            }
            return (
              <button
                type="button"
                key={option}
                className={cls}
                onClick={() => chooseOption(i)}
              >
                {option}
              </button>
            )
          })}
          <div className="quiz-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={selected === null || saving}
              onClick={goNext}
            >
              {isLast ? (saving ? 'Saving…' : 'Finish Quiz') : 'Next Question'}
            </button>
          </div>
        </div>
      )}

      {stage === STAGE.RESULT && (
        <div className="card quiz-result-card">
          <p className="quiz-desc">You scored</p>
          <div className="quiz-result-score">{finalScorePercent}%</div>
          <p className="quiz-desc">
            {finalCorrect} of {QUIZ_QUESTIONS.length} correct
          </p>
          <div style={{ marginTop: 20 }}>
            <button type="button" className="btn btn-primary" onClick={startQuiz}>
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
