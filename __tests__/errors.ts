import type { AxiosResponse } from "axios";
import { AkahuErrorResponse } from "../src/errors";

function mockResponse(overrides?: object) {
  return {
    status: 400,
    statusText: "Bad request",
    ...overrides,
  } as AxiosResponse;
}

describe("AkahuErrorResponse", () => {
  it("handles OAuth errors with an error_description", () => {
    const response = mockResponse({
      data: { error: "invalid_grant", error_description: "This code has already been used." },
    });

    const error = new AkahuErrorResponse(response);
    expect(error.message).toBe("This code has already been used.");
  });

  it("handles OAuth errors without an error_description", () => {
    const response = mockResponse({ data: { error: "invalid_request" } });
    const error = new AkahuErrorResponse(response);
    expect(error.message).toBe("Invalid OAuth request.");
  });

  it("handles generic error responses from the API", () => {
    const response = mockResponse({ data: { message: "Something went wrong." } });
    const error = new AkahuErrorResponse(response);
    expect(error.message).toBe("Something went wrong.");
  });

  it("falls back to HTTP status if no other message is available", () => {
    const response = mockResponse({ statusText: "Not found." });
    const error = new AkahuErrorResponse(response);
    expect(error.message).toBe("Not found.");
  });
});
