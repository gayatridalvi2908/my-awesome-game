// SPEED SORT — Round Data
// 48 rounds total: 16 easy, 16 medium, 16 hard

export const rounds = [

  // ===================== EASY (16) =====================
  { id: 1, difficulty: "easy", prompt: "Order these planets by distance from the Sun (closest to farthest)", items: ["Mercury", "Venus", "Earth", "Mars"] },
  { id: 2, difficulty: "easy", prompt: "Order these by release year (oldest to newest)", items: ["YouTube (2005)", "iPhone (2007)", "Instagram (2010)", "ChatGPT (2022)"] },
  { id: 3, difficulty: "easy", prompt: "Order these meals by when you'd typically eat them in a day", items: ["Breakfast", "Lunch", "Snack", "Dinner"] },
  { id: 4, difficulty: "easy", prompt: "Order these by size, smallest to largest", items: ["Ant", "Cat", "Horse", "Elephant"] },
  { id: 5, difficulty: "easy", prompt: "Order the days from the start of a typical work week", items: ["Monday", "Tuesday", "Wednesday", "Thursday"] },
  { id: 6, difficulty: "easy", prompt: "Order these sports by typical number of players on the field/court at once, fewest to most", items: ["Basketball (5)", "Volleyball (6)", "Cricket (11)", "Football/Soccer (11, larger pitch)"] },
  { id: 7, difficulty: "easy", prompt: "Order these by age, youngest to oldest", items: ["Baby", "Child", "Teenager", "Adult"] },
  { id: 8, difficulty: "easy", prompt: "Order these temperatures from coldest to hottest", items: ["Freezing (0°C)", "Cool (15°C)", "Warm (25°C)", "Hot (40°C)"] },
  { id: 9, difficulty: "easy", prompt: "Order these by typical price, cheapest to most expensive", items: ["Cup of coffee", "Movie ticket", "Smartphone", "Car"] },
  { id: 10, difficulty: "easy", prompt: "Order the seasons starting from Spring", items: ["Spring", "Summer", "Autumn", "Winter"] },
  { id: 11, difficulty: "easy", prompt: "Order these by typical cooking time, shortest to longest", items: ["Toast (2 min)", "Fried egg (5 min)", "Rice (20 min)", "Roast chicken (90 min)"] },
  { id: 12, difficulty: "easy", prompt: "Order these Indian cities from north to south", items: ["Delhi", "Mumbai", "Hyderabad", "Chennai"] },
  { id: 13, difficulty: "easy", prompt: "Order these by typical screen size, smallest to largest", items: ["Smartphone", "Tablet", "Laptop", "TV"] },
  { id: 14, difficulty: "easy", prompt: "Order these company milestones in the order they'd usually happen", items: ["Idea", "Prototype", "Launch", "Scale"] },
  { id: 15, difficulty: "easy", prompt: "Order these by typical run time, shortest to longest", items: ["100m sprint", "Mile run", "Half marathon", "Full marathon"] },
  { id: 16, difficulty: "easy", prompt: "Order these by how many players are on a standard team, fewest to most", items: ["Tennis singles (1)", "Badminton doubles (2)", "Basketball (5)", "Football/Soccer (11)"] },

  // ===================== MEDIUM (16) =====================
  { id: 17, difficulty: "medium", prompt: "Order these countries by population, largest to smallest", items: ["Indonesia", "Nigeria", "Brazil", "Russia"] },
  { id: 18, difficulty: "medium", prompt: "Order these landmarks by height, tallest to shortest", items: ["Eiffel Tower", "Big Ben", "Statue of Liberty", "Taj Mahal"] },
  { id: 19, difficulty: "medium", prompt: "Order these animals by average lifespan, shortest to longest", items: ["Housefly", "Dog", "Elephant", "Tortoise"] },
  { id: 20, difficulty: "medium", prompt: "Order these languages by number of native speakers, most to least", items: ["Mandarin", "Spanish", "Bengali", "French"] },
  { id: 21, difficulty: "medium", prompt: "Order these oceans by size, largest to smallest", items: ["Pacific", "Atlantic", "Indian", "Arctic"] },
  { id: 22, difficulty: "medium", prompt: "Order these mountains by height, tallest to shortest", items: ["Everest", "K2", "Kangchenjunga", "Lhotse"] },
  { id: 23, difficulty: "medium", prompt: "Order these social media platforms by launch year, oldest to newest", items: ["Facebook (2004)", "Twitter (2006)", "Instagram (2010)", "TikTok (2016)"] },
  { id: 24, difficulty: "medium", prompt: "Order these by total runtime, shortest to longest", items: ["Friends episode (~22 min)", "Inception (148 min)", "Avengers: Endgame (181 min)", "Lord of the Rings: Return of the King extended (263 min)"] },
  { id: 25, difficulty: "medium", prompt: "Order these by typical reference points, coldest to hottest (°C)", items: ["Water freezes (0°C)", "Room temperature (20°C)", "Human body temp (37°C)", "Water boils (100°C)"] },
  { id: 26, difficulty: "medium", prompt: "Order these tech companies by founding year, oldest to newest", items: ["Apple (1976)", "Microsoft (1975)", "Google (1998)", "Meta/Facebook (2004)"] },
  { id: 27, difficulty: "medium", prompt: "Order these Indian states by area, largest to smallest", items: ["Rajasthan", "Madhya Pradesh", "Maharashtra", "Gujarat"] },
  { id: 28, difficulty: "medium", prompt: "Order these by typical commercial flight duration from Mumbai, shortest to longest", items: ["Mumbai to Delhi (~2 hrs)", "Mumbai to Dubai (~3.5 hrs)", "Mumbai to London (~9 hrs)", "Mumbai to New York (~16 hrs)"] },
  { id: 29, difficulty: "medium", prompt: "Order these by top speed, slowest to fastest", items: ["Average human walking (~5 km/h)", "Usain Bolt (~44 km/h)", "Cheetah (~110 km/h)", "Formula 1 car (~350 km/h)"] },
  { id: 30, difficulty: "medium", prompt: "Order these by when in history they were invented, oldest to newest", items: ["The wheel", "The printing press", "The telephone", "The internet"] },
  { id: 31, difficulty: "medium", prompt: "Order these by average shipping/delivery time, fastest to slowest", items: ["Same-day delivery", "Standard 3-5 day shipping", "International shipping", "Sea freight cargo"] },
  { id: 32, difficulty: "medium", prompt: "Order these rivers by length, longest to shortest", items: ["Nile", "Amazon", "Ganges", "Thames"] },

  // ===================== HARD (16) =====================
  { id: 33, difficulty: "hard", prompt: "Order these elements by atomic number, lowest to highest", items: ["Hydrogen (1)", "Carbon (6)", "Oxygen (8)", "Iron (26)"] },
  { id: 34, difficulty: "hard", prompt: "Order these by GDP (nominal), largest to smallest economy", items: ["United States", "China", "Germany", "Japan"] },
  { id: 35, difficulty: "hard", prompt: "Order these by when they were founded, oldest to newest", items: ["University of Oxford (~1096)", "Harvard University (1636)", "MIT (1861)", "Stanford University (1885)"] },
  { id: 36, difficulty: "hard", prompt: "Order these planets by number of known moons, fewest to most", items: ["Mercury (0)", "Earth (1)", "Neptune (14)", "Saturn (140+)"] },
  { id: 37, difficulty: "hard", prompt: "Order these by typical mobile network evolution, oldest to newest", items: ["Dial-up internet", "3G mobile", "4G LTE", "5G"] },
  { id: 38, difficulty: "hard", prompt: "Order these Indian Prime Ministers by when they first took office", items: ["Jawaharlal Nehru (1947)", "Indira Gandhi (1966)", "Atal Bihari Vajpayee (1996)", "Narendra Modi (2014)"] },
  { id: 39, difficulty: "hard", prompt: "Order these by approximate distance from Earth, closest to farthest", items: ["The Moon", "The Sun", "Proxima Centauri (nearest star)", "Andromeda Galaxy"] },
  { id: 40, difficulty: "hard", prompt: "Order these companies by current approximate market capitalization, largest to smallest", items: ["Apple", "Amazon", "Netflix", "Snap Inc."] },
  { id: 41, difficulty: "hard", prompt: "Order these by year the war/conflict ended, earliest to latest", items: ["World War I (1918)", "World War II (1945)", "Vietnam War (1975)", "Gulf War (1991)"] },
  { id: 42, difficulty: "hard", prompt: "Order these hot deserts by size, largest to smallest", items: ["Sahara", "Arabian Desert", "Gobi Desert", "Kalahari Desert"] },
  { id: 43, difficulty: "hard", prompt: "Order these programming languages by year first released, oldest to newest", items: ["C (1972)", "Python (1991)", "JavaScript (1995)", "Swift (2014)"] },
  { id: 44, difficulty: "hard", prompt: "Order these by speed/reaction time, slowest to fastest", items: ["Average human reaction time (~250ms)", "Camera shutter (1/1000 sec)", "Computer CPU cycle (nanoseconds)", "Speed of light (instant, ~0)"] },
  { id: 45, difficulty: "hard", prompt: "Order these Olympic host cities by year hosted, earliest to latest", items: ["London (1948)", "Tokyo (1964)", "Beijing (2008)", "Paris (2024)"] },
  { id: 46, difficulty: "hard", prompt: "Order these by distance from the equator, closest to farthest", items: ["Singapore", "Mumbai", "London", "Reykjavik"] },
  { id: 47, difficulty: "hard", prompt: "Order these books/series by original publication year, oldest to newest", items: ["Sherlock Holmes (1887)", "The Hobbit (1937)", "Harry Potter (1997)", "The Hunger Games (2008)"] },
  { id: 48, difficulty: "hard", prompt: "Order these countries by population, smallest to largest", items: ["Australia", "United Kingdom", "Brazil", "India"] }
];