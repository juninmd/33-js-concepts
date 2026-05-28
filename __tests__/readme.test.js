const fs = require('fs');
const path = require('path');

describe('README Validation', () => {
  let readmeContent;

  beforeAll(() => {
    readmeContent = fs.readFileSync(
      path.join(__dirname, '..', 'README.md'),
      'utf8'
    );
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
    const sectionMatches = readmeContent.match(/^## \d+\./gm);
    expect(sectionMatches).toBeTruthy();
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
  test('package.json exists', () => {
    const packagePath = path.join(__dirname, '..', 'package.json');
    expect(fs.existsSync(packagePath)).toBe(true);
  });

  test('package.json has valid JSON', () => {
    const packagePath = path.join(__dirname, '..', 'package.json');
    const content = fs.readFileSync(packagePath, 'utf8');
    expect(() => JSON.parse(content)).not.toThrow();
  });

  test('LICENSE file exists', () => {
    const licensePath = path.join(__dirname, '..', 'LICENSE');
    expect(fs.existsSync(licensePath)).toBe(true);
  });

  test('.gitignore exists', () => {
    const gitignorePath = path.join(__dirname, '..', '.gitignore');
    expect(fs.existsSync(gitignorePath)).toBe(true);
  });

  test('index.js exists', () => {
    const indexPath = path.join(__dirname, '..', 'index.js');
    expect(fs.existsSync(indexPath)).toBe(true);
  });
});

describe('Package.json Validation', () => {
  let packageJson;

  beforeAll(() => {
    const packagePath = path.join(__dirname, '..', 'package.json');
    packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
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
