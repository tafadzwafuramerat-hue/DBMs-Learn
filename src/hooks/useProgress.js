import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { LESSONS } from '../data/lessons'
import { useAuth } from '../context/AuthContext'

// Merges the static lesson catalog with a user's saved progress rows
// from the `lesson_progress` table in Supabase.
export function useProgress() {
  const { user, profile } = useAuth()
  const [progressRows, setProgressRows] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setProgressRows([])
      setLoading(false)
      return
    }
    setLoading(true)
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', user.id)

    if (!error && data) {
      setProgressRows(data)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchProgress()
  }, [fetchProgress])

  const lessons = LESSONS.map((lesson) => {
    const row = progressRows.find((p) => p.lesson_id === lesson.id)
    return {
      ...lesson,
      percent: row?.percent ?? 0,
      completed: row?.completed ?? false,
    }
  })

  const completedCount = lessons.filter((l) => l.completed).length
  const overallPercent = Math.round(
    (lessons.reduce((sum, l) => sum + l.percent, 0) / (lessons.length * 100)) * 100
  )

  const inProgressLesson = lessons.find((l) => !l.completed && l.percent > 0)

  const setLessonProgress = async (lessonId, percent) => {
    if (!user) return
    const completed = percent >= 100
    const { error } = await supabase.from('lesson_progress').upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        percent,
        completed,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,lesson_id' }
    )
    if (!error) fetchProgress()
  }

  return {
    lessons,
    loading,
    completedCount,
    totalLessons: lessons.length,
    overallPercent,
    inProgressLesson,
    setLessonProgress,
    quizScore: profile?.quiz_score ?? null,
    dayStreak: profile?.day_streak ?? 0,
    timeSpentMinutes: profile?.time_spent_minutes ?? 0,
  }
}
