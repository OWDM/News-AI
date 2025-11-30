#!/usr/bin/env node

/**
 * Script to create the contacts table in the database
 * Run with: node scripts/create-contacts-table.js
 */

const { sql } = require('@vercel/postgres');

async function createContactsTable() {
  try {
    console.log('Creating contacts table...');

    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    console.log('Contacts table created successfully!');

    console.log('Creating indexes...');

    await sql`
      CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_contacts_read ON contacts(read)
    `;

    console.log('Indexes created successfully!');
    console.log('✅ Database setup complete!');

    process.exit(0);
  } catch (error) {
    console.error('Error creating contacts table:', error);
    process.exit(1);
  }
}

createContactsTable();
