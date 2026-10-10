// mockData.ts
// In-memory placeholder/demo data used by the UI while the app is being built.
// It mirrors the real database tables (see supabase/migrations) and the shared
// types in src/types. Dashboard pages currently read from these arrays; they
// are the data source until each page is wired to the live Supabase API.
import { User, Property, Application, Payment, Complaint, Agreement } from '@/types';

// Demo user accounts, one or more per role (owner/tenant/agent/admin).
// `banned`/`verified` flags let the UI demonstrate those states.
export const mockUsers: User[] = [
  { id: 'u1', name: 'John Smith', email: 'john@example.com', role: 'owner', phone: '+1 555-0101', joinedDate: '2024-01-15', verified: true },
  { id: 'u2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'tenant', phone: '+1 555-0102', joinedDate: '2024-02-20', verified: true },
  { id: 'u3', name: 'Michael Brown', email: 'michael@example.com', role: 'agent', phone: '+1 555-0103', joinedDate: '2024-01-10', verified: true },
  { id: 'u4', name: 'Emily Davis', email: 'emily@example.com', role: 'admin', phone: '+1 555-0104', joinedDate: '2023-11-05', verified: true },
  { id: 'u5', name: 'David Wilson', email: 'david@example.com', role: 'owner', phone: '+1 555-0105', joinedDate: '2024-03-01', verified: false },
  { id: 'u6', name: 'Jessica Lee', email: 'jessica@example.com', role: 'tenant', phone: '+1 555-0106', joinedDate: '2024-03-12', verified: true },
  { id: 'u7', name: 'Robert Taylor', email: 'robert@example.com', role: 'agent', phone: '+1 555-0107', joinedDate: '2024-02-28', verified: true },
  { id: 'u8', name: 'Laura Martinez', email: 'laura@example.com', role: 'tenant', phone: '+1 555-0108', joinedDate: '2024-04-05', verified: true, banned: true },
];

// Demo property listings owned by the demo users above (owner ids like 'u1').
export const mockProperties: Property[] = [
  {
    id: 'p1', title: 'Luxury Downtown Apartment', description: 'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views.', address: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001', country: 'USA',
    price: 3500, bedrooms: 2, bathrooms: 2, area: 1200, propertyType: 'apartment', status: 'available', images: ['/images/p1.png'], amenities: ['WiFi', 'Parking', 'Gym', 'Pool', 'AC'], ownerId: 'u1', featured: true, createdAt: '2024-01-20'
  },
  {
    id: 'p2', title: 'Cozy Studio in Brooklyn', description: 'Charming studio apartment perfect for young professionals.', address: '456 Oak Ave', city: 'Brooklyn', state: 'NY', zipCode: '11201', country: 'USA',
    price: 1800, bedrooms: 1, bathrooms: 1, area: 500, propertyType: 'studio', status: 'rented', images: ['/images/p2.png'], amenities: ['WiFi', 'Laundry'], ownerId: 'u1', featured: false, createdAt: '2024-02-10'
  },
  {
    id: 'p3', title: 'Spacious Family House', description: 'Large 4-bedroom house with a backyard, perfect for families.', address: '789 Pine Rd', city: 'Los Angeles', state: 'CA', zipCode: '90001', country: 'USA',
    price: 4500, bedrooms: 4, bathrooms: 3, area: 2500, propertyType: 'house', status: 'available', images: ['/images/p3.png'], amenities: ['WiFi', 'Parking', 'Garden', 'AC', 'Heating'], ownerId: 'u5', featured: true, createdAt: '2024-03-05'
  },
  {
    id: 'p4', title: 'Modern Condo with Ocean View', description: 'Elegant condo with breathtaking ocean views and modern amenities.', address: '101 Ocean Dr', city: 'Miami', state: 'FL', zipCode: '33101', country: 'USA',
    price: 3200, bedrooms: 2, bathrooms: 2, area: 1100, propertyType: 'condo', status: 'available', images: ['/images/p4.png'], amenities: ['WiFi', 'Pool', 'Gym', 'Security', 'AC'], ownerId: 'u5', featured: true, createdAt: '2024-03-15'
  },
  {
    id: 'p5', title: 'Elegant Villa with Pool', description: 'Stunning villa with private pool and lush garden, ideal for luxury living.', address: '202 Palm Blvd', city: 'Orlando', state: 'FL', zipCode: '32801', country: 'USA',
    price: 6000, bedrooms: 5, bathrooms: 4, area: 3500, propertyType: 'villa', status: 'available', images: ['/images/p5.png'], amenities: ['WiFi', 'Pool', 'Garden', 'Parking', 'AC', 'Heating'], ownerId: 'u1', featured: false, createdAt: '2024-04-01'
  },
  {
    id: 'p6', title: 'Commercial Office Space', description: 'Prime office space in the business district, fully furnished.', address: '300 Business Ave', city: 'Chicago', state: 'IL', zipCode: '60601', country: 'USA',
    price: 5000, bedrooms: 0, bathrooms: 2, area: 2000, propertyType: 'office', status: 'rented', images: ['/images/p6.png'], amenities: ['WiFi', 'Parking', 'Security', 'AC'], ownerId: 'u5', featured: false, createdAt: '2024-04-10'
  },
  {
    id: 'p7', title: 'Charming Townhouse', description: 'Recently renovated townhouse in a quiet neighborhood.', address: '400 Maple St', city: 'Seattle', state: 'WA', zipCode: '98101', country: 'USA',
    price: 2800, bedrooms: 3, bathrooms: 2, area: 1800, propertyType: 'house', status: 'available', images: ['/images/p7.png'], amenities: ['WiFi', 'Parking', 'Garden'], ownerId: 'u1', featured: false, createdAt: '2024-05-01'
  },
  {
    id: 'p8', title: 'Luxury Penthouse', description: 'Exclusive penthouse with rooftop terrace and panoramic views.', address: '500 High Rise Rd', city: 'San Francisco', state: 'CA', zipCode: '94101', country: 'USA',
    price: 7500, bedrooms: 3, bathrooms: 3, area: 2200, propertyType: 'apartment', status: 'available', images: ['/images/p8.png'], amenities: ['WiFi', 'Parking', 'Gym', 'Pool', 'AC', 'Security'], ownerId: 'u5', featured: true, createdAt: '2024-05-15'
  },
];

// Demo rental applications linking a tenant to a property and its owner.
export const mockApplications: Application[] = [
  { id: 'a1', propertyId: 'p1', tenantId: 'u2', ownerId: 'u1', status: 'approved', message: 'I am interested in this apartment.', appliedAt: '2024-02-01', updatedAt: '2024-02-05' },
  { id: 'a2', propertyId: 'p3', tenantId: 'u6', ownerId: 'u5', status: 'pending', message: 'Looking for a family home.', appliedAt: '2024-05-20', updatedAt: '2024-05-20' },
  { id: 'a3', propertyId: 'p4', tenantId: 'u2', ownerId: 'u5', status: 'under_review', message: 'Would love to rent this condo.', appliedAt: '2024-05-25', updatedAt: '2024-05-26' },
];

// Demo rent payments, each tied to a property and the paying tenant.
export const mockPayments: Payment[] = [
  { id: 'pm1', propertyId: 'p1', tenantId: 'u2', amount: 3500, date: '2024-05-01', status: 'paid', method: 'Credit Card' },
  { id: 'pm2', propertyId: 'p2', tenantId: 'u6', amount: 1800, date: '2024-05-05', status: 'paid', method: 'Bank Transfer' },
  { id: 'pm3', propertyId: 'p1', tenantId: 'u2', amount: 3500, date: '2024-06-01', status: 'pending', method: 'Credit Card' },
];

// Demo maintenance complaints / support tickets filed by users.
export const mockComplaints: Complaint[] = [
  { id: 'c1', userId: 'u2', propertyId: 'p1', subject: 'Leaking faucet', description: 'The kitchen faucet is leaking.', status: 'open', createdAt: '2024-05-10', updatedAt: '2024-05-10' },
  { id: 'c2', userId: 'u6', propertyId: 'p3', subject: 'Broken AC', description: 'The AC is not working.', status: 'in_progress', createdAt: '2024-05-15', updatedAt: '2024-05-16' },
];

// Demo signed lease agreements between a tenant and an owner for a property.
export const mockAgreements: Agreement[] = [
  { id: 'ag1', propertyId: 'p1', tenantId: 'u2', ownerId: 'u1', startDate: '2024-02-01', endDate: '2025-02-01', monthlyRent: 3500, securityDeposit: 7000, status: 'active', createdAt: '2024-01-25' },
  { id: 'ag2', propertyId: 'p2', tenantId: 'u6', ownerId: 'u1', startDate: '2024-03-01', endDate: '2025-03-01', monthlyRent: 1800, securityDeposit: 3600, status: 'active', createdAt: '2024-02-20' },
];
