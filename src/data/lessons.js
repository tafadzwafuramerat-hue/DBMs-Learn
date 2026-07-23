import { LuBookCheck, LuLayers, LuKeyRound, LuGitBranch, LuZap } from 'react-icons/lu'

// Static lesson catalog. Per-user progress is stored in Supabase (lesson_progress table)
// and merged onto this list at render time.
export const LESSONS = [
  {
    id: 'what-is-a-database',
    order: 1,
    title: 'What is a Database?',
    level: 'Beginner',
    topics: 4,
    minutes: 20,
    icon: LuBookCheck,
  },
  {
    id: 'tables-and-rows',
    order: 2,
    title: 'Tables & Rows',
    level: 'Beginner',
    topics: 5,
    minutes: 30,
    icon: LuBookCheck,
  },
  {
    id: 'writing-sql-queries',
    order: 3,
    title: 'Writing SQL Queries',
    level: 'Beginner',
    topics: 6,
    minutes: 45,
    icon: LuLayers,
  },
  {
    id: 'primary-foreign-keys',
    order: 4,
    title: 'Primary & Foreign Keys',
    level: 'Beginner',
    topics: 4,
    minutes: 25,
    icon: LuKeyRound,
  },
  {
    id: 'joins-explained',
    order: 5,
    title: 'Joins Explained',
    level: 'Intermediate',
    topics: 5,
    minutes: 40,
    icon: LuGitBranch,
  },
  {
    id: 'database-design-basics',
    order: 6,
    title: 'Database Design Basics',
    level: 'Intermediate',
    topics: 6,
    minutes: 50,
    icon: LuZap,
  },
]

export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'What does DBMS stand for?',
    options: [
      'Database Management System',
      'Data Backup Management Service',
      'Digital Base Modeling Software',
      'Distributed Byte Mapping System',
    ],
    answerIndex: 0,
  },
  {
    id: 'q2',
    question: 'Which SQL statement is used to retrieve data?',
    options: ['UPDATE', 'SELECT', 'DELETE', 'INSERT'],
    answerIndex: 1,
  },
  {
    id: 'q3',
    question: 'A primary key must be:',
    options: ['Unique for every row', 'A text value', 'Always named "id"', 'Optional'],
    answerIndex: 0,
  },
  {
    id: 'q4',
    question: 'Which clause filters rows before grouping?',
    options: ['HAVING', 'ORDER BY', 'WHERE', 'GROUP BY'],
    answerIndex: 2,
  },
  {
    id: 'q5',
    question: 'A foreign key is used to:',
    options: [
      'Encrypt a column',
      'Link a row to a row in another table',
      'Speed up SELECT * queries',
      'Rename a table',
    ],
    answerIndex: 1,
  },
]
