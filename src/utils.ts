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


export function pick<T extends Record<string, any>>(obj: T, ...props: (keyof T)[]): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => props.includes(k))
  ) as Partial<T>;
}


/**
 * Axios error interceptor to retry on network failures.
 * Dormant by default - is activated by including `retries` in the axios config.
 */
export function axiosRetryOnNetworkError(error: AxiosError): Promise<AxiosResponse> {
  const { config } : any = error;

  if (!config) {
    return Promise.reject(error);
  }

  const { retries = 0, __retryCount = 0 } = config;

  if (!isNetworkError(error) || __retryCount >= retries) {
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
 * With a small change as we want to retry on timeout.
 */
function isNetworkError(error: AxiosError): boolean {
  return !error.response &&          // Network errors have no response
         !axios.isCancel(error) &&   // Don't retry cancelled requests
         isRetryAllowed(error);     // Don't retry if the error is permanent (e.g. 404)
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
	// SSL errors from https://github.com/nodejs/node/blob/fc8e3e2cdc521978351de257030db0076d79e0ab/src/crypto/crypto_common.cc#L301-L328
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