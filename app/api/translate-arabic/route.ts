import { NextRequest, NextResponse } from 'next/server';
import { translateToArabic } from '@/lib/langchain/translate-chain';
import type { TranslateArabicRequest, TranslateArabicResponse } from '@/types';

export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds for Vercel Pro, 10s for Hobby

/**
 * POST /api/translate-arabic
 * Translate English summary to Arabic using fine-tuned model
 */
export async function POST(request: NextRequest) {
  try {
    const body: TranslateArabicRequest = await request.json();
    const { summary } = body;

    if (!summary) {
      return NextResponse.json(
        { arabicSummary: null, error: 'Summary text is required' },
        { status: 400 }
      );
    }

    // Translate using fine-tuned LangChain model
    const arabicSummary = await translateToArabic(summary);

    const response: TranslateArabicResponse = {
      arabicSummary,
      error: null,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error in translate-arabic API:', error);

    const response: TranslateArabicResponse = {
      arabicSummary: null,
      error: error.message || 'Failed to translate to Arabic',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
