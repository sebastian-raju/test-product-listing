const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatCurrency(amount: number): string {
  return usdFormatter.format(amount);
}

/** "mobile-accessories" → "Mobile Accessories" */
export function formatSlug(slug: string): string {
  return slug
    .split('-')
    .filter((word) => word !== '')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
