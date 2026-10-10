// utils.ts
// Shared helper used across components. Re-exports `cn`, a tiny utility that
// merges conditional CSS class names together (so `className` props can be
// combined cleanly, e.g. cn("p-2", isActive && "bg-primary")).
export { cn } from "cn"
