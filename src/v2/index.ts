import * as http from "http";

type DictionaryConfig = {
  appId: string;
  appKey: string;
};

export class Dictionary {
  constructor(private options: DictionaryConfig) {}

  // GET /entries/{source_lang}/{word_id}
  entries(wordId: string, fields: string[], strictMatch: boolean = true) {
    // source_lang
    const path =
      "/api/v2/entries/en-gb/" +
      wordId +
      "?fields=" +
      separateWithComma(fields) +
      "&strictMatch=" +
      strictMatch
        ? "true"
        : "false";
    this.request(path);
  }

  private request(path: string): Promise<string> {
    const options = {
      host: "od-api.oxforddictionaries.com",
      port: 443,
      path,
      method: "GET",
      headers: {
        app_id: this.options.appId,
        app_key: this.options.appKey,
      },
    };

    return new Promise<string>((resolve, reject) => {
      http.get(options, async (res) => {
        // TODO: error handling
        console.log(res.statusCode);
        let body = "";
        for await (const data of res) {
          body += data;
        }
        const parsed = JSON.stringify(body);
        resolve(parsed);
      });
    });
  }
}

const separateWithComma = (tokens: string[]): string =>
  tokens.reduce(
    (prev, token) => (prev === "" ? token : `${prev}%2C${token}`),
    ""
  );
