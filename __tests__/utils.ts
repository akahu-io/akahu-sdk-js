// import MockAdapter from "axios-mock-adapter";
import { buildUrl, pick } from "../src/utils";

describe("pick", () => {
  it("returns an object with selected keys from given props", () => {
    expect(pick({ test: 1, value: 2 }, "value")).toEqual({ value: 2 });
  });
});

describe("buildUrl", () => {
  it("returns a string of the composed url and filters undefined queries", () => {
    expect(
      buildUrl({
        host: "akahu.nz",
        protocol: "https",
        query: {
          test: "1",
          value: "2",
          shouldRemove: undefined,
          anotherValue: "3",
        },
      })
    ).toEqual("https://akahu.nz/?test=1&value=2&anotherValue=3");
  });
});
