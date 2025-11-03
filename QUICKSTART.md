# Quick Start Guide

Get NewsAI Next.js up and running in 5 minutes.

## Step 1: Install Dependencies

```bash
cd upgraded_next.js
npm install
```

## Step 2: Set Up Environment Variables

Create `.env.local` file:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
EXTRACTOR_API_KEY=your-extractor-api-key-here
```

**Where to get API keys:**
- **OpenAI:** https://platform.openai.com/api-keys
- **ExtractorAPI:** https://extractorapi.com/dashboard (free tier available)

## Step 3: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Step 4: Test the Application

1. **Try with Text Input:**
   - Click "Article Text" tab
   - Paste a technical article (minimum 130 words)
   - Click "Generate Summary"

2. **Try with URL:**
   - Click "Article URL" tab
   - Enter a URL like: `https://techcrunch.com/2024/01/01/some-article`
   - Click "Generate Summary"

3. **Wait for Processing:**
   - Extract Key Info (~15-20s)
   - Generate Summary (~10-15s)
   - Translate Arabic (~5-10s)
   - Match Sentences (~10-15s)
   - **Total:** ~40-60 seconds

4. **View Results:**
   - See Arabic summary (with copy button)
   - See English summary with highlighting
   - See original article with highlighting
   - Toggle highlighting on/off

## Step 5: Deploy to Vercel

### Option A: GitHub Integration (Recommended)

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Add Next.js NewsAI"
   git push
   ```

2. Go to https://vercel.com/new

3. Import your repository

4. Add environment variables:
   - `OPENAI_API_KEY`
   - `EXTRACTOR_API_KEY`

5. Click "Deploy"

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow prompts and add environment variables when asked.

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### "OPENAI_API_KEY is not configured"
Make sure `.env.local` exists with valid keys.

### Timeout errors on Vercel
Upgrade to Vercel Pro for 60-second timeout (free tier is 10s).

### Fine-tuned model errors
Check if your OpenAI account has access to:
```
ft:gpt-4o-mini-2024-07-18:personal:arabic-translator-musaed:AEATefJ7
```

If not, update the model name in `lib/langchain/translate-chain.ts` to `gpt-4o-mini`.

## Next Steps

- Read [README.md](./README.md) for detailed documentation
- Read [MIGRATION_NOTES.md](./MIGRATION_NOTES.md) for technical details
- Customize the UI in `app/page.tsx` and `components/`
- Add your own styling or use the existing Tailwind classes
- Consider upgrading to Pinecone for persistent vector storage

## Need Help?

- Check the [README.md](./README.md) for API documentation
- Review [MIGRATION_NOTES.md](./MIGRATION_NOTES.md) for implementation details
- Check Vercel logs for deployment errors
- Ensure all environment variables are set correctly

## Success!

Your NewsAI Next.js application is now running! 🎉

You can now:
- Generate summaries from articles
- Get Arabic translations
- See sentence highlighting
- Deploy to production on Vercel
