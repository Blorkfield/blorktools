FROM node:22-alpine
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@9.15.1 --activate

# Copy workspace config files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copy asset_debugger package.json
COPY packages/asset_debugger/package.json ./packages/asset_debugger/

# Install dependencies
RUN pnpm install --frozen-lockfile --ignore-scripts --filter @blorkfield/asset-debugger

# Copy asset_debugger source
COPY packages/asset_debugger/ ./packages/asset_debugger/

WORKDIR /app/packages/asset_debugger

EXPOSE 3001

CMD ["node", "bin/cli.js", "--host", "0.0.0.0", "--no-open"]
