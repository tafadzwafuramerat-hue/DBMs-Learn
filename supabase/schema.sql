
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  email text not null,
  quiz_score int,
  day_streak int default 0,
  time_spent_minutes int default 0,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);



create table if not exists public.lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  lesson_id text not null,
  percent int default 0,
  completed boolean default false,
  updated_at timestamptz default now(),
  unique (user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "Users can view their own lesson progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own lesson progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own lesson progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id);
