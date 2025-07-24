# Better Bee - Spell Bee Practice Platform

🚀 **Live Demo**: [https://knowvial.github.io/better-bee](https://knowvial.github.io/better-bee)

A comprehensive spell bee practice platform designed for the North South Foundation (NSF) Junior Spelling Bee Championship 2025.

## ✨ Features

### 🎯 Core Functionality
- **Authentic Spell Bee Format**: Follows NSF competition standards
- **Smart Practice Algorithm**: Focuses on words that need more practice  
- **Multiple Voice Options**: ElevenLabs, ResponsiveVoice, and browser voices
- **Progress Tracking**: Cloud-based word mastery tracking
- **Custom Word Lists**: Upload your own words via CSV, JSON, or TXT
- **Flexible Sessions**: Choose 10-100 words per practice session

### 🧠 Practice Modes
1. **Competition Mode**: Full spell bee simulation with timer and scoring
2. **Smart Practice**: AI-powered word selection (60% failed + 30% learning + 10% new)
3. **Review Mistakes**: Focus on previously missed words only

## 🎵 Voice Options

### Free Options:
- **Browser Voices**: System voices (Samantha on Mac, Zira on Windows)
- **ResponsiveVoice**: 150 calls/day free tier

### Premium Option:
- **ElevenLabs**: Ultra-realistic voices (10,000 chars/month free)

## 🚀 Quick Start

1. Visit the live demo: https://knowvial.github.io/better-bee
2. Choose your session length (10-100 words)
3. Select a practice mode
4. Start practicing!

## 📊 Database Setup (Optional)

For progress tracking and cloud sync:
1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Follow instructions in `SETUP-DATABASE.md`
3. Update `config.js` with your credentials

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/knowvial/better-bee.git
cd better-bee

# Start local server
python -m http.server 8000
# or
npx http-server

# Open http://localhost:8000
```
