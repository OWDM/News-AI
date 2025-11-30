-- NewsAI Database Schema
-- Run this SQL in your Vercel Postgres dashboard after creating the database

CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  original_article TEXT NOT NULL,
  english_summary TEXT NOT NULL,
  arabic_summary TEXT NOT NULL,
  copied BOOLEAN DEFAULT FALSE,
  discarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster count queries
CREATE INDEX IF NOT EXISTS idx_created_at ON articles(created_at DESC);

-- Index for analytics (if you want to track copy rates)
CREATE INDEX IF NOT EXISTS idx_copied ON articles(copied);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster queries on contact messages
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_read ON contacts(read);
