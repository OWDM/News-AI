import { NextRequest, NextResponse } from 'next/server';
import { extractKeyInfo } from '@/lib/langchain/qa-chain';
import type { ExtractKeyInfoRequest, ExtractKeyInfoResponse } from '@/types';

export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds for Vercel Pro, 10s for Hobby

/**
 * POST /api/extract-key-info
 * Extract key information from article using RAG (3 parallel QA queries)
 */
export async function POST(request: NextRequest) {
  try {
    const body: ExtractKeyInfoRequest = await request.json();
    const { article } = body;

    if (!article) {
      return NextResponse.json(
        { keyInfo: null, error: 'Article text is required' },
        { status: 400 }
      );
    }

    // Extract key info using LangChain QA
    const keyInfo = await extractKeyInfo(article);

    const response: ExtractKeyInfoResponse = {
      keyInfo,
      error: null,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error in extract-key-info API:', error);

    const response: ExtractKeyInfoResponse = {
      keyInfo: null,
      error: error.message || 'Failed to extract key information',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
