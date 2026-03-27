/**
 * Prefixes a path with the Astro base URL.
 * Handles trailing/leading slashes correctly.
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!base || base === '/') return path;
  return `${base}${path.startsWith('/') ? path : '/' + path}`;
}
