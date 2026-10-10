// types/index.ts
// Central TypeScript types shared across the whole app. These describe the
// shape of the main domain objects (users, properties, applications, payments,
// complaints, agreements) and the small string unions used for their statuses.
// Keeping them in one place keeps the UI, mock data, and API responses in sync.

// User roles in the system
export type UserRole = 'owner' | 'tenant' | 'agent' | 'admin';

// Property-related types
export type PropertyType = 'apartment' | 'house' | 'condo' | 'studio' | 'villa' | 'office';
export type PropertyStatus = 'available' | 'rented' | 'pending' | 'maintenance';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'under_review';

// User entity with authentication and profile data
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  avatar?: string;
  joinedDate: string;
  verified: boolean;
  banned?: boolean;
}

// Property listing entity with all details
export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: PropertyType;
  status: PropertyStatus;
  images: string[];
  amenities: string[];
  ownerId: string;
  agentId?: string;
  featured: boolean;
  createdAt: string;
}

// Rental application submitted by tenant
export interface Application {
  id: string;
  propertyId: string;
  tenantId: string;
  ownerId: string;
  status: ApplicationStatus;
  message: string;
  appliedAt: string;
  updatedAt: string;
}

// Payment record for rent collection
export interface Payment {
  id: string;
  propertyId: string;
  tenantId: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  method: string;
}

// Maintenance complaint or support request
export interface Complaint {
  id: string;
  userId: string;
  propertyId?: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
}

// Rental agreement between owner and tenant
export interface Agreement {
  id: string;
  propertyId: string;
  tenantId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit: number;
  status: 'active' | 'expired' | 'terminated';
  createdAt: string;
}

// Aggregated dashboard statistics
export interface DashboardStats {
  totalProperties: number;
  occupiedProperties: number;
  availableProperties: number;
  monthlyRentCollection: number;
  totalUsers: number;
  totalApplications: number;
  totalComplaints: number;
  totalAgreements: number;
}
