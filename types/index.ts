// Type definitions for News AI Next.js application

export interface KeyInfo {
  answer1: string; // Main technical concepts
  answer2: string; // Key findings/advancements
  answer3: string; // Potential impacts/applications
}

export interface SentenceMatch {
  summary_sentence: string;
  article_sentences: string[];
}

export interface ProcessingState {
  isProcessing: boolean;
  currentPhase: string;
  progress: number;
  error: string | null;
  article: string;
  summary: string;
  arabicSummary: string;
  highlightedArticle: string;
  highlightedSummary: string;
  matchedSentences: SentenceMatch[];
}

export interface ExtractContentRequest {
  url: string;
}

export interface ExtractContentResponse {
  content: string | null;
  error: string | null;
}

export interface ExtractKeyInfoRequest {
  article: string;
}

export interface ExtractKeyInfoResponse {
  keyInfo: KeyInfo | null;
  error: string | null;
}

export interface GenerateSummaryRequest {
  article: string;
  keyInfo: KeyInfo;
}

export interface GenerateSummaryResponse {
  summary: string | null;
  error: string | null;
}

export interface TranslateArabicRequest {
  summary: string;
}

export interface TranslateArabicResponse {
  arabicSummary: string | null;
  error: string | null;
}

export interface MatchSentencesRequest {
  article: string;
  summary: string;
}

export interface MatchSentencesResponse {
  matches: SentenceMatch[] | null;
  error: string | null;
}
