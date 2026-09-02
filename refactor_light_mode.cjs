const fs = require('fs');
const path = require('path');

const replacements = [
    { regex: /(?<!dark:)\bbg-slate-950\b/g, replacement: 'bg-white dark:bg-slate-950' },
    { regex: /(?<!dark:)\bbg-slate-900\b/g, replacement: 'bg-slate-50 dark:bg-slate-900' },
    { regex: /(?<!dark:)\bbg-slate-800\b/g, replacement: 'bg-slate-100 dark:bg-slate-800' },
    { regex: /(?<!dark:)\bbg-slate-950\/50\b/g, replacement: 'bg-white/50 dark:bg-slate-950/50' },
    { regex: /(?<!dark:)\bbg-slate-900\/80\b/g, replacement: 'bg-slate-50/80 dark:bg-slate-900/80' },
    { regex: /(?<!dark:)\bbg-slate-900\/90\b/g, replacement: 'bg-slate-50/90 dark:bg-slate-900/90' },
    { regex: /(?<!dark:)\bbg-slate-800\/80\b/g, replacement: 'bg-slate-100/80 dark:bg-slate-800/80' },
    { regex: /(?<!dark:)\bbg-slate-800\/60\b/g, replacement: 'bg-slate-100/60 dark:bg-slate-800/60' },
    { regex: /(?<!dark:)\bbg-slate-950\/70\b/g, replacement: 'bg-white/70 dark:bg-slate-950/70' },
    { regex: /(?<!dark:)\btext-white\b/g, replacement: 'text-slate-900 dark:text-white' },
    { regex: /(?<!dark:)\btext-slate-100\b/g, replacement: 'text-slate-800 dark:text-slate-100' },
    { regex: /(?<!dark:)\btext-slate-200\b/g, replacement: 'text-slate-700 dark:text-slate-200' },
    { regex: /(?<!dark:)\btext-slate-300\b/g, replacement: 'text-slate-600 dark:text-slate-300' },
    { regex: /(?<!dark:)\btext-slate-400\b/g, replacement: 'text-slate-500 dark:text-slate-400' },
    { regex: /(?<!dark:)\bborder-slate-800\b/g, replacement: 'border-slate-200 dark:border-slate-800' },
    { regex: /(?<!dark:)\bborder-slate-700\b/g, replacement: 'border-slate-300 dark:border-slate-700' },
    { regex: /(?<!dark:)\bborder-slate-800\/80\b/g, replacement: 'border-slate-200/80 dark:border-slate-800/80' },
    { regex: /(?<!dark:)\bborder-slate-700\/80\b/g, replacement: 'border-slate-300/80 dark:border-slate-700/80' },
    { regex: /(?<!dark:)\bborder-slate-700\/60\b/g, replacement: 'border-slate-300/60 dark:border-slate-700/60' },
    { regex: /(?<!dark:)\bhover:bg-slate-800\b/g, replacement: 'hover:bg-slate-100 dark:hover:bg-slate-800' },
    { regex: /(?<!dark:)\bhover:bg-slate-700\b/g, replacement: 'hover:bg-slate-200 dark:hover:bg-slate-700' },
    { regex: /(?<!dark:)\bhover:text-white\b/g, replacement: 'hover:text-slate-900 dark:hover:text-white' },
    { regex: /(?<!dark:)\bfrom-slate-900\/50\b/g, replacement: 'from-slate-50/50 dark:from-slate-900/50' },
    { regex: /(?<!dark:)\bvia-slate-950\b/g, replacement: 'via-white dark:via-slate-950' },
    { regex: /(?<!dark:)\bto-slate-950\b/g, replacement: 'to-white dark:to-slate-950' }
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    replacements.forEach(({ regex, replacement }) => {
        content = content.replace(regex, replacement);
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            processFile(fullPath);
        }
    }
}

walkDir(path.join(__dirname, 'src', 'components'));
processFile(path.join(__dirname, 'src', 'App.jsx'));
console.log('Refactoring complete.');
