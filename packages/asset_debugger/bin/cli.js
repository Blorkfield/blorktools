#!/usr/bin/env node

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import open from 'open';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name, defaultValue) => {
    const index = args.indexOf(name);
    if (index !== -1 && args[index + 1]) {
        return args[index + 1];
    }
    return defaultValue;
};

const port = parseInt(getArg('--port', getArg('-p', '3001')), 10);
const host = getArg('--host', getArg('-h', 'localhost'));
const noOpen = args.includes('--no-open');

const app = express();

// Serve static files from the package root
app.use(express.static(rootDir));

// SPA fallback - serve index.html only for navigation routes (not static assets)
app.get('*', (req, res) => {
    // If the request has a file extension for a static asset, return 404
    // This prevents serving HTML for missing JS/CSS/etc files which causes MIME type errors
    const staticExtensions = ['.js', '.css', '.json', '.map', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
    const hasStaticExtension = staticExtensions.some(ext => req.path.endsWith(ext));

    if (hasStaticExtension) {
        res.status(404).send('Not found');
        return;
    }

    res.sendFile(join(rootDir, 'index.html'));
});

const server = app.listen(port, host, () => {
    const url = `http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`;
    console.log(`
  Asset Debugger is running!

  Local:   ${url}
  Network: http://${host}:${port}

  Press Ctrl+C to stop
`);

    if (!noOpen && host !== '0.0.0.0') {
        open(url);
    }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down...');
    server.close(() => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0);
    });
});
