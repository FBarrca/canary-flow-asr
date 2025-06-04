# Canary Flow ASR

Canary Flow ASR is a desktop application that transcribes audio streams using Electron and React. The entire codebase is written in TypeScript.

## Features

- **Automatic Updates** – the app uses `electron-updater` to keep itself current.
- **Fluent UI Components** – the renderer window is built with Microsoft Fluent UI.
- **Overlay & Main Windows** – separate windows provide controls and status information.

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

## Project Structure

Source code is organized under `src` into `main`, `preload`, and `renderer` directories. Tests live alongside the source files and run with [Vitest](https://vitest.dev).

## Codex Integration

Guidelines for working with this repository using the OpenAI Codex agent are available in [AGENTS.md](./AGENTS.md).

## Contributing

Pull requests are welcome. Please ensure formatting, linting and tests pass before submitting your changes.