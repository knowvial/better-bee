# Database Setup Guide

## 🎯 Single-User Anonymous Database Setup

This guide shows how to set up Supabase for the spell bee app with anonymous access (no authentication required).

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up/login with GitHub or email
4. Click **"New Project"**
5. Choose organization and fill in:
   - **Project Name**: `spellbee-practice` 
   - **Database Password**: `Generate a password` (save this!)
   - **Region**: Choose closest to you
6. Click **"Create new project"**
7. Wait 2-3 minutes for setup to complete

### Step 2: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy and paste the entire contents of `database-schema.sql`
4. Click **"Run"** to execute the SQL
5. You should see: ✅ Success messages for all tables

### Step 3: Get Your Connection Details

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6...`

### Step 4: Update Configuration

1. Open `config.js` in your project
2. Replace the placeholder values:

```javascript
const config = {
  supabase: {
    url: 'https://YOUR-PROJECT-ID.supabase.co',    // ← Your Project URL
    anonKey: 'YOUR-ANON-KEY-HERE',                  // ← Your anon/public key
  },
  // ... rest stays the same
};
```

### Step 5: Test the Connection

1. Open the spell bee app in browser
2. Open **Developer Tools** (F12) → **Console**
3. Look for these messages:
   - ✅ `Database connected`
   - ✅ `Loaded progress for X words from database`
4. Practice a few words and complete a session
5. Check console for:
   - ✅ `Session saved to database`
   - ✅ `X mistakes saved to database`

### Step 6: Verify Data in Supabase

1. Go to your Supabase dashboard
2. Navigate to **Table Editor**
3. Check these tables have data:
   - **practice_sessions**: Your completed sessions
   - **word_progress**: Words you've practiced
   - **mistakes**: Words you got wrong

## 🔍 Troubleshooting

### "Database config not set"
- Make sure you updated `config.js` with real values
- Ensure URL doesn't end with `/` 
- Check anon key is complete (very long string)

### "Failed to save to database"
- Check browser console for specific error
- Verify RLS policies are created (run schema again)
- Test with simple query in Supabase SQL editor

### Data not loading
- Clear browser cache and localStorage
- Check Supabase logs in dashboard
- Verify tables exist in Table Editor

## 🎉 Success!

Once connected, your app will:
- ✅ **Save all progress** to the cloud
- ✅ **Sync across devices** (same browser)
- ✅ **Track word mastery** over time
- ✅ **Store detailed session history**
- ✅ **Remember mistakes** for focused practice

The app works offline too - it will save to localStorage and sync when connection is restored!

---

## Free Tier Limits

**Supabase Free Tier:**
- 500MB database storage
- 2GB bandwidth per month  
- 50MB file storage
- Perfect for spell bee practice! 🚀