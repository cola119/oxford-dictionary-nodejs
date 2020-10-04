export type DictionaryConfig = {
  appId: string;
  appKey: string;
};

export type GetEntriesReponse<Word extends string = string> = {
  id: Word;

  /**
   * Additional Information provided by OUP
   */
  metadata: {
    operation: string;
    provider: "Oxford University Press";
    schema: string;
  };

  /**
   * A list of entries and all the data related to them
   */
  results: HeadwordEntry[];
  word: Word;
};

type HeadwordEntry<Word extends string = string> = {
  id: Word;

  /**
   * IANA language code
   */
  language: string;

  /**
   * A grouping of various senses in a specific language, and a lexical category that relates to a word
   */
  lexicalEntries: LexicalEntry[];

  pronunciations: PronunciationsList;

  type?: "headword" | "inflection" | "phrase";
};

type LexicalEntry = {
  /**
   * Other words from which their Sense derives
   */
  compounds: any;

  /**
   *  Other words from which this one derives
   */
  derivativeOf: any;

  /**
   * Other words from which their Sense derives
   */
  derivatives: any;

  entries: any;

  grammaticalFeatures: any;

  language: any;

  /**
   * A linguistic category of words (or more precisely lexical items),
   * generally defined by the syntactic or morphological behaviour of the lexical item in question,
   * such as noun or verb
   */
  lexicalCategory: any;

  notes: any;

  /**
   * Other words from which their Sense derives
   */
  phrasalVerbs: any;

  /**
   * Other words from which their Sense derives
   */
  phrases: any;

  pronunciations: any;

  /**
   * Abstract root form from which this lexicalEntry is derived.
   */
  root: any;

  /**
   * A given written or spoken realisation of an entry.
   */
  text: any;

  /**
   *  Various words that are used interchangeably depending on the context, e.g 'a' and 'an'
   */
  variantForms: any;
};

type PronunciationsList = any;
