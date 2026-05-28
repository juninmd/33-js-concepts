import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('Link Validation', () => {
  let readmeContent: string;
  const urlRegex = /https?:\/\/[^\s<>)\]"]+/g;

  beforeAll(() => {
    readmeContent = readFileSync(join(__dirname, '..', 'README.md'), 'utf8');
  });

  test('all URLs are properly formatted', () => {
    const urls = readmeContent.match(urlRegex) || [];
    urls.forEach((url) => {
      expect(url).toMatch(/^https?:\/\/.+/);
      expect(url).not.toContain(' ');
      expect(url).not.toContain('<<');
    });
  });

  test('no broken markdown links', () => {
    const markdownLinkRegex = /\[([^\]]*)\]\(([^)]*)\)/g;
    let match: RegExpExecArray | null;
    while ((match = markdownLinkRegex.exec(readmeContent)) !== null) {
      const [, linkText, linkUrl] = match;
      expect(linkText).toBeTruthy();
      expect(linkUrl).toBeTruthy();
    }
  });

  test('YouTube links have valid format', () => {
    const youtubeRegex = /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/g;
    const youtubeLinks = readmeContent.match(youtubeRegex) || [];
    youtubeLinks.forEach((link) => {
      expect(link).toMatch(/youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/);
    });
  });

  test('Medium links have valid format', () => {
    const mediumRegex = /https?:\/\/medium\.com\/[^\s<>)\]"]+/g;
    const mediumLinks = readmeContent.match(mediumRegex) || [];
    mediumLinks.forEach((link) => {
      expect(link).toMatch(/medium\.com\//);
    });
  });

  test('GitHub links have valid format', () => {
    const githubRegex = /https?:\/\/github\.com\/[^\s<>)\]"]+/g;
    const githubLinks = readmeContent.match(githubRegex) || [];
    githubLinks.forEach((link) => {
      expect(link).toMatch(/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/);
    });
  });
});
