import type { AxiosResponse } from "axios";

class AkahuError extends Error {
  /**
   * Flag that can be used to detect exceptions thrown by the Akahu SDK.
   */
  isAkahuError = true;
  /**
   * Legacy static property for backwards compatibility. Prefer the instance
   * property `isAkahuError` instead.
   * @deprecated
   */
  static isAkahuError = true;
}

/**
 * Error type for error responses received from the Akahu API.
 * An error response is characterised by a non 2XX status code and/or a body
 * payload that contains `success: false` along with an accompanying error message.
 *
 * @noInheritDoc
 * @category Error
 */
export class AkahuErrorResponse extends AkahuError {
  /**
   * The response status code.
   */
  status: number;
  /**
   * The full {@link https://axios-http.com/docs/res_schema AxiosReponse}
   * object from axios.
   */
  response: AxiosResponse;

  /** @internal */
  static oAuthErrorCodeMap: Record<string, string> = {
    invalid_request: "Invalid OAuth request.",
    unauthorized_client:
      "This application is not authorized to make this request.",
    unsupported_response_type: "Unsupported OAuth response type.",
    invalid_scope: "Unknown or invalid scope.",
    server_error: "Unknown server error.",
    temporarily_unavailable:
      "The authorization server is temporarily unavailable.",
    invalid_grant: "Invalid OAuth request.",
  };

  /** @internal */
  constructor(response: AxiosResponse) {
    const { status, statusText, data = {} } = response;
    const { message, error, error_description } = data;
    let _message: string;

    // `error` and `error_description` are specific to the OAuth endpoints.
    // `error_description` is more user-friendly, but optional:
    // https://www.oauth.com/oauth2-servers/server-side-apps/possible-errors/
    if (typeof error_description === "string") {
      _message = error_description;
    } else if (error in AkahuErrorResponse.oAuthErrorCodeMap) {
      _message = AkahuErrorResponse.oAuthErrorCodeMap[error];
    } else {
      // Detail for other error responses are nested under the `message` key.
      // Include a fallback to statusText just in case things go really wrong.
      _message = message ?? statusText;
    }

    super(_message);
    this.status = status;
    this.response = response;
  }
}

/**
 * Error type for errors that occur during the webhook validation process.
 *
 * @noInheritDoc
 * @category Error
 */
export class AkahuWebhookValidationError extends AkahuError {}
