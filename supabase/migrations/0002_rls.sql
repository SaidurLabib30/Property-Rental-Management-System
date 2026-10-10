-- 0002_rls.sql
-- Row Level Security policies.

-- Helper: is the current user an admin?
-- SECURITY DEFINER so the lookup against profiles does not re-trigger RLS
-- (which would recurse on the profiles policies).
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.applications enable row level security;
alter table public.payments enable row level security;
alter table public.complaints enable row level security;
alter table public.agreements enable row level security;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create policy "profiles_select_all"
  on public.profiles for select to authenticated using (true);
create policy "profiles_update_own"
  on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());
create policy "profiles_admin_all"
  on public.profiles for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- APPEND-RLS

-- ---------------------------------------------------------------------------
-- properties (publicly readable listings)
-- ---------------------------------------------------------------------------
create policy "properties_select_all"
  on public.properties for select using (true);
create policy "properties_insert_owner"
  on public.properties for insert to authenticated
  with check (owner_id = auth.uid());
create policy "properties_update_owner_agent_admin"
  on public.properties for update to authenticated
  using (owner_id = auth.uid() or agent_id = auth.uid() or public.is_admin())
  with check (owner_id = auth.uid() or agent_id = auth.uid() or public.is_admin());
create policy "properties_delete_owner_admin"
  on public.properties for delete to authenticated
  using (owner_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- applications
-- ---------------------------------------------------------------------------
create policy "applications_select_parties"
  on public.applications for select to authenticated
  using (tenant_id = auth.uid() or owner_id = auth.uid() or public.is_admin());
create policy "applications_insert_tenant"
  on public.applications for insert to authenticated
  with check (tenant_id = auth.uid());
create policy "applications_update_owner_admin"
  on public.applications for update to authenticated
  using (owner_id = auth.uid() or public.is_admin())
  with check (owner_id = auth.uid() or public.is_admin());
create policy "applications_delete_tenant_admin"
  on public.applications for delete to authenticated
  using (tenant_id = auth.uid() or public.is_admin());

-- APPEND-RLS-2

-- ---------------------------------------------------------------------------
-- payments (tenant, the property's owner, or admin)
-- ---------------------------------------------------------------------------
create policy "payments_select_parties"
  on public.payments for select to authenticated
  using (
    tenant_id = auth.uid()
    or public.is_admin()
    or exists (select 1 from public.properties p where p.id = payments.property_id and p.owner_id = auth.uid())
  );
create policy "payments_insert_parties"
  on public.payments for insert to authenticated
  with check (
    tenant_id = auth.uid()
    or public.is_admin()
    or exists (select 1 from public.properties p where p.id = payments.property_id and p.owner_id = auth.uid())
  );
create policy "payments_update_owner_admin"
  on public.payments for update to authenticated
  using (
    public.is_admin()
    or exists (select 1 from public.properties p where p.id = payments.property_id and p.owner_id = auth.uid())
  )
  with check (
    public.is_admin()
    or exists (select 1 from public.properties p where p.id = payments.property_id and p.owner_id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- complaints (author, the related property's owner, or admin)
-- ---------------------------------------------------------------------------
create policy "complaints_select_parties"
  on public.complaints for select to authenticated
  using (
    user_id = auth.uid()
    or public.is_admin()
    or exists (select 1 from public.properties p where p.id = complaints.property_id and p.owner_id = auth.uid())
  );
create policy "complaints_insert_own"
  on public.complaints for insert to authenticated
  with check (user_id = auth.uid());
create policy "complaints_update_parties"
  on public.complaints for update to authenticated
  using (
    user_id = auth.uid()
    or public.is_admin()
    or exists (select 1 from public.properties p where p.id = complaints.property_id and p.owner_id = auth.uid())
  )
  with check (
    user_id = auth.uid()
    or public.is_admin()
    or exists (select 1 from public.properties p where p.id = complaints.property_id and p.owner_id = auth.uid())
  );

-- APPEND-RLS-3

-- ---------------------------------------------------------------------------
-- agreements (tenant, owner, or admin)
-- ---------------------------------------------------------------------------
create policy "agreements_select_parties"
  on public.agreements for select to authenticated
  using (tenant_id = auth.uid() or owner_id = auth.uid() or public.is_admin());
create policy "agreements_insert_owner_admin"
  on public.agreements for insert to authenticated
  with check (owner_id = auth.uid() or public.is_admin());
create policy "agreements_update_owner_admin"
  on public.agreements for update to authenticated
  using (owner_id = auth.uid() or public.is_admin())
  with check (owner_id = auth.uid() or public.is_admin());
create policy "agreements_delete_owner_admin"
  on public.agreements for delete to authenticated
  using (owner_id = auth.uid() or public.is_admin());
