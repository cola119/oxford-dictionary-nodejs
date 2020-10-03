import { Dictionary } from ".";

describe("Dictionary class", () => {
  test("entries API", async () => {
    const dic = new Dictionary({
      appKey: process.env.APP_KEY!,
      appId: process.env.APP_ID!,
    });
    const res = await dic.entries("hello");
    expect(res.id).toBe("hello");
    expect(res).toMatchSnapshot();
  });
});
