-- Create profiles table
create table if not exists profiles (
  id uuid references auth.users(id) primary key,
  name text,
  site_name text,
  tagline text,
  bio text,
  avatar_url text,
  social_links jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Policies
create policy "Public can view profiles" on profiles for select using (true);
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);

-- Trigger for updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on profiles
for each row
execute function handle_updated_at();
