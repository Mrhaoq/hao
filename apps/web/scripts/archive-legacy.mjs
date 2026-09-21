import fs from 'node:fs';
import path from 'node:path';

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'legacy') continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

const root = 'D:/works/hao/cursor';
const legacy = path.join(root, 'legacy');
fs.mkdirSync(legacy, { recursive: true });

for (const name of ['index.html', 'personality-test.html', '.nojekyll', 'css', 'js', 'personality', 'valorant-sens']) {
  const from = path.join(root, name);
  if (!fs.existsSync(from)) continue;
  const to = path.join(legacy, name);
  const stat = fs.statSync(from);
  if (stat.isDirectory()) copyDir(from, to);
  else {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
  }
}

fs.writeFileSync(
  path.join(legacy, 'README.md'),
  '# 旧静态站快照\n\n这是 React 改造前的 HTML/JS 站点备份。线上源码以仓库根目录 `apps/web` 为准。\n'
);
console.log('archived to', legacy);
