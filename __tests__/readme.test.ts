import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

describe('README Validation', () => {
  let readmeContent: string;

  beforeAll(() => {
    readmeContent = readFileSync(join(__dirname, '..', 'README.md'), 'utf8');
  });

  test('README exists and is not empty', () => {
    expect(readmeContent).toBeTruthy();
    expect(readmeContent.length).toBeGreaterThan(0);
  });

  test('README has title', () => {
    expect(readmeContent).toMatch(/<h1[^>]*>/);
  });

  test('README has table of contents', () => {
    expect(readmeContent).toContain('Tabela de conteúdos');
  });

  test('README has at least 10 concept sections', () => {
    const sectionMatches = readmeContent.match(/^## \\d+\\./gm) || [];
    expect(sectionMatches.length).toBeGreaterThanOrEqual(10);
  });

  test('README has license badge', () => {
    expect(readmeContent).toContain('MIT');
  });

  test('README has contribution guidelines', () => {
    expect(readmeContent).toContain('PRs');
  });
});

describe('Project Structure', () => {
  const projectRoot = join(__dirname, '..');

  test('package.json exists', () => {
    const packagePath = join(projectRoot, 'package.json');
    expect(existsSync(packagePath)).toBe(true);
  });

  test('package.json has valid JSON', () => {
    const packagePath = join(projectRoot, 'package.json');
    const content = readFileSync(packagePath, 'utf8');
    expect(() => JSON.parse(content)).not.toThrow();
  });

  test('LICENSE file exists', () => {
    const licensePath = join(projectRoot, 'LICENSE');
    expect(existsSync(licensePath)).toBe(true);
  });

  test('.gitignore exists', () => {
    const gitignorePath = join(projectRoot, '.gitignore');
    expect(existsSync(gitignorePath)).toBe(true);
  });

  test('index.ts exists', () => {
    const indexPath = join(projectRoot, 'index.ts');
    expect(existsSync(indexPath)).toBe(true);
  });
});

describe('Package.json Validation', () => {
  let packageJson: {
    name: string;
    version: string;
    description: string;
    license: string;
    scripts: Record<string, string>;
  };

  beforeAll(() => {
    const packagePath = join(__dirname, '..', 'package.json');
    packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
  });

  test('has required fields', () => {
    expect(packageJson.name).toBeDefined();
    expect(packageJson.version).toBeDefined();
    expect(packageJson.description).toBeDefined();
    expect(packageJson.license).toBeDefined();
  });

  test('has correct name', () => {
    expect(packageJson.name).toBe('33-js-concepts');
  });

  test('has MIT license', () => {
    expect(packageJson.license).toBe('MIT');
  });

  test('has test script', () => {
    expect(packageJson.scripts).toBeDefined();
    expect(packageJson.scripts.test).toBeDefined();
  });

  test('has lint script', () => {
    expect(packageJson.scripts).toBeDefined();
    expect(packageJson.scripts.lint).toBeDefined();
  });
});
