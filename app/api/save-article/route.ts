import { NextRequest, NextResponse } from 'next/server';
import { saveArticle, NewArticle } from '@/lib/db/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { original_article, english_summary, arabic_summary } = body;

    if (!original_article || !english_summary || !arabic_summary) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const article: NewArticle = {
      original_article,
      english_summary,
      arabic_summary,
    };

    const savedArticle = await saveArticle(article);

    return NextResponse.json({
      data: savedArticle,
      error: null,
    });
  } catch (error) {
    console.error('Error saving article:', error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to save article',
      },
      { status: 500 }
    );
  }
}
