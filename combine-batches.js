// Script to combine batch results and generate final definitions file
const fs = require('fs');

function combineAllBatches() {
    const allResults = [];
    let batchNum = 1;
    let totalSuccess = 0;
    let totalFail = 0;
    
    console.log('🔄 Combining batch results...\n');
    
    while (fs.existsSync(`batch-${batchNum}-results.json`)) {
        const batchData = JSON.parse(fs.readFileSync(`batch-${batchNum}-results.json`, 'utf8'));
        allResults.push(...batchData.enrichedWords);
        
        const batchSuccess = batchData.enrichedWords.filter(w => w.definition).length;
        const batchFail = batchData.enrichedWords.length - batchSuccess;
        
        totalSuccess += batchSuccess;
        totalFail += batchFail;
        
        console.log(`📦 Batch ${batchNum}: ${batchData.enrichedWords.length} words (${batchSuccess} success, ${batchFail} failed)`);
        batchNum++;
    }
    
    console.log(`\n📊 Combined Statistics:`);
    console.log(`   Total words: ${allResults.length}`);
    console.log(`   ✅ With definitions: ${totalSuccess} (${Math.round(totalSuccess / allResults.length * 100)}%)`);
    console.log(`   ❌ Without definitions: ${totalFail} (${Math.round(totalFail / allResults.length * 100)}%)`);
    
    return allResults;
}

function generateDefinitionsFile(allResults) {
    console.log(`\n🔧 Generating complete-words-with-definitions.js...`);
    
    const fileContent = `// Complete NSF Junior Spelling Bee 2025 Word List with Definitions
// Generated on ${new Date().toISOString()}
// Source: Free Dictionary API (https://dictionaryapi.dev)
// Success rate: ${allResults.filter(w => w.definition).length}/${allResults.length} words (${Math.round(allResults.filter(w => w.definition).length / allResults.length * 100)}%)

const COMPLETE_NSF_WORDS_WITH_DEFINITIONS = ${JSON.stringify(allResults, null, 4)};

// For backward compatibility
const COMPLETE_NSF_WORDS = COMPLETE_NSF_WORDS_WITH_DEFINITIONS.map(w => w.word);

// Convert to full word objects
const NSF_WORDS_FULL = COMPLETE_NSF_WORDS_WITH_DEFINITIONS;

// Add to the main words data - append instead of replace to preserve definitions
if (typeof NSF_WORDS !== 'undefined') {
    // Get words that are already in NSF_WORDS to avoid duplicates
    const existingWords = new Set(NSF_WORDS.map(w => w.word.toLowerCase()));
    
    // Add only words that don't already exist
    const newWords = NSF_WORDS_FULL.filter(w => !existingWords.has(w.word.toLowerCase()));
    NSF_WORDS.push(...newWords);
}`;
    
    fs.writeFileSync('./complete-words-with-definitions.js', fileContent);
    console.log(`✅ Generated complete-words-with-definitions.js`);
    
    // Also create a summary file
    const summaryContent = `# Word Definitions Summary

Generated: ${new Date().toISOString()}
Total words: ${allResults.length}
Words with definitions: ${allResults.filter(w => w.definition).length} (${Math.round(allResults.filter(w => w.definition).length / allResults.length * 100)}%)
Words without definitions: ${allResults.filter(w => !w.definition).length} (${Math.round(allResults.filter(w => !w.definition).length / allResults.length * 100)}%)

## Sample words with definitions:
${allResults.filter(w => w.definition).slice(0, 10).map(w => 
    `- **${w.word}**: ${w.definition}${w.sentence ? `\\n  *Example: ${w.sentence}*` : ''}`
).join('\\n\\n')}

## Words without definitions:
${allResults.filter(w => !w.definition).slice(0, 20).map(w => `- ${w.word}`).join('\\n')}
${allResults.filter(w => !w.definition).length > 20 ? `\\n... and ${allResults.filter(w => !w.definition).length - 20} more` : ''}

## Next steps:
1. Review the generated complete-words-with-definitions.js file
2. Test the spelling bee app with the new definitions
3. Consider using Merriam-Webster API for missing definitions if needed
4. Update index.html to use the new definitions file
`;

    fs.writeFileSync('./definitions-summary.md', summaryContent);
    console.log(`📝 Generated definitions-summary.md`);
}

// Run the combination
if (require.main === module) {
    const allResults = combineAllBatches();
    generateDefinitionsFile(allResults);
    
    console.log(`\n🎉 All done! Files generated:`);
    console.log(`   - complete-words-with-definitions.js`);
    console.log(`   - definitions-summary.md`);
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Review the files`);
    console.log(`   2. Update index.html to use the new definitions file`);
    console.log(`   3. Test the app with definitions`);
    console.log(`   4. Continue with remaining batches if desired (batches 6-10)`);
}

module.exports = { combineAllBatches, generateDefinitionsFile };