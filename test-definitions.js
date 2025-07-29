// Test script to populate definitions for first 50 words
const fs = require('fs');
const https = require('https');

const FIRST_50_WORDS = [
    "abdicate", "abdomen", "ablaze", "accentuate", "access", "accommodate", "ace", "acid", "acronym", "actinic",
    "acute", "adamant", "adder", "adherent", "adjournment", "affectation", "affliction", "aftershock", "agonize", "albatross",
    "alcohol", "alcoves", "algebraically", "alimentary", "alleviate", "alligator", "allocate", "Almighty", "alnico", "altigraph",
    "altitude", "altruism", "amble", "amen", "ample", "amuse", "analysis", "anneal", "annual", "antelope",
    "anvil", "aorta", "approve", "aqua", "aquatic", "arachnid", "arcaded", "argentine", "articulate", "assimilate"
];

const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const DELAY_MS = 200;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchWordData(word) {
    return new Promise((resolve, reject) => {
        const url = API_BASE_URL + encodeURIComponent(word.toLowerCase());
        
        https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    if (res.statusCode === 200) {
                        const jsonData = JSON.parse(data);
                        const wordEntry = jsonData[0];
                        
                        let definition = '';
                        if (wordEntry.meanings && wordEntry.meanings.length > 0) {
                            const firstMeaning = wordEntry.meanings[0];
                            if (firstMeaning.definitions && firstMeaning.definitions.length > 0) {
                                definition = firstMeaning.definitions[0].definition;
                            }
                        }
                        
                        let origin = wordEntry.origin || '';
                        
                        let sentence = '';
                        if (wordEntry.meanings && wordEntry.meanings.length > 0) {
                            for (const meaning of wordEntry.meanings) {
                                for (const def of meaning.definitions || []) {
                                    if (def.example) {
                                        sentence = def.example;
                                        break;
                                    }
                                }
                                if (sentence) break;
                            }
                        }
                        
                        if (!sentence && definition) {
                            sentence = `The word "${word}" ${definition.toLowerCase()}.`;
                        }
                        
                        resolve({
                            word: word,
                            definition: definition,
                            origin: origin,
                            sentence: sentence
                        });
                    } else {
                        resolve({
                            word: word,
                            definition: '',
                            origin: '',
                            sentence: ''
                        });
                    }
                } catch (error) {
                    console.error(`Error parsing JSON for ${word}:`, error.message);
                    console.error(`Raw response: ${data.substring(0, 200)}`);
                    resolve({
                        word: word,
                        definition: '',
                        origin: '',
                        sentence: ''
                    });
                }
            });
        }).on('error', (error) => {
            console.error(`Error fetching ${word}:`, error.message);
            resolve({
                word: word,
                definition: '',
                origin: '',
                sentence: ''
            });
        });
    });
}

async function testDefinitions() {
    console.log(`Testing definitions for first ${FIRST_50_WORDS.length} words...`);
    
    const enrichedWords = [];
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < FIRST_50_WORDS.length; i++) {
        const word = FIRST_50_WORDS[i];
        console.log(`[${i + 1}/${FIRST_50_WORDS.length}] Fetching: ${word}`);
        
        try {
            const wordData = await fetchWordData(word);
            enrichedWords.push(wordData);
            
            if (wordData.definition) {
                successCount++;
                console.log(`  ✅ Found definition: ${wordData.definition.substring(0, 60)}${wordData.definition.length > 60 ? '...' : ''}`);
                if (wordData.origin) {
                    console.log(`  📚 Origin: ${wordData.origin.substring(0, 60)}${wordData.origin.length > 60 ? '...' : ''}`);
                }
                if (wordData.sentence) {
                    console.log(`  💬 Example: ${wordData.sentence.substring(0, 60)}${wordData.sentence.length > 60 ? '...' : ''}`);
                }
            } else {
                failCount++;
                console.log(`  ❌ No definition found`);
            }
            
            await delay(DELAY_MS);
            
        } catch (error) {
            console.error(`  ❌ Error: ${error.message}`);
            enrichedWords.push({
                word: word,
                definition: '',
                origin: '',
                sentence: ''
            });
            failCount++;
        }
    }
    
    console.log(`\n🎉 Test Complete!`);
    console.log(`📊 Statistics:`);
    console.log(`   Total words tested: ${FIRST_50_WORDS.length}`);
    console.log(`   ✅ Successfully populated: ${successCount} (${Math.round(successCount / FIRST_50_WORDS.length * 100)}%)`);
    console.log(`   ❌ Failed to populate: ${failCount} (${Math.round(failCount / FIRST_50_WORDS.length * 100)}%)`);
    
    console.log(`\nSample results:`);
    enrichedWords.slice(0, 3).forEach(word => {
        console.log(`\n"${word.word}":`);
        console.log(`  Definition: ${word.definition || 'Not found'}`);
        console.log(`  Origin: ${word.origin || 'Not found'}`);
        console.log(`  Example: ${word.sentence || 'Not found'}`);
    });
}

testDefinitions().catch(console.error);