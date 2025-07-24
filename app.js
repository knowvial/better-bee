// Password protection
function checkPassword() {
    const password = prompt("Enter password to access Better Bee:");
    const correctPassword = "spellbee2025"; // Change this password!
    
    if (password !== correctPassword) {
        alert("Incorrect password!");
        window.location.href = "about:blank";
        return false;
    }
    return true;
}

// Check password on page load
if (!checkPassword()) {
    throw new Error("Access denied");
}

// Global variables
let currentMode = '';
let currentWordIndex = 0;
let currentWord = null;
let wordList = [];
let sessionStats = {
    wordsCompleted: 0,
    correctCount: 0,
    mistakes: [],
    startTime: null,
    wordHistory: []
};

// Focus management
function focusInput() {
    document.getElementById('spellingInput').focus();
}

// Function to replace target word with blanks in text
function blankOutWord(text, targetWord) {
    if (!text || !targetWord) return text || '';
    
    // Escape special regex characters in the target word
    const escapedWord = targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create patterns to match various forms of the word
    const patterns = [
        // Exact match
        `\\b${escapedWord}\\b`,
        // Common suffixes
        `\\b${escapedWord}s\\b`,           // plural
        `\\b${escapedWord}es\\b`,          // plural (es)
        `\\b${escapedWord}d\\b`,           // past tense
        `\\b${escapedWord}ed\\b`,          // past tense (ed)
        `\\b${escapedWord}ing\\b`,         // present participle
        `\\b${escapedWord}er\\b`,          // comparative
        `\\b${escapedWord}est\\b`,         // superlative
        `\\b${escapedWord}ly\\b`,          // adverb
        // Handle words ending in 'e'
        `\\b${escapedWord.replace(/e$/, '')}ed\\b`,  // like "amble" -> "ambled"
        `\\b${escapedWord.replace(/e$/, '')}ing\\b`, // like "amble" -> "ambling"
        // Handle words ending in 'y'
        `\\b${escapedWord.replace(/y$/, 'ies')}\\b`, // like "fly" -> "flies"
        `\\b${escapedWord.replace(/y$/, 'ied')}\\b`, // like "fly" -> "flied"
        // Double consonant patterns
        `\\b${escapedWord}${escapedWord.slice(-1)}ed\\b`,  // like "stop" -> "stopped"
        `\\b${escapedWord}${escapedWord.slice(-1)}ing\\b`, // like "stop" -> "stopping"
    ];
    
    let result = text;
    
    // Apply each pattern
    patterns.forEach(pattern => {
        const regex = new RegExp(pattern, 'gi');
        result = result.replace(regex, (match) => {
            // Create a blank with appropriate length
            const blankLength = Math.max(match.length, 4);
            return `<span class="word-blank" style="min-width: ${blankLength * 8}px;"></span>`;
        });
    });
    
    return result;
}

// Update the word information display
function updateWordInfo(word) {
    const wordInfoEl = document.getElementById('wordInfo');
    const definitionEl = document.getElementById('definitionDisplay');  
    const originEl = document.getElementById('originDisplay');
    const sentenceEl = document.getElementById('sentenceDisplay');
    
    // Show word info if any data is available
    const hasInfo = word.definition || word.origin || word.sentence;
    
    if (hasInfo) {
        wordInfoEl.style.display = 'block';
        
        // Definition with word blanked out
        if (word.definition) {
            definitionEl.innerHTML = blankOutWord(word.definition, word.word);
        } else {
            definitionEl.textContent = 'Not available';
        }
        
        // Origin (no blanking needed usually)
        originEl.textContent = word.origin || 'Not available';
        
        // Sentence with word blanked out
        if (word.sentence) {
            sentenceEl.innerHTML = blankOutWord(word.sentence, word.word);
        } else {
            sentenceEl.textContent = 'Not available';
        }
    } else {
        wordInfoEl.style.display = 'none';
    }
}

// Practice Algorithm - Smart word selection
class PracticeAlgorithm {
    constructor() {
        this.wordStatus = this.loadWordStatus();
    }
    
    loadWordStatus() {
        const saved = localStorage.getItem('wordStatus');
        return saved ? JSON.parse(saved) : {};
    }
    
    saveWordStatus() {
        localStorage.setItem('wordStatus', JSON.stringify(this.wordStatus));
    }
    
    getWordStatus(word) {
        return this.wordStatus[word] || {
            attempts: 0,
            correct: 0,
            lastAttempt: null,
            status: 'new'
        };
    }
    
    updateWordStatus(word, isCorrect) {
        const status = this.getWordStatus(word);
        status.attempts++;
        if (isCorrect) {
            status.correct++;
            if (status.correct >= 3) {
                status.status = 'mastered';
            } else {
                status.status = 'learning';
            }
        } else {
            status.status = 'failed';
            status.correct = 0;
        }
        status.lastAttempt = Date.now();
        this.wordStatus[word] = status;
        this.saveWordStatus();
    }
    
    selectWords(allWords, mode, maxWords = 50) {
        if (mode === 'review') {
            // Only failed words
            const failedWords = allWords.filter(w => {
                const status = this.getWordStatus(w.word);
                return status.status === 'failed';
            });
            
            // Debug logging
            console.log(`Debug - Review mode: Found ${failedWords.length} failed words`);
            if (failedWords.length === 0) {
                console.log('Debug - Word status summary:');
                const statusCounts = {};
                allWords.forEach(w => {
                    const status = this.getWordStatus(w.word).status;
                    statusCounts[status] = (statusCounts[status] || 0) + 1;
                });
                console.log(statusCounts);
            }
            
            // Return all failed words or limit to maxWords
            if (maxWords === 0) return failedWords;
            return failedWords.slice(0, maxWords);
        }
        
        if (mode === 'smart') {
            // Smart selection algorithm
            const categorized = {
                failed: [],
                learning: [],
                new: [],
                mastered: []
            };
            
            allWords.forEach(w => {
                const status = this.getWordStatus(w.word);
                categorized[status.status].push(w);
            });
            
            // Use all words if maxWords is 0, otherwise limit
            const totalWords = maxWords === 0 ? allWords.length : Math.min(maxWords, allWords.length);
            
            // Build practice list: 60% failed, 30% learning, 10% new
            const practiceList = [];
            
            const addWords = (list, count) => {
                const shuffled = [...list].sort(() => Math.random() - 0.5);
                practiceList.push(...shuffled.slice(0, count));
            };
            
            addWords(categorized.failed, Math.floor(totalWords * 0.6));
            addWords(categorized.learning, Math.floor(totalWords * 0.3));
            addWords(categorized.new, Math.floor(totalWords * 0.1));
            
            // Fill remaining with new words if needed
            while (practiceList.length < totalWords && categorized.new.length > practiceList.filter(w => categorized.new.includes(w)).length) {
                const remainingNew = categorized.new.filter(w => !practiceList.includes(w));
                if (remainingNew.length > 0) {
                    practiceList.push(remainingNew[0]);
                } else {
                    break;
                }
            }
            
            return practiceList.sort(() => Math.random() - 0.5);
        }
        
        // Default: random selection, excluding mastered words
        const practiceable = allWords.filter(w => {
            const status = this.getWordStatus(w.word);
            return status.status !== 'mastered' || status.attempts === 0;
        });
        
        const shuffled = practiceable.sort(() => Math.random() - 0.5);
        return maxWords === 0 ? shuffled : shuffled.slice(0, maxWords);
    }
}

const practiceAlgorithm = new PracticeAlgorithm();

// Word count management
function getSelectedWordCount() {
    const wordCountSelect = document.getElementById('wordCount');
    return wordCountSelect ? parseInt(wordCountSelect.value) : 50;
}

function saveWordCountPreference() {
    const wordCount = getSelectedWordCount();
    localStorage.setItem('preferredWordCount', wordCount.toString());
    console.log(`📊 Word count preference saved: ${wordCount === 0 ? 'All words' : wordCount + ' words'}`);
}

function loadWordCountPreference() {
    const saved = localStorage.getItem('preferredWordCount');
    if (saved) {
        const wordCountSelect = document.getElementById('wordCount');
        if (wordCountSelect) {
            wordCountSelect.value = saved;
        }
    }
}

// Start practice session
function startPractice(mode) {
    currentMode = mode;
    currentWordIndex = 0;
    sessionStats = {
        wordsCompleted: 0,
        correctCount: 0,
        mistakes: [],
        startTime: Date.now(),
        wordHistory: []
    };
    
    // Get word list based on mode and selected count
    const allWords = getAllWords();
    const selectedWordCount = getSelectedWordCount();
    wordList = practiceAlgorithm.selectWords(allWords, mode, selectedWordCount);
    
    if (wordList.length === 0) {
        alert('No words available for this practice mode. Try adding more words or using a different mode.');
        return;
    }
    
    // Update UI
    document.getElementById('modeSelection').style.display = 'none';
    document.getElementById('practiceInterface').style.display = 'block';
    document.getElementById('totalWords').textContent = wordList.length;
    
    // Load voices if not loaded
    if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
            populateVoiceSelect();
            presentWord();
        });
    } else {
        populateVoiceSelect();
        // Start with first word
        presentWord();
    }
}

// Present current word
function presentWord() {
    if (currentWordIndex >= wordList.length) {
        endPractice();
        return;
    }
    
    currentWord = wordList[currentWordIndex];
    
    // Reset UI
    document.getElementById('spellingInput').value = '';
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    
    // Update progress
    updateProgress();
    
    // Update word information display (with word blanked out)
    updateWordInfo(currentWord);
    
    // DON'T show the word - only announce it
    const announcementEl = document.getElementById('announcement');
    announcementEl.textContent = "Listen carefully...";
    announcementEl.className = 'announcement-text listening';
    
    // Speak the word in spell bee format
    speakText("Your word is", () => {
        setTimeout(() => {
            speakText(currentWord.word, () => {
                // Repeat the word once more for clarity
                setTimeout(() => {
                    speakText(currentWord.word, () => {
                        announcementEl.className = 'announcement-text';
                        announcementEl.textContent = "Spell the word you just heard";
                        focusInput();
                    });
                }, 500);
            });
        }, 300);
    });
}

// Global voice settings
let selectedVoice = null;
let currentVoiceService = 'browser';
let elevenLabsApiKey = null; // User can add their API key

// Database connection
let supabase = null;
let databaseEnabled = false;

// Text to speech with multiple service options
async function speakText(text, callback) {
    try {
        switch (currentVoiceService) {
            case 'elevenlabs':
                await speakWithElevenLabs(text, callback);
                break;
            case 'responsivevoice':
                speakWithResponsiveVoice(text, callback);
                break;
            case 'speechsynthesis':
            case 'browser':
            default:
                speakWithBrowserAPI(text, callback);
                break;
        }
    } catch (error) {
        console.error('Speech error:', error);
        // Fallback to browser API
        speakWithBrowserAPI(text, callback);
    }
}

// Browser Speech Synthesis API
function speakWithBrowserAPI(text, callback) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Use user-selected voice or find best available
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        } else {
            const voices = speechSynthesis.getVoices();
            const bestVoice = findBestVoice(voices);
            if (bestVoice) {
                utterance.voice = bestVoice;
                selectedVoice = bestVoice;
            }
        }
        
        if (callback) utterance.onend = callback;
        speechSynthesis.speak(utterance);
    }
}

// ResponsiveVoice (Free tier: 150 calls/day)
function speakWithResponsiveVoice(text, callback) {
    if (typeof responsiveVoice !== 'undefined') {
        const voiceName = selectedVoice?.name || "US English Female";
        responsiveVoice.speak(text, voiceName, {
            rate: 0.8,
            pitch: 1,
            volume: 1,
            onend: callback
        });
    } else {
        speakWithBrowserAPI(text, callback);
    }
}

// ElevenLabs API (Premium quality, free tier: 10,000 chars/month)
async function speakWithElevenLabs(text, callback) {
    if (!elevenLabsApiKey) {
        // Prompt user for API key on first use
        const apiKey = prompt('Enter your ElevenLabs API key (get free at elevenlabs.io):');
        if (apiKey) {
            elevenLabsApiKey = apiKey;
            localStorage.setItem('elevenLabsApiKey', apiKey);
        } else {
            speakWithBrowserAPI(text, callback);
            return;
        }
    }
    
    try {
        // Use selected voice or default to Rachel
        const elevenVoices = [
            { name: 'Rachel', id: '21m00Tcm4TlvDq8ikWAM' },
            { name: 'Drew', id: '29vD33N1CtxCmqQRPOHJ' },
            { name: 'Clyde', id: '2EiwWnXFnvU5JabPnv8n' },
            { name: 'Paul', id: '5Q0t7uMcjvnagumLfvZi' }
        ];
        
        const voiceId = selectedVoice?.id || elevenVoices[0].id;
        
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': elevenLabsApiKey
            },
            body: JSON.stringify({
                text: text,
                model_id: 'eleven_monolingual_v1',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5,
                    speed: 0.8
                }
            })
        });
        
        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            
            audio.onended = () => {
                URL.revokeObjectURL(audioUrl);
                if (callback) callback();
            };
            
            audio.play();
        } else {
            throw new Error('ElevenLabs API error');
        }
    } catch (error) {
        console.error('ElevenLabs error:', error);
        speakWithBrowserAPI(text, callback);
    }
}

// Find the best available voice
function findBestVoice(voices) {
    // Priority list of good voices
    const preferredVoices = [
        'Samantha',  // macOS - very natural
        'Alex',      // macOS - clear and natural
        'Victoria',  // macOS
        'Karen',     // macOS
        'Tessa',     // macOS
        'Microsoft Zira - English (United States)',
        'Microsoft David - English (United States)', 
        'Google US English'
    ];
    
    // Find a preferred voice
    for (const preferred of preferredVoices) {
        const voice = voices.find(v => v.name === preferred);
        if (voice) return voice;
    }
    
    // If no preferred voice found, use any clear US English voice
    return voices.find(voice => 
        voice.lang === 'en-US' && 
        !voice.name.toLowerCase().includes('google') &&
        !voice.name.toLowerCase().includes('android')
    ) || voices.find(voice => voice.lang.startsWith('en'));
}

// Populate voice dropdown based on selected service
function populateVoiceSelect() {
    const voiceSelect = document.getElementById('voiceSelect');
    if (!voiceSelect) return;
    
    // Clear existing options
    voiceSelect.innerHTML = '';
    
    if (currentVoiceService === 'elevenlabs') {
        // ElevenLabs voices (premium quality)
        const elevenVoices = [
            { name: 'Rachel', id: '21m00Tcm4TlvDq8ikWAM', description: 'American Female ⭐⭐⭐' },
            { name: 'Drew', id: '29vD33N1CtxCmqQRPOHJ', description: 'American Male ⭐⭐⭐' },
            { name: 'Clyde', id: '2EiwWnXFnvU5JabPnv8n', description: 'American Male ⭐⭐' },
            { name: 'Paul', id: '5Q0t7uMcjvnagumLfvZi', description: 'American Male ⭐⭐' }
        ];
        
        elevenVoices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${voice.name} - ${voice.description}`;
            voiceSelect.appendChild(option);
        });
        
        selectedVoice = { id: elevenVoices[0].id, name: elevenVoices[0].name };
        
    } else if (currentVoiceService === 'responsivevoice') {
        // ResponsiveVoice options
        const rvVoices = [
            'US English Female ⭐',
            'US English Male ⭐', 
            'UK English Female',
            'UK English Male',
            'Australian Female',
            'Canadian Female'
        ];
        
        rvVoices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = voice;
            voiceSelect.appendChild(option);
        });
        
        selectedVoice = { name: 'US English Female' };
        
    } else {
        // Browser/Web Speech API voices
        const voices = speechSynthesis.getVoices();
        
        // Filter to English voices only
        const englishVoices = voices.filter(voice => 
            voice.lang.startsWith('en') && 
            !voice.name.toLowerCase().includes('android')
        ).sort((a, b) => {
            // Prioritize US English
            if (a.lang === 'en-US' && b.lang !== 'en-US') return -1;
            if (b.lang === 'en-US' && a.lang !== 'en-US') return 1;
            return a.name.localeCompare(b.name);
        });
        
        englishVoices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            
            // Mark high-quality voices
            if (['Samantha', 'Alex', 'Victoria', 'Karen', 'Tessa', 'Zira', 'David'].includes(voice.name)) {
                option.textContent += ' ⭐';
            }
            
            voiceSelect.appendChild(option);
        });
        
        // Auto-select the best voice
        const bestVoice = findBestVoice(englishVoices);
        if (bestVoice) {
            const bestIndex = englishVoices.indexOf(bestVoice);
            voiceSelect.selectedIndex = bestIndex;
            selectedVoice = bestVoice;
        }
    }
}

// Switch voice service
function switchVoiceService() {
    const serviceSelect = document.getElementById('voiceService');
    currentVoiceService = serviceSelect.value;
    
    // Populate voices for the selected service
    populateVoiceSelect();
    
    // Save preference
    localStorage.setItem('voiceService', currentVoiceService);
}

// Update voice when user selects different option
function updateVoice() {
    const voiceSelect = document.getElementById('voiceSelect');
    if (!voiceSelect) return;
    
    if (currentVoiceService === 'browser' || currentVoiceService === 'speechsynthesis') {
        const voices = speechSynthesis.getVoices().filter(voice => 
            voice.lang.startsWith('en') && 
            !voice.name.toLowerCase().includes('android')
        ).sort((a, b) => {
            if (a.lang === 'en-US' && b.lang !== 'en-US') return -1;
            if (b.lang === 'en-US' && a.lang !== 'en-US') return 1;
            return a.name.localeCompare(b.name);
        });
        
        const selectedIndex = parseInt(voiceSelect.value);
        if (selectedIndex >= 0 && selectedIndex < voices.length) {
            selectedVoice = voices[selectedIndex];
        }
    } else if (currentVoiceService === 'responsivevoice') {
        const rvVoices = [
            'US English Female', 'US English Male', 'UK English Female', 'UK English Male',
            'Australian Female', 'Australian Male', 'Canadian Female', 'Canadian Male'
        ];
        const selectedIndex = parseInt(voiceSelect.value);
        if (selectedIndex >= 0 && selectedIndex < rvVoices.length) {
            selectedVoice = { name: rvVoices[selectedIndex] };
        }
    }
    
    // Test the voice
    speakText("Hello, this is your selected voice for the spelling bee practice.");
}

// Control functions
function repeatWord() {
    speakText(currentWord.word, () => {
        focusInput();
    });
}

function requestDefinition() {
    if (currentWord.definition) {
        speakText(`Definition: ${currentWord.definition}`, () => {
            focusInput();
        });
    } else {
        speakText("No definition available", () => {
            focusInput();
        });
    }
}

function requestSentence() {
    if (currentWord.sentence) {
        speakText(`Used in a sentence: ${currentWord.sentence}`, () => {
            focusInput();
        });
    } else {
        speakText("No sentence available", () => {
            focusInput();
        });
    }
}

function requestOrigin() {
    if (currentWord.origin) {
        speakText(`Language of origin: ${currentWord.origin}`, () => {
            focusInput();
        });
    } else {
        speakText("Origin not available", () => {
            focusInput();
        });
    }
}


// Submit spelling
async function submitSpelling() {
    const spelling = document.getElementById('spellingInput').value.trim().toUpperCase();
    const correctSpelling = currentWord.word.toUpperCase();
    const isCorrect = spelling === correctSpelling;
    
    // Update statistics
    sessionStats.wordsCompleted++;
    if (isCorrect) {
        sessionStats.correctCount++;
    } else {
        sessionStats.mistakes.push({
            word: currentWord.word,
            attempted: spelling,
            timestamp: Date.now()
        });
    }
    
    // Update word status in algorithm
    practiceAlgorithm.updateWordStatus(currentWord.word, isCorrect);
    
    // Save to database
    await saveWordProgress(currentWord.word, isCorrect);
    
    // Add to history
    sessionStats.wordHistory.push({
        word: currentWord.word,
        correct: isCorrect,
        attempted: spelling
    });
    
    // Show feedback
    showFeedback(isCorrect, correctSpelling);
    
    // Update progress
    updateProgress();
}

function showFeedback(isCorrect, correctSpelling) {
    const feedback = document.getElementById('feedback');
    const feedbackContent = document.getElementById('feedbackContent');
    
    feedback.style.display = 'block';
    feedback.className = `feedback-section ${isCorrect ? 'correct' : 'incorrect'}`;
    
    if (isCorrect) {
        feedbackContent.innerHTML = '✓ Correct! Well done!';
        speakText('Correct! Well done!');
    } else {
        feedbackContent.innerHTML = `✗ Incorrect. The correct spelling is: ${correctSpelling}`;
        speakText(`Incorrect. The correct spelling is: ${currentWord.word.split('').join(' ')}`);
    }
    
    // Show next button
    document.getElementById('nextBtn').style.display = 'inline-block';
}

// Navigation
async function skipWord() {
    // Mark as skipped (failed)
    sessionStats.mistakes.push({
        word: currentWord.word,
        attempted: 'SKIPPED',
        timestamp: Date.now()
    });
    practiceAlgorithm.updateWordStatus(currentWord.word, false);
    await saveWordProgress(currentWord.word, false);
    nextWord();
}

function nextWord() {
    currentWordIndex++;
    presentWord();
}

// Update progress bar
function updateProgress() {
    const progress = (sessionStats.wordsCompleted / wordList.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('wordsCompleted').textContent = sessionStats.wordsCompleted;
    
    const accuracy = sessionStats.wordsCompleted > 0 
        ? Math.round((sessionStats.correctCount / sessionStats.wordsCompleted) * 100)
        : 0;
    document.getElementById('accuracy').textContent = accuracy;
}

// End practice session
function endPractice() {
    // Calculate final stats
    const duration = Math.round((Date.now() - sessionStats.startTime) / 1000 / 60);
    const accuracy = Math.round((sessionStats.correctCount / sessionStats.wordsCompleted) * 100);
    
    // Update UI
    document.getElementById('practiceInterface').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    
    document.getElementById('resultWords').textContent = sessionStats.wordsCompleted;
    document.getElementById('resultAccuracy').textContent = accuracy + '%';
    document.getElementById('resultTime').textContent = duration + 'm';
    
    // Show mistakes
    const mistakesList = document.getElementById('mistakesList');
    mistakesList.innerHTML = '';
    
    sessionStats.mistakes.forEach(mistake => {
        const item = document.createElement('div');
        item.className = 'mistake-item';
        item.innerHTML = `
            <span class="mistake-word">${mistake.word}</span>
            <span class="mistake-attempt">${mistake.attempted}</span>
        `;
        mistakesList.appendChild(item);
    });
    
    // Save session to database (if using Supabase)
    saveSession();
}

// Exit practice
function exitPractice() {
    if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
        endPractice();
    }
}

// Reset to home
function resetToHome() {
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('modeSelection').style.display = 'block';
}

// Handle file upload
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
        const words = await parseWordFile(file);
        if (words.length > 0) {
            addCustomWords(words);
            alert(`Successfully added ${words.length} words!`);
        }
    } catch (error) {
        alert('Error parsing file. Please check the format.');
        console.error(error);
    }
}

// Handle keyboard shortcuts
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        submitSpelling();
    }
}

// Initialize database connection
function initDatabase() {
    if (typeof window.SpellBeeConfig !== 'undefined' && window.SpellBeeConfig.settings.enableDatabase) {
        try {
            // Security check - verify domain if SecurityConfig is available
            if (typeof window.SecurityConfig !== 'undefined') {
                if (!window.SecurityConfig.isDomainAllowed()) {
                    console.warn('⚠️ Unauthorized domain - database disabled');
                    return;
                }
            }
            
            const { supabase: config } = window.SpellBeeConfig;
            if (config.url && config.anonKey && config.url !== 'https://your-project-id.supabase.co') {
                supabase = window.supabase.createClient(config.url, config.anonKey);
                databaseEnabled = true;
                console.log('✅ Database connected');
            } else {
                console.log('⚠️ Database config not set - using localStorage only');
            }
        } catch (error) {
            console.error('❌ Database connection failed:', error);
        }
    }
}

// Save session to database or localStorage
async function saveSession() {
    const sessionData = {
        user_id: 'single-user',
        mode: currentMode,
        words_practiced: sessionStats.wordsCompleted,
        correct_count: sessionStats.correctCount,
        accuracy: sessionStats.wordsCompleted > 0 ? (sessionStats.correctCount / sessionStats.wordsCompleted) * 100 : 0,
        duration_minutes: Math.round((Date.now() - sessionStats.startTime) / 1000 / 60),
        session_date: new Date().toISOString()
    };
    
    if (databaseEnabled && supabase) {
        try {
            // Save to Supabase
            const { data, error } = await supabase
                .from('practice_sessions')
                .insert([sessionData]);
            
            if (error) throw error;
            
            console.log('✅ Session saved to database');
            
            // Also save mistakes to database
            if (sessionStats.mistakes.length > 0) {
                const mistakeData = sessionStats.mistakes.map(mistake => ({
                    user_id: 'single-user',
                    session_id: data?.[0]?.id,
                    word: mistake.word,
                    incorrect_spelling: mistake.attempted,
                    timestamp: new Date(mistake.timestamp).toISOString()
                }));
                
                await supabase.from('mistakes').insert(mistakeData);
                console.log(`✅ ${mistakeData.length} mistakes saved to database`);
            }
            
        } catch (error) {
            console.error('❌ Failed to save to database:', error);
            // Fallback to localStorage
            saveSessionLocally(sessionData);
        }
    } else {
        // Save to localStorage only
        saveSessionLocally(sessionData);
    }
}

// Fallback: Save to localStorage
function saveSessionLocally(sessionData) {
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    sessions.push({
        ...sessionData,
        timestamp: Date.now(),
        mistakes: sessionStats.mistakes
    });
    localStorage.setItem('sessions', JSON.stringify(sessions));
    console.log('💾 Session saved locally');
}

// Save word progress to database
async function saveWordProgress(word, isCorrect) {
    const wordStatus = practiceAlgorithm.getWordStatus(word);
    
    if (databaseEnabled && supabase) {
        try {
            const progressData = {
                user_id: 'single-user',
                word: word,
                attempts: wordStatus.attempts,
                correct_count: wordStatus.correct,
                status: wordStatus.status,
                last_attempt: new Date().toISOString()
            };
            
            // Upsert (insert or update)
            const { error } = await supabase
                .from('word_progress')
                .upsert(progressData, { 
                    onConflict: 'user_id,word',
                    ignoreDuplicates: false 
                });
            
            if (error) throw error;
            
        } catch (error) {
            console.error('❌ Failed to save word progress:', error);
        }
    }
}

// Load word progress from database
async function loadWordProgress() {
    if (databaseEnabled && supabase) {
        try {
            const { data, error } = await supabase
                .from('word_progress')
                .select('*')
                .eq('user_id', 'single-user');
            
            if (error) throw error;
            
            if (data && data.length > 0) {
                // Update local word status with database data
                data.forEach(record => {
                    practiceAlgorithm.wordStatus[record.word] = {
                        attempts: record.attempts,
                        correct: record.correct_count,
                        lastAttempt: new Date(record.last_attempt).getTime(),
                        status: record.status
                    };
                });
                
                console.log(`✅ Loaded progress for ${data.length} words from database`);
                practiceAlgorithm.saveWordStatus(); // Sync to localStorage
            }
            
        } catch (error) {
            console.error('❌ Failed to load word progress:', error);
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize database first
    initDatabase();
    
    // Load word progress from database
    await loadWordProgress();
    
    // Load word count preference
    loadWordCountPreference();
    
    // Load saved preferences
    const savedService = localStorage.getItem('voiceService');
    const savedApiKey = localStorage.getItem('elevenLabsApiKey');
    
    if (savedService) {
        currentVoiceService = savedService;
        const serviceSelect = document.getElementById('voiceService');
        if (serviceSelect) serviceSelect.value = savedService;
    }
    
    if (savedApiKey) {
        elevenLabsApiKey = savedApiKey;
    }
    
    // Load voices on startup
    speechSynthesis.getVoices();
    
    // Populate voice select when voices are ready
    if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', populateVoiceSelect);
    } else {
        populateVoiceSelect();
    }
    
    // Add ResponsiveVoice default settings
    if (typeof responsiveVoice !== 'undefined') {
        responsiveVoice.setDefaultVoice("US English Female");
    }
});