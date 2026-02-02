#!/bin/bash
# Build server TypeScript to JavaScript
npx esbuild server/index.ts --bundle --platform=node --target=node18 --outfile=dist/index.js --format=esm --external:express --external:resend
