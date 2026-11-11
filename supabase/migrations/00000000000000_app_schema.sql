-- App schema in the shared "personal" Supabase project.
-- BEFORE APPLYING: replace every `starter` with this app's schema (same as APP.schema in
-- src/app.config.ts) and rename this file with a real timestamp. Never use `public`.
-- auth.users is shared with the other apps, so every policy also checks this app's own
-- allowlist via starter.is_owner(). Insert the owner by hand; never commit the email:
--   insert into starter.allowed_emails (email) values ('owner@example.com');

create schema if not exists starter;
grant usage on schema starter to authenticated, service_role;

create table starter.allowed_emails (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);
alter table starter.allowed_emails enable row level security;
-- No policies, no grants to authenticated: only is_owner() (security definer) reads it.

create or replace function starter.is_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from starter.allowed_emails a
    where a.email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function starter.is_owner() from public;
grant execute on function starter.is_owner() to authenticated, service_role;

create or replace function starter.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Example personal table. Pattern for every user-owned table: user_id default auth.uid(),
-- RLS on, one policy checking both the row owner and the allowlist.
create table starter.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id),
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger notes_touch before update on starter.notes
  for each row execute function starter.touch_updated_at();
alter table starter.notes enable row level security;
create policy own_rows on starter.notes for all to authenticated
  using (user_id = auth.uid() and starter.is_owner())
  with check (user_id = auth.uid() and starter.is_owner());
grant select, insert, update on starter.notes to authenticated;

grant all on all tables in schema starter to service_role;
-- Signed-out visitors get nothing in this schema.
revoke all on all tables in schema starter from anon;
revoke all on all functions in schema starter from anon;
