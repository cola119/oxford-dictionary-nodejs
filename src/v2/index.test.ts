import { Dictionary, generatePath } from ".";

describe("Dictionary class", () => {
  const dic = new Dictionary({
    appKey: process.env.APP_KEY!,
    appId: process.env.APP_ID!,
  });

  test("entries API 1", async () => {
    const res = await dic.entries("hello");
    expect(res.id).toBe("hello");
    expect(res).toMatchSnapshot();
  });

  test("should throw an error", async () => {
    try {
      await dic.entries("hello", { fields: ["prono"] });
    } catch (e) {
      expect(e.message).toBe("Unknown field requested: prono");
    }
  });
});

describe("generatePath", () => {
  it("should return a valid uri", () => {
    const wordId = "hello";

    expect(generatePath(wordId)).toBe(
      "/api/v2/entries/en-gb/hello?strictMatch=false"
    );
    expect(generatePath(wordId, { strictMatch: false })).toBe(
      "/api/v2/entries/en-gb/hello?strictMatch=false"
    );
    expect(generatePath(wordId, { strictMatch: true })).toBe(
      "/api/v2/entries/en-gb/hello?strictMatch=true"
    );

    expect(generatePath(wordId, { fields: [] })).toBe(
      "/api/v2/entries/en-gb/hello?strictMatch=false"
    );
    expect(generatePath(wordId, { fields: ["a"] })).toBe(
      "/api/v2/entries/en-gb/hello?fields=a&strictMatch=false"
    );
    expect(generatePath(wordId, { fields: ["a", "b"] })).toBe(
      "/api/v2/entries/en-gb/hello?fields=a%2Cb&strictMatch=false"
    );
  });
});
