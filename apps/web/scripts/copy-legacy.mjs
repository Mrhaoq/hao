import fs from 'node:fs';
import path from 'node:path';

const src = path.join('D:/works/hao/cursor/personality/js/questions.js');
let s = fs.readFileSync(src, 'utf8');
s =
  '// @ts-nocheck\nimport type { PersonalityTestData } from "./types";\n' +
  s.replace('const PERSONALITY_TEST =', 'export const PERSONALITY_TEST: PersonalityTestData =');

const destDir = path.join('D:/works/hao/apps/web/src/personality/data');
fs.mkdirSync(destDir, { recursive: true });
fs.writeFileSync(path.join(destDir, 'questions.ts'), s);

const vsCssDir = path.join('D:/works/hao/apps/web/src/valorant-sens');
fs.mkdirSync(vsCssDir, { recursive: true });
fs.copyFileSync(
  path.join('D:/works/hao/cursor/valorant-sens/css/valorant-sens.css'),
  path.join(vsCssDir, 'styles.css')
);

console.log('copied questions.ts bytes', s.length);
