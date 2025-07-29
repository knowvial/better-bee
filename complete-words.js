// Complete NSF Junior Spelling Bee 2025 Word List (1000 words)
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

// Convert to full word objects with basic info
const NSF_WORDS_FULL = COMPLETE_NSF_WORDS.map(word => ({
    word: word,
    definition: "",  // Would need to be filled in
    origin: "",      // Would need to be filled in
    sentence: ""     // Would need to be filled in
}));

// Add to the main words data - append instead of replace to preserve definitions
if (typeof NSF_WORDS !== 'undefined') {
    // Get words that are already in NSF_WORDS to avoid duplicates
    const existingWords = new Set(NSF_WORDS.map(w => w.word.toLowerCase()));
    
    // Add only words that don't already exist
    const newWords = NSF_WORDS_FULL.filter(w => !existingWords.has(w.word.toLowerCase()));
    NSF_WORDS.push(...newWords);
}