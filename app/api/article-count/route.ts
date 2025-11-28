import { NextResponse } from 'next/server';
import { getArticleCount } from '@/lib/db/client';

export async function GET() {
  try {
    const count = await getArticleCount();

    return NextResponse.json({
      data: { count },
      error: null,
    });
  } catch (error) {
    console.error('Error getting article count:', error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to get article count',
      },
      { status: 500 }
    );
  }
}
