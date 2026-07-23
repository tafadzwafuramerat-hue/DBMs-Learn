# DBMS Learn

A responsive React app (Vite + JSX + `react-router-dom` + `react-icons`) for a beginner
database-learning site, with authentication and data backed by **Supabase**.

## Features

- **Login** — signs an existing user in and sends them to the Home dashboard.
- **Sign up** — creates a new account. Requires full name, email, password, confirm
  password, **and** agreement to the Terms of Service / Privacy Policy. If anything is
  missing, the form shows a message telling the user exactly what to fill in and does
  **not** attempt to create the account.
- **Home / Lessons / Quiz / Progress / Profile** pages, matching the provided design,
  all reading and writing real data in Supabase once a user is logged in.
- Route protection: signed-out users are redirected to `/login`; signed-in users are
  redirected away from `/login` and `/signup` to Home.

## 1. Install dependencies

```bash
npm install
```

## 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In **Project Settings → API**, copy the **Project URL** and the **anon public key**.
3. Copy `.env.example` to `.env` and paste them in:

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

## 3. Create the database tables

Open the Supabase **SQL Editor** and run the contents of [`supabase/schema.sql`](./supabase/schema.sql).
This creates:

- `profiles` — full name, email, and summary stats (quiz score, streak, time spent),
  one row per user, protected by row-level security so users can only read/write their
  own row.
- `lesson_progress` — one row per `(user, lesson)` tracking percent complete.

## 4. (Recommended) Turn off "Confirm email" while developing

In **Authentication → Providers → Email**, you can disable "Confirm email" while
building locally so new sign-ups can log in immediately. Turn it back on before
shipping to real users.

## 5. Run the app

```bash
npm run dev
```

Visit the printed local URL. You'll land on `/login`. Use **Sign up free** to create
an account — the app validates that every field is filled in and that you've agreed to
the terms before it will submit to Supabase. Once signed up (and confirmed, if email
confirmation is on) you can log in and you'll be taken straight to the Home dashboard.

## Project structure

```
src/
  components/     Navbar, layout, route guards
  context/        AuthContext (Supabase session + profile)
  data/           Static lesson catalog + quiz questions
  hooks/          useProgress (merges lessons with Supabase progress)
  lib/            supabaseClient.js
  pages/          LoginPage, SignupPage, HomePage, LessonsPage, LessonDetailPage,
                  QuizPage, ProgressPage, ProfilePage, ForgotPasswordPage, ...
supabase/
  schema.sql      Run this in the Supabase SQL editor
```

## Build for production

```bash
npm run build
```
