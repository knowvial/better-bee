# Better Bee - Spell Bee Practice Platform

A comprehensive spell bee practice platform designed for the North South Foundation (NSF) Junior Spelling Bee Championship 2025.

🚀 **Live Demo**: [https://knowvial.github.io/better-bee](https://knowvial.github.io/better-bee)

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

### Spell Bee Format
The platform follows the official spell bee format:
1. Word is announced: "Your word is: [word]"
2. Student can request:
   - Repeat word
   - Definition
   - Use in sentence
   - Language of origin
3. Student responds by:
   - Saying the word
   - Spelling it letter by letter
   - Saying the word again (optional)

## Setup Instructions

### Quick Start (GitHub Pages)

1. **Get ResponsiveVoice API Key** (Optional but recommended):
   - Visit [ResponsiveVoice.org](https://responsivevoice.org/)
   - Sign up for a free API key
   - Replace `YOUR_KEY` in `index.html` with your actual key

2. **Deploy to GitHub Pages**:
   ```bash
   # Create a new GitHub repository
   # Push all files to the repository
   # Go to Settings > Pages
   # Select "Deploy from a branch"
   # Choose main branch and root folder
   # Your site will be available at: https://[username].github.io/[repository-name]
   ```

3. **Local Testing**:
   - Open `index.html` directly in a modern browser
   - Or use a local server:
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

### Custom Word Lists

Upload words in any of these formats:

**CSV Format:**
```csv
word,definition,origin,sentence
example,a thing characteristic of its kind,Latin,This is an example sentence.
```

**JSON Format:**
```json
[
  {
    "word": "example",
    "definition": "a thing characteristic of its kind",
    "origin": "Latin",
    "sentence": "This is an example sentence."
  }
]
```

**TXT Format:**
```
example
sample
test
```

## Browser Requirements

- Modern browser with Web Speech API support:
  - Chrome/Edge (recommended)
  - Safari
  - Firefox (limited speech recognition)

## Usage Tips

1. **Voice Recognition**:
   - Click the microphone icon to start
   - Speak clearly: "[word] [spelling] [word]"
   - Example: "apple A-P-P-L-E apple"

2. **Keyboard Shortcuts**:
   - Enter: Submit spelling
   - Space: Repeat word (when focused on page)

3. **Progress Tracking**:
   - Words marked as "mastered" after 3 correct attempts
   - Failed words get priority in future sessions
   - Progress saved in browser (localStorage)

## Future Enhancements

To add database support (Supabase):

1. Sign up at [supabase.com](https://supabase.com)
2. Create tables as shown in the design
3. Update `app.js` with your Supabase credentials
4. Uncomment database save functions

## Troubleshooting

**No sound?**
- Check browser permissions for audio
- Ensure ResponsiveVoice key is valid
- Try the fallback Web Speech API

**Voice recognition not working?**
- Use Chrome or Edge for best results
- Check microphone permissions
- Ensure HTTPS connection (required for speech API)

**Words not saving?**
- Check browser localStorage is enabled
- Try clearing cache if issues persist

## License

This project is created for educational purposes for the NSF Spelling Bee preparation.