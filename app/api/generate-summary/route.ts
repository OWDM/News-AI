import { NextRequest, NextResponse } from 'next/server';
import { generateSummary } from '@/lib/langchain/summary-chain';
import type { GenerateSummaryRequest, GenerateSummaryResponse } from '@/types';

export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds for Vercel Pro, 10s for Hobby

/**
 * POST /api/generate-summary
 * Generate a structured 4-sentence summary from article and key info
 */
export async function POST(request: NextRequest) {
  try {
    const body: GenerateSummaryRequest = await request.json();
    const { article, keyInfo } = body;

    if (!article) {
      return NextResponse.json(
        { summary: null, error: 'Article text is required' },
        { status: 400 }
      );
    }

    if (!keyInfo) {
      return NextResponse.json(
        { summary: null, error: 'Key information is required' },
        { status: 400 }
      );
    }

    // Generate summary using LangChain
    const summary = await generateSummary(article, keyInfo);

    const response: GenerateSummaryResponse = {
      summary,
      error: null,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error in generate-summary API:', error);

    const response: GenerateSummaryResponse = {
      summary: null,
      error: error.message || 'Failed to generate summary',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
