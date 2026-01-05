# 🔧 Troubleshooting Guide

## Common Errors & Solutions

### Error: "Error saving game result: {}"

**Cause:** Database schema not set up yet or RLS policies blocking access.

**Solution:**

1. Check if database schema is set up:
   - Visit `/diagnostic` page in your app
   - Check if all tables show ✅ OK
2. If tables missing:
   - Open `supabase-schema.sql`
   - Go to Supabase Dashboard → SQL Editor
   - Copy & paste entire schema
   - Run (Ctrl+Enter)
3. If RLS policy issue:
   - Make sure user is authenticated
   - Check auth status in `/diagnostic` page

---

### Error: "No questions available"

**Cause:** Questions table is empty or schema INSERT statements not run.

**Solution:**

1. Check question count in `/diagnostic` page
2. If count is 0:
   - Re-run the entire `supabase-schema.sql` file
   - Make sure you run the INSERT statements at the bottom
   - Verify with: `SELECT COUNT(*) FROM questions;`

---

### Error: "Failed to fetch questions"

**Cause:**

- Database not set up
- Network connection issue
- Wrong Supabase credentials

**Solution:**

1. Check `/diagnostic` page for database status
2. Verify `.env.local` has correct values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
   ```
3. Restart dev server: `npm run dev`

---

### User not authenticated

**Cause:** User hasn't logged in or session expired.

**Solution:**

1. Go to `/login` and create account
2. Or enable dev mode:
   - Add to `.env.local`: `NEXT_PUBLIC_DEV_MODE=true`
   - Restart dev server
3. Check auth status in `/diagnostic` page

---

## Quick Diagnostics

### 1. Check Database Setup

Visit: **http://localhost:3000/diagnostic**

This page shows:

- ✅ Database tables status
- ✅ Question count
- ✅ Authentication status
- ✅ Error details

### 2. Check Console Logs

Open browser DevTools (F12) → Console

Look for:

- ✅ Green success messages
- ❌ Red error messages with details
- ⚠️ Yellow warnings

### 3. Check Supabase Dashboard

**Authentication:**

- Dashboard → Authentication → Users
- Should see registered users

**Database:**

- Dashboard → Table Editor
- Check `profiles`, `questions`, `game_results` tables

**SQL Editor:**

- Run: `SELECT COUNT(*) FROM questions WHERE verified = true;`
- Should return > 0

---

## Database Setup Checklist

- [ ] Supabase project created
- [ ] Environment variables set in `.env.local`
- [ ] `supabase-schema.sql` executed completely
- [ ] Tables created (profiles, questions, game_results)
- [ ] Sample questions inserted (10+)
- [ ] RLS policies enabled
- [ ] Triggers created
- [ ] User registered via `/register`

---

## Dev Mode

For testing without database:

```env
# .env.local
NEXT_PUBLIC_DEV_MODE=true
```

**What it does:**

- ✅ Skips authentication
- ✅ Uses mock user
- ⚠️ Game results NOT saved
- ⚠️ Questions still need database

**Note:** Still need to run database schema for questions!

---

## Getting Help

1. **Check Diagnostic Page:** `/diagnostic`
2. **Check Console:** Browser DevTools → Console
3. **Check Database:** Supabase Dashboard → Table Editor
4. **Read Docs:** `DATABASE_SETUP.md`

---

## Common Warning Messages

### "⚠️ No user logged in. Game result not saved."

- **Meaning:** Playing without authentication
- **Impact:** Results won't be saved to leaderboard
- **Fix:** Login via `/login` or enable dev mode

### "⚠️ Continuing without saving. Make sure database schema is set up."

- **Meaning:** Failed to save result but game continues
- **Impact:** This session won't count in leaderboard
- **Fix:** Run database schema, check `/diagnostic`

### "⚠️ Profile not found for user: [userId]"

- **Meaning:** User logged in but profile not created yet
- **Impact:** Username will fallback to email
- **Fix:** Normal for new users, profile auto-created on register

### "Dashboard not showing logged-in state"

- **Meaning:** Dev mode might be ON or auth not detected
- **Impact:** Shows guest view instead of user view
- **Fix:**
  1. Set `NEXT_PUBLIC_DEV_MODE=false` in `.env.local`
  2. Restart dev server
  3. Clear browser cache and refresh
  4. Login again

### "Leaderboard showing old data"

- **Meaning:** LeaderboardCard might be cached
- **Impact:** Not showing latest rankings
- **Fix:**
  1. Hard refresh browser (Ctrl+Shift+R)
  2. Check if DEV_MODE is false
  3. Verify data in Supabase dashboard
### "Email confirmation redirects to localhost after deployment"

- **Meaning:** Supabase Site URL still set to localhost
- **Impact:** Email verification links don't work in production
- **Fix:**
  1. Open Supabase Dashboard → Authentication → URL Configuration
  2. Update **Site URL** to: `https://your-project.vercel.app`
  3. Add to **Redirect URLs**: `https://your-project.vercel.app/**`
  4. Keep `http://localhost:3000/**` for local development
  5. Test registration with new email

### "Password doesn't meet requirements"

- **Meaning:** Password validation failed during registration
- **Impact:** Cannot create account
- **Fix:**
  1. Check password requirements:
     - Minimal 8 karakter
     - Harus ada huruf (a-z atau A-Z)
     - Harus ada angka (0-9)
     - Harus ada karakter khusus (!@#$%^&*)
  2. Use real-time indicator to see which criteria are missing
  3. Example valid passwords:
     - `MyPass123!`
     - `Parikesit99@`
     - `Test1234#`

### "Password validation indicator not showing"

- **Meaning:** Real-time validation not working
- **Impact:** No visual feedback for password strength
- **Fix:**
  1. Make sure you're typing in the password field
  2. Clear browser cache and refresh
  3. Check browser console for JavaScript errors
  4. Try a different browser

---

## Quick Fixes

### Reset Everything

```sql
-- Run in Supabase SQL Editor
DROP TABLE IF EXISTS game_results CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP MATERIALIZED VIEW IF EXISTS global_leaderboard CASCADE;

-- Then re-run supabase-schema.sql
```

### Clear Browser Data

1. F12 → Application → Storage
2. Clear Site Data
3. Refresh page

### Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## Deployment Issues (Vercel)

### Build fails with "Your project's URL and API key are required"

**Error Message:**
```
Error: @supabase/ssr: Your project's URL and API key are required to create a Supabase client!
Error occurred prerendering page "/diagnostic"
```

**Cause:** Environment variables not set in Vercel.

**Solution:**

1. **Add Environment Variables in Vercel:**
   - Go to Vercel Dashboard → Your Project
   - Click **Settings** → **Environment Variables**
   - Add these variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
     NEXT_PUBLIC_DEV_MODE = false
     ```
   - Get credentials from: Supabase Dashboard → Settings → API
   - Set for: Production, Preview, and Development
   - Click **Save**

2. **Redeploy:**
   ```bash
   git commit --allow-empty -m "trigger redeploy"
   git push origin main
   ```

3. **Verify:** Check deployment logs in Vercel - build should succeed

**Important:** Never commit `.env.local` to Git! Use Vercel's environment variables feature.

---

### Vercel deployment succeeds but app doesn't work

**Symptoms:**
- Build succeeds but app shows errors
- Login/register not working
- Database operations fail

**Cause:** Production environment variables might be wrong or missing.

**Solution:**

1. **Verify Environment Variables:**
   - Vercel Dashboard → Settings → Environment Variables
   - Make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
   - Make sure `NEXT_PUBLIC_DEV_MODE = false` (not "true")

2. **Test Production Build Locally:**
   ```bash
   npm run build
   npm run start
   # Visit http://localhost:3000
   ```

3. **Check Vercel Logs:**
   - Vercel Dashboard → Deployments → Click latest deployment
   - Check "Functions" tab for runtime errors

4. **Update Supabase URLs:**
   - Supabase Dashboard → Authentication → URL Configuration
   - Add your Vercel URL: `https://your-project.vercel.app/**`

---

## Phase 2 Issues (Leaderboard, Profile, Auth)

### Dashboard still shows "Guest" after login

**Cause:** Using localStorage instead of Supabase session.

**Solution:** Already fixed in code. Dashboard now uses `getCurrentUser()` from Supabase auth.

**Verify:** After login, refresh page - should show username greeting.

---

### Leaderboard showing dummy data

**Cause:** Page was using static dummy array instead of fetching from database.

**Solution:** Already fixed. Now uses `fetchLeaderboard()` from `lib/leaderboard/leaderboard-helpers.ts`.

**Verify:** Check `/leaderboard` page - should show real usernames from database.

---

### Profile page error for new users

**Cause:** New users may not have profile record yet (async creation).

**Solution:** Already fixed. `getUserProfile()` now handles PGRST116 error gracefully and returns null instead of throwing.

**Verify:** Create new account and visit `/profile` - should show "Profile not found" message instead of error.

---

### Dev mode games appearing in leaderboard

**Cause:** Game results being saved even in development mode.

**Solution:** Already handled. When `NEXT_PUBLIC_DEV_MODE=true`, game results are NOT saved to database (see `lib/game/game-helpers.ts`).

**Verify:**

1. Set `NEXT_PUBLIC_DEV_MODE=true` in `.env.local`
2. Play game
3. Check `/leaderboard` - your test results should NOT appear

---

**Last Updated:** January 2, 2026
