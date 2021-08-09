// import MockAdapter from "axios-mock-adapter";

import { AkahuClient } from '@/client';


describe("AkahuClient", () => {
  let client: any;  // `any` allows access to private methods

  beforeEach(() => {
    client = new AkahuClient({ appToken: 'app_token_123', appSecret: 'hunter2' });
  })

  describe("_authorizeRequest()", () => {
    it("does nothing when no auth method specified", async () => {
      const request = { url: '/test', method: 'post', headers: { DNT: '1' } };
      
      const authenticatedRequest = client._authorizeRequest(request, undefined);

      // Request config is unchanged
      expect(authenticatedRequest).toEqual(request);
    });
    
    it("correctly adds auth token header when specified", async () => {
      const request = { url: '/test', method: 'post', headers: { DNT: '1' } };
      
      const token = 'user_token_123';
      const authenticatedRequest = client._authorizeRequest(request, { token });

      // Authorization header was merged with the request config
      expect(authenticatedRequest.headers.Authorization).toBe('Bearer user_token_123');
      // All other config values remain untouched
      expect(authenticatedRequest).toMatchObject(request);
    });

    it("correctly adds basic auth when specified", async () => {
      const request = { url: '/test', method: 'post', headers: { DNT: '1' } };
      
      const authenticatedRequest = client._authorizeRequest(request, { basic: true });

      // Authorization header was merged with the request config
      expect(authenticatedRequest.auth).toEqual({
        username: 'app_token_123',
        password: 'hunter2'
      });

      // All other config values remain untouched
      expect(authenticatedRequest).toMatchObject(request);
    });
  });

  
  describe("_makeIdempotent()", () => {
    it('adds an Itempotency-Key to all POST requests', () => {
      const request = { url: '/test', method: 'post', headers: { DNT: '1' } };

      const idempotentRequest = client._makeIdempotent(request);

      // Idempotency-Key header has been set
      expect(idempotentRequest.headers['Idempotency-Key']).toBeTruthy();

      // All other config values remain untouched
      expect(idempotentRequest).toMatchObject(request);
    });

    it('does not add an Itempotency-Key to all other requests', () => {
      const request = { url: '/test', method: 'get', headers: { DNT: '1' } };

      const idempotentRequest = client._makeIdempotent(request);

      // Idempotency-Key header has not been set
      expect(idempotentRequest.headers['Idempotency-Key']).toBeUndefined();

      // All other config values remain untouched
      expect(idempotentRequest).toMatchObject(request);
    });
  });
});






describe("AkahuClient._apiCall", () => {
  // let client: AkahuClient;
  // let mockApi: MockAdapter;

  // beforeEach(() => {
  //   // Setup a new AkahuClient instance and attach an adapter to mock out axios calls.
  //   client = new AkahuClient({ appToken: 'app_token_123', appSecret: 'hunter2' });
  //   mockApi = new MockAdapter((client as any).axios);
  // });
});