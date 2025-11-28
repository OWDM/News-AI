import { sql } from '@vercel/postgres';

export interface Article {
  id: number;
  original_article: string;
  english_summary: string;
  arabic_summary: string;
  copied: boolean;
  discarded: boolean;
  created_at: Date;
}

export interface NewArticle {
  original_article: string;
  english_summary: string;
  arabic_summary: string;
}

/**
 * Save a new article to the database
 */
export async function saveArticle(article: NewArticle): Promise<Article> {
  const result = await sql<Article>`
    INSERT INTO articles (original_article, english_summary, arabic_summary)
    VALUES (${article.original_article}, ${article.english_summary}, ${article.arabic_summary})
    RETURNING *
  `;

  return result.rows[0];
}

/**
 * Get total count of articles generated
 */
export async function getArticleCount(): Promise<number> {
  const result = await sql`
    SELECT COUNT(*) as count FROM articles
  `;

  return parseInt(result.rows[0].count as string);
}

/**
 * Update article status when user copies the summary
 */
export async function markArticleAsCopied(id: number): Promise<void> {
  await sql`
    UPDATE articles
    SET copied = TRUE
    WHERE id = ${id}
  `;
}

/**
 * Update article status when user discards/ignores the summary
 */
export async function markArticleAsDiscarded(id: number): Promise<void> {
  await sql`
    UPDATE articles
    SET discarded = TRUE
    WHERE id = ${id}
  `;
}

/**
 * Get copy rate statistics (optional - for analytics)
 */
export async function getCopyRate(): Promise<{ total: number; copied: number; rate: number }> {
  const result = await sql`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN copied = TRUE THEN 1 ELSE 0 END) as copied
    FROM articles
  `;

  const total = parseInt(result.rows[0].total as string);
  const copied = parseInt(result.rows[0].copied as string);
  const rate = total > 0 ? (copied / total) * 100 : 0;

  return { total, copied, rate };
}
