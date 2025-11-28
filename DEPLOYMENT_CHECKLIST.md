# Deployment Checklist for News-AI

## What's Been Added

### 1. Database Integration (Vercel Postgres)
- Installed `@vercel/postgres` package
- Created database schema with articles table
- Tracks: original article, English summary, Arabic summary, copy status, timestamps

### 2. New API Routes
- `POST /api/save-article` - Saves articles after generation
- `GET /api/article-count` - Returns total articles count
- `PATCH /api/update-article` - Updates copied/discarded status

### 3. UI Features
- **Article Counter** on homepage showing "X+ Articles Generated"
- **Copy Tracking** - Tracks when users copy the Arabic summary
- **Auto-save** - Every article is automatically saved to database

### 4. Database Client
- `lib/db/client.ts` - Helper functions for database operations
- `lib/db/schema.sql` - Database schema definition

## Deployment Steps

### Before Deployment (Complete These First)

1. **Create Vercel Postgres Database**
   - Go to https://vercel.com/dashboard
   - Select your project
   - Storage tab → Create Database → Postgres
   - Name it (e.g., "newsai-db")
   - Select closest region
   - Create

2. **Run Database Schema**
   - In Vercel dashboard, open your database
   - Go to Query tab
   - Copy SQL from `lib/db/schema.sql`
   - Run the query
   - Verify table is created

3. **Environment Variables (Already Set)**
   You already have:
   - `OPENAI_API_KEY` ✓
   - `EXTRACTOR_API_KEY` ✓

   Vercel automatically adds these (no action needed):
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - Other Postgres connection strings

### Deploy to Vercel

```bash
# 1. Commit all changes
git add .
git commit -m "Add database tracking and article counter"

# 2. Push to GitHub
git push origin main

# 3. Vercel will auto-deploy
# Or manually deploy: vercel --prod
```

### After Deployment

1. **Verify Database Connection**
   - Generate an article on your live site
   - Check Vercel → Databases → Browse data
   - You should see the article in the `articles` table

2. **Check Counter**
   - Visit homepage
   - Counter should show "0+ Articles Generated" initially
   - Increases after each article generation

3. **Test Copy Tracking**
   - Generate an article
   - Click copy button on Arabic summary
   - Check database: `copied` column should be `true`

## Backend Tech Stack Summary

Your backend is **serverless** - no separate server needed!

### Components:
- **Next.js 14 App Router** - Handles routing and serverless functions
- **Vercel Postgres** - Managed PostgreSQL database
- **LangChain.js** - AI processing pipeline
- **OpenAI API** - GPT-4o-mini models
- **ExtractorAPI** - URL content extraction

### How It Works:
1. Each API route (`app/api/*`) is a serverless function
2. Deployed automatically on Vercel's edge network
3. Database connects via environment variables
4. Auto-scales based on traffic
5. No server management required

## Optional: Pre-populate Counter

If you want the counter to start at 1247 instead of 0:

```sql
-- In Vercel database Query tab
ALTER SEQUENCE articles_id_seq RESTART WITH 1247;
```

This makes the next article have ID 1247, so your counter shows "1247+ Articles Generated"

## Files Changed/Added

### New Files:
- `lib/db/client.ts` - Database helper functions
- `lib/db/schema.sql` - Database schema
- `app/api/save-article/route.ts` - Save article endpoint
- `app/api/article-count/route.ts` - Get count endpoint
- `app/api/update-article/route.ts` - Update status endpoint
- `DATABASE_SETUP.md` - Detailed setup guide

### Modified Files:
- `package.json` - Added @vercel/postgres
- `components/ArticleCounter.tsx` - Fetches real data from API
- `components/FooterCounter.tsx` - Fetches real data from API
- `components/SummaryDisplay.tsx` - Tracks copy button clicks
- `app/page.tsx` - Saves articles, displays counter, tracks article ID

## Testing Locally

```bash
# 1. Get database connection strings from Vercel
# Project Settings → Environment Variables → .env.local tab

# 2. Copy them to your local .env.local file

# 3. Run dev server
npm run dev

# 4. Test generating an article
# Counter should update after generation
```

## Cost Estimate

### Vercel Postgres Free Tier:
- 256MB storage
- 60 compute hours/month
- Suitable for ~10,000-50,000 articles

### When to Upgrade:
- If you exceed free tier limits
- Vercel will notify you
- Pro plan starts at $20/month

## Security Notes

- Database credentials auto-managed by Vercel ✓
- API routes are server-side only ✓
- No sensitive data exposed to client ✓
- `.env.local` is in `.gitignore` ✓

## Next Steps After Deployment

1. Monitor the counter on your live site
2. Track copy rates in database
3. Optionally add analytics dashboard
4. Consider A/B testing different summary formats

## Support

If you encounter issues:
1. Check Vercel function logs
2. Verify database connection in Vercel dashboard
3. Run queries in database Query tab to debug
4. Check browser console for client-side errors

Detailed troubleshooting in `DATABASE_SETUP.md`
