import { NextRequest, NextResponse } from 'next/server';
import { markArticleAsCopied, markArticleAsDiscarded } from '@/lib/db/client';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, action } = body;

    if (!id || !action) {
      return NextResponse.json(
        { error: 'Missing required fields (id and action)' },
        { status: 400 }
      );
    }

    if (action === 'copied') {
      await markArticleAsCopied(id);
    } else if (action === 'discarded') {
      await markArticleAsDiscarded(id);
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Must be "copied" or "discarded"' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      data: { success: true },
      error: null,
    });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to update article',
      },
      { status: 500 }
    );
  }
}
