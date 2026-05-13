/**
 * Resolves the main CRM origin for header logo links — no env vars.
 *
 * - Local dev: docs on Vite (port 5174) → CRM on port 3000.
 * - Docs on `docs.example.com` → CRM assumed at `example.com` (same scheme, same port if non-default).
 * - Docs served under the same host as the CRM (e.g. `/docs/`) → same origin.
 */
export function getCrmAppOrigin(): string {
  if (typeof window === 'undefined') return '';

  const { protocol, hostname, port } = window.location;

  if (hostname === 'localhost' && port === '5174') {
    return 'http://localhost:3000';
  }

  if (hostname.startsWith('docs.')) {
    const rest = hostname.slice('docs.'.length);
    if (rest) {
      const defaultPort = protocol === 'https:' ? '443' : '80';
      const p = port && port !== defaultPort ? `:${port}` : '';
      return `${protocol}//${rest}${p}`;
    }
  }

  return window.location.origin.replace(/\/$/, '');
}
