import * as https from "https";

const v2 = "/api/v2";

export class Dictionary {
  constructor(private options: DictionaryConfig) {}

  // GET /entries/{source_lang}/{word_id}
  entries(wordId: string, fields?: string[], strictMatch: boolean = true) {
    // source_lang
    // TODO testing
    let path = `${v2}/entries/en-gb/${wordId}`;
    let conjection: "?" | "&" = "?";
    if (fields) {
      const fields_q = separateWithComma(fields);
      path += `${conjection}fields=${fields_q}`;
      conjection = "&";
    }
    const strictMatch_q = strictMatch ? "true" : "false";
    path += `${conjection}strictMatch=${strictMatch_q}`;
    return this.request(path);
  }

  private request(path: string): Promise<GetEntriesReponse> {
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

    return new Promise<GetEntriesReponse>((resolve, reject) => {
      https.get(options, async (res) => {
        // TODO: error handling
        let body = "";
        for await (const data of res) {
          body += data;
        }
        const parsed = JSON.parse(body);
        console.log(parsed);
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
