import { NextRequest, NextResponse } from 'next/server';
import { extractContentFromUrl, validateArticle } from '@/lib/content-extractor';
import type { ExtractContentRequest, ExtractContentResponse } from '@/types';

export const runtime = 'nodejs';
export const maxDuration = 60; // 60 seconds for Vercel Pro, 10s for Hobby

/**
 * POST /api/extract-content
 * Extract and clean article content from a URL
 */
export async function POST(request: NextRequest) {
  try {
    const body: ExtractContentRequest = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { content: null, error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { content: null, error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Extract content from URL
    const content = await extractContentFromUrl(url);

    // Validate article length
    try {
      validateArticle(content);
    } catch (error: any) {
      return NextResponse.json(
        { content: null, error: error.message },
        { status: 400 }
      );
    }

    const response: ExtractContentResponse = {
      content,
      error: null,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error in extract-content API:', error);

    const response: ExtractContentResponse = {
      content: null,
      error: error.message || 'Failed to extract content',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
