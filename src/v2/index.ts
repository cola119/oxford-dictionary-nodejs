import * as https from "https";

const v2 = "/api/v2";

export class Dictionary {
  constructor(private options: DictionaryConfig) {}

  /**
   * /api/v2/entries/{source_lang}/{word_id}:
   *
   * Use this to retrieve definitions, pronunciations, example sentences, grammatical information and word origins.
   *
   * @param wordId
   * @param fields
   * @param strictMatch
   */
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
        let _body = "";
        for await (const data of res) {
          _body += data;
        }
        const body = JSON.parse(_body);

        if (res.statusCode !== 200) {
          reject(body);
          return;
        }

        resolve(body);
      });
    });
  }
}

const separateWithComma = (tokens: string[]): string =>
  tokens.reduce(
    (prev, token) => (prev === "" ? token : `${prev}%2C${token}`),
    ""
  );
