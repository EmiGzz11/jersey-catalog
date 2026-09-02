const fs = require('fs');
const path = require('path');

const teams = [
    { id: "monterrey-2026-home", name: "Monterrey 26/27 Local", team: "Monterrey", country: "México", league: "Liga MX", folder: "Monterrey", color: "#0284c7", brand: "Puma" },
    { id: "cruz-azul-2026-home", name: "Cruz Azul 26/27 Local", team: "Cruz Azul", country: "México", league: "Liga MX", folder: "CruzAzul", color: "#2563eb", brand: "Pirma" },
    { id: "toluca-2026-home", name: "Toluca 26/27 Local", team: "Toluca", country: "México", league: "Liga MX", folder: "Toluca", color: "#dc2626", brand: "New Balance" },
    { id: "pumas-2026-home", name: "Pumas 26/27 Local", team: "Pumas", country: "México", league: "Liga MX", folder: "Pumas", color: "#ca8a04", brand: "Nike" },
    { id: "real-madrid-2026-home-std", name: "Real Madrid 26/27 Local", team: "Real Madrid", country: "España", league: "LaLiga", folder: "RealMadrid", color: "#ffffff", brand: "Adidas" },
    { id: "liverpool-2026-home", name: "Liverpool 26/27 Local", team: "Liverpool", country: "Inglaterra", league: "Premier League", folder: "Liverpool", color: "#dc2626", brand: "Nike" },
    { id: "man-city-2026-home", name: "Manchester City 26/27 Local", team: "Manchester City", country: "Inglaterra", league: "Premier League", folder: "ManchesterCity", color: "#38bdf8", brand: "Puma" },
    { id: "man-utd-2026-home", name: "Manchester United 26/27 Local", team: "Manchester United", country: "Inglaterra", league: "Premier League", folder: "ManchesterUnited", color: "#dc2626", brand: "Adidas" },
    { id: "aston-villa-2026-home", name: "Aston Villa 26/27 Local", team: "Aston Villa", country: "Inglaterra", league: "Premier League", folder: "AstonVilla", color: "#7e22ce", brand: "Adidas" },
    { id: "chelsea-2026-home", name: "Chelsea 26/27 Local", team: "Chelsea", country: "Inglaterra", league: "Premier League", folder: "Chelsea", color: "#2563eb", brand: "Nike" },
    { id: "psg-2026-home", name: "PSG 26/27 Local", team: "PSG", country: "Francia", league: "Ligue 1", folder: "PSG", color: "#1d4ed8", brand: "Nike" },
    { id: "ac-milan-2026-home", name: "AC Milan 26/27 Local", team: "AC Milan", country: "Italia", league: "Serie A", folder: "ACMilan", color: "#dc2626", brand: "Puma" },
    { id: "juventus-2026-home", name: "Juventus 26/27 Local", team: "Juventus", country: "Italia", league: "Serie A", folder: "Juventus", color: "#ffffff", brand: "Adidas" },
    { id: "inter-milan-2026-home", name: "Inter de Milan 26/27 Local", team: "Inter de Milan", country: "Italia", league: "Serie A", folder: "InterMilan", color: "#2563eb", brand: "Nike" },
    { id: "roma-2026-home", name: "Roma 26/27 Local", team: "Roma", country: "Italia", league: "Serie A", folder: "Roma", color: "#991b1b", brand: "Adidas" },
    { id: "bayern-2026-home", name: "Bayern Munich 26/27 Local", team: "Bayern Munich", country: "Alemania", league: "Bundesliga", folder: "BayernMunich", color: "#dc2626", brand: "Adidas" },
    { id: "dortmund-2026-home", name: "Borussia Dortmund 26/27 Local", team: "Borussia Dortmund", country: "Alemania", league: "Bundesliga", folder: "BorussiaDortmund", color: "#eab308", brand: "Puma" },
    { id: "leipzig-2026-home", name: "RB Leipzig 26/27 Local", team: "RB Leipzig", country: "Alemania", league: "Bundesliga", folder: "RBLeipzig", color: "#ffffff", brand: "Puma" },
    { id: "porto-2026-home", name: "Porto 26/27 Local", team: "Porto", country: "Portugal", league: "Primeira Liga", folder: "Porto", color: "#2563eb", brand: "New Balance" },
    { id: "inter-miami-2026-home", name: "Inter Miami 26/27 Local", team: "Inter Miami", country: "Estados Unidos", league: "MLS", folder: "InterMiami", color: "#f472b6", brand: "Adidas" },
    { id: "lafc-2026-home", name: "Los Ángeles 26/27 Local", team: "Los Ángeles", country: "Estados Unidos", league: "MLS", folder: "LosAngeles", color: "#000000", brand: "Adidas" },
    { id: "alnassr-2026-home", name: "Al Nassr 26/27 Local", team: "Al Nassr", country: "Arabia Saudita", league: "Saudi Pro League", folder: "AlNassr", color: "#eab308", brand: "Nike" }
];

const newJerseysStr = teams.map(t => `  {
    id: "${t.id}",
    name: "${t.name}",
    team: "${t.team}",
    country: "${t.country}",
    league: "${t.league}",
    season: "2026-27",
    era: "2020s",
    type: "Local",
    brand: "${t.brand}",
    customizable: true,
    images: {
      front: "/images/${t.folder}/${t.folder.toLowerCase()}_jersey_frontal.jpg",
      back: "/images/${t.folder}/${t.folder.toLowerCase()}_jersey_dorsal.jpg",
      detail: "/images/${t.folder}/${t.folder.toLowerCase()}_jersey_detalle.jpg"
    },
    accentColor: "${t.color}",
    tags: ["26/27", "Local", "${t.league}"],
    featured: false,
    specs: {
      fabricTech: "Estándar",
      version: "Versión Fan",
      patches: [],
      collar: "Cuello redondo",
      fit: "Corte Regular"
    },
    story: "Jersey local de ${t.team} para la temporada 2026/2027.",
    inventory: []
  }`).join(',\n');

// 1. Create folders
const publicImagesDir = path.join(__dirname, 'public', 'images');
teams.forEach(t => {
    const folderPath = path.join(publicImagesDir, t.folder);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created folder: ${folderPath}`);
    }
});

// 2. Update jerseys.js
const jerseysFilePath = path.join(__dirname, 'src', 'data', 'jerseys.js');
let content = fs.readFileSync(jerseysFilePath, 'utf8');

// Insert new jerseys before the closing bracket of JERSEYS_DATA
const insertIndex = content.lastIndexOf('];');
if (insertIndex !== -1) {
    content = content.slice(0, insertIndex) + ',\n' + newJerseysStr + '\n' + content.slice(insertIndex);
}

// Add missing flags
content = content.replace('"Internacional": "🌍",', '"Internacional": "🌍",\n    "Estados Unidos": "🇺🇸",\n    "Arabia Saudita": "🇸🇦",');

fs.writeFileSync(jerseysFilePath, content, 'utf8');
console.log('Updated jerseys.js');
