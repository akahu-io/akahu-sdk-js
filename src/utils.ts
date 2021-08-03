export type Protocol = 'http' | 'https';

/**
 * Build a URL from constituent components.
 */
export function buildUrl(
  { protocol, host, port, path = '', query = {} }:
    { protocol: Protocol, host: string, port?: number, path?: string, query?: Record<string, string | undefined> }
): string {
  // If not specified, port will be chosen by browser based on protocol choice (http or https).
  const _port = port ? `:${port}` : '';

  // Clean `undefined` values from the query params 
  const cleanedQuery = Object.fromEntries(
    Object.entries(query || {}).filter(([_, v]) => typeof v !== 'undefined')
  ) as Record<string, string>;

  // Convert to URL encoded query string
  const queryString = Object.keys(cleanedQuery).length !== 0
    ? '?' + new URLSearchParams(cleanedQuery).toString()
    : '';

  return `${protocol}://${host}${_port}/${path}${queryString}`;
}
