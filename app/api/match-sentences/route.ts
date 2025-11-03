import { NextRequest, NextResponse } from 'next/server';
import { matchSummaryWithArticle } from '@/lib/langchain/match-chain';
import type { MatchSentencesRequest, MatchSentencesResponse } from '@/types';

export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds for Vercel Pro, 10s for Hobby

/**
 * POST /api/match-sentences
 * Match summary sentences to article sentences for highlighting
 */
export async function POST(request: NextRequest) {
  try {
    const body: MatchSentencesRequest = await request.json();
    const { article, summary } = body;

    if (!article) {
      return NextResponse.json(
        { matches: null, error: 'Article text is required' },
        { status: 400 }
      );
    }

    if (!summary) {
      return NextResponse.json(
        { matches: null, error: 'Summary text is required' },
        { status: 400 }
      );
    }

    // Match sentences using LangChain
    const matches = await matchSummaryWithArticle(article, summary);

    const response: MatchSentencesResponse = {
      matches,
      error: null,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error in match-sentences API:', error);

    const response: MatchSentencesResponse = {
      matches: null,
      error: error.message || 'Failed to match sentences',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
