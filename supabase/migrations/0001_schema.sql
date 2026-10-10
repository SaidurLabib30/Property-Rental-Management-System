-- 0001_schema.sql
-- Core schema for the Property Rental & Management System.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Enums (mirror src/types/index.ts)
-- ---------------------------------------------------------------------------
create type public.user_role as enum ('owner', 'tenant', 'agent', 'admin');
create type public.property_type as enum ('apartment', 'house', 'condo', 'studio', 'villa', 'office');
create type public.property_status as enum ('available', 'rented', 'pending', 'maintenance');
create type public.application_status as enum ('pending', 'approved', 'rejected', 'under_review');
create type public.payment_status as enum ('paid', 'pending', 'overdue');
create type public.complaint_status as enum ('open', 'in_progress', 'resolved', 'closed');
create type public.agreement_status as enum ('active', 'expired', 'terminated');

-- ---------------------------------------------------------------------------
-- profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  email text not null,
  role public.user_role not null default 'tenant',
  phone text,
  avatar text,
  verified boolean not null default false,
  banned boolean not null default false,
  joined_date timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index profiles_email_key on public.profiles (lower(email));

-- APPEND-SCHEMA

-- ---------------------------------------------------------------------------
-- properties
-- ---------------------------------------------------------------------------
create table public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  address text not null default '',
  city text not null default '',
  state text not null default '',
  zip_code text not null default '',
  country text not null default '',
  price numeric(12, 2) not null default 0,
  bedrooms integer not null default 0,
  bathrooms integer not null default 0,
  area integer not null default 0,
  property_type public.property_type not null default 'apartment',
  status public.property_status not null default 'available',
  images text[] not null default '{}',
  amenities text[] not null default '{}',
  owner_id uuid not null references public.profiles (id) on delete cascade,
  agent_id uuid references public.profiles (id) on delete set null,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index properties_owner_id_idx on public.properties (owner_id);
create index properties_agent_id_idx on public.properties (agent_id);
create index properties_status_idx on public.properties (status);

-- ---------------------------------------------------------------------------
-- applications
-- ---------------------------------------------------------------------------
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties (id) on delete cascade,
  tenant_id uuid not null references public.profiles (id) on delete cascade,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  status public.application_status not null default 'pending',
  message text,
  applied_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index applications_tenant_id_idx on public.applications (tenant_id);
create index applications_owner_id_idx on public.applications (owner_id);
create index applications_property_id_idx on public.applications (property_id);

-- APPEND-SCHEMA-2

-- ---------------------------------------------------------------------------
-- payments
-- ---------------------------------------------------------------------------
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties (id) on delete cascade,
  tenant_id uuid not null references public.profiles (id) on delete cascade,
  amount numeric(12, 2) not null default 0,
  payment_date timestamptz not null default now(),
  status public.payment_status not null default 'pending',
  method text not null default '',
  created_at timestamptz not null default now()
);
create index payments_tenant_id_idx on public.payments (tenant_id);
create index payments_property_id_idx on public.payments (property_id);

-- ---------------------------------------------------------------------------
-- complaints
-- ---------------------------------------------------------------------------
create table public.complaints (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  property_id uuid references public.properties (id) on delete set null,
  subject text not null default '',
  description text not null default '',
  status public.complaint_status not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index complaints_user_id_idx on public.complaints (user_id);
create index complaints_property_id_idx on public.complaints (property_id);

-- ---------------------------------------------------------------------------
-- agreements
-- ---------------------------------------------------------------------------
create table public.agreements (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties (id) on delete cascade,
  tenant_id uuid not null references public.profiles (id) on delete cascade,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  start_date date not null,
  end_date date not null,
  monthly_rent numeric(12, 2) not null default 0,
  security_deposit numeric(12, 2) not null default 0,
  status public.agreement_status not null default 'active',
  created_at timestamptz not null default now()
);
create index agreements_tenant_id_idx on public.agreements (tenant_id);
create index agreements_owner_id_idx on public.agreements (owner_id);
create index agreements_property_id_idx on public.agreements (property_id);

-- APPEND-SCHEMA-3

-- ---------------------------------------------------------------------------
-- updated_at maintenance
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger properties_set_updated_at
  before update on public.properties
  for each row execute function public.set_updated_at();
create trigger applications_set_updated_at
  before update on public.applications
  for each row execute function public.set_updated_at();
create trigger complaints_set_updated_at
  before update on public.complaints
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Auto-create a profile whenever a new auth user signs up.
-- Reads name/role/phone from the signup metadata (options.data).
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, role, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    new.email,
    coalesce((new.raw_user_meta_data ->> 'role')::public.user_role, 'tenant'),
    new.raw_user_meta_data ->> 'phone'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
