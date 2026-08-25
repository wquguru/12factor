/**
 * Inline stroke icons on a 24px grid.
 * Text glyphs (✓ / ✗ / ✅) shifted weight and baseline with the font fallback
 * and could not be aligned with the Heroicons used elsewhere, so the small
 * status marks are drawn instead. `currentColor` lets them inherit the
 * semantic colour token of whatever they sit in.
 */
type IconProps = {
  className?: string;
  strokeWidth?: number;
  'aria-hidden'?: boolean;
};

export function CheckIcon({ className = 'w-4 h-4', strokeWidth = 2.2, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export function CrossIcon({ className = 'w-4 h-4', strokeWidth = 2.2, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
