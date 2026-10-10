// currency.ts
// Shared helper for displaying property prices in Bangladeshi Taka (BDT).
// Only the DISPLAY format changes — the underlying numeric value is untouched.
// Example: formatBDT(50000) -> "৳ 50,000".
export function formatBDT(amount: number): string {
  return `৳ ${Math.round(amount).toLocaleString()}`;
}
