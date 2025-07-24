# Deployment Guide

## 🚀 GitHub Pages Deployment

### Step 1: Push to GitHub
```bash
# Add all files
git add .

# Commit with message
git commit -m "Initial commit: Better Bee spell practice platform

🎯 Features:
- NSF Junior Spelling Bee practice platform
- Smart practice algorithm with word mastery tracking
- Multiple voice options (ElevenLabs, ResponsiveVoice, browser)
- Flexible session sizes (10-100 words)
- Custom word list upload support
- Cloud database integration with Supabase
- Responsive design for desktop and mobile

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository: [https://github.com/knowvial/better-bee](https://github.com/knowvial/better-bee)
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**
7. Wait 2-3 minutes for deployment

### Step 3: Configure Database (Optional)
If you want cloud sync and progress tracking:

1. **Create Supabase Account**: Go to [supabase.com](https://supabase.com)
2. **Create Project**: Name it "better-bee" or similar
3. **Run Database Schema**: Copy/paste `database-schema.sql` in SQL Editor
4. **Get Credentials**: Copy Project URL and anon key from Settings → API
5. **Update Config**: Edit `config.js` with your credentials
6. **Set Site URL**: In Supabase Settings → API → Site URL: `https://knowvial.github.io`
7. **Commit Changes**: Push updated config to GitHub

### Step 4: Security Setup
1. **Domain Restriction**: Set Site URL in Supabase to `https://knowvial.github.io`
2. **Optional Enhanced Security**: Uncomment `security-config.js` in `index.html`
3. **Monitor Usage**: Check Supabase dashboard regularly

## 🔧 Local Development

### Running Locally
```bash
# Simple HTTP server
python -m http.server 8000

# Or with Node.js
npx http-server

# Or with PHP
php -S localhost:8000
```

### Testing Database Connection
1. Open browser console (F12)
2. Look for: ✅ `Database connected`
3. Practice a few words
4. Check for: ✅ `Session saved to database`

## 📊 Usage Analytics

### Free Tier Limits
- **Supabase**: 500MB database, 2GB bandwidth/month
- **GitHub Pages**: Unlimited static hosting
- **ElevenLabs**: 10,000 characters/month free

### Monitoring
- **Supabase Dashboard**: Monitor database usage and requests
- **GitHub Pages**: Check traffic in repository Insights
- **Browser Console**: Look for error messages

## 🛠️ Customization

### Adding Words
1. **Manual**: Upload CSV/JSON/TXT files through the interface
2. **Code**: Edit `words-data.js` and redeploy

### Changing Voices
1. **ElevenLabs**: Get API key from elevenlabs.io
2. **ResponsiveVoice**: No setup needed (150 calls/day free)
3. **Browser**: Uses system voices automatically

### Styling
- Edit `styles.css` for visual changes
- Supports CSS custom properties for theming
- Responsive design with mobile-first approach

## 🚨 Troubleshooting

### Database Not Connecting
- Check config.js has correct URL and key
- Verify Site URL is set in Supabase
- Check browser console for errors

### Voices Not Working
- Try different voice service in dropdown
- Check browser compatibility (Chrome/Edge recommended)
- Verify ResponsiveVoice script loads

### GitHub Pages Not Updating
- Wait 5-10 minutes after pushing changes
- Check Actions tab for build status
- Clear browser cache and hard refresh

## 📞 Support

- **Issues**: Create issue on GitHub repository
- **Documentation**: See README.md and setup guides
- **Database Setup**: Follow SETUP-DATABASE.md

---

🎉 **Your spell bee practice platform is ready!**

**Live URL**: https://knowvial.github.io/better-bee