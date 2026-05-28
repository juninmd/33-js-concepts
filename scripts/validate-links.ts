import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const README_PATH = join(__dirname, '..', 'README.md');
const URL_REGEX = /https?:\/\/[^\s<>)\]"]+/g;

function extractLinks(filePath: string): string[] {
  const content = readFileSync(filePath, 'utf8');
  const urls = content.match(URL_REGEX) || [];
  return [...new Set(urls)];
}

function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function validateLinks(): void {
  const links = extractLinks(README_PATH);
  const invalidLinks: string[] = [];

  console.log(`Found ${links.length} unique links in README.md\n`);

  for (const link of links) {
    if (!validateUrl(link)) {
      invalidLinks.push(link);
      console.log(`INVALID: ${link}`);
    }
  }

  if (invalidLinks.length > 0) {
    console.log(`\n${invalidLinks.length} invalid links found`);
    process.exit(1);
  } else {
    console.log('All links are valid!');
    process.exit(0);
  }
}

validateLinks();
