/**
 * GOA GUIDE — Data Layer
 * ========================
 * Add new categories by following the existing pattern.
 * Each category needs: icon, title, color, items[]
 * Each item can have: name, area, desc, lat, lng, tags[], price, where, shelfLife
 *
 * The app auto-discovers categories — just add a new key and it appears.
 */

const GOA_DATA = {
  beaches: {
    icon: "🏖️",
    title: "Beaches",
    color: "#0EA5E9",
    items: [
      { name: "Palolem Beach", area: "South", desc: "Crescent-shaped, calm waters, dolphin spotting. One of Goa's most beautiful.", lat: 15.0100, lng: 74.0230, tags: ["swimming", "scenic", "kayaking"] },
      { name: "Butterfly Beach", area: "South", desc: "Only accessible by boat from Palolem. Secluded paradise, dolphins frequent.", lat: 15.0020, lng: 74.0130, tags: ["secluded", "boat-access", "dolphins"] },
      { name: "Cola Beach", area: "South", desc: "Hidden lagoon meets the sea. Freshwater lagoon perfect for swimming. Dramatic cliff approach.", lat: 15.0350, lng: 74.0000, tags: ["lagoon", "secluded", "scenic"] },
      { name: "Agonda Beach", area: "South", desc: "Long, quiet stretch. Olive Ridley turtle nesting site. Less touristy than Palolem.", lat: 15.0440, lng: 73.9870, tags: ["quiet", "turtles", "long-walk"] },
      { name: "Cabo de Rama Beach", area: "South", desc: "Below the ancient fort. Rocky, wild, barely any tourists. Real adventure beach.", lat: 15.0890, lng: 73.9280, tags: ["secluded", "adventure", "fort-nearby"] },
      { name: "Vagator Beach", area: "North", desc: "Red cliffs, Chapora Fort above. Famous for trance music scene and dramatic landscape.", lat: 15.5970, lng: 73.7360, tags: ["scenic", "cliffs", "party-history"] },
      { name: "Anjuna Beach", area: "North", desc: "Flea market on Wednesdays. Birthplace of Goa's hippie culture in the 60s.", lat: 15.5730, lng: 73.7410, tags: ["flea-market", "hippie-history", "lively"] },
      { name: "Morjim Beach", area: "North", desc: "Olive Ridley turtle nesting. Russian expat scene. Quieter stretch of North Goa.", lat: 15.6290, lng: 73.7280, tags: ["turtles", "quiet", "nature"] },
      { name: "Ashwem Beach", area: "North", desc: "Upscale beach shacks, shallow waters. Great for sunset cocktails and swimming.", lat: 15.6420, lng: 73.7230, tags: ["upscale", "sunset", "swimming"] },
      { name: "Arambol Beach", area: "North", desc: "Bohemian vibe, drum circles at sunset, sweet water lake behind the cliff. Goa's hippie capital.", lat: 15.6830, lng: 73.7060, tags: ["bohemian", "drum-circles", "sweet-lake"] },
      { name: "Betalbatim Beach", area: "South", desc: "Quiet, clean, local fishermen. Called 'Sunset Beach' for a reason.", lat: 15.3050, lng: 73.9140, tags: ["quiet", "sunset", "authentic"] },
      { name: "Galgibaga Beach", area: "South", desc: "Pristine, protected turtle nesting site. Almost no tourists. Goa's cleanest beach.", lat: 14.9700, lng: 74.0570, tags: ["pristine", "turtles", "empty"] },
    ]
  },

  churches: {
    icon: "⛪",
    title: "Churches & Heritage",
    color: "#A855F7",
    items: [
      { name: "Basilica of Bom Jesus", area: "Central", desc: "UNESCO World Heritage. Houses St. Francis Xavier's remains. Baroque masterpiece from 1605.", lat: 15.5008, lng: 73.9114, tags: ["UNESCO", "must-visit", "baroque"] },
      { name: "Sé Cathedral", area: "Central", desc: "Largest church in Asia. Portuguese-Manueline style. Famous Golden Bell inside.", lat: 15.5038, lng: 73.9121, tags: ["largest-in-asia", "golden-bell", "UNESCO"] },
      { name: "Church of St. Cajetan", area: "Central", desc: "Modeled on St. Peter's Basilica in Rome. Corinthian columns, stunning frescoes.", lat: 15.5045, lng: 73.9108, tags: ["rome-inspired", "frescoes", "baroque"] },
      { name: "Church of St. Francis of Assisi", area: "Central", desc: "Houses the Archaeological Museum. Manueline-style doorway, gilded woodwork inside.", lat: 15.5020, lng: 73.9110, tags: ["museum", "manueline", "art"] },
      { name: "Chapel of Our Lady of the Mount", area: "Central", desc: "Hilltop chapel with panoramic views of Old Goa. Peaceful, rarely visited.", lat: 15.5055, lng: 73.9095, tags: ["hilltop", "views", "quiet"] },
      { name: "Mae de Deus Church, Saligao", area: "North", desc: "Neo-Gothic beauty. Stunning at night when illuminated. Known locally as 'Monte de Saligao'.", lat: 15.5600, lng: 73.7910, tags: ["neo-gothic", "night-visit", "photogenic"] },
      { name: "Three Kings Chapel, Cansaulim", area: "South", desc: "Hilltop church from 1599. Famous for ghost legends and panoramic views of the Arabian Sea.", lat: 15.3370, lng: 73.9010, tags: ["legends", "hilltop", "views"] },
      { name: "Church of Our Lady of the Rosary", area: "Central", desc: "One of the oldest churches in Goa (1544). Manueline style. Views over Old Goa.", lat: 15.5060, lng: 73.9100, tags: ["oldest", "manueline", "historic"] },
      { name: "Rachol Seminary", area: "South", desc: "Founded 1560 from Muslim fort remains. One of Asia's oldest seminaries. Rarely visited gem.", lat: 15.3490, lng: 73.9700, tags: ["seminary", "historic", "off-beat"] },
    ]
  },

  forts: {
    icon: "🏰",
    title: "Forts",
    color: "#F59E0B",
    items: [
      { name: "Fort Aguada", area: "North", desc: "Well-preserved 17th-century Portuguese fort with lighthouse. Named for freshwater springs.", lat: 15.4920, lng: 73.7730, tags: ["lighthouse", "well-preserved", "views"] },
      { name: "Chapora Fort", area: "North", desc: "The Dil Chahta Hai fort. Best sunset viewpoint. Panoramic views of Vagator and Arabian Sea.", lat: 15.6046, lng: 73.7370, tags: ["sunset", "iconic", "panoramic"] },
      { name: "Cabo de Rama Fort", area: "South", desc: "Named after Lord Rama. Wild, overgrown, dramatic. Chapel inside still active. Sea views.", lat: 15.0900, lng: 73.9300, tags: ["wild", "ancient", "off-beat"] },
      { name: "Reis Magos Fort", area: "North", desc: "Restored fort with art gallery inside. Views of Mandovi River. Less crowded than Aguada.", lat: 15.4970, lng: 73.8070, tags: ["art-gallery", "restored", "river-views"] },
      { name: "Corjuem Fort", area: "North", desc: "Tiny island fort on Mapusa River. Atmospheric, almost never visited. Real hidden gem.", lat: 15.5370, lng: 73.8660, tags: ["island", "hidden-gem", "atmospheric"] },
      { name: "Tiracol Fort", area: "North", desc: "Northernmost point of Goa. Now a heritage hotel. Tiny chapel inside. Border of Maharashtra.", lat: 15.7260, lng: 73.6830, tags: ["northernmost", "heritage-hotel", "remote"] },
    ]
  },

  mansions: {
    icon: "🏛️",
    title: "Heritage Mansions",
    color: "#EC4899",
    items: [
      { name: "Menezes Braganza House, Chandor", area: "South", desc: "Biggest Portuguese mansion in Goa. 450+ years, 10,000 sqm. Belgian chandeliers, Ming vases, 5000-book library. Family gives tours. ₹150/wing.", lat: 15.2614, lng: 74.0434, tags: ["must-visit", "450-years", "museum-like"] },
      { name: "Palácio do Deão, Quepem", area: "South", desc: "18th-century palace on Kushavati River. Hindu-Portuguese fusion. Pre-book lunch — home-cooked Indo-Portuguese food from their garden. Closed Wed.", lat: 15.2136, lng: 74.0736, tags: ["lunch-available", "river-view", "pre-book"] },
      { name: "Fernandes House, Chandor", area: "South", desc: "500+ years old. Hidden underground tunnel to a nearby church. More intimate than Braganza.", lat: 15.2610, lng: 74.0460, tags: ["tunnels", "intimate", "500-years"] },
      { name: "Figueiredo House, Loutolim", area: "South", desc: "450-year-old mansion. Still inhabited by the family. Indo-Portuguese furniture, grand ballroom.", lat: 15.3090, lng: 73.9680, tags: ["lived-in", "ballroom", "antiques"] },
      { name: "Casa Araujo Alvares, Loutolim", area: "South", desc: "One of the oldest houses in Goa. Connected to the Ancestral Goa museum. Beautiful gardens.", lat: 15.3100, lng: 73.9670, tags: ["oldest", "museum", "gardens"] },
    ]
  },

  islands: {
    icon: "🏝️",
    title: "Islands",
    color: "#14B8A6",
    items: [
      { name: "Divar Island", area: "Central", desc: "Not connected by road — free ferry from Ribandar. Frozen in time: Baroque churches, paddy fields, oyster-shell windows. Book guided tour with Make It Happen or Soul Travelling.", lat: 15.5120, lng: 73.8870, tags: ["ferry", "time-capsule", "guided-tours"] },
      { name: "Chorao Island", area: "Central", desc: "Dr. Salim Ali Bird Sanctuary. Mangrove kayaking. Portuguese-era chapel hike. Mud-bathing in lake.", lat: 15.5250, lng: 73.8780, tags: ["birds", "mangroves", "kayaking"] },
      { name: "St. George Island (Ilha de São Jorge)", area: "Central", desc: "Tiny island in Mandovi River. Old Portuguese chapel ruins. Almost no tourists visit.", lat: 15.5050, lng: 73.8600, tags: ["ruins", "secluded", "river"] },
      { name: "Grande Island", area: "South", desc: "Main snorkeling and diving destination. Boat trips from Vasco. Monkey Beach, Suzy's Wreck dive site.", lat: 15.3740, lng: 73.8470, tags: ["snorkeling", "diving", "boat-trip"] },
      { name: "Bat Island", area: "South", desc: "Best diving in Goa. Coral reefs, rays, turtles. Only accessible by dive boat.", lat: 15.3650, lng: 73.8350, tags: ["diving", "coral", "advanced"] },
    ]
  },

  localSpots: {
    icon: "📍",
    title: "Local Spots & Villages",
    color: "#6366F1",
    items: [
      { name: "Fontainhas Latin Quarter, Panjim", area: "Central", desc: "Goa's Portuguese quarter. Pastel houses, azulejo tiles, oyster-shell windows. Walk early morning for fewer tourists.", lat: 15.4956, lng: 73.8315, tags: ["portuguese", "photography", "heritage-walk"] },
      { name: "Assagao Village", area: "North", desc: "Goa's hippest village. Art cafes, yoga studios, boutique shops in Portuguese houses. Local expat hub.", lat: 15.5870, lng: 73.7740, tags: ["cafes", "yoga", "trendy"] },
      { name: "Chandor Village", area: "South", desc: "Ancient Kadamba dynasty capital. Grand Portuguese mansions, quiet village square, rich history.", lat: 15.2610, lng: 74.0430, tags: ["historic", "mansions", "off-beat"] },
      { name: "Saligao Village", area: "North", desc: "Heritage homes, laterite roads, the stunning Mae de Deus church. Real village Goa.", lat: 15.5590, lng: 73.7920, tags: ["village-life", "church", "heritage"] },
      { name: "Aldona Village", area: "North", desc: "Corjuem Fort nearby. Beautiful Mapusa River crossing. Old Portuguese houses, toddy tappers.", lat: 15.5410, lng: 73.8710, tags: ["toddy", "river", "authentic"] },
      { name: "Ponda (Temple Belt)", area: "Central", desc: "Goa's Hindu heartland. Shri Manguesh, Shri Mahalsa, Shri Shantadurga temples. Spice plantations nearby.", lat: 15.4000, lng: 74.0100, tags: ["temples", "hindu-heritage", "spices"] },
      { name: "Mario Gallery, Porvorim", area: "North", desc: "Museum dedicated to legendary Goan cartoonist Mario Miranda. His art defines Goan identity.", lat: 15.5220, lng: 73.8190, tags: ["art", "cartoons", "goan-culture"] },
    ]
  },

  food: {
    icon: "🍽️",
    title: "Must-Try Dishes",
    color: "#EF4444",
    items: [
      { name: "Fish Curry Rice (Xit Koddi)", desc: "THE staple of Goa. Coconut-based curry with fresh local fish, served with rice. Every household has their own recipe.", tags: ["staple", "coconut", "daily-meal"], where: "Kokni Kanteen, Ritz Classic, any local home" },
      { name: "Pork Vindaloo", desc: "From Portuguese 'vinha d'alhos'. Fiery red curry with vinegar, garlic, local spices. Not the British version you know.", tags: ["portuguese-origin", "spicy", "pork"], where: "Viva Panjim, Bhatti Village" },
      { name: "Chicken Cafreal", desc: "Green masala marinated, pan-fried chicken. African-Portuguese origin via Mozambique. Smoky, herby, incredible.", tags: ["green-masala", "african-origin", "smoky"], where: "Bhatti Village, Kokni Kanteen" },
      { name: "Pomfret Recheado", desc: "Whole fish stuffed with spicy red masala, shallow fried till crispy. 'Rechear' means 'to stuff' in Portuguese.", tags: ["stuffed-fish", "crispy", "signature"], where: "Viva Panjim, Ritz Classic" },
      { name: "Crab Xec Xec", desc: "Crab in thick coconut gravy with cinnamon, pepper, cumin. No English translation for 'xec xec'. Rich and aromatic.", tags: ["crab", "coconut", "aromatic"], where: "Ritz Classic, Martin's Corner" },
      { name: "Prawn Balchão", desc: "Fiery pickle-curry from Macao via Portuguese. Prawns in chili-garlic masala. Gets better the next day.", tags: ["pickle-curry", "macao-origin", "spicy"], where: "Ritz Classic, Kokni Kanteen" },
      { name: "Chicken/Mutton Xacuti", desc: "Complex curry with 15+ toasted spices, poppy seeds, coconut. Sunday-special dish. Rich and layered.", tags: ["15-spices", "complex", "sunday-dish"], where: "Kokni Kanteen, Nostalgia" },
      { name: "Sorpotel", desc: "Portuguese-origin pork offal stew. Pickled with vinegar, intensely spiced. Festival dish. An acquired taste.", tags: ["offal", "festival", "intense"], where: "Local homes, Bhatti Village" },
      { name: "Ros Omelette", desc: "Goa street food legend. Spiced omelette smothered in thick red/green gravy (ros). Found at roadside stalls.", tags: ["street-food", "unique", "late-night"], where: "Street stalls in Panjim, Mapusa" },
      { name: "Choris Pao", desc: "Goan pork sausage in a bread roll. Spicy, tangy, perfect snack. Buy raw sausage strings at Mapusa Market.", tags: ["sausage", "street-food", "pork"], where: "Mapusa Market, local bakeries" },
      { name: "Bebinca", desc: "The queen of Goan desserts. 7-16 layers of coconut, eggs, ghee, individually baked. Takes hours to make.", tags: ["layered", "iconic", "coconut"], where: "Any good Goan restaurant, local bakeries" },
      { name: "Serradura", desc: "Portuguese 'sawdust pudding'. Crushed Marie biscuits layered with sweetened cream. Simple, addictive.", tags: ["portuguese", "simple", "cream"], where: "Viva Panjim, Cafe Bodega" },
      { name: "Dodol", desc: "Sticky, dark, jaggery-coconut sweet. Slow-cooked for hours. Christmas specialty but available year-round.", tags: ["jaggery", "christmas", "slow-cooked"], where: "Local bakeries, Mapusa Market" },
      { name: "Poi / Pao", desc: "Local Goan bread. Poder (baker) delivers door-to-door at dawn. Poi is round, Pao is the classic roll.", tags: ["bread", "daily", "baker-delivery"], where: "Any local bakery, early morning" },
      { name: "Sol Kadhi", desc: "Pink coconut milk + kokum digestive drink. Cooling, tangy. Always have it after a spicy fish meal.", tags: ["digestive", "pink", "kokum"], where: "Served with thalis everywhere" },
    ]
  },

  restaurants: {
    icon: "🍴",
    title: "Restaurants",
    color: "#F97316",
    items: [
      { name: "Kokni Kanteen", area: "Central", desc: "Panjim institution since 1972. THE fish thali in Goa. Expect 30-60 min wait at lunch. Worth every minute.", lat: 15.4967, lng: 73.8269, tags: ["thali", "institution", "must-visit"], price: "₹₹" },
      { name: "Viva Panjim", area: "Central", desc: "Inside a 150-year-old Portuguese house in Fontainhas. Pork Vindaloo, Recheado, Serradura. Atmospheric.", lat: 15.4965, lng: 73.8312, tags: ["portuguese-house", "heritage", "romantic"], price: "₹₹" },
      { name: "Bhatti Village, Nerul", area: "North", desc: "Family home turned restaurant. Hidden in a village lane. Homemade feni, ox tongue, clams. Where Goans eat.", lat: 15.5153, lng: 73.7872, tags: ["hidden-gem", "authentic", "ox-tongue"], price: "₹₹" },
      { name: "Ritz Classic, Panjim", area: "Central", desc: "Legendary for seafood thalis. Chonak fish, Crab Masala, Prawn Balchão. Lunch is the move.", lat: 15.4986, lng: 73.8266, tags: ["seafood", "thali", "legendary"], price: "₹₹" },
      { name: "Bombil, Panjim", area: "Central", desc: "Set in a Goan-Portuguese bungalow. Named after bombil fish (Bombay duck). Melt-in-mouth rawa fry.", lat: 15.4936, lng: 73.8267, tags: ["bungalow", "rawa-fry", "homely"], price: "₹₹" },
      { name: "Martin's Corner, Betalbatim", area: "South", desc: "20+ year institution. Live music some nights. Famous Crab Xec Xec and Prawn Curry.", lat: 15.3040, lng: 73.9190, tags: ["institution", "live-music", "seafood"], price: "₹₹₹" },
      { name: "Vinayak Family Restaurant, Assagao", area: "North", desc: "Tiny, no-frills. Massive thalis at absurd prices. Where local construction workers eat. Incredibly authentic.", lat: 15.5880, lng: 73.7770, tags: ["budget", "thali", "local-secret"], price: "₹" },
      { name: "Souza Lobo, Calangute", area: "North", desc: "Beachfront since 1932. Tandoor Kingfish, Crab Rechado, Grilled Lobster. Touristy but earned its reputation.", lat: 15.5430, lng: 73.7550, tags: ["beachfront", "since-1932", "iconic"], price: "₹₹₹" },
      { name: "Nostalgia, Raia", area: "South", desc: "Late Chef Fernando's legacy. Old Portuguese house. Massive veg/non-veg Goan selection. Ancient recipes revived.", lat: 15.3400, lng: 73.9600, tags: ["chef-legacy", "ancient-recipes", "portuguese-house"], price: "₹₹" },
      { name: "Cafe Bodega (Sunaparanta)", area: "Central", desc: "Art gallery + cafe in a gorgeous Portuguese mansion. Great coffee, carrot cake. Browse contemporary art exhibits.", lat: 15.4939, lng: 73.8276, tags: ["art-gallery", "cafe", "portuguese-mansion"], price: "₹₹" },
      { name: "Gunpowder, Assagao", area: "North", desc: "South Indian-meets-Goan in a beautiful garden setting. Appams, Malabar curry, Goan fish. Popular with expats.", lat: 15.5880, lng: 73.7730, tags: ["south-indian", "garden", "fusion"], price: "₹₹" },
      { name: "Anand Ashram, Old Goa", area: "Central", desc: "Family-run since decades. Traditional Goan veg thali. On the road to Old Goa churches.", lat: 15.4990, lng: 73.8900, tags: ["vegetarian", "thali", "traditional"], price: "₹" },
    ]
  },

  bars: {
    icon: "🍻",
    title: "Bars & Tavernas",
    color: "#8B5CF6",
    items: [
      { name: "Joseph Bar, Fontainhas", area: "Central", desc: "One of Goa's oldest tavernas. 10-15 seats. Beef samosas, kokum feni cocktails. ₹400 cover. Local institution.", lat: 15.4984, lng: 73.8317, tags: ["oldest", "tiny", "feni-cocktails"], price: "₹₹" },
      { name: "Venite, Panjim", area: "Central", desc: "Balcony seating overlooking the street. Colonial charm. Good Goan food + drinks. Vintage feel.", lat: 15.4975, lng: 73.8300, tags: ["balcony", "colonial", "vintage"], price: "₹₹" },
      { name: "Taverna, Saligao", area: "North", desc: "Local's bar with zero pretense. Cheap feni, beer, and great conversation. Real susegad vibe.", lat: 15.5590, lng: 73.7910, tags: ["local", "cheap", "authentic"], price: "₹" },
      { name: "Mafia Cocktail, Panjim", area: "Central", desc: "Cheap flowing urrak and feni. Home-style Goan food. Local hangout where everyone knows everyone.", lat: 15.4960, lng: 73.8250, tags: ["cheap-drinks", "home-style", "local"], price: "₹" },
      { name: "Cape Town Cafe, Anjuna", area: "North", desc: "Rooftop bar with great views. Good cocktails, live music some nights. Chill vibe without the club energy.", lat: 15.5730, lng: 73.7380, tags: ["rooftop", "live-music", "cocktails"], price: "₹₹" },
      { name: "Sakana, Assagao", area: "North", desc: "Japanese-inspired bar in Assagao. Sake cocktails, sashimi. Different from everything else in Goa.", lat: 15.5880, lng: 73.7740, tags: ["japanese", "cocktails", "unique"], price: "₹₹₹" },
    ]
  },

  clubs: {
    icon: "🎵",
    title: "Clubs & Nightlife",
    color: "#D946EF",
    items: [
      { name: "Curlies Beach Shack, Anjuna", area: "North", desc: "Legendary trance/EDM spot right on Anjuna beach. Goes late into the night. Goa party history.", lat: 15.5700, lng: 73.7400, tags: ["trance", "beachfront", "legendary"], price: "₹₹" },
      { name: "Club LPK (Love Passion Karma)", area: "North", desc: "Built into a hillside with carved stone. Dramatic venue. Pool parties, international DJs.", lat: 15.5530, lng: 73.7580, tags: ["dramatic-venue", "pool-party", "DJs"], price: "₹₹₹" },
      { name: "Hilltop, Vagator", area: "North", desc: "Open-air hilltop venue. Goa's premier psychedelic trance spot. Sunrise sessions. Legendary.", lat: 15.6000, lng: 73.7350, tags: ["open-air", "psytrance", "sunrise"], price: "₹₹" },
      { name: "Chronicle, Vagator", area: "North", desc: "Newer upscale club. Good sound system, international acts. More polished than the old-school spots.", lat: 15.5970, lng: 73.7380, tags: ["upscale", "sound-system", "modern"], price: "₹₹₹" },
      { name: "Shiva Valley, Anjuna", area: "North", desc: "Tuesday night trance parties on Anjuna beach. Open-air, bonfire vibes. Goa's original party scene.", lat: 15.5710, lng: 73.7390, tags: ["tuesday-nights", "bonfire", "trance"], price: "₹₹" },
      { name: "Silent Noise Club, Palolem", area: "South", desc: "Silent disco on the beach. Everyone gets headphones, pick your channel. Unique South Goa party.", lat: 15.0100, lng: 74.0240, tags: ["silent-disco", "beach", "unique"], price: "₹₹" },
      { name: "Café Mambo, Baga", area: "North", desc: "Bollywood nights, commercial music. The mainstream Goa party experience. Gets packed.", lat: 15.5560, lng: 73.7510, tags: ["bollywood", "mainstream", "packed"], price: "₹₹" },
    ]
  },

  experiences: {
    icon: "✨",
    title: "Feni, Wine & Experiences",
    color: "#10B981",
    items: [
      { name: "Cazulo Floating Feni Experience", area: "South", desc: "Feet in a natural spring, tasting cashew/coconut/dukshiri feni with food pairings. Farm tour, live music. ₹2000-2500/person. Pre-book on Urbanaut app or call +918605008185.", lat: 15.3668, lng: 73.8995, tags: ["must-do", "pre-book", "unique-in-india"], price: "₹₹₹" },
      { name: "Paul John Whisky Distillery", area: "South", desc: "India's first internationally acclaimed single malt. Full distillery tour + tasting. Combine with Cazulo same day.", lat: 15.3610, lng: 73.9370, tags: ["whisky", "distillery-tour", "award-winning"], price: "₹₹" },
      { name: "Sahakari Spice Farm, Ponda", area: "Central", desc: "Walk through cardamom, pepper, cinnamon, vanilla plantations. Includes traditional Goan lunch + feni tasting.", lat: 15.4100, lng: 74.0300, tags: ["spices", "lunch-included", "nature"], price: "₹₹" },
      { name: "Tropical Spice Plantation", area: "Central", desc: "Elephant encounter (ethical bathing), spice walk, buffet lunch. More touristy but well-organized.", lat: 15.3800, lng: 74.0400, tags: ["elephants", "spices", "buffet"], price: "₹₹" },
      { name: "Fontainhas Heritage Walk", area: "Central", desc: "Guided walk through Latin Quarter. Food tastings, stories of Portuguese era. Book via Make It Happen or Soul Travelling.", lat: 15.4956, lng: 73.8315, tags: ["walking-tour", "food", "heritage"], price: "₹₹" },
      { name: "Divar Island Exploration", area: "Central", desc: "Ferry + guided walk/e-bike tour. Baroque churches, mangrove boat ride, feni tasting, local family lunch. Via Soul Travelling.", lat: 15.5120, lng: 73.8870, tags: ["ferry", "e-bike", "authentic-goa"], price: "₹₹" },
      { name: "Mandovi River Sunset Cruise", area: "Central", desc: "Evening cruise on the Mandovi. Live Goan music, dance performances. Touristy but fun if you're into it.", lat: 15.5000, lng: 73.8300, tags: ["cruise", "sunset", "music"], price: "₹" },
      { name: "Kaavi Art Workshop", area: "North", desc: "Learn ancient Goan wall art using laterite mud and natural dyes. Unique handcraft experience.", lat: 15.5600, lng: 73.7900, tags: ["art", "hands-on", "traditional"], price: "₹₹" },
      { name: "Goan Cooking Class", area: "Various", desc: "Multiple operators offer home-cooking classes. Learn Vindaloo, Xacuti, Bebinca from local families.", lat: 15.4950, lng: 73.8300, tags: ["cooking", "hands-on", "take-home-recipes"], price: "₹₹" },
    ]
  },

  water: {
    icon: "🤿",
    title: "Water Activities",
    color: "#0284C7",
    items: [
      { name: "Scuba Diving at Grande Island", area: "South", desc: "Suzy's Wreck, Shelter Cove, Bounty Bay. 5-12m depth. See barracuda, rays, pufferfish. PADI certified operators.", lat: 15.3740, lng: 73.8470, tags: ["wreck-dive", "PADI", "beginners-ok"], price: "₹₹₹" },
      { name: "Scuba Diving at Bat Island", area: "South", desc: "Best coral reefs in Goa. Deeper dives (10-18m). Turtles, rays, moray eels. For intermediate+.", lat: 15.3650, lng: 73.8350, tags: ["coral", "advanced", "turtles"], price: "₹₹₹" },
      { name: "Sal Backwaters Kayaking", area: "South", desc: "2-hour kayak through mangroves. Otters, kingfishers, lotus ponds. Serene and beautiful. Multiple operators.", lat: 15.2700, lng: 73.9600, tags: ["kayaking", "mangroves", "otters"], price: "₹₹" },
      { name: "Chorao Island Kayaking", area: "Central", desc: "Mangrove kayaking + bird sanctuary visit. Spot crocodiles in winter. Peaceful alternative to South Goa kayaking.", lat: 15.5250, lng: 73.8780, tags: ["mangroves", "birds", "crocodiles"], price: "₹₹" },
      { name: "Dolphin Watching, Palolem", area: "South", desc: "Early morning boat trips. Very high success rate for sighting Humpback dolphins. Also visit Butterfly Beach.", lat: 15.0100, lng: 74.0230, tags: ["dolphins", "morning", "boat-trip"], price: "₹" },
      { name: "Snorkeling at Grande Island", area: "South", desc: "Half-day trip including snorkeling, fishing, BBQ lunch on the boat. Good for non-divers.", lat: 15.3740, lng: 73.8470, tags: ["snorkeling", "BBQ", "half-day"], price: "₹₹" },
      { name: "Parasailing, Calangute/Baga", area: "North", desc: "Classic beach parasailing. Quick adrenaline hit. Negotiate prices, always check safety gear.", lat: 15.5440, lng: 73.7560, tags: ["parasailing", "adrenaline", "quick"], price: "₹₹" },
      { name: "Jet Skiing, Baga Beach", area: "North", desc: "Available at most North Goa beaches. 10-15 min rides. Negotiate hard, prices vary wildly.", lat: 15.5560, lng: 73.7510, tags: ["jet-ski", "negotiate", "fun"], price: "₹₹" },
      { name: "White Water Rafting, Mandovi River", area: "Central", desc: "During monsoon season (Jul-Sep). Grade II-III rapids near Valpoi. Seasonal adventure.", lat: 15.5300, lng: 74.1400, tags: ["monsoon-only", "rapids", "adventure"], price: "₹₹" },
    ]
  },

  waterfalls: {
    icon: "💧",
    title: "Waterfalls",
    color: "#06B6D4",
    items: [
      { name: "Dudhsagar Falls", area: "East", desc: "5th tallest in India (310m). 'Sea of Milk'. Accessible by jeep through jungle. Swim in the pool below. Best Jul-Dec.", lat: 15.3144, lng: 74.3143, tags: ["must-visit", "jeep-ride", "swimming"], price: "₹₹" },
      { name: "Tambdi Surla Waterfall", area: "East", desc: "Near Goa's oldest temple (12th century Mahadev Temple). Gentle falls, jungle trek. Less crowded.", lat: 15.3900, lng: 74.2700, tags: ["temple-nearby", "trek", "quiet"], price: "Free" },
      { name: "Arvalem (Harvalem) Waterfalls", area: "North", desc: "Near Arvalem Caves (Buddhist rock-cut caves). Easy access by road. Impressive during monsoon.", lat: 15.4800, lng: 74.0500, tags: ["caves-nearby", "easy-access", "monsoon"], price: "Free" },
      { name: "Netravali Waterfall (Savri)", area: "South", desc: "In the Netravali Wildlife Sanctuary. 'Bubbling Lake' nearby. Trek through forest. Off-beat.", lat: 15.1400, lng: 74.1800, tags: ["wildlife", "trek", "off-beat"], price: "₹" },
      { name: "Hivre Waterfall", area: "East", desc: "Hidden gem near Valpoi. Requires a short trek. Crystal clear water. Almost no tourists.", lat: 15.4500, lng: 74.1800, tags: ["hidden", "trek", "crystal-clear"], price: "Free" },
    ]
  },

  markets: {
    icon: "🛒",
    title: "Markets",
    color: "#84CC16",
    items: [
      { name: "Mapusa Friday Market", area: "North", desc: "Biggest local market. Fresh fish, Goan sausage (choris), spices, local produce. Chaotic, authentic. Go early.", lat: 15.5884, lng: 73.8128, tags: ["friday", "authentic", "sausages"], price: "₹" },
      { name: "Anjuna Flea Market", area: "North", desc: "Wednesday afternoons. Hippie-era tradition. Clothes, jewelry, crafts, some overpriced tourist stuff. Bargain hard.", lat: 15.5730, lng: 73.7400, tags: ["wednesday", "hippie", "crafts"], price: "₹" },
      { name: "Arpora Saturday Night Market", area: "North", desc: "Live music, food stalls, shopping. More curated than Anjuna. Good vibe for evening browsing.", lat: 15.5690, lng: 73.7660, tags: ["saturday-night", "music", "food-stalls"], price: "₹₹" },
      { name: "Margao Municipal Market", area: "South", desc: "South Goa's main market. Huge fish section, spice traders, local sweets. More intense than Mapusa.", lat: 15.2830, lng: 73.9570, tags: ["fish-market", "spices", "south-goa"], price: "₹" },
      { name: "Panjim Municipal Market", area: "Central", desc: "Compact city market. Fresh produce, flowers, fish. Near Fontainhas. Quick morning visit.", lat: 15.4980, lng: 73.8270, tags: ["compact", "morning", "flowers"], price: "₹" },
    ]
  },

  souvenirs: {
    icon: "🎁",
    title: "Souvenirs & Gifts",
    color: "#E11D48",
    items: [
      { name: "Hand-Painted Azulejo Tiles", area: "Central", desc: "Portuguese-Goan ceramic tiles, hand-painted in blue/white or multicolor. Coasters, wall art, trivets. Buy from Fontainhas studios or Velha Goa Galeria.", lat: 15.4956, lng: 73.8315, tags: ["portuguese", "ceramic", "iconic"], price: "₹₹", shelfLife: null },
      { name: "Velha Goa Galeria (Tile Shop)", area: "Central", desc: "THE place for authentic hand-painted azulejo tiles, fridge magnets, coasters, wall murals. Run by artists. Each piece unique. In Fontainhas.", lat: 15.4958, lng: 73.8310, tags: ["tiles", "handmade", "artist-run"], price: "₹₹", shelfLife: null },
      { name: "Mario Miranda Merch", area: "Central", desc: "Prints, mugs, bags, coasters featuring the legendary Goan cartoonist's art. Defines Goan visual identity. Buy at Mario Gallery or Literati Bookshop.", lat: 15.5220, lng: 73.8190, tags: ["art", "iconic", "prints"], price: "₹₹", shelfLife: null },
      { name: "Seashell Crafts & Jewelry", area: "Various", desc: "Earrings, necklaces, wind chimes, lampshades made from local shells. Best at Anjuna Flea Market and Arpora Night Market. Bargain hard.", lat: 15.5730, lng: 73.7400, tags: ["seashell", "jewelry", "handcraft"], price: "₹", shelfLife: null },
      { name: "Coconut Shell Crafts", area: "Various", desc: "Bowls, cups, spoons, candle holders carved from coconut shells. Very Goan, lightweight, surprisingly elegant. Found at all markets.", lat: 15.5690, lng: 73.7660, tags: ["coconut", "eco-friendly", "lightweight"], price: "₹", shelfLife: null },
      { name: "Goan Cashew Nuts (Flavored)", area: "Various", desc: "Goa = cashew capital of India. Get masala, pepper, salted, caramelized variants. 2-3 month shelf life. Carry-on & check-in safe.", lat: 15.5884, lng: 73.8128, tags: ["food-gift", "flight-safe", "long-shelf-life"], price: "₹", shelfLife: "2-3 months" },
      { name: "Bebinca (Boxed)", area: "Various", desc: "The 7-16 layer Goan coconut cake, boxed. Best from local bakeries in Panjim/Margao, NOT tourist shops. Keeps 3-5 days unrefrigerated, 2 weeks in fridge.", lat: 15.4980, lng: 73.8270, tags: ["food-gift", "flight-safe", "iconic-dessert"], price: "₹₹", shelfLife: "3-5 days" },
      { name: "Dodol", area: "Various", desc: "Dark, sticky jaggery-coconut fudge. Slow-cooked for hours. Dense, rich, travels extremely well. Lasts 2-3 weeks at room temp.", lat: 15.2830, lng: 73.9570, tags: ["food-gift", "flight-safe", "long-shelf-life"], price: "₹", shelfLife: "2-3 weeks" },
      { name: "Goan Sausage Strings (Choris)", area: "North", desc: "Spicy pork sausage dried with Kashmiri chili and vinegar. Vacuum-packed lasts 4-5 days unrefrigerated. Buy at Mapusa Friday Market. CHECK-IN bag only.", lat: 15.5884, lng: 73.8128, tags: ["food-gift", "flight-safe", "pork"], price: "₹", shelfLife: "4-5 days (vacuum)" },
      { name: "Cashew Feni (Bottle)", area: "Various", desc: "Goa's GI-tagged spirit. Get Cazulo or Big Boss brand for quality. 750ml within domestic flight liquid limits for check-in. Unique gift.", lat: 15.3668, lng: 73.8995, tags: ["alcohol", "GI-tagged", "check-in-only"], price: "₹₹", shelfLife: "Indefinite" },
      { name: "Urrak (Cashew Brew)", area: "Various", desc: "Lighter, fruitier cousin of feni. Seasonal (April-May) but bottled versions available. Mix with Limca for the classic Goan drink. Check-in only.", lat: 15.4960, lng: 73.8250, tags: ["alcohol", "seasonal", "check-in-only"], price: "₹", shelfLife: "Indefinite" },
      { name: "Goan Spice Mixes / Masalas", area: "Various", desc: "Pre-mixed Xacuti masala, Vindaloo paste, Recheado masala, Balchão paste. Packed and sealed, lasts months. From Mapusa Market or spice plantations.", lat: 15.5884, lng: 73.8128, tags: ["food-gift", "flight-safe", "cook-at-home"], price: "₹", shelfLife: "3-6 months" },
      { name: "Kokum Syrup / Agal", area: "Various", desc: "Concentrated kokum juice. Mix with water for instant Sol Kadhi or use as a tangy drink. Bottles last months. Unique to Konkan coast.", lat: 15.4980, lng: 73.8270, tags: ["food-gift", "flight-safe", "unique"], price: "₹", shelfLife: "3-6 months" },
      { name: "Goan Coconut Oil (Cold-Pressed)", area: "Various", desc: "Fresh cold-pressed coconut oil. Tastes completely different from store-bought. Cooking or hair. Bottles everywhere.", lat: 15.2830, lng: 73.9570, tags: ["food-gift", "flight-safe", "multi-use"], price: "₹", shelfLife: "6+ months" },
      { name: "Local Pottery & Terracotta", area: "Central", desc: "Traditional Goan clay pots, oil lamps (diyo), planters. Handmade in villages. Fragile but beautiful. Wrap well for luggage.", lat: 15.4000, lng: 74.0100, tags: ["handcraft", "fragile", "traditional"], price: "₹", shelfLife: null },
      { name: "Crochet & Lace Work", area: "Various", desc: "Portuguese-era tradition. Tablecloths, doilies, bookmarks. Handmade by local women in villages like Nuvem. Increasingly rare craft.", lat: 15.3400, lng: 73.9600, tags: ["portuguese", "textile", "rare-craft"], price: "₹₹", shelfLife: null },
      { name: "Cashew Marzipan / Goan Sweets", area: "Various", desc: "Colorful cashew-based sweets shaped like fruits. Also try milk cream rolls, pinagre, and kul-kuls. 4-5 day shelf life.", lat: 15.4980, lng: 73.8270, tags: ["food-gift", "flight-safe", "sweets"], price: "₹", shelfLife: "4-5 days" },
      { name: "Literati Bookshop Goa", area: "North", desc: "Curated bookshop in Calangute. Goan literature, history books, Mario Miranda prints, local zines. Great for readers.", lat: 15.5430, lng: 73.7550, tags: ["books", "literature", "curated"], price: "₹₹", shelfLife: null },
      { name: "Brass & Copper Church Bells (Miniature)", area: "Central", desc: "Small replica church bells in brass/copper. Found near Old Goa churches. Also crucifixes, saint figurines. Distinctly Goan-Catholic aesthetic.", lat: 15.5008, lng: 73.9114, tags: ["metalwork", "church-replicas", "unique"], price: "₹", shelfLife: null },
      { name: "Coconut Vinegar (Toddy Vinegar)", area: "Various", desc: "Natural fermented coconut vinegar — key ingredient in authentic Vindaloo. Impossible to find outside Goa/Konkan. Bottles travel well.", lat: 15.5884, lng: 73.8128, tags: ["food-gift", "flight-safe", "rare-ingredient"], price: "₹", shelfLife: "1+ year" },
    ]
  },

  highs: {
    icon: "🥴",
    title: "Drinks & Highs",
    color: "#7C3AED",
    items: [
      { name: "Cashew Feni (Cazulo Premium)", area: "South", desc: "The gold standard. Triple-distilled, smooth, complex. Sip neat or with ice. Their 'Floating Feni' tasting experience is unreal. ₹2000-2500 at their farm.", lat: 15.3668, lng: 73.8995, tags: ["premium", "must-try", "smooth"], price: "₹₹₹" },
      { name: "Cashew Feni (Big Boss)", area: "Various", desc: "Most popular bottled feni brand. Decent quality, widely available. Good entry point if you've never tried feni. Harsh neat — mix it.", lat: 15.4960, lng: 73.8250, tags: ["popular", "available-everywhere", "mixer"], price: "₹₹" },
      { name: "Coconut Feni (Toddy Feni)", area: "Various", desc: "Distilled from coconut toddy. Stronger, funkier taste than cashew feni. Harder to find, more 'local' drink. Ask at tavernas.", lat: 15.4960, lng: 73.8250, tags: ["funky", "strong", "local-only"], price: "₹" },
      { name: "Dukshiri Feni", area: "Various", desc: "Double-distilled cashew feni. Smoother than regular, stronger kick. The middle ground between basic and premium.", lat: 15.3668, lng: 73.8995, tags: ["double-distilled", "smooth", "strong"], price: "₹₹" },
      { name: "Urrak", area: "Various", desc: "First distillation of cashew fruit. Lighter, fruity, mildly alcoholic. The classic mix: Urrak + Limca. Seasonal (April-May) but bottled year-round.", lat: 15.4960, lng: 73.8250, tags: ["light", "fruity", "seasonal"], price: "₹" },
      { name: "Urrak + Limca Combo", area: "Various", desc: "THE Goan sundowner. Urrak mixed with Limca (lemon soda). Refreshing, dangerously drinkable. Ask at any beach shack or bar.", lat: 15.5970, lng: 73.7360, tags: ["cocktail", "refreshing", "iconic"], price: "₹" },
      { name: "Feni Cocktails at Joseph Bar", area: "Central", desc: "Kokum Feni cocktail is the signature. Tiny 10-seat taverna in Fontainhas. Also try their cashew feni with lime and jaggery.", lat: 15.4984, lng: 73.8317, tags: ["cocktails", "taverna", "kokum"], price: "₹₹" },
      { name: "Port Wine (Goan Style)", area: "Central", desc: "Not actual Portuguese port — it's a local Goan sweet wine. Cheap, sugary, gets the job done. A Goan college staple.", lat: 15.4960, lng: 73.8250, tags: ["sweet-wine", "cheap", "nostalgic"], price: "₹" },
      { name: "Paul John Single Malt Whisky", area: "South", desc: "India's internationally acclaimed whisky, distilled in Goa. Visit the distillery for tours + tasting. Peated and unpeated variants. World-class.", lat: 15.3610, lng: 73.9370, tags: ["whisky", "distillery-tour", "world-class"], price: "₹₹₹" },
      { name: "Kings Beer", area: "Various", desc: "Goa's own beer brand. Pilsner style, nothing fancy, but cheap and ice-cold on a hot beach day it slaps. ₹60-80 at shops.", lat: 15.4960, lng: 73.8250, tags: ["beer", "local-brand", "cheap"], price: "₹" },
      { name: "Toddy (Soor / Kallu)", area: "Various", desc: "Fresh fermented coconut sap. Mildly alcoholic, slightly fizzy, sweet-sour. Toddy tappers climb coconut trees at dawn. Ask at village tavernas.", lat: 15.5410, lng: 73.8710, tags: ["fermented", "coconut", "village-drink"], price: "₹" },
      { name: "Kokum Feni Sour", area: "Various", desc: "Feni + kokum syrup + lime + sugar. The best way to drink feni if you can't handle it neat. Pink, tangy, tropical.", lat: 15.4965, lng: 73.8312, tags: ["cocktail", "beginner-friendly", "tangy"], price: "₹₹" },
      { name: "Cannabis (Bhang Lassi)", area: "North", desc: "Goa's open secret. Bhang lassis available at certain shacks in Arambol/Anjuna. Technically grey-area legal. Ask discreetly. Start slow.", lat: 15.6830, lng: 73.7060, tags: ["cannabis", "lassi", "arambol"], price: "₹" },
      { name: "Mushroom Shakes", area: "North", desc: "Available at certain beach shacks in Anjuna/Arambol/Vagator during season. Just ask. Quality and legality both questionable — proceed with caution.", lat: 15.5730, lng: 73.7410, tags: ["psychedelic", "seasonal", "caution"], price: "₹" },
      { name: "Cazulo Feni Tasting Flight", area: "South", desc: "The proper way to experience feni. 4-5 variants side by side: cashew, coconut, dukshiri, aged, flavored. With food pairings. Pre-book on Urbanaut app.", lat: 15.3668, lng: 73.8995, tags: ["tasting-flight", "pre-book", "educational"], price: "₹₹₹" },
      { name: "Bebinca Cocktail (Specialty)", area: "Various", desc: "Some upscale bars now make bebinca-infused cocktails — feni base, coconut cream, caramel. Found at places like Sakana, Cape Town Cafe.", lat: 15.5880, lng: 73.7740, tags: ["specialty", "upscale", "dessert-cocktail"], price: "₹₹₹" },
    ]
  },
};
