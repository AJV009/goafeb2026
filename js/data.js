/**
 * GOA GUIDE — Data Layer
 * ========================
 * Add new categories by following the existing pattern.
 * Each category needs: icon, title, color, items[]
 * Each item can have: name, area, desc, lat, lng, tags[], price, where, shelfLife
 * Enriched fields: timeToSpend, rating (1-5), popularity (high/medium/low), bestTime
 *
 * The app auto-discovers categories — just add a new key and it appears.
 */

const GOA_DATA = {
  beaches: {
    icon: "🏖️",
    title: "Beaches",
    color: "#0EA5E9",
    items: [
      { name: "Palolem Beach", area: "South", desc: "Crescent-shaped, calm waters, dolphin spotting. One of Goa's most beautiful.", lat: 15.0100, lng: 74.0230, tags: ["swimming", "scenic", "kayaking"], timeToSpend: "2-3 hours", rating: 4.5, popularity: "high", bestTime: "Oct-Mar, morning or sunset" },
      { name: "Butterfly Beach", area: "South", desc: "Only accessible by boat from Palolem. Secluded paradise, dolphins frequent.", lat: 15.0020, lng: 74.0130, tags: ["secluded", "boat-access", "dolphins"], timeToSpend: "1-2 hours", rating: 4.0, popularity: "medium", bestTime: "Nov-Mar, morning to early afternoon" },
      { name: "Cola Beach", area: "South", desc: "Hidden lagoon meets the sea. Freshwater lagoon perfect for swimming. Dramatic cliff approach.", lat: 15.0350, lng: 74.0000, tags: ["lagoon", "secluded", "scenic"], timeToSpend: "2-3 hours", rating: 4.5, popularity: "low", bestTime: "Oct-Mar, any time" },
      { name: "Agonda Beach", area: "South", desc: "Long, quiet stretch. Olive Ridley turtle nesting site. Less touristy than Palolem.", lat: 15.0440, lng: 73.9870, tags: ["quiet", "turtles", "long-walk"], timeToSpend: "2-4 hours", rating: 4.5, popularity: "medium", bestTime: "Oct-Mar for calm waters" },
      { name: "Cabo de Rama Beach", area: "South", desc: "Below the ancient fort. Rocky, wild, barely any tourists. Real adventure beach.", lat: 15.0890, lng: 73.9280, tags: ["secluded", "adventure", "fort-nearby"], timeToSpend: "1-2 hours", rating: 3.5, popularity: "low", bestTime: "Nov-Feb, morning" },
      { name: "Vagator Beach", area: "North", desc: "Red cliffs, Chapora Fort above. Famous for trance music scene and dramatic landscape.", lat: 15.5970, lng: 73.7360, tags: ["scenic", "cliffs", "party-history"], timeToSpend: "2-3 hours", rating: 4.2, popularity: "high", bestTime: "Nov-Mar, sunset" },
      { name: "Anjuna Beach", area: "North", desc: "Flea market on Wednesdays. Birthplace of Goa's hippie culture in the 60s.", lat: 15.5730, lng: 73.7410, tags: ["flea-market", "hippie-history", "lively"], timeToSpend: "2-3 hours", rating: 4.0, popularity: "high", bestTime: "Nov-Mar, evening for nightlife" },
      { name: "Morjim Beach", area: "North", desc: "Olive Ridley turtle nesting. Russian expat scene. Quieter stretch of North Goa.", lat: 15.6290, lng: 73.7280, tags: ["turtles", "quiet", "nature"], timeToSpend: "2-3 hours", rating: 4.4, popularity: "medium", bestTime: "Nov-Mar, turtle nesting season" },
      { name: "Ashwem Beach", area: "North", desc: "Upscale beach shacks, shallow waters. Great for sunset cocktails and swimming.", lat: 15.6420, lng: 73.7230, tags: ["upscale", "sunset", "swimming"], timeToSpend: "2-4 hours", rating: 4.5, popularity: "low", bestTime: "Nov-Mar, any time" },
      { name: "Arambol Beach", area: "North", desc: "Bohemian vibe, drum circles at sunset, sweet water lake behind the cliff. Goa's hippie capital.", lat: 15.6830, lng: 73.7060, tags: ["bohemian", "drum-circles", "sweet-lake"], timeToSpend: "3-4 hours", rating: 4.0, popularity: "high", bestTime: "Nov-Mar, morning for yoga" },
      { name: "Betalbatim Beach", area: "South", desc: "Quiet, clean, local fishermen. Called 'Sunset Beach' for a reason.", lat: 15.3050, lng: 73.9140, tags: ["quiet", "sunset", "authentic"], timeToSpend: "2-3 hours", rating: 4.2, popularity: "low", bestTime: "Nov-Mar, sunset, night for bioluminescence" },
      { name: "Galgibaga Beach", area: "South", desc: "Pristine, protected turtle nesting site. Almost no tourists. Goa's cleanest beach.", lat: 14.9700, lng: 74.0570, tags: ["pristine", "turtles", "empty"], timeToSpend: "2-3 hours", rating: 4.6, popularity: "low", bestTime: "Nov-Mar, turtle nesting season" },
      { name: "Kakolem Beach (Tiger Beach)", area: "South", desc: "Stunning secluded beach accessible only by steep descent, featuring a hidden waterfall, pristine golden sands, and dramatic cliffs. Complete isolation from tourist crowds.", lat: 15.007, lng: 73.946, tags: ["secluded", "adventure", "waterfall", "hidden"], timeToSpend: "2-3 hours", rating: 4.7, popularity: "low", bestTime: "Nov-Mar, avoid monsoon for safety" },
      { name: "Betul Beach", area: "South", desc: "Tranquil fishing village beach at the delta of Sal River, famous for fresh mussels and seafood. Features a 17th-century fort and authentic coastal village atmosphere.", lat: 15.183, lng: 73.919, tags: ["fishing-village", "seafood", "quiet", "authentic"], timeToSpend: "1-2 hours", rating: 4.3, popularity: "low", bestTime: "Oct-Mar, morning for fishing activity" },
      { name: "Querim Beach (Keri Beach)", area: "North", desc: "Northernmost beach of Goa bordered by Terekhol River and surrounded by casuarina trees. Completely secluded with views of Tiracol Fort across the river.", lat: 15.720, lng: 73.689, tags: ["secluded", "quiet", "northernmost", "fort-views"], timeToSpend: "2-3 hours", rating: 4.4, popularity: "low", bestTime: "Nov-Feb, morning" },
      { name: "Talpona Beach", area: "South", desc: "Pristine golden sand beach where Talpona River meets the Arabian Sea. Long stretch of soft sand with crystal-clear waters and minimal commercialization.", lat: 15.030, lng: 74.014, tags: ["pristine", "quiet", "river-meets-sea", "golden-sand"], timeToSpend: "2-3 hours", rating: 4.5, popularity: "low", bestTime: "Oct-Mar, any time" },
      { name: "Velsao Beach", area: "South", desc: "Serene white shell-studded beach lined with coconut trees. Known for its unique white shells, starfish, and calm waters. Popular with locals but undiscovered by tourists.", lat: 15.407, lng: 73.838, tags: ["shells", "quiet", "local-favorite", "calm-waters"], timeToSpend: "1-2 hours", rating: 4.1, popularity: "low", bestTime: "Nov-Mar, morning" },
      { name: "Polem Beach", area: "South", desc: "Southernmost beach at Goa-Karnataka border, frequented by white-bellied eagles and dolphins. Golden sands with rocky outcrops and stunning natural beauty.", lat: 14.956, lng: 74.025, tags: ["southernmost", "dolphins", "wildlife", "remote"], timeToSpend: "2-3 hours", rating: 4.4, popularity: "low", bestTime: "Oct-Mar, early morning for dolphins" },
    ]
  },

  churches: {
    icon: "⛪",
    title: "Churches & Heritage",
    color: "#A855F7",
    items: [
      { name: "Basilica of Bom Jesus", area: "Central", desc: "UNESCO World Heritage. Houses St. Francis Xavier's remains. Baroque masterpiece from 1605.", lat: 15.5008, lng: 73.9114, tags: ["UNESCO", "must-visit", "baroque"], timeToSpend: "45 mins - 1 hour", rating: 4.6, popularity: "high", bestTime: "Morning (9am-12pm), Nov-Feb" },
      { name: "Sé Cathedral", area: "Central", desc: "Largest church in Asia. Portuguese-Manueline style. Famous Golden Bell inside.", lat: 15.5038, lng: 73.9121, tags: ["largest-in-asia", "golden-bell", "UNESCO"], timeToSpend: "20-30 mins", rating: 4.5, popularity: "high", bestTime: "Morning near opening (7:30am), Nov-Mar" },
      { name: "Church of St. Cajetan", area: "Central", desc: "Modeled on St. Peter's Basilica in Rome. Corinthian columns, stunning frescoes.", lat: 15.5045, lng: 73.9108, tags: ["rome-inspired", "frescoes", "baroque"], timeToSpend: "30-45 mins", rating: 4.4, popularity: "medium", bestTime: "Morning (9am-12pm), Nov-Mar" },
      { name: "Church of St. Francis of Assisi", area: "Central", desc: "Houses the Archaeological Museum. Manueline-style doorway, gilded woodwork inside.", lat: 15.5020, lng: 73.9110, tags: ["museum", "manueline", "art"], timeToSpend: "20-30 mins", rating: 4.5, popularity: "medium", bestTime: "Morning, Oct-Feb, includes museum visit" },
      { name: "Chapel of Our Lady of the Mount", area: "Central", desc: "Hilltop chapel with panoramic views of Old Goa. Peaceful, rarely visited.", lat: 15.5055, lng: 73.9095, tags: ["hilltop", "views", "quiet"], timeToSpend: "1 hour", rating: 4.3, popularity: "medium", bestTime: "Sunset for views, Nov-Feb" },
      { name: "Mae de Deus Church, Saligao", area: "North", desc: "Neo-Gothic beauty. Stunning at night when illuminated. Known locally as 'Monte de Saligao'.", lat: 15.5600, lng: 73.7910, tags: ["neo-gothic", "night-visit", "photogenic"], timeToSpend: "30 mins", rating: 4.4, popularity: "low", bestTime: "Evening when illuminated, year-round" },
      { name: "Three Kings Chapel, Cansaulim", area: "South", desc: "Hilltop church from 1599. Famous for ghost legends and panoramic views of the Arabian Sea.", lat: 15.3370, lng: 73.9010, tags: ["legends", "hilltop", "views"], timeToSpend: "1-1.5 hours", rating: 4.3, popularity: "medium", bestTime: "Late afternoon for sunset, Jan 6 for feast" },
      { name: "Church of Our Lady of the Rosary", area: "Central", desc: "One of the oldest churches in Goa (1544). Manueline style. Views over Old Goa.", lat: 15.5060, lng: 73.9100, tags: ["oldest", "manueline", "historic"], timeToSpend: "20 mins", rating: 4.4, popularity: "low", bestTime: "Morning, year-round" },
      { name: "Rachol Seminary", area: "South", desc: "Founded 1560 from Muslim fort remains. One of Asia's oldest seminaries. Rarely visited gem.", lat: 15.3490, lng: 73.9700, tags: ["seminary", "historic", "off-beat"], timeToSpend: "1 hour", rating: 4.2, popularity: "low", bestTime: "Morning (7am-12pm), year-round" },
      { name: "St. Anthony Church, Siolim", area: "North", desc: "Neo-Gothic church (1907) on banks of Chapora River with unique statue of St. Anthony holding a serpent. Peaceful riverside setting surrounded by lush greenery.", lat: 15.6102, lng: 73.7536, tags: ["architecture", "riverside", "peaceful"], timeToSpend: "30-45 mins", rating: 4.5, popularity: "low", bestTime: "Morning, year-round" },
      { name: "Chapel of St. Catherine, Old Goa", area: "Central", desc: "Historic chapel (1510) built by Afonso de Albuquerque to commemorate Portuguese capture of Goa. Part of UNESCO World Heritage Site.", lat: 15.5024, lng: 73.9115, tags: ["heritage", "UNESCO", "historical"], timeToSpend: "15-20 mins", rating: 4.0, popularity: "low", bestTime: "Morning, Nov-Feb" },
      { name: "St. Thomas Church, Aldona", area: "North", desc: "Baroque church (1596) built on high plateau overlooking Mapusa River with stunning river views. Ornate decorations, biblical murals, and grand statues.", lat: 15.5875, lng: 73.8658, tags: ["baroque", "riverside", "murals"], timeToSpend: "30 mins", rating: 4.3, popularity: "low", bestTime: "Morning (8-10am), year-round" },
      { name: "Church of the Holy Spirit, Margao", area: "South", desc: "Magnificent 17th-century church (1675) in Portuguese Baroque style with impressive reredos rising to high ceiling. Well-preserved whitewashed main church.", lat: 15.2741, lng: 73.9580, tags: ["baroque", "architecture", "margao"], timeToSpend: "30 mins", rating: 4.5, popularity: "medium", bestTime: "Morning (9am-12pm), year-round" },
    ]
  },

  forts: {
    icon: "🏰",
    title: "Forts",
    color: "#F59E0B",
    items: [
      { name: "Fort Aguada", area: "North", desc: "Well-preserved 17th-century Portuguese fort with lighthouse. Named for freshwater springs.", lat: 15.4920, lng: 73.7730, tags: ["lighthouse", "well-preserved", "views"], timeToSpend: "1-1.5 hours", rating: 4.3, popularity: "high", bestTime: "Sunset for views, Oct-Mar" },
      { name: "Chapora Fort", area: "North", desc: "The Dil Chahta Hai fort. Best sunset viewpoint. Panoramic views of Vagator and Arabian Sea.", lat: 15.6046, lng: 73.7370, tags: ["sunset", "iconic", "panoramic"], timeToSpend: "1-1.5 hours", rating: 4.5, popularity: "high", bestTime: "Late afternoon before sunset, Nov-Jan" },
      { name: "Cabo de Rama Fort", area: "South", desc: "Named after Lord Rama. Wild, overgrown, dramatic. Chapel inside still active. Sea views.", lat: 15.0900, lng: 73.9300, tags: ["wild", "ancient", "off-beat"], timeToSpend: "1-2 hours", rating: 4.4, popularity: "medium", bestTime: "Evening for sunset over Arabian Sea, Nov-Mar" },
      { name: "Reis Magos Fort", area: "North", desc: "Restored fort with art gallery inside. Views of Mandovi River. Less crowded than Aguada.", lat: 15.4970, lng: 73.8070, tags: ["art-gallery", "restored", "river-views"], timeToSpend: "1-1.5 hours", rating: 4.6, popularity: "medium", bestTime: "Morning for softer light, Oct-Mar" },
      { name: "Corjuem Fort", area: "North", desc: "Tiny island fort on Mapusa River. Atmospheric, almost never visited. Real hidden gem.", lat: 15.5370, lng: 73.8660, tags: ["island", "hidden-gem", "atmospheric"], timeToSpend: "45 mins - 1 hour", rating: 3.9, popularity: "low", bestTime: "Morning or evening, Nov-Mar" },
      { name: "Tiracol Fort", area: "North", desc: "Northernmost point of Goa. Now a heritage hotel. Tiny chapel inside. Border of Maharashtra.", lat: 15.7260, lng: 73.6830, tags: ["northernmost", "heritage-hotel", "remote"], timeToSpend: "1.5-2 hours", rating: 4.0, popularity: "medium", bestTime: "Lunch with views, Oct-Mar" },
      { name: "Mormugao Fort", area: "South", desc: "Early 17th-century Portuguese fort (1624) overlooking Varca Beach and Arabian Sea. Mostly in ruins but bastions remain standing. Features two historic fountains.", lat: 15.4116, lng: 73.7986, tags: ["ruins", "beach-views", "historical"], timeToSpend: "1-1.5 hours", rating: 3.8, popularity: "low", bestTime: "Morning, carry water and food" },
      { name: "Alorna Fort", area: "North", desc: "17th-century fort on banks of Chapora River in Pernem. Protected monument undergoing ASI renovation. Free entry, uncommercialized gem with river views.", lat: 15.7158, lng: 73.8986, tags: ["riverside", "heritage", "off-beaten"], timeToSpend: "1-1.5 hours", rating: 4.1, popularity: "low", bestTime: "Nov-Feb, morning hours" },
      { name: "Rachol Fort", area: "South", desc: "Severely ruined fort on banks of Zuari River. Originally built by Sultanate of Bijapur, later Portuguese. Protected gate with coat of arms still visible.", lat: 15.3622, lng: 73.9436, tags: ["ruins", "heritage", "riverside"], timeToSpend: "30-45 mins", rating: 3.5, popularity: "low", bestTime: "Morning, combine with Rachol Seminary, year-round" },
      { name: "Sinquerim Fort", area: "North", desc: "17th-century fort (1612) constructed as extension of Aguada Fort, overlooking Sinquerim Beach. Lesser-known but historically important. Beautiful Arabian Sea views.", lat: 15.4976, lng: 73.7649, tags: ["beach-views", "portuguese", "hidden-gem"], timeToSpend: "45 mins - 1 hour", rating: 4.2, popularity: "low", bestTime: "Morning or late afternoon, Oct-Mar" },
    ]
  },

  PLACEHOLDER_END: null
};
