#!/usr/bin/env node

/**
 * Validation CSS - Vérifie l'équilibre des accolades
 * Utilisation: node scripts/check-css.js
 */

const fs = require('fs');
const path = require('path');

const cssFiles = [
    'css/style.css',
    'css/animations.css'
];

let hasErrors = false;

console.log('🔍 Validation CSS - Vérification des accolades\n');

for (const file of cssFiles) {
    const filePath = path.join(__dirname, '..', file);
    
    if (!fs.existsSync(filePath)) {
        console.error(`❌ ${file}: fichier introuvable`);
        hasErrors = true;
        continue;
    }
    
    const css = fs.readFileSync(filePath, 'utf8');
    let count = 0;
    let line = 1;
    let charInLine = 0;
    
    for (const char of css) {
        if (char === '{') count++;
        if (char === '}') count--;
        
        if (count < 0) {
            console.error(`❌ ${file}: accolade fermante de trop à la ligne ${line}`);
            hasErrors = true;
        }
        
        charInLine++;
        if (char === '\n') {
            line++;
            charInLine = 0;
        }
    }
    
    if (count !== 0) {
        console.error(`❌ ${file}: déséquilibre des accolades (${count > 0 ? 'ouvertes' : 'fermées'} restantes)`);
        hasErrors = true;
    } else {
        console.log(`✅ ${file}: équilibre des accolades OK`);
    }
}

console.log();

if (hasErrors) {
    console.error('❌ Validation CSS échouée - Corrigez les erreurs avant de commiter');
    process.exit(1);
} else {
    console.log('✅ Validation CSS réussie');
    process.exit(0);
}
