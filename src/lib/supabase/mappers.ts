import type {
  User,
  Property,
  Application,
  Payment,
  Complaint,
  Agreement,
  UserRole,
  PropertyType,
  PropertyStatus,
  ApplicationStatus,
} from "@/types";

/* ------------------------------------------------------------------ */
/* DB row shapes (snake_case, as returned by Supabase/Postgres)        */
/* ------------------------------------------------------------------ */

export interface ProfileRow {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string | null;
  avatar: string | null;
  verified: boolean;
  banned: boolean;
  joined_date: string;
}

export interface PropertyRow {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  price: number | string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  property_type: PropertyType;
  status: PropertyStatus;
  images: string[] | null;
  amenities: string[] | null;
  owner_id: string;
  agent_id: string | null;
  featured: boolean;
  created_at: string;
}

export interface ApplicationRow {
  id: string;
  property_id: string;
  tenant_id: string;
  owner_id: string;
  status: ApplicationStatus;
  message: string | null;
  applied_at: string;
  updated_at: string;
}

export interface PaymentRow {
  id: string;
  property_id: string;
  tenant_id: string;
  amount: number | string;
  payment_date: string;
  status: Payment["status"];
  method: string;
}

export interface ComplaintRow {
  id: string;
  user_id: string;
  property_id: string | null;
  subject: string;
  description: string;
  status: Complaint["status"];
  created_at: string;
  updated_at: string;
}

export interface AgreementRow {
  id: string;
  property_id: string;
  tenant_id: string;
  owner_id: string;
  start_date: string;
  end_date: string;
  monthly_rent: number | string;
  security_deposit: number | string;
  status: Agreement["status"];
  created_at: string;
}

/* APPEND-MAPPERS */

/* ------------------------------------------------------------------ */
/* Row -> API type (snake_case -> camelCase)                           */
/* ------------------------------------------------------------------ */

export const toUser = (r: ProfileRow): User => ({
  id: r.id,
  name: r.name,
  email: r.email,
  role: r.role,
  phone: r.phone ?? "",
  avatar: r.avatar ?? undefined,
  joinedDate: r.joined_date,
  verified: r.verified,
  banned: r.banned,
});

export const toProperty = (r: PropertyRow): Property => ({
  id: r.id,
  title: r.title,
  description: r.description,
  address: r.address,
  city: r.city,
  state: r.state,
  zipCode: r.zip_code,
  country: r.country,
  price: Number(r.price),
  bedrooms: r.bedrooms,
  bathrooms: r.bathrooms,
  area: r.area,
  propertyType: r.property_type,
  status: r.status,
  images: r.images ?? [],
  amenities: r.amenities ?? [],
  ownerId: r.owner_id,
  agentId: r.agent_id ?? undefined,
  featured: r.featured,
  createdAt: r.created_at,
});

export const toApplication = (r: ApplicationRow): Application => ({
  id: r.id,
  propertyId: r.property_id,
  tenantId: r.tenant_id,
  ownerId: r.owner_id,
  status: r.status,
  message: r.message ?? "",
  appliedAt: r.applied_at,
  updatedAt: r.updated_at,
});

export const toPayment = (r: PaymentRow): Payment => ({
  id: r.id,
  propertyId: r.property_id,
  tenantId: r.tenant_id,
  amount: Number(r.amount),
  date: r.payment_date,
  status: r.status,
  method: r.method,
});

export const toComplaint = (r: ComplaintRow): Complaint => ({
  id: r.id,
  userId: r.user_id,
  propertyId: r.property_id ?? undefined,
  subject: r.subject,
  description: r.description,
  status: r.status,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

export const toAgreement = (r: AgreementRow): Agreement => ({
  id: r.id,
  propertyId: r.property_id,
  tenantId: r.tenant_id,
  ownerId: r.owner_id,
  startDate: r.start_date,
  endDate: r.end_date,
  monthlyRent: Number(r.monthly_rent),
  securityDeposit: Number(r.security_deposit),
  status: r.status,
  createdAt: r.created_at,
});

/* APPEND-INPUT */

/* ------------------------------------------------------------------ */
/* API input (camelCase) -> DB columns (snake_case)                    */
/* `mapInput` copies only defined keys, so it works for both inserts    */
/* and partial PATCH updates.                                           */
/* ------------------------------------------------------------------ */

export function mapInput(
  input: Record<string, unknown>,
  fields: Record<string, string>
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [camel, snake] of Object.entries(fields)) {
    if (input[camel] !== undefined) out[snake] = input[camel];
  }
  return out;
}

export const PROPERTY_FIELDS: Record<string, string> = {
  title: "title",
  description: "description",
  address: "address",
  city: "city",
  state: "state",
  zipCode: "zip_code",
  country: "country",
  price: "price",
  bedrooms: "bedrooms",
  bathrooms: "bathrooms",
  area: "area",
  propertyType: "property_type",
  status: "status",
  images: "images",
  amenities: "amenities",
  ownerId: "owner_id",
  agentId: "agent_id",
  featured: "featured",
};

export const APPLICATION_FIELDS: Record<string, string> = {
  propertyId: "property_id",
  tenantId: "tenant_id",
  ownerId: "owner_id",
  status: "status",
  message: "message",
};

export const PAYMENT_FIELDS: Record<string, string> = {
  propertyId: "property_id",
  tenantId: "tenant_id",
  amount: "amount",
  date: "payment_date",
  status: "status",
  method: "method",
};

export const COMPLAINT_FIELDS: Record<string, string> = {
  userId: "user_id",
  propertyId: "property_id",
  subject: "subject",
  description: "description",
  status: "status",
};

export const AGREEMENT_FIELDS: Record<string, string> = {
  propertyId: "property_id",
  tenantId: "tenant_id",
  ownerId: "owner_id",
  startDate: "start_date",
  endDate: "end_date",
  monthlyRent: "monthly_rent",
  securityDeposit: "security_deposit",
  status: "status",
};

export const PROFILE_FIELDS: Record<string, string> = {
  name: "name",
  phone: "phone",
  avatar: "avatar",
  verified: "verified",
  banned: "banned",
  role: "role",
};
