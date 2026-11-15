import fs from 'node:fs';
import path from 'node:path';

const inputFile = '/opt/data/workspace/zernio-rea/docs/llms-full.txt';
const outputDir = '/opt/data/workspace/zernio-rea/zernio-app/src/data/docs';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const content = fs.readFileSync(inputFile, 'utf-8');

// Pages are delimited by '---\n\n#' or similar. Let's look for '# ' at the start of a line.
// The file starts with '# Zernio API Documentation'.
const pages = content.split(/\n---\n\n(?=# )/g);

const docs = [];

pages.forEach((pageContent, index) => {
  const lines = pageContent.trim().split('\n');
  const title = lines[0].replace(/^# /, '');
  
  // Create a slug from the title for now
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const doc = {
    slug,
    title,
    content: pageContent.trim()
  };
  
  docs.push(doc);
  fs.writeFileSync(path.join(outputDir, `${slug}.json`), JSON.stringify(doc, null, 2));
});

fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify(docs.map(d => ({ slug: d.slug, title: d.title })), null, 2));

console.log(`Processed ${docs.length} pages.`);
