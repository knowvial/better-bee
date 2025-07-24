// Initial word list from NSF Junior Spelling Bee 2025
const NSF_WORDS = [
    // A words
    { word: "abdicate", definition: "to give up power or position", origin: "Latin", sentence: "The king decided to abdicate the throne." },
    { word: "abdomen", definition: "the belly or stomach area", origin: "Latin", sentence: "The doctor examined the patient's abdomen." },
    { word: "ablaze", definition: "on fire or burning brightly", origin: "English", sentence: "The building was ablaze within minutes." },
    { word: "accentuate", definition: "to emphasize or make more noticeable", origin: "Latin", sentence: "The dress will accentuate your best features." },
    { word: "access", definition: "the ability to enter or approach", origin: "Latin", sentence: "Students have access to the library." },
    { word: "accommodate", definition: "to provide lodging or adapt to", origin: "Latin", sentence: "The hotel can accommodate 200 guests." },
    { word: "ace", definition: "an expert or a playing card", origin: "Latin", sentence: "She's an ace at solving puzzles." },
    { word: "acid", definition: "a sour substance that can corrode", origin: "Latin", sentence: "Lemon juice contains citric acid." },
    { word: "acronym", definition: "a word formed from initial letters", origin: "Greek", sentence: "NASA is an acronym for National Aeronautics and Space Administration." },
    { word: "actinic", definition: "relating to chemical effects of light", origin: "Greek", sentence: "The actinic rays caused the chemical reaction." },
    { word: "acute", definition: "sharp or severe", origin: "Latin", sentence: "She felt acute pain in her ankle." },
    { word: "adamant", definition: "refusing to change one's mind", origin: "Greek", sentence: "He was adamant about his decision." },
    { word: "adder", definition: "a type of snake", origin: "English", sentence: "The adder is Britain's only venomous snake." },
    { word: "adherent", definition: "a supporter or follower", origin: "Latin", sentence: "She was an adherent of the new philosophy." },
    { word: "adjournment", definition: "a temporary break in proceedings", origin: "French", sentence: "The judge called for an adjournment." },
    { word: "affectation", definition: "artificial behavior to impress", origin: "Latin", sentence: "His British accent was just an affectation." },
    { word: "affliction", definition: "a cause of pain or suffering", origin: "Latin", sentence: "Poverty is a terrible affliction." },
    { word: "aftershock", definition: "a smaller earthquake following a larger one", origin: "English", sentence: "Several aftershocks followed the main earthquake." },
    { word: "agonize", definition: "to suffer extreme pain or worry greatly", origin: "Greek", sentence: "Don't agonize over the decision." },
    { word: "albatross", definition: "a large seabird", origin: "Arabic", sentence: "The albatross has the longest wingspan of any bird." },
    { word: "alcohol", definition: "an intoxicating liquid", origin: "Arabic", sentence: "The solution contains 70% alcohol." },
    { word: "alcoves", definition: "small recessed sections of a room", origin: "Arabic", sentence: "The library had quiet alcoves for studying." },
    { word: "algebraically", definition: "using algebra methods", origin: "Arabic", sentence: "Solve the equation algebraically." },
    { word: "alimentary", definition: "relating to food or nutrition", origin: "Latin", sentence: "Food passes through the alimentary canal." },
    { word: "alleviate", definition: "to make less severe", origin: "Latin", sentence: "Medicine can alleviate the pain." },
    { word: "alligator", definition: "a large reptile similar to a crocodile", origin: "Spanish", sentence: "An alligator swam in the swamp." },
    { word: "allocate", definition: "to distribute for a specific purpose", origin: "Latin", sentence: "We need to allocate resources wisely." },
    { word: "almighty", definition: "having complete power", origin: "English", sentence: "They prayed to the Almighty." },
    { word: "alnico", definition: "an alloy of aluminum, nickel, and cobalt", origin: "English", sentence: "Alnico magnets are very strong." },
    { word: "altigraph", definition: "an instrument for measuring altitude", origin: "Latin", sentence: "The pilot checked the altigraph." },
    { word: "altitude", definition: "height above sea level", origin: "Latin", sentence: "The plane flew at high altitude." },
    { word: "altruism", definition: "selfless concern for others", origin: "French", sentence: "Her altruism inspired everyone." },
    { word: "amble", definition: "to walk slowly and relaxed", origin: "Latin", sentence: "They ambled through the park." },
    { word: "amen", definition: "so be it (end of prayer)", origin: "Hebrew", sentence: "The congregation said amen." },
    { word: "ample", definition: "enough or more than enough", origin: "Latin", sentence: "There was ample food for everyone." },
    { word: "amuse", definition: "to entertain or make laugh", origin: "French", sentence: "The clown tried to amuse the children." },
    { word: "analysis", definition: "detailed examination", origin: "Greek", sentence: "The analysis revealed interesting patterns." },
    { word: "anneal", definition: "to heat and cool metal or glass", origin: "English", sentence: "The blacksmith will anneal the steel." },
    { word: "annual", definition: "happening once a year", origin: "Latin", sentence: "The annual festival is next week." },
    { word: "antelope", definition: "a swift animal like a deer", origin: "Greek", sentence: "The antelope ran across the savanna." },
    { word: "anvil", definition: "a heavy iron block for metalworking", origin: "English", sentence: "The blacksmith hammered on the anvil." },
    { word: "aorta", definition: "the main artery from the heart", origin: "Greek", sentence: "Blood flows from the heart through the aorta." },
    { word: "approve", definition: "to officially agree or accept", origin: "Latin", sentence: "The committee will approve the plan." },
    { word: "aqua", definition: "water or a blue-green color", origin: "Latin", sentence: "She painted the room aqua." },
    { word: "aquatic", definition: "relating to water", origin: "Latin", sentence: "Dolphins are aquatic mammals." },
    { word: "arachnid", definition: "a spider or similar creature", origin: "Greek", sentence: "A spider is an arachnid, not an insect." },
    { word: "arcaded", definition: "having a series of arches", origin: "Latin", sentence: "The arcaded hallway was beautiful." },
    { word: "argentine", definition: "silvery or relating to Argentina", origin: "Latin", sentence: "The fish had argentine scales." },
    { word: "articulate", definition: "to express clearly", origin: "Latin", sentence: "Please articulate your thoughts." },
    { word: "assimilate", definition: "to absorb and integrate", origin: "Latin", sentence: "Immigrants slowly assimilate into society." },
    { word: "asymmetric", definition: "not identical on both sides", origin: "Greek", sentence: "The design was intentionally asymmetric." },
    { word: "audit", definition: "an official inspection of accounts", origin: "Latin", sentence: "The company undergoes an annual audit." },
    { word: "audition", definition: "a tryout for a performance", origin: "Latin", sentence: "She has an audition for the play." },
    { word: "autopsy", definition: "examination of a dead body", origin: "Greek", sentence: "The autopsy revealed the cause of death." },
    { word: "avert", definition: "to turn away or prevent", origin: "Latin", sentence: "Quick action helped avert disaster." },
    { word: "awe", definition: "wonder mixed with fear or respect", origin: "Norse", sentence: "They watched in awe as the rocket launched." },
    { word: "awhile", definition: "for a short time", origin: "English", sentence: "Please wait awhile." },
    // B words
    { word: "babyish", definition: "childish or immature", origin: "English", sentence: "Stop that babyish behavior." },
    { word: "bactericide", definition: "substance that kills bacteria", origin: "Latin", sentence: "This bactericide prevents infection." },
    { word: "baffling", definition: "confusing or puzzling", origin: "English", sentence: "The mystery was baffling." },
    { word: "banana", definition: "a yellow tropical fruit", origin: "African", sentence: "She ate a banana for breakfast." },
    { word: "band", definition: "a group or strip", origin: "Germanic", sentence: "The band played at the concert." },
    { word: "baneful", definition: "harmful or poisonous", origin: "English", sentence: "The plant has baneful effects." },
    { word: "banished", definition: "sent away as punishment", origin: "Germanic", sentence: "The king banished the traitor." },
    { word: "barley", definition: "a cereal grain", origin: "English", sentence: "Barley is used to make beer." },
    { word: "barnacle", definition: "a marine crustacean", origin: "Latin", sentence: "Barnacles covered the ship's hull." },
    { word: "baste", definition: "to moisten while cooking", origin: "Germanic", sentence: "Baste the turkey every hour." },
    { word: "batik", definition: "a fabric dyeing technique", origin: "Javanese", sentence: "The batik pattern was intricate." },
    { word: "battery", definition: "a power source or assault", origin: "French", sentence: "The toy needs a new battery." },
    { word: "beading", definition: "decorative work with beads", origin: "English", sentence: "The dress had beautiful beading." },
    { word: "beaker", definition: "a laboratory container", origin: "Norse", sentence: "Pour the liquid into the beaker." },
    { word: "bedeck", definition: "to decorate", origin: "Dutch", sentence: "They bedecked the hall with flowers." },
    { word: "beeline", definition: "a direct route", origin: "English", sentence: "She made a beeline for the exit." },
    { word: "behoove", definition: "to be necessary or proper", origin: "English", sentence: "It would behoove you to study." },
    { word: "beletter", definition: "to write letters all over", origin: "English", sentence: "Don't beletter the margin with notes." },
    { word: "belief", definition: "trust or confidence", origin: "English", sentence: "Her belief in justice never wavered." },
    { word: "bhalu", definition: "bear in Hindi", origin: "Hindi", sentence: "The bhalu searched for honey." },
    { word: "bicameral", definition: "having two legislative chambers", origin: "Latin", sentence: "Congress is a bicameral legislature." },
    { word: "bilateral", definition: "having two sides", origin: "Latin", sentence: "They signed a bilateral agreement." },
    { word: "biopsy", definition: "tissue sample for testing", origin: "Greek", sentence: "The doctor ordered a biopsy." },
    { word: "biotic", definition: "relating to living things", origin: "Greek", sentence: "Plants are biotic factors in ecosystems." },
    { word: "birdie", definition: "one under par in golf", origin: "English", sentence: "She scored a birdie on hole five." },
    { word: "bisect", definition: "to cut in two equal parts", origin: "Latin", sentence: "The line will bisect the angle." },
    { word: "black", definition: "the darkest color", origin: "English", sentence: "She wore a black dress." },
    { word: "blackout", definition: "loss of power or consciousness", origin: "English", sentence: "The storm caused a blackout." },
    { word: "blanch", definition: "to turn white or pale", origin: "French", sentence: "She blanched at the news." },
    { word: "bleach", definition: "to whiten or remove color", origin: "English", sentence: "Bleach can damage fabric." },
    { word: "blight", definition: "a plant disease or something harmful", origin: "English", sentence: "Blight destroyed the potato crop." },
    { word: "blissful", definition: "extremely happy", origin: "English", sentence: "They spent a blissful day together." },
    { word: "blithe", definition: "cheerful and carefree", origin: "English", sentence: "She had a blithe spirit." },
    { word: "blizzard", definition: "a severe snowstorm", origin: "English", sentence: "The blizzard closed all roads." },
    { word: "blockade", definition: "preventing movement in or out", origin: "English", sentence: "Ships enforced the blockade." },
    { word: "bloodbath", definition: "a massacre", origin: "English", sentence: "The battle became a bloodbath." },
    { word: "boiling", definition: "heated to bubbling", origin: "French", sentence: "The water is boiling." },
    { word: "bombardment", definition: "continuous attack", origin: "French", sentence: "The bombardment lasted hours." },
    { word: "bonanza", definition: "a source of great wealth", origin: "Spanish", sentence: "The gold mine was a bonanza." },
    { word: "bonbon", definition: "a piece of candy", origin: "French", sentence: "She offered him a bonbon." },
    { word: "bongo", definition: "a type of drum", origin: "Spanish", sentence: "He played the bongo rhythmically." },
    { word: "bonnet", definition: "a type of hat", origin: "French", sentence: "She wore a blue bonnet." },
    { word: "bookkeeper", definition: "one who maintains financial records", origin: "English", sentence: "The bookkeeper balanced the accounts." },
    { word: "boon", definition: "a helpful or beneficial thing", origin: "Norse", sentence: "Rain was a boon to farmers." },
    { word: "booth", definition: "a small enclosed space", origin: "Norse", sentence: "They sat in a restaurant booth." },
    { word: "border", definition: "an edge or boundary", origin: "French", sentence: "They crossed the border at dawn." },
    { word: "boric", definition: "containing boron", origin: "Arabic", sentence: "Boric acid is used as antiseptic." },
    { word: "bovine", definition: "relating to cattle", origin: "Latin", sentence: "The bovine disease affected many farms." },
    { word: "braggart", definition: "a boastful person", origin: "French", sentence: "Nobody likes a braggart." },
    { word: "brain", definition: "the organ of thought", origin: "English", sentence: "The brain controls the body." },
    { word: "breakwater", definition: "a barrier against waves", origin: "English", sentence: "The breakwater protected the harbor." },
    { word: "breath", definition: "air taken into lungs", origin: "English", sentence: "Take a deep breath." },
    { word: "broadcast", definition: "to transmit widely", origin: "English", sentence: "They broadcast the news immediately." },
    { word: "brotherliness", definition: "fraternal affection", origin: "English", sentence: "The team showed great brotherliness." },
    { word: "browbeat", definition: "to intimidate", origin: "English", sentence: "Don't let him browbeat you." },
    { word: "bruise", definition: "an injury showing discoloration", origin: "English", sentence: "The fall left a bruise." },
    { word: "buffoon", definition: "a ridiculous person", origin: "Italian", sentence: "He acted like a buffoon." },
    { word: "buffoonery", definition: "foolish behavior", origin: "French", sentence: "Stop this buffoonery at once." },
    { word: "bunch", definition: "a group of things", origin: "English", sentence: "She bought a bunch of grapes." },
    { word: "bunker", definition: "a reinforced shelter", origin: "Scottish", sentence: "Soldiers hid in the bunker." },
    { word: "burgher", definition: "a citizen of a town", origin: "German", sentence: "The burghers met to discuss taxes." },
    { word: "butterfly", definition: "a flying insect with colorful wings", origin: "English", sentence: "A butterfly landed on the flower." },
    { word: "bycatch", definition: "unwanted fish caught in nets", origin: "English", sentence: "Dolphins were unfortunate bycatch." }
];

// Continue with more words...
// This is a partial list. The full 1000 words would be too long for this response.
// Let's create a system that can load additional words from files.

// Function to get all words
function getAllWords() {
    return [...NSF_WORDS, ...customWords];
}

// Custom words array (populated when users upload files)
let customWords = [];

// Function to add custom words
function addCustomWords(words) {
    customWords = [...customWords, ...words];
    saveToLocalStorage();
}

// Function to parse uploaded file
async function parseWordFile(file) {
    const text = await file.text();
    const extension = file.name.split('.').pop().toLowerCase();
    
    let words = [];
    
    if (extension === 'json') {
        words = JSON.parse(text);
    } else if (extension === 'csv') {
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            const word = {};
            headers.forEach((header, index) => {
                word[header] = values[index] || '';
            });
            words.push(word);
        }
    } else if (extension === 'txt') {
        // Simple format: one word per line
        const wordList = text.split('\n').filter(word => word.trim());
        words = wordList.map(word => ({
            word: word.trim(),
            definition: '',
            origin: '',
            sentence: ''
        }));
    }
    
    return words;
}

// Save/Load from localStorage
function saveToLocalStorage() {
    localStorage.setItem('customWords', JSON.stringify(customWords));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('customWords');
    if (saved) {
        customWords = JSON.parse(saved);
    }
}

// Initialize on load
loadFromLocalStorage();