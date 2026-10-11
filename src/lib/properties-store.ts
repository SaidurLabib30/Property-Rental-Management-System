// properties-store.ts
// A tiny in-memory reactive store for the app's property list, seeded from the
// existing mock data. Components read it with useProperties() and re-render
// whenever a property is added, edited, or removed — so a property created on
// the "My Properties" page shows up in the dashboard's Featured slider without
// a manual refresh. It resets to the seed data on a full page reload, matching
// the current mock-data architecture (no backend or new dependency added).
import { useSyncExternalStore } from "react";
import type { Property } from "@/types";
import { mockProperties } from "@/data/mockData";

// The single live list. Replaced with a new array reference on every change so
// useSyncExternalStore detects the update.
let properties: Property[] = [...mockProperties];
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return properties;
}

// Add a brand-new property to the front so it is visible immediately.
export function addProperty(property: Property) {
  properties = [property, ...properties];
  emit();
}

// Merge changed fields into the matching property.
export function updateProperty(id: string, patch: Partial<Property>) {
  properties = properties.map((p) => (p.id === id ? { ...p, ...patch } : p));
  emit();
}

// Remove the property with the given id.
export function removeProperty(id: string) {
  properties = properties.filter((p) => p.id !== id);
  emit();
}

// Reactive read hook. Same snapshot on server and first client render (the
// seed), so there is no hydration mismatch.
export function useProperties(): Property[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
