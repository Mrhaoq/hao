export type PersonalityQuestion = {
  id: string;
  module: string;
  text: string;
  pole?: string;
  dimension?: string;
  reverse?: boolean;
  facet?: string;
  facetLabel?: string;
  consistencyPair?: string;
};

export type PersonalityModule = {
  id: string;
  name: string;
  desc: string;
  count: number;
};

export type MbtiInterp = {
  name: string;
  summary: string;
  strengths?: string[];
  growth?: string[];
};

export type NamedSummary = {
  name: string;
  summary: string;
};

export type PersonalityTestData = {
  version: string;
  modules: PersonalityModule[];
  quickModules: string[];
  likertLabels: string[];
  questions: PersonalityQuestion[];
  interpretations: {
    mbti: Record<string, MbtiInterp>;
    enneagram: Record<string, NamedSummary>;
    disc: Record<string, NamedSummary>;
    riasec: Record<string, string>;
    oceanLabels: Record<string, string>;
  };
};
