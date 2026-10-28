import { randomString } from "../src/utils";

describe("randomString()", () => {
  it("returns a 32 character hex string", () => {
    expect(randomString()).toMatch(/^[0-9a-f]{32}$/);
  });

  it("returns a different value on each call", () => {
    const values = new Set(Array.from({ length: 100 }, () => randomString()));
    expect(values.size).toBe(100);
  });

  describe("without the Web Crypto API", () => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, "crypto");

    beforeEach(() => {
      Object.defineProperty(globalThis, "crypto", {
        value: undefined,
        configurable: true,
      });
    });

    afterEach(() => {
      if (descriptor) {
        Object.defineProperty(globalThis, "crypto", descriptor);
      }
    });

    it("falls back to Math.random", () => {
      const spy = jest.spyOn(Math, "random");

      expect(randomString()).toMatch(/^[0-9a-f]{32}$/);
      expect(spy).toHaveBeenCalledTimes(16);

      spy.mockRestore();
    });
  });
});
