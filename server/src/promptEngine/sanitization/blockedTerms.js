// Blocklist of keywords for safety validation.
// Focuses on: child-safety, NSFW, extreme gore, violence, self-harm, hate speech, and adult-oriented concepts.
export const BLOCKED_KEYWORDS = [
  // NSFW / Sexual content
  'porn', 'nsfw', 'hentai', 'erotic', 'sexy', 'naked', 'nudity', 'nude', 'striptease', 'sex', 'intercourse', 'masturbate',
  'orgasm', 'penis', 'vagina', 'clitoris', 'testicles', 'asshole', 'blowjob', 'handjob', 'cunnilingus', 'hooker', 'escort',

  // Gore & Extreme Violence
  'gore', 'decapitate', 'mutilate', 'dismember', 'guts', 'splatter', 'bloodbath', 'torture', 'execution', 'snuff', 
  'behead', 'disembowel', 'murder', 'assassinate', 'slaughterhouse', 'massacre',

  // Self-Harm
  'suicide', 'self-harm', 'cut myself', 'kill myself', 'slit wrist', 'overdose', 'hang myself',

  // Hateful & Extremist
  'nazi', 'swastika', 'hitler', 'white power', 'ku klux klan', 'kkk', 'slurs', 'terrorist', 'bomb making', 'build bomb'
];

export const BLOCKED_PATTERNS = [
  /how to (make|build|create) a (bomb|weapon of mass destruction|explosive)/i,
  /how to (kill|hurt|torture) (someone|people|animals)/i,
  /how to commit suicide/i,
  /how to bypass parental controls/i
];
