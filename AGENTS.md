# AGENT INSTRUCTIONS

This repository contains an Electron application built with React and TypeScript.

## Project Overview
- Source code lives under `src` with separate directories for `main`, `preload` and `renderer` processes.
- Unit tests are written with [Vitest](https://vitest.dev).
- Formatting is handled by Prettier using the rules defined in `.prettierrc`; linting is managed by ESLint.

## Working with Codex
When making changes with the OpenAI Codex agent:
1. Install dependencies with `npm install` if you haven't already.
2. Format code with `npm run format`.
3. Lint the project with `npm run lint`.
4. Run unit tests using `npm test`.

All code in this project is TypeScript. Please keep styles consistent with Prettier and ensure the linter and tests pass before committing.