export type DictionaryConfig = {
  appId: string;
  appKey: string;
};

type TODO<T = ""> = any;

export type GetEntriesReponse<Word extends string = string> = {
  /**
   *
   */
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

  /**
   *
   */
  word: Word;
};

type HeadwordEntry<Word extends string = string> = {
  /**
   *
   */
  id: Word;

  /**
   * IANA language code
   */
  language: string;

  /**
   * A grouping of various senses in a specific language, and a lexical category that relates to a word
   */
  lexicalEntries: LexicalEntry[];

  /**
   *
   */
  pronunciations?: Pronunciation[];

  /**
   *
   */
  type?: "headword" | "inflection" | "phrase";
};

type LexicalEntry = {
  /**
   * Other words from which their Sense derives
   */
  compounds?: RelatedEntry[];

  /**
   *  Other words from which this one derives
   */
  derivativeOf?: RelatedEntry[];

  /**
   * Other words from which their Sense derives
   */
  derivatives?: RelatedEntry[];

  /**
   *
   */
  entries?: Entry[];

  /**
   *
   */
  grammaticalFeatures: TODO;

  /**
   * IANA language code
   */
  language: string;

  /**
   * A linguistic category of words (or more precisely lexical items),
   * generally defined by the syntactic or morphological behaviour of the lexical item in question,
   * such as noun or verb
   */
  lexicalCategory: TODO;

  notes?: TODO;

  /**
   * Other words from which their Sense derives
   */
  phrasalVerbs?: RelatedEntry[];

  /**
   * Other words from which their Sense derives
   */
  phrases?: RelatedEntry[];

  pronunciations?: Pronunciation[];

  /**
   * Abstract root form from which this lexicalEntry is derived.
   */
  root?: string;

  /**
   * A given written or spoken realisation of an entry.
   */
  text: string;

  /**
   *  Various words that are used interchangeably depending on the context, e.g 'a' and 'an'
   */
  variantForms?: TODO;
};

type Pronunciation = {
  /**
   * The URL of the sound file
   */
  audioFile?: string;

  /**
   * A local or regional variation where the pronunciation occurs, e.g. 'British English'
   */
  dialects?: string[];

  /**
   * The alphabetic system used to display the phonetic spelling
   */
  phoneticNotation?: string;

  /**
   * Phonetic spelling is the representation of vocal sounds which express pronunciations of words. It is a system of spelling in which each letter represents invariably the same spoken sound
   */
  phoneticSpelling?: string;

  /**
   * A particular area in which the pronunciation occurs, e.g. 'Great Britain'
   */
  regions: any[];

  /**
   *  A level of language usage, typically with respect to formality. e.g. 'offensive', 'informal'
   */
  registers: any[];
};

type Entry = {
  /**
   * A grouping of crossreference notes.
   */
  crossReferenceMarkers?: string[];

  /**
   *
   */
  crossReferences?: TODO[];

  /**
   * The origin of the word and the way in which its meaning has changed throughout history
   */
  etymologies?: string[];

  /**
   *
   */
  grammaticalFeatures?: TODO[];

  /**
   * Identifies the homograph grouping. The last two digits identify different entries of the same homograph. The first one/two digits identify the homograph number.
   */
  homographNumber?: string;

  /**
   * A list of inflected forms for an Entry.
   */
  inflections?: TODO[];

  /**
   *
   */
  notes?: TODO[];

  /**
   *
   */
  pronunciations?: Pronunciation[];

  /**
   * Complete list of senses
   */
  senses?: Sense[];

  /**
   * Various words that are used interchangeably depending on the context, e.g 'a' and 'an'
   */
  variantForms?: TODO[];
};

type Sense = {
  /**
   * antonym of word
   */
  antonyms?: TODO;

  /**
   * A construction provides information about typical syntax used of this sense. Each construction may optionally have one or more examples.
   */
  constructions?: TODO[];

  /**
   * A grouping of crossreference notes.
   */
  crossReferenceMarkers?: string[];

  /**
   *
   */
  crossReferences?: TODO[];

  /**
   * A list of statements of the exact meaning of a word
   */
  definitions?: string[];

  /**
   * Domain classes particular to the Sense
   */
  domainClasses?: TODO[];

  /**
   * A subject, discipline, or branch of knowledge particular to the Sense
   */
  domains?: TODO[];

  /**
   * The origin of the word and the way in which its meaning has changed throughout history
   */
  etymologies?: string[];

  /**
   *
   */
  examples?: Definition[];

  /**
   * The id of the sense that is required for the delete procedure
   */
  id?: string;

  /**
   * A list of inflected forms for a sense.
   */
  inflections?: TODO<"InflectedForm">;

  /**
   *
   */
  notes?: TODO<"CategorizedTextList">;

  /**
   *
   */
  pronunciations?: Pronunciation[];

  /**
   * A particular area in which the Sense occurs, e.g. 'Great Britain'
   */
  regions?: TODO<"regionsList">;

  /**
   * A level of language usage, typically with respect to formality. e.g. 'offensive', 'informal'
   */
  registers?: TODO<"registersList">;

  /**
   * Semantic classes particular to the Sense
   */
  semanticClasses?: TODO<"semanticClassesList">;

  /**
   * A list of short statements of the exact meaning of a word
   */
  shortDefinitions?: string[];

  /**
   * Ordered list of subsenses of a sense
   */
  subsenses?: Sense[];

  /**
   * synonym of word
   */
  synonyms?: TODO<"SynonymsAntonyms">;

  /**
   * Ordered list of links to the Thesaurus Dictionary
   */
  thesaurusLinks?: TODO<"thesaurusLink">[];

  /**
   * Various words that are used interchangeably depending on the context, e.g 'duck' and 'duck boat'
   */
  variantForms?: TODO<"VariantFormsList">;
};

type RelatedEntry = {
  /**
   *  A subject, discipline, or branch of knowledge particular to the Sense
   */
  domains?: any[];

  /**
   * The identifier of the word
   */
  id: string;

  /**
   * IANA language code specifying the language of the word
   */
  language?: string;

  /**
   * A particular area in which the pronunciation occurs, e.g. 'Great Britain'
   */
  regions?: any[];

  /**
   * A level of language usage, typically with respect to formality. e.g. 'offensive', 'informal'
   */
  registers?: any[];

  /**
   *
   */
  text: string;
};

type Definition = {
  /**
   * A list of statements of the exact meaning of a word
   */
  definitions?: string[];

  /**
   * A subject, discipline, or branch of knowledge particular to the Sense
   */
  domains?: TODO[];

  /**
   *
   */
  notes?: TODO[];

  /**
   * A particular area in which the pronunciation occurs, e.g. 'Great Britain' ,
   */
  regions?: TODO[];

  /**
   *  A level of language usage, typically with respect to formality. e.g. 'offensive', 'informal'
   */
  registers?: TODO[];

  /**
   * The list of sense identifiers related to the example. Provided in the sentences endpoint only.
   */
  senseIds?: string[];

  /**
   *
   */
  text: string;
};
