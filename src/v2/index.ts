import * as https from "https";
import { DictionaryConfig, GetEntriesReponse } from "./types";

const v2 = "/api/v2";

type Filelds =
  | "definitions"
  | "domains"
  | "etymologies"
  | "examples"
  | "pronunciations"
  | "regions"
  | "registers"
  | "variantForms";

type APIOption = {
  fields?: Filelds[];
  strictMatch?: boolean;
};

const defaultOptions: APIOption = {
  fields: undefined,
  strictMatch: false,
};

export class Dictionary {
  constructor(private options: DictionaryConfig) {}

  /**
   * /api/v2/entries/{source_lang}/{word_id}:
   *
   * Use this to retrieve definitions, pronunciations, example sentences, grammatical information and word origins.
   *
   * @param wordId
   * @param options
   */
  entries(wordId: string, opt?: APIOption): Promise<GetEntriesReponse> {
    const path = generatePath(wordId, opt);
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

        const isErrorHappend = !!body.error || res.statusCode !== 200;
        if (isErrorHappend) {
          reject(new Error(body.error ?? "Something error happend"));
        }

        resolve(body);
      });
    });
  }
}

export const generatePath = (
  wordId: string,
  { fields, strictMatch }: APIOption = defaultOptions
) => {
  // source_lang
  let path = `${v2}/entries/en-gb/${wordId}`;
  let conjection: "?" | "&" = "?";
  if (fields && fields.length > 0) {
    const fields_q = separateWithComma(fields);
    path += `${conjection}fields=${fields_q}`;
    conjection = "&";
  }
  const strictMatch_q = strictMatch ? "true" : "false";
  path += `${conjection}strictMatch=${strictMatch_q}`;

  return encodeURI(path);
};

const separateWithComma = (tokens: string[]): string =>
  tokens.reduce(
    (prev, token) => (prev === "" ? token : `${prev},${token}`),
    ""
  );
