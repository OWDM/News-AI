# Database Setup Guide - Vercel Postgres

This guide walks you through setting up the database for tracking articles and displaying the counter.

## What's Been Implemented

1. Database schema with the following columns:
   - `id` - Auto-incrementing primary key
   - `original_article` - Full article text
   - `english_summary` - Generated English summary
   - `arabic_summary` - Generated Arabic translation
   - `copied` - Boolean flag (true when user copies the summary)
   - `discarded` - Boolean flag for future use
   - `created_at` - Timestamp of when the article was generated

2. API routes:
   - `POST /api/save-article` - Saves articles after generation
   - `GET /api/article-count` - Returns total count of articles
   - `PATCH /api/update-article` - Updates copied/discarded status

3. UI components:
   - Counter display on homepage showing "X+ Articles Generated"
   - Copy button tracking in Arabic summary component
   - Automatic save after each successful article generation

## Setup Instructions

### Step 1: Create Vercel Postgres Database

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your NewsAI project
3. Go to the "Storage" tab
4. Click "Create Database"
5. Select "Postgres"
6. Choose a database name (e.g., "newsai-db")
7. Select your region (choose closest to your users)
8. Click "Create"

### Step 2: Run Database Schema

1. After creating the database, click on it to open the database dashboard
2. Go to the "Query" tab
3. Copy the SQL from `lib/db/schema.sql` and paste it into the query editor
4. Click "Run Query"

Alternatively, you can run this SQL directly:

```sql
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  original_article TEXT NOT NULL,
  english_summary TEXT NOT NULL,
  arabic_summary TEXT NOT NULL,
  copied BOOLEAN DEFAULT FALSE,
  discarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_created_at ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_copied ON articles(copied);
```

### Step 3: Connect to Your Project

Vercel automatically adds the following environment variables to your project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

These are automatically available to your API routes, so no manual configuration needed!

### Step 4: Deploy

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add database tracking and article counter"
   git push
   ```

2. Vercel will automatically deploy your changes

3. Once deployed, the counter will start at 0 and increment with each new article generated

## Testing Locally

To test with the database locally:

1. Go to your Vercel project settings → Environment Variables
2. Click on the `.env.local` tab
3. Copy the database environment variables
4. Create a `.env.local` file in your project root and paste them
5. Run `npm run dev` to test locally

## How It Works

### Article Generation Flow

1. User submits URL or text
2. System processes article through 5-step pipeline
3. **After completion**, article is saved to database with:
   - Original article text
   - English summary
   - Arabic summary
   - Defaults: copied=false, discarded=false
4. Database returns article ID
5. Article ID is stored in component state

### Copy Tracking

1. User clicks copy button on Arabic summary
2. Text is copied to clipboard
3. API call updates `copied=true` for that article ID
4. This lets you track engagement and success rate

### Counter Display

1. Counter component fetches total count from API on page load
2. Count animates from 0 to current count (smooth counting animation)
3. Updates automatically after each new article is generated

## Database Queries You Can Run

### Get total articles
```sql
SELECT COUNT(*) FROM articles;
```

### Get copy rate
```sql
SELECT
  COUNT(*) as total,
  SUM(CASE WHEN copied = TRUE THEN 1 ELSE 0 END) as copied,
  ROUND(100.0 * SUM(CASE WHEN copied = TRUE THEN 1 ELSE 0 END) / COUNT(*), 2) as copy_rate_percentage
FROM articles;
```

### Get recent articles
```sql
SELECT id, created_at, copied
FROM articles
ORDER BY created_at DESC
LIMIT 10;
```

### View article details
```sql
SELECT * FROM articles WHERE id = 1;
```

## Cost Considerations

Vercel Postgres pricing (as of 2024):
- **Free tier**: 256MB storage, 60 compute hours/month
- Good for: ~10,000-50,000 articles (depending on article length)
- If you exceed limits, upgrade to Pro plan

## Optional: Pre-populate Counter

If you want to start the counter at a higher number (e.g., 1247+):

```sql
-- Insert dummy record to set ID sequence
INSERT INTO articles (original_article, english_summary, arabic_summary)
VALUES ('placeholder', 'placeholder', 'placeholder');

-- Set the sequence to start at your desired number
ALTER SEQUENCE articles_id_seq RESTART WITH 1247;

-- Delete the placeholder
DELETE FROM articles WHERE original_article = 'placeholder';
```

Now the next article will have ID 1247, making your counter show 1247+ articles.

## Troubleshooting

### Counter shows 0
- Check that database is created and schema is run
- Verify environment variables are set in Vercel
- Check browser console for API errors

### Articles not saving
- Check Vercel function logs for errors
- Verify database connection is working
- Test SQL queries in Vercel dashboard

### Copy tracking not working
- Ensure article ID is being passed to SummaryDisplay component
- Check browser console for API errors
- Verify update-article API route is working

## Future Enhancements

You can extend this system to:
1. Track which articles get copied most (sort by copied=true)
2. Add analytics dashboard to view stats
3. Track time spent on page
4. A/B test different summary styles
5. Add user feedback ratings
