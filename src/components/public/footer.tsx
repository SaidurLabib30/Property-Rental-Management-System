import Link from 'next/link';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-white">PropEase</span>
            </div>
            <p className="text-sm text-slate-400">
              Modern property rental and management platform connecting owners, tenants, and agents seamlessly.
            </p>
            <div className="flex gap-4">
              <Mail className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
              <Phone className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
              <MapPin className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/listings" className="hover:text-primary transition-colors">Properties</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/listings" className="hover:text-primary transition-colors">Rent Property</Link></li>
              <li><Link href="/listings" className="hover:text-primary transition-colors">Buy Property</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Property Management</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Consultation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Main Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 555-0100</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@propease.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center text-slate-500">
          <p> 2024 PropEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
