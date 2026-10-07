"use client";

import { useState } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data/mockData';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  verified: boolean;
};

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (email: string, password: string, role: UserRole) => {
    const found = mockUsers.find(u => u.email === email && u.role === role);
    if (found && !found.banned) {
      setUser({ id: found.id, name: found.name, email: found.email, role: found.role, phone: found.phone, verified: found.verified });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const switchRole = (role: UserRole) => {
    const found = mockUsers.find(u => u.role === role && !u.banned);
    if (found) {
      setUser({ id: found.id, name: found.name, email: found.email, role: found.role, phone: found.phone, verified: found.verified });
    }
  };

  return { user, login, logout, switchRole };
}
