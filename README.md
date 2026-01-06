# Blorktools

Monorepo for Blorkfield npm packages.

## Packages

| Package | Description | npm |
|---------|-------------|-----|
| [@blorkfield/blorkpack](./packages/blorkpack) | Asset management utilities for 3D scenes | `npm i @blorkfield/blorkpack` |
| [@blorkfield/blorkvisor](./packages/blorkvisor) | Dashboard for managing and launching Blork projects | `npm i @blorkfield/blorkvisor` |
| [@blorkfield/asset-debugger](./packages/asset_debugger) | 3D asset debugging and visualization tool | `npx @blorkfield/asset-debugger` |

## Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Conventional Commits

This repo uses [Conventional Commits](https://www.conventionalcommits.org/) for versioning.

### Commit Types

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat:` | New feature | Minor (0.1.0 → 0.2.0) |
| `fix:` | Bug fix | Patch (0.1.0 → 0.1.1) |
| `feat!:` or `BREAKING CHANGE:` | Breaking change | Major (0.1.0 → 1.0.0) |
| `chore:` | Maintenance tasks | No bump |
| `refactor:` | Code refactoring | No bump |
| `docs:` | Documentation | No bump |
| `style:` | Formatting, no code change | No bump |
| `test:` | Adding tests | No bump |
| `perf:` | Performance improvements | No bump |
| `ci:` | CI/CD changes | No bump |
| `build:` | Build system changes | No bump |

### Examples

```bash
git commit -m "feat: add new physics module"
git commit -m "fix: resolve memory leak in asset loader"
git commit -m "feat!: change API signature for spawn method"
git commit -m "chore: update dependencies"
```

## Publishing to npm

### 1. Version Packages

Run Lerna to analyze commits and bump versions:

```bash
pnpm version-packages
```

This will:
- Analyze commits since last release
- Determine version bumps based on conventional commits
- Update package.json versions
- Create a commit with message `chore(release): publish`

### 2. Push to Trigger Publish

```bash
git push
```

The GitHub Action `publish.yml` triggers when it sees `chore(release): publish` in the commit message and publishes all changed packages to npm.

### Required Secrets

- `NPM_TOKEN` - npm authentication token for publishing

## Publishing Docker Image (asset-debugger)

The asset-debugger Docker image is published to GitHub Container Registry.

### Trigger via Tag

```bash
git tag asset-debugger@0.1.0
git push origin asset-debugger@0.1.0
```

### Trigger Manually

Use the "Run workflow" button in GitHub Actions for `docker-publish.yml`.

### Image Location

```
ghcr.io/blorkfield/asset-debugger:latest
ghcr.io/blorkfield/asset-debugger:0.1.0
```

### Run the Container

```bash
docker run -p 3001:3001 ghcr.io/blorkfield/asset-debugger
```

## Development

```bash
# Run a specific package in dev mode
pnpm --filter @blorkfield/blorkpack dev
pnpm --filter @blorkfield/asset-debugger dev

# Build a specific package
pnpm --filter @blorkfield/blorkpack build

# Clean all packages
pnpm clean
```

## License

Copyright (C) 2024 Blorkfield LLC
