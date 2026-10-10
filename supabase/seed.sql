-- seed.sql
-- Demo data mirroring src/data/mockData.ts. Runs on `supabase db reset` (local).
-- NOTE: `supabase db push` does NOT run this file against a hosted project —
-- there, either run it manually in the SQL editor or just sign up fresh.
--
-- All demo accounts use the password: password123
-- If the auth.users/auth.identities inserts fail on your Supabase version,
-- comment out that block and create users through the app's /register page.

-- ---------------------------------------------------------------------------
-- Demo auth users (the on_auth_user_created trigger creates their profiles)
-- ---------------------------------------------------------------------------
insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
values
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'john@example.com',    crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name":"John Smith","role":"owner","phone":"+1 555-0101"}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated', 'sarah@example.com',   crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name":"Sarah Johnson","role":"tenant","phone":"+1 555-0102"}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000003', 'authenticated', 'authenticated', 'michael@example.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name":"Michael Brown","role":"agent","phone":"+1 555-0103"}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000004', 'authenticated', 'authenticated', 'emily@example.com',   crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name":"Emily Davis","role":"admin","phone":"+1 555-0104"}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000005', 'authenticated', 'authenticated', 'david@example.com',   crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name":"David Wilson","role":"owner","phone":"+1 555-0105"}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000006', 'authenticated', 'authenticated', 'jessica@example.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name":"Jessica Lee","role":"tenant","phone":"+1 555-0106"}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000007', 'authenticated', 'authenticated', 'robert@example.com',  crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name":"Robert Taylor","role":"agent","phone":"+1 555-0107"}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000008', 'authenticated', 'authenticated', 'laura@example.com',   crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name":"Laura Martinez","role":"tenant","phone":"+1 555-0108"}', now(), now())
on conflict (id) do nothing;

insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
values
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '{"sub":"00000000-0000-0000-0000-000000000001","email":"john@example.com"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '{"sub":"00000000-0000-0000-0000-000000000002","email":"sarah@example.com"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', '{"sub":"00000000-0000-0000-0000-000000000003","email":"michael@example.com"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', '{"sub":"00000000-0000-0000-0000-000000000004","email":"emily@example.com"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', '{"sub":"00000000-0000-0000-0000-000000000005","email":"david@example.com"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000006', '{"sub":"00000000-0000-0000-0000-000000000006","email":"jessica@example.com"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000007', '{"sub":"00000000-0000-0000-0000-000000000007","email":"robert@example.com"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000008', '{"sub":"00000000-0000-0000-0000-000000000008","email":"laura@example.com"}', 'email', now(), now(), now())
on conflict do nothing;

-- Mirror mock verified/banned flags (profiles were created by the trigger).
update public.profiles set verified = true;
update public.profiles set verified = false where email = 'david@example.com';
update public.profiles set banned = true where email = 'laura@example.com';

-- APPEND-SEED

-- ---------------------------------------------------------------------------
-- properties
-- ---------------------------------------------------------------------------
insert into public.properties (id, title, description, address, city, state, zip_code, country, price, bedrooms, bathrooms, area, property_type, status, images, amenities, owner_id, featured, created_at)
values
  ('10000000-0000-0000-0000-000000000001', 'Luxury Downtown Apartment', 'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views.', '123 Main St', 'New York', 'NY', '10001', 'USA', 3500, 2, 2, 1200, 'apartment', 'available', array['/images/p1-1.jpg','/images/p1-2.jpg'], array['WiFi','Parking','Gym','Pool','AC'], '00000000-0000-0000-0000-000000000001', true, '2024-01-20'),
  ('10000000-0000-0000-0000-000000000002', 'Cozy Studio in Brooklyn', 'Charming studio apartment perfect for young professionals.', '456 Oak Ave', 'Brooklyn', 'NY', '11201', 'USA', 1800, 1, 1, 500, 'studio', 'rented', array['/images/p2-1.jpg','/images/p2-2.jpg'], array['WiFi','Laundry'], '00000000-0000-0000-0000-000000000001', false, '2024-02-10'),
  ('10000000-0000-0000-0000-000000000003', 'Spacious Family House', 'Large 4-bedroom house with a backyard, perfect for families.', '789 Pine Rd', 'Los Angeles', 'CA', '90001', 'USA', 4500, 4, 3, 2500, 'house', 'available', array['/images/p3-1.jpg','/images/p3-2.jpg'], array['WiFi','Parking','Garden','AC','Heating'], '00000000-0000-0000-0000-000000000005', true, '2024-03-05'),
  ('10000000-0000-0000-0000-000000000004', 'Modern Condo with Ocean View', 'Elegant condo with breathtaking ocean views and modern amenities.', '101 Ocean Dr', 'Miami', 'FL', '33101', 'USA', 3200, 2, 2, 1100, 'condo', 'available', array['/images/p4-1.jpg','/images/p4-2.jpg'], array['WiFi','Pool','Gym','Security','AC'], '00000000-0000-0000-0000-000000000005', true, '2024-03-15'),
  ('10000000-0000-0000-0000-000000000005', 'Elegant Villa with Pool', 'Stunning villa with private pool and lush garden, ideal for luxury living.', '202 Palm Blvd', 'Orlando', 'FL', '32801', 'USA', 6000, 5, 4, 3500, 'villa', 'available', array['/images/p5-1.jpg','/images/p5-2.jpg'], array['WiFi','Pool','Garden','Parking','AC','Heating'], '00000000-0000-0000-0000-000000000001', false, '2024-04-01'),
  ('10000000-0000-0000-0000-000000000006', 'Commercial Office Space', 'Prime office space in the business district, fully furnished.', '300 Business Ave', 'Chicago', 'IL', '60601', 'USA', 5000, 0, 2, 2000, 'office', 'rented', array['/images/p6-1.jpg','/images/p6-2.jpg'], array['WiFi','Parking','Security','AC'], '00000000-0000-0000-0000-000000000005', false, '2024-04-10'),
  ('10000000-0000-0000-0000-000000000007', 'Charming Townhouse', 'Recently renovated townhouse in a quiet neighborhood.', '400 Maple St', 'Seattle', 'WA', '98101', 'USA', 2800, 3, 2, 1800, 'house', 'available', array['/images/p7-1.jpg','/images/p7-2.jpg'], array['WiFi','Parking','Garden'], '00000000-0000-0000-0000-000000000001', false, '2024-05-01'),
  ('10000000-0000-0000-0000-000000000008', 'Luxury Penthouse', 'Exclusive penthouse with rooftop terrace and panoramic views.', '500 High Rise Rd', 'San Francisco', 'CA', '94101', 'USA', 7500, 3, 3, 2200, 'apartment', 'available', array['/images/p8-1.jpg','/images/p8-2.jpg'], array['WiFi','Parking','Gym','Pool','AC','Security'], '00000000-0000-0000-0000-000000000005', true, '2024-05-15')
on conflict (id) do nothing;

-- APPEND-SEED-2

-- ---------------------------------------------------------------------------
-- applications
-- ---------------------------------------------------------------------------
insert into public.applications (id, property_id, tenant_id, owner_id, status, message, applied_at, updated_at)
values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'approved',     'I am interested in this apartment.', '2024-02-01', '2024-02-05'),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000005', 'pending',      'Looking for a family home.', '2024-05-20', '2024-05-20'),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000005', 'under_review', 'Would love to rent this condo.', '2024-05-25', '2024-05-26')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- payments
-- ---------------------------------------------------------------------------
insert into public.payments (id, property_id, tenant_id, amount, payment_date, status, method)
values
  ('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 3500, '2024-05-01', 'paid',    'Credit Card'),
  ('30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000006', 1800, '2024-05-05', 'paid',    'Bank Transfer'),
  ('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 3500, '2024-06-01', 'pending', 'Credit Card')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- complaints
-- ---------------------------------------------------------------------------
insert into public.complaints (id, user_id, property_id, subject, description, status, created_at, updated_at)
values
  ('40000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Leaking faucet', 'The kitchen faucet is leaking.', 'open',        '2024-05-10', '2024-05-10'),
  ('40000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000003', 'Broken AC',      'The AC is not working.',        'in_progress', '2024-05-15', '2024-05-16')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- agreements
-- ---------------------------------------------------------------------------
insert into public.agreements (id, property_id, tenant_id, owner_id, start_date, end_date, monthly_rent, security_deposit, status, created_at)
values
  ('50000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '2024-02-01', '2025-02-01', 3500, 7000, 'active', '2024-01-25'),
  ('50000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001', '2024-03-01', '2025-03-01', 1800, 3600, 'active', '2024-02-20')
on conflict (id) do nothing;
