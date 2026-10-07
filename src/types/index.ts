export type UserRole = 'owner' | 'tenant' | 'agent' | 'admin';

export type PropertyType = 'apartment' | 'house' | 'condo' | 'studio' | 'villa' | 'office';
export type PropertyStatus = 'available' | 'rented' | 'pending' | 'maintenance';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'under_review';

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

export interface Payment {
  id: string;
  propertyId: string;
  tenantId: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  method: string;
}

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
