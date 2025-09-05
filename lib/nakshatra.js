// canonical mapping: 27 nakshatras x 4 padas
export const NAKSHATRAS = [
  { id: 0, slug: 'ashwini', name: 'Ashwini', devanagari: 'अश्विनी', syllables: ['Chu','Che','Cho','La'], description: 'Quick, energetic' },
  { id: 1, slug: 'bharani', name: 'Bharani', devanagari: 'भरणी', syllables: ['Li','Lu','Le','Lo'], description: 'Caring, intense' },
  { id: 2, slug: 'krittika', name: 'Krittika', devanagari: 'कृत्तिका', syllables: ['A','I','U','E'], description: 'Brave, sharp' },
  { id: 3, slug: 'rohini', name: 'Rohini', devanagari: 'रोहिणी', syllables: ['O','Va','Vi','Vu'], description: 'Fertile, artistic' },
  { id: 4, slug: 'mrigashira', name: 'Mrigashira', devanagari: 'मृगशिरा', syllables: ['Ve','Vo','Ka','Ki'], description: 'Curious, wanderer' },
  { id: 5, slug: 'ardra', name: 'Ardra', devanagari: 'आर्द्रा', syllables: ['Ku','Gha','Ng','Jha'], description: 'Passionate, intense' },
  { id: 6, slug: 'punarvasu', name: 'Punarvasu', devanagari: 'पुनर्वसु', syllables: ['Ke','Ko','Ha','Hi'], description: 'Renewal, supportive' },
  { id: 7, slug: 'pushya', name: 'Pushya', devanagari: 'पुष्य', syllables: ['Hu','He','Ho','Da'], description: 'Nurturing, strong' },
  { id: 8, slug: 'ashlesha', name: 'Ashlesha', devanagari: 'आश्लेषा', syllables: ['De','Du','Di','Do'], description: 'Clever, secretive' },
  { id: 9, slug: 'magha', name: 'Magha', devanagari: 'मघा', syllables: ['Ma','Mi','Mu','Me'], description: 'Royal, proud' },
  { id: 10, slug: 'purva-phalguni', name: 'Purva Phalguni', devanagari: 'पूर्वा फाल्गुनी', syllables: ['Mo','Ta','Ti','Tu'], description: 'Pleasure, art' },
  { id: 11, slug: 'uttara-phalguni', name: 'Uttara Phalguni', devanagari: 'उत्तर फाल्गुनी', syllables: ['Te','To','Pa','Pi'], description: 'Helping, partnership' },
  { id: 12, slug: 'hasta', name: 'Hasta', devanagari: 'हस्त', syllables: ['Pu','Sha','Na','Tha'], description: 'Skillful, handy' },
  { id: 13, slug: 'chitra', name: 'Chitra', devanagari: 'चित्रा', syllables: ['Pe','Po','Ra','Re'], description: 'Bright, artistic' },
  { id: 14, slug: 'swati', name: 'Swati', devanagari: 'स्वाति', syllables: ['Ru','Re','Ro','Ta'], description: 'Independent' },
  { id: 15, slug: 'vishakha', name: 'Vishakha', devanagari: 'विशाखा', syllables: ['Ti','Te','Tu','To'], description: 'Goal-oriented' },
  { id: 16, slug: 'anuradha', name: 'Anuradha', devanagari: 'अनुराधा', syllables: ['Na','Ni','Nu','Ne'], description: 'Loyal, organised' },
  { id: 17, slug: 'jyeshta', name: 'Jyeshta', devanagari: 'ज्येष्ठा', syllables: ['No','Ya','Yi','Yu'], description: 'Responsible, leader' },
  { id: 18, slug: 'mula', name: 'Mula', devanagari: 'मूल', syllables: ['Ye','Yo','Ba','Be'], description: 'Root, transformative' },
  { id: 19, slug: 'purva-ashadha', name: 'Purva Ashadha', devanagari: 'पूर्वाषाढा', syllables: ['Bu','Dha','Fa','Dha'], description: 'Invincible' },
  { id: 20, slug: 'uttara-ashadha', name: 'Uttara Ashadha', devanagari: 'उत्तराषाढा', syllables: ['Be','Bo','Ja','Ji'], description: 'Ambitious, steady' },
  { id: 21, slug: 'shravana', name: 'Shravana', devanagari: 'श्रवण', syllables: ['Ju','Je','Jo','Sha'], description: 'Listener, learning' },
  { id: 22, slug: 'dhanishta', name: 'Dhanishta', devanagari: 'धनिष्ठा', syllables: ['Ga','Gi','Gu','Ge'], description: 'Musical, prosperous' },
  { id: 23, slug: 'shatabhisha', name: 'Shatabhisha', devanagari: 'शतभिषा', syllables: ['Go','Sa','Si','Su'], description: 'Healer, secret' },
  { id: 24, slug: 'purva-bhadrapada', name: 'Purva Bhadrapada', devanagari: 'पूर्व भद्रपदा', syllables: ['Se','So','Da','Di'], description: 'Deep, spiritual' },
  { id: 25, slug: 'uttara-bhadrapada', name: 'Uttara Bhadrapada', devanagari: 'उत्तर भद्रपदा', syllables: ['Du','Tha','Jha','Gya'], description: 'Stable, visionary' },
  { id: 26, slug: 'revati', name: 'Revati', devanagari: 'रेवती', syllables: ['De','Do','Cha','Chi'], description: 'Safe, nourishing' }
]

export function getNakshatraByIndex(idx) {
  return NAKSHATRAS[idx % 27]
}

export function findNakshatraBySlug(slug) {
  return NAKSHATRAS.find(n => n.slug === slug)
}
