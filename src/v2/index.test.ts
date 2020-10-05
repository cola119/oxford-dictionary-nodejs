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

  test("entries API 2", async () => {
    const res = await dic.entries("hello", {
      fields: ["pronunciations", "definitions"],
    });
    expect(res.id).toBe("hello");
    expect(res).toMatchSnapshot();
  });

  test("escape", async () => {
    const res = await dic.entries("hello ");
    expect(res.id).toBe("hello");
    const res2 = await dic.entries("hello\n");
    expect(res2.id).toBe("hello");
  });

  test("should throw an error", async () => {
    try {
      await dic.entries("hello", { fields: ["prono" as any] });
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
    expect(generatePath(wordId, { fields: ["pronunciations"] })).toBe(
      "/api/v2/entries/en-gb/hello?fields=pronunciations&strictMatch=false"
    );
    expect(
      generatePath(wordId, { fields: ["pronunciations", "definitions"] })
    ).toBe(
      "/api/v2/entries/en-gb/hello?fields=pronunciations,definitions&strictMatch=false"
    );

    expect(generatePath(`${wordId} `)).toBe(
      "/api/v2/entries/en-gb/hello%20?strictMatch=false"
    );
    expect(generatePath(`${wordId}\n`)).toBe(
      "/api/v2/entries/en-gb/hello%0A?strictMatch=false"
    );
  });
});
