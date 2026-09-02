const fs = require('fs');
const path = require('path');

const jerseysFilePath = path.join(__dirname, 'src', 'data', 'jerseys.js');
let content = fs.readFileSync(jerseysFilePath, 'utf8');

// The new jerseys start at line 255 (after BRANDS_LIST).
// Let's extract them.
const startMarker = ',\n  {\n    id: "monterrey-2026-home"';
const startIndex = content.indexOf(startMarker);

if (startIndex !== -1) {
  const newJerseysStr = content.slice(startIndex);
  // Remove them from the end
  content = content.slice(0, startIndex) + '\n];';
  
  // Find the end of JERSEYS_DATA
  // JERSEYS_DATA ends before:
  // const leagueCountryMap
  const jerseysDataEndMarker = '  }\n];\n\nconst leagueCountryMap';
  const jerseysDataEndIndex = content.indexOf(jerseysDataEndMarker);
  
  if (jerseysDataEndIndex !== -1) {
    content = content.slice(0, jerseysDataEndIndex + 3) + newJerseysStr.replace('];', '') + '\n];\n\nconst leagueCountryMap' + content.slice(jerseysDataEndIndex + 6);
    fs.writeFileSync(jerseysFilePath, content, 'utf8');
    console.log('Fixed jerseys.js');
  } else {
    console.log('Could not find JERSEYS_DATA end marker');
  }
} else {
  console.log('Could not find start marker');
}
