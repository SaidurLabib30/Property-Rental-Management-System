"use client";

// Owner "My Properties" page.
// Lets an owner view their property listings and add, edit, or delete them.
// All data lives in React state seeded from mock data, so changes are
// in-memory only and reset on page reload (no backend calls yet).

import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockProperties, mockUsers } from '@/data/mockData';
import { Property } from '@/types';
import { DashboardCard } from '@/components/dashboard/dashboard-card';
import { Building2, BedDouble, Bath, Square } from 'lucide-react';

export default function OwnerPropertiesPage() {
  // The list of properties shown, pre-filtered to those owned by user 'u1'.
  const [properties, setProperties] = useState(mockProperties.filter(p => p.ownerId === 'u1'));
  // Controls whether the add/edit dialog is open.
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Holds the property being edited; null means we are adding a new one.
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // The controlled values for every field in the add/edit form.
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    propertyType: 'apartment' as Property['propertyType'],
  });

  // Open the dialog in "add" mode: clear the editing target and reset the form.
  const openAddDialog = () => {
    setEditingProperty(null);
    setFormData({ title: '', description: '', address: '', city: '', state: '', zipCode: '', price: '', bedrooms: '', bathrooms: '', area: '', propertyType: 'apartment' });
    setIsDialogOpen(true);
  };

  // Open the dialog in "edit" mode: remember the property and pre-fill the form
  // from its values (numbers are turned into strings for the text inputs).
  const openEditDialog = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description,
      address: property.address,
      city: property.city,
      state: property.state,
      zipCode: property.zipCode,
      price: property.price.toString(),
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area: property.area.toString(),
      propertyType: property.propertyType,
    });
    setIsDialogOpen(true);
  };

  // Handle the form submission for both adding and editing.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProperty) {
      // Editing: replace the matching property with the updated field values,
      // converting the numeric fields back from strings to numbers.
      setProperties(prev => prev.map(p => p.id === editingProperty.id ? { ...p, ...formData, price: Number(formData.price), bedrooms: Number(formData.bedrooms), bathrooms: Number(formData.bathrooms), area: Number(formData.area) } : p));
    } else {
      // Adding: build a brand-new property object with sensible defaults
      // and a unique id based on the current timestamp.
      const newProperty: Property = {
        id: `p${Date.now()}`,
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        status: 'available',
        images: ['/images/placeholder.jpg'],
        amenities: ['WiFi'],
        ownerId: 'u1',
        featured: false,
        createdAt: new Date().toISOString(),
        country: 'USA',
      };
      setProperties(prev => [...prev, newProperty]);
    }
    // Close the dialog once the add/edit is done.
    setIsDialogOpen(false);
  };

  // Remove a property from the list by filtering out the matching id.
  const handleDelete = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header row: page title on the left, "Add Property" dialog trigger on the right */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Properties</h1>
          <p className="text-muted-foreground">Manage your property listings</p>
        </div>
        {/* Dialog whose open state is controlled by isDialogOpen */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="gap-2">
              <Plus className="h-4 w-4" /> Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              {/* Title changes depending on whether we are editing or adding */}
              <DialogTitle>{editingProperty ? 'Edit Property' : 'Add New Property'}</DialogTitle>
            </DialogHeader>
            {/* The add/edit form; each input is bound to a field in formData */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div>
                <Label>Description</Label>
                <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Address</Label>
                  <Input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} required />
                </div>
                <div>
                  <Label>City</Label>
                  <Input value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} required />
                </div>
                <div>
                  <Label>State</Label>
                  <Input value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} required />
                </div>
                <div>
                  <Label>Zip Code</Label>
                  <Input value={formData.zipCode} onChange={e => setFormData({ ...formData, zipCode: e.target.value })} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Price (৳/mo)</Label>
                  <Input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                </div>
                <div>
                  <Label>Property Type</Label>
                  <Select value={formData.propertyType} onValueChange={v => setFormData({ ...formData, propertyType: v as Property['propertyType'] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Bedrooms</Label>
                  <Input type="number" value={formData.bedrooms} onChange={e => setFormData({ ...formData, bedrooms: e.target.value })} required />
                </div>
                <div>
                  <Label>Bathrooms</Label>
                  <Input type="number" value={formData.bathrooms} onChange={e => setFormData({ ...formData, bathrooms: e.target.value })} required />
                </div>
                <div className="col-span-2">
                  <Label>Area (sqft)</Label>
                  <Input type="number" value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })} required />
                </div>
              </div>
              {/* Submit saves the property; Cancel just closes the dialog.
                  The submit label switches between "Update" and "Add". */}
              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1">{editingProperty ? 'Update' : 'Add'} Property</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary cards: totals computed from the current properties list */}
      <div className="stat-grid grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard title="Total Properties" value={properties.length.toString()} icon={Building2} />
        <DashboardCard title="Occupied" value={properties.filter(p => p.status === 'rented').length.toString()} icon={BedDouble} />
        <DashboardCard title="Available" value={properties.filter(p => p.status === 'available').length.toString()} icon={Bath} />
      </div>

        {/* List of property cards; each has Edit and Delete buttons */}
        <div className="grid grid-cols-1 gap-4">
        {properties.map(property => (
          <Card key={property.id} className="border-0 shadow-sm">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">{property.address}, {property.city}</p>
                  <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                    <span>{property.bedrooms} beds</span>
                    <span>{property.bathrooms} baths</span>
                    <span>{property.area.toLocaleString()} sqft</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold">৳ {property.price.toLocaleString()}/mo</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${property.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-muted text-foreground'}`}>
                    {property.status}
                  </span>
                </div>
                <div className="flex gap-1">
                  {/* Pencil button opens the edit dialog for this property */}
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => openEditDialog(property)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {/* Trash button deletes this property from the list */}
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => handleDelete(property.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
