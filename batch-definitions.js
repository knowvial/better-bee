// Batch processing script to populate definitions in chunks of 100 words
// Usage: node batch-definitions.js [start_batch] [end_batch]
// Example: node batch-definitions.js 1 5  (processes batches 1-5, words 1-500)

const fs = require('fs');
const https = require('https');

// Load the complete word list
const COMPLETE_NSF_WORDS = [
    // A  
    "abdicate", "abdomen", "ablaze", "accentuate", "access", "accommodate", "ace", "acid", "acronym", "actinic",
    "acute", "adamant", "adder", "adherent", "adjournment", "affectation", "affliction", "aftershock", "agonize", "albatross",
    "alcohol", "alcoves", "algebraically", "alimentary", "alleviate", "alligator", "allocate", "Almighty", "alnico", "altigraph",
    "altitude", "altruism", "amble", "amen", "ample", "amuse", "analysis", "anneal", "annual", "antelope",
    "anvil", "aorta", "approve", "aqua", "aquatic", "arachnid", "arcaded", "argentine", "articulate", "assimilate",
    "asymmetric", "audit", "audition", "autopsy", "avert", "awe", "awhile",

    // B
    "babyish", "bactericide", "baffling", "banana", "band", "baneful", "banished", "barley", "barnacle", "baste",
    "batik", "battery", "beading", "beaker", "bedeck", "beeline", "behoove", "beletter", "belief", "bhalu",
    "bicameral", "bilateral", "biopsy", "biotic", "birdie", "bisect", "black", "blackout", "blanch", "bleach",
    "blight", "blissful", "blithe", "blizzard", "blockade", "bloodbath", "boiling", "bombardment", "bonanza", "bonbon",
    "bongo", "bonnet", "bookkeeper", "boon", "booth", "border", "boric", "bovine", "braggart", "brain",
    "breakwater", "breath", "broadcast", "brotherliness", "browbeat", "bruise", "buffoon", "buffoonery", "bunch", "bunker",
    "burgher", "butterfly", "bycatch",

    // C
    "caboose", "cadenza", "cadet", "cakewalk", "calculate", "calculator", "calendar", "candidly", "caper", "capitalist",
    "carbide", "carbonate", "careen", "carination", "carp", "carrier", "cashew", "castle", "catalytic", "celebrate",
    "cement", "census", "centimeter", "centralization", "centrist", "champion", "character", "charter", "chase", "chatterbox",
    "chessman", "Christian", "cinderella", "circulate", "citizen", "civility", "clamber", "clamp", "clarity", "classicist",
    "clatter", "cloudy", "cluster", "cockatoo", "cofeature", "colonel", "colonial", "commando", "company", "complex",
    "concho", "concoct", "confection", "confrontation", "conga", "congealed", "congenial", "connective", "connote", "convulsion",
    "cordwinder", "correspond", "cosmos", "costume", "cotton", "counterattack", "cowcatcher", "cowed", "cower", "cranberry",
    "cranial", "crawl", "creel", "crest", "crestfallen", "crispation", "critical", "crossbow", "crossover", "crutch",
    "crystal", "cub", "cubic", "cultivation", "curbstone",

    // D
    "Dallas", "darkness", "dashing", "dawdler", "dawn", "deadened", "declaim", "decompose", "decorative", "decorous",
    "decoy", "deem", "defeat", "defectoscope", "defensor", "delay", "depose", "deprogram", "derailment", "deserter",
    "destination", "destructible", "detachment", "detective", "devastation", "devil", "devise", "devouring", "dewdrop", "dewfall",
    "dewy", "diagnosis", "diatomic", "digest", "digit", "dilate", "dingo", "diplomat", "director", "disappointed",
    "disapprove", "discipline", "disdain", "disease", "disguise", "dissent", "distal", "distemper", "distinct", "diverting",
    "divine", "Dixiecrat", "docudrama", "dogfight", "dominion", "doodlebug", "down", "downburst", "dreary", "dribble",
    "druggist", "druid", "duel", "duet", "dullard", "dumplings", "duplex", "duplicate", "dynamic",

    // E
    "earlyish", "earnest", "easel", "eclipse", "economics", "edict", "elastic", "electorate", "elephant", "emboss",
    "emit", "enamel", "energetic", "engineer", "enormous", "epigram", "epilepsy", "episode", "eruption", "evaporation",
    "evenness", "eventide", "evidence", "evocative", "evoke", "exceed", "excellent", "excise", "exclusive", "explosion",
    "extinct", "extra", "extremity", "extricate", "eyelet",

    // F
    "facilitator", "fandangle", "fantastically", "fasten", "fasting", "fatal", "fate", "fear", "February", "fiasco",
    "fiddlehead", "fielder", "fiery", "figurine", "finery", "finite", "firepower", "fixation", "fixture", "flamingo",
    "flange", "floodlight", "floss", "flounder", "flowage", "fluoride", "flurries", "fogginess", "folio", "foolocracy",
    "footage", "formula", "fortitude", "foyer", "fretwork", "Friday", "frightened", "frog", "frogged", "fumblingly",
    "fusion", "futurity",

    // G
    "galaxies", "gallery", "gang", "gaping", "garage", "garibaldi", "garnishee", "generate", "geothermal", "geranium",
    "ghostly", "giddiness", "giggle", "gingerbread", "giraffe", "glistened", "glittering", "glitz", "goalie", "golden",
    "gosling", "gouge", "grabble", "gracefully", "graduate", "grammar", "grammarian", "granger", "graphic", "gratinate",
    "grave", "gravel", "gravid", "gravimetric", "greengage", "greenness", "gridiron", "grotesqueness", "guess", "gullet",

    // H
    "habitat", "hairhound", "halal", "halfpace", "halve", "handily", "handkerchief", "handspike", "hangdog", "hangnail",
    "haphazard", "haptic", "hardiness", "hare", "harmonica", "harness", "harpoon", "haughtily", "havoc", "hawthorn",
    "hearsay", "heart", "hearth", "hefty", "hemisphere", "herd", "heretofore", "hermitage", "heroine", "highroad",
    "hinge", "hinterland", "hippopotamus", "hitherto", "hogan", "hoist", "holster", "homage", "homestead", "honeymoon",
    "horizon", "hormone", "horrible", "horrifically", "host", "hosta", "hourage", "housing", "hula", "humbly",
    "hunching", "hurling", "hypothesis",

    // I
    "ideal", "ignite", "ignorant", "iguana", "illustrate", "imaginary", "immature", "immortal", "impeach", "imperial",
    "implode", "inane", "inaugural", "inaugurator", "incapable", "incredulous", "incumbency", "indignant", "indignity", "ineffable",
    "inefficient", "ineradicable", "inerrant", "inert", "infantry", "infirmity", "infructuous", "ingestible", "inlaid", "inning",
    "inordinate", "insipid", "insolence", "instigator", "insulate", "intensively", "intercalate", "interlinear", "intermission", "introspect",
    "invert", "invertebrate", "invisible", "involucre", "ionize", "ionosphere", "irony", "irrelevant",

    // J
    "jambalaya", "jetty", "jewel", "journalism", "journeycake", "jovially", "June", "jurisprudence", "jurist",

    // K
    "kahuna", "kettle", "kick", "kind", "kinetic", "kingmaker", "knightess",

    // L
    "laddie", "lament", "landwash", "lantern", "lapse", "lapwing", "larva", "laser", "lattice", "lawlessness",
    "learn", "leash", "leaven", "legacy", "legislative", "legislature", "lemming", "lemon", "lemur", "length",
    "lengthwise", "lentil", "libertarian", "limb", "limbo", "lime", "linsang", "linseed", "lipogram", "lipolytic",
    "literacy", "litmus", "loafer", "loam", "lobbyist", "locket", "locust", "lodging", "lonely", "longtimer",
    "lullaby", "lupine", "lure", "lustrous", "lutestring", "lyric",

    // M
    "magnitude", "mahatma", "mahimahi", "mainspring", "mammon", "mammoth", "mandate", "mandorla", "mangle", "manometer",
    "marbled", "marmalade", "martial", "martin", "mascara", "massive", "matriculate", "matripotestal", "measure", "median",
    "medicaster", "medicine", "mellow", "memorable", "memorize", "mentor", "menu", "mercantilist", "mermaid", "mesa",
    "meticulosity", "microns", "microphone", "microscopic", "microwave", "mikado", "minefield", "minesweeping", "minor", "miserable",
    "mission", "missorted", "misspeak", "misstatement", "mitigate", "mode", "moderate", "molar", "momentary", "moonlighter",
    "morbid", "mores", "motto", "mozzarella", "mucous", "mufti", "multitude", "muscular", "muse", "museum",
    "muslin", "mutely", "mutual", "muzzle",

    // N
    "nasal", "nautilus", "neckwear", "nectarivorous", "nemesis", "nervous", "neuroticism", "neutralize", "nickelodeon", "nineties",
    "nitrite", "nitrogen", "noble", "nodule", "nominal", "nominee", "nonnuclear", "normality", "nosh", "notorious",
    "nuisance",

    // O
    "oasis", "obedient", "oblate", "obscene", "observe", "octave", "odd", "often", "omens", "omission",
    "omitted", "omnilegent", "omnipotence", "omnivorous", "oppress", "orbital", "orchard", "orchestra", "ordinal", "organic",
    "ornate", "outbreaker", "overweening", "overwhelming", "oxygen",

    // P
    "pack", "pagan", "pancreas", "parabulia", "parish", "parmesan", "particle", "pasture", "pathways", "patio",
    "patroons", "pedestal", "pedicure", "peerless", "pending", "peninsula", "Pentagon", "pepper", "peptide", "perchance",
    "percolate", "percussion", "Permian", "permit", "perquisite", "pessimism", "photoelectric", "photometer", "physique", "piecemeal",
    "pierced", "plangency", "plankton", "platform", "plaudit", "plausible", "plenary", "plentiful", "plumber", "poach",
    "pocket", "pod", "poi", "poisonous", "polarimetric", "polarize", "polished", "polychrome", "polyester", "polygon",
    "polymer", "portfolio", "posture", "potatoes", "pragmatic", "precedent", "precise", "preconditioned", "preen", "preengagement",
    "preexist", "prelude", "prescription", "prettify", "pretzel", "prime", "primitive", "privilege", "probation", "prolonger",
    "property", "prophet", "proverb", "pulverize", "puma", "punching", "puny", "pupil", "pure", "purported",
    "pyre",

    // Q
    "quadrangle", "quadricycle", "quaint", "quarter", "quartermaster", "quell", "quotable",

    // R
    "radiant", "radioactive", "rainbow", "rare", "rarefaction", "rationalize", "ravioli", "reagent", "rebellion", "recant",
    "reciprocity", "reconstitute", "rectifier", "reestablish", "referendum", "reject", "relic", "rend", "repercussion", "replete",
    "reprisal", "reputation", "reputed", "resolute", "retrospective", "revelation", "reverberate", "reversible", "rhinoceros", "rhombus",
    "ridiculous", "romeo", "roomette", "rosemary", "ruffle", "rugby", "rupture", "rustic",

    // S
    "sackcloth", "safeguard", "saiga", "salary", "saliferous", "sanction", "sandal", "sandstorm", "satire", "saturated",
    "scampi", "scenic", "school", "schoolmaster", "scorch", "scour", "scramble", "scrimshaw", "scrutiny", "searingly",
    "secrecy", "sect", "seemly", "semantics", "seminar", "sendee", "sermonize", "service", "severe", "sextant",
    "sheet", "shortcake", "shrine", "shrubbery", "shuttlecock", "simulcast", "skipjack", "slaughterous", "slave", "slimy",
    "sluice", "slush", "smithy", "snipe", "snowdrift", "soda", "soon", "soviet", "specimen", "spectrum",
    "speculate", "speedball", "spendthrift", "spraddle", "sprang", "sprinkling", "stadium", "stagecraft", "stallion", "starvation",
    "statuary", "status", "statute", "stealth", "steed", "steel", "stellar", "sterling", "sternum", "sthenic",
    "stockade", "sublime", "suborn", "subsequent", "subsided", "sucrose", "suet", "suffice", "sugar", "suitable",
    "sunbow", "supererogation", "superintendent", "supernatural", "supervenient", "surfable", "surpass", "surrendered", "suspend", "swallow",
    "syllabus", "syntax", "synthesis", "synthesize",

    // T
    "talent", "tallow", "talons", "tamarind", "tangential", "tangerine", "tapestry", "tawny", "telepathic", "tennis",
    "tenpins", "termite", "terrace", "terraqueous", "terrorism", "testimony", "thoroughbred", "threnody", "thrice", "throbbed",
    "throwaway", "thrush", "tickled", "tidology", "tiepin", "tiers", "titan", "titanic", "toehold", "tofu",
    "toggle", "tomb", "tombstones", "tonsil", "tornado", "torpedo", "touchdown", "tragedy", "transect", "transparent",
    "trash", "treason", "treaty", "trembling", "tremendous", "trilogy", "trimming", "Trinity", "trio", "trodden",
    "truss", "tuffet", "Turbotrain", "twilight",

    // U
    "unicorn", "unity", "unnatural", "unnerve", "unregenerate", "unsympathetic", "untimely", "upbeat", "upheave", "usher",
    "utilitarian",

    // V
    "vainly", "vandalism", "vane", "vanguard", "vapor", "vaporize", "variation", "varlet", "vault", "vector",
    "versus", "verticil", "vessel", "videography", "violently", "vise", "visibility", "vital", "volumetric", "vulgar",

    // W
    "wafflestomper", "walk", "walleye", "warlock", "warlord", "warp", "warrant", "waterwheel", "wearisome", "westerlies",
    "whimsical", "whirlpool", "wholesale", "wholesome", "wicker", "wimple", "winced", "windjammer", "winnable", "withdrawal",
    "wooden", "worm", "worry", "worthy", "wriggle", "wrong",

    // Y
    "yacht", "yearling",

    // Z
    "zilch", "zulu", "zumbooruk"
];

const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const DELAY_MS = 200;
const BATCH_SIZE = 100;

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
                            sentence = `The word "${word}" means ${definition.toLowerCase()}.`;
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
                    resolve({
                        word: word,
                        definition: '',
                        origin: '',
                        sentence: ''
                    });
                }
            });
        }).on('error', (error) => {
            console.error(`Network error fetching ${word}:`, error.message);
            resolve({
                word: word,
                definition: '',
                origin: '',
                sentence: ''
            });
        });
    });
}

async function processBatch(batchNumber, words) {
    console.log(`\n🔄 Processing Batch ${batchNumber} (${words.length} words)`);
    console.log(`Words: ${words.slice(0, 5).join(', ')}${words.length > 5 ? '...' : ''}`);
    
    const enrichedWords = [];
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        process.stdout.write(`\r[${i + 1}/${words.length}] ${word}...`);
        
        try {
            const wordData = await fetchWordData(word);
            enrichedWords.push(wordData);
            
            if (wordData.definition) {
                successCount++;
            } else {
                failCount++;
            }
            
            await delay(DELAY_MS);
            
        } catch (error) {
            console.error(`\n  ❌ Error: ${error.message}`);
            enrichedWords.push({
                word: word,
                definition: '',
                origin: '',
                sentence: ''
            });
            failCount++;
        }
    }
    
    console.log(`\n✅ Batch ${batchNumber} Complete:`);
    console.log(`   Success: ${successCount}/${words.length} (${Math.round(successCount / words.length * 100)}%)`);
    console.log(`   Failed: ${failCount}/${words.length} (${Math.round(failCount / words.length * 100)}%)`);
    
    return { enrichedWords, successCount, failCount };
}

async function saveBatchResults(batchNumber, results) {
    const filename = `batch-${batchNumber}-results.json`;
    fs.writeFileSync(filename, JSON.stringify(results, null, 2));
    console.log(`💾 Saved batch results to ${filename}`);
}

async function loadExistingResults() {
    const results = [];
    let batchNum = 1;
    
    while (fs.existsSync(`batch-${batchNum}-results.json`)) {
        const batchData = JSON.parse(fs.readFileSync(`batch-${batchNum}-results.json`, 'utf8'));
        results.push(...batchData.enrichedWords);
        console.log(`📂 Loaded existing batch ${batchNum} (${batchData.enrichedWords.length} words)`);
        batchNum++;
    }
    
    return { results, nextBatch: batchNum };
}

async function processInBatches() {
    console.log(`🚀 Starting batch processing of ${COMPLETE_NSF_WORDS.length} words`);
    console.log(`📦 Batch size: ${BATCH_SIZE} words`);
    console.log(`⏱️  Delay: ${DELAY_MS}ms between requests\n`);
    
    // Load existing results
    const { results: existingResults, nextBatch: startBatch } = await loadExistingResults();
    
    // Get command line arguments
    const args = process.argv.slice(2);
    const specifiedStartBatch = args[0] ? parseInt(args[0]) : startBatch;
    const specifiedEndBatch = args[1] ? parseInt(args[1]) : Math.ceil(COMPLETE_NSF_WORDS.length / BATCH_SIZE);
    
    console.log(`🎯 Processing batches ${specifiedStartBatch} to ${specifiedEndBatch}`);
    if (existingResults.length > 0) {
        console.log(`📚 Found ${existingResults.length} existing results\n`);
    }
    
    let allResults = [...existingResults];
    let totalSuccess = 0;
    let totalFail = 0;
    
    for (let batchNum = specifiedStartBatch; batchNum <= specifiedEndBatch; batchNum++) {
        const startIndex = (batchNum - 1) * BATCH_SIZE;
        const endIndex = Math.min(startIndex + BATCH_SIZE, COMPLETE_NSF_WORDS.length);
        
        if (startIndex >= COMPLETE_NSF_WORDS.length) break;
        
        const batchWords = COMPLETE_NSF_WORDS.slice(startIndex, endIndex);
        
        const batchResult = await processBatch(batchNum, batchWords);
        await saveBatchResults(batchNum, batchResult);
        
        // Add to combined results
        allResults.push(...batchResult.enrichedWords);
        totalSuccess += batchResult.successCount;
        totalFail += batchResult.failCount;
        
        console.log(`\n📊 Overall Progress: ${allResults.length}/${COMPLETE_NSF_WORDS.length} words processed`);
        console.log(`   Total Success: ${totalSuccess} (${Math.round(totalSuccess / allResults.length * 100)}%)`);
        console.log(`   Total Failed: ${totalFail} (${Math.round(totalFail / allResults.length * 100)}%)\n`);
        
        // Small break between batches
        if (batchNum < specifiedEndBatch) {
            console.log(`⏸️  Pausing 2 seconds before next batch...\n`);
            await delay(2000);
        }
    }
    
    console.log(`\n🎉 Batch processing complete!`);
    console.log(`📊 Final Statistics:`);
    console.log(`   Total words processed: ${allResults.length}/${COMPLETE_NSF_WORDS.length}`);
    console.log(`   ✅ Successfully populated: ${totalSuccess} (${Math.round(totalSuccess / allResults.length * 100)}%)`);
    console.log(`   ❌ Failed to populate: ${totalFail} (${Math.round(totalFail / allResults.length * 100)}%)`);
    
    return allResults;
}

// Run the batch processor
if (require.main === module) {
    processInBatches().catch(console.error);
}

module.exports = { processInBatches, processBatch, loadExistingResults };