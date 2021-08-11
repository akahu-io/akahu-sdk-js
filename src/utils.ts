import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
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


export function pick<T extends Record<string, any>>(obj: T, ...props: string[]): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => props.includes(k))
  ) as Partial<T>;
}


/**
 * Axios error interceptor to retry on network failures.
 * Dormant by default - is activated by including `retries` in the axios config.
 */
export function axiosRetryOnNetworkError(error: AxiosError): Promise<AxiosResponse> {
  // Only handle axios errors.
  if (!error.isAxiosError) return Promise.reject(error);

  const { config } : any = error;
  const { method, headers, retries = 0, __retryCount = 0 } = config;

  // POST requests can only be retried if they include an idempotency key.
  // Other methods (i.e. get, patch, delete) are considered idempotent by default.
  const isIdempotent =
    method.toUpperCase() !== 'POST' ||
    typeof headers['Idempotency-Key'] === 'string';

  const shouldRetry = 
    isIdempotent &&
    __retryCount < retries &&
    isNetworkError(error) &&  // Don't retry due to server errors
    isRetryAllowed(error);    // Don't retry if the error is permanent (e.g. SSL related)

  if (!shouldRetry) {
    return Promise.reject(error);
  }

  config.__retryCount = __retryCount + 1;
  return axios(config);  
}

/**
 * Determine whether an axios error instance was caused by network error
 * (and should therefore be retryable).
 * 
 * Borrowed from {@link https://github.com/softonic/axios-retry/blob/master/es/index.js}
 * with minor changes as we want to retry on timeout.
 */
function isNetworkError(error: AxiosError): boolean {
  return error.isAxiosError &&
         !error.response &&         // Network errors have no response
         !axios.isCancel(error);    // Don't retry cancelled requests
}

/**
 * Inspect network error code from axios to determine if it makes sense to retry it.
 * 
 * Borrowed from {@link https://github.com/sindresorhus/is-retry-allowed/blob/main/index.js}
 */
function isRetryAllowed(error: AxiosError): boolean {
  return error.code === undefined ||  // Errors due to timeout have no error code.
         !retryDenyList.has(error.code);
}

const retryDenyList = new Set([
	'ENOTFOUND',
	'ENETUNREACH',
	'UNABLE_TO_GET_ISSUER_CERT',
	'UNABLE_TO_GET_CRL',
	'UNABLE_TO_DECRYPT_CERT_SIGNATURE',
	'UNABLE_TO_DECRYPT_CRL_SIGNATURE',
	'UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY',
	'CERT_SIGNATURE_FAILURE',
	'CRL_SIGNATURE_FAILURE',
	'CERT_NOT_YET_VALID',
	'CERT_HAS_EXPIRED',
	'CRL_NOT_YET_VALID',
	'CRL_HAS_EXPIRED',
	'ERROR_IN_CERT_NOT_BEFORE_FIELD',
	'ERROR_IN_CERT_NOT_AFTER_FIELD',
	'ERROR_IN_CRL_LAST_UPDATE_FIELD',
	'ERROR_IN_CRL_NEXT_UPDATE_FIELD',
	'OUT_OF_MEM',
	'DEPTH_ZERO_SELF_SIGNED_CERT',
	'SELF_SIGNED_CERT_IN_CHAIN',
	'UNABLE_TO_GET_ISSUER_CERT_LOCALLY',
	'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
	'CERT_CHAIN_TOO_LONG',
	'CERT_REVOKED',
	'INVALID_CA',
	'PATH_LENGTH_EXCEEDED',
	'INVALID_PURPOSE',
	'CERT_UNTRUSTED',
	'CERT_REJECTED',
	'HOSTNAME_MISMATCH'
]);


// https://github.com/flexdinesh/browser-or-node/blob/master/src/index.js
export const isBrowser = () => (
  typeof window !== 'undefined' && typeof window.document !== 'undefined'
);

export const isNode = () => Boolean(process?.versions?.node) && !isReactNative();

// https://github.com/facebook/react-native/commit/3c65e62183ce05893be0822da217cb803b121c61
export const isReactNative = () => (
  typeof navigator === 'object' && navigator.product === 'ReactNative'
);