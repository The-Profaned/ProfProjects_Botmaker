# ProfProjects_Botmaker

Botmaker projects - TypeScript + JavaScript codes

## Project Structure

This repository contains the source code and utilities for creating OSRS BotMaker bot projects using TypeScript.

### Directory Structure

```
ProfProjects_Botmaker/
├── .vscode/
│   └── settings.json
├── imports/
│   ├── bank_functions.ts
│   ├── debug_functions.ts
│   ├── general_function.ts
│   ├── item_ids.ts
│   ├── location_functions.ts
│   ├── logger.ts
│   ├── npc_functions.ts
│   ├── npc_Ids.ts
│   ├── object_ids.ts
│   ├── player_functions.ts
│   ├── projectile_functions.ts        
│   ├── tile_functions.ts
│   ├── timeout_manager.ts
│   ├── types.ts
│   ├── ui_functions.ts
│   ├── utility_functions.ts
│   └── placeholder*.ts
├── js_sources/
├── profChins/
│   └── index.ts
├── types/
│   └── global.d.ts
├── node_modules/                      # hidden
├── osrs-botmaker-typescript/          # hidden
├── temp_osrs_botmaker_repo/           # hidden
├── .gitattributes
├── .gitignore
├── Index-template.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

### Hidden Folders (in .gitignore & VS Code)

The following folders are excluded from git tracking and hidden in the VS Code explorer:
- `node_modules/` - NPM dependencies
- `osrs-botmaker-typescript/` - Cloned reference repository from GitHub
- `temp_osrs_botmaker_repo/` - Temporary folder from initial repo pull

## Getting Started

This is a TypeScript-based project configured for OSRS BotMaker development.

### Prerequisites

- [pnpm](https://pnpm.io/) package manager
- TypeScript knowledge
- OSRS BotMaker runtime environment

### Setup

Dependencies are already installed. To reinstall or update:

```powershell
pnpm install
```

### Type Checking

Run TypeScript type checking:

```powershell
pnpm run typecheck
```

### Development Workflow

1. Import required modules from the `imports/` directory
2. Use `Index-template.ts` as a reference for creating bot entry points
3. Implement bot logic using the provided utility functions
4. The global `bot`, `client`, `net` APIs are available via `@deafwave/osrs-botmaker-types`

## Modules Overview

### Core Utilities (`imports/`)

- **types.ts**: Core type definitions (`State`, `LocationCoordinates`)
- **general_function.ts**: Game tick handling, failure management, script termination
- **timeout_manager.ts**: Async timeout and delay management system
- **logger.ts**: Centralized logging utility

### Bot Functions

- **player_functions.ts**: Player state and actions
- **npc_functions.ts**: NPC detection, interaction (`npcRendered`, `getFirstNPC`, `getClosestNPC`)
- **tile_functions.ts**: Tile objects and interactions
- **location_functions.ts**: World point conversion, walking, distance calculations
- **bank_functions.ts**: Banking operations
- **ui_functions.ts**: UI creation and management

### Constants

- **item_ids.ts**: OSRS item IDs
- **npc_Ids.ts**: OSRS NPC IDs
- **object_ids.ts**: OSRS object IDs

### Development Tools

- **debug_functions.ts**: State debugging and inspection
- **utility_functions.ts**: General helper functions

## TypeScript Configuration

The project uses:
- **Target**: ES2020
- **Module**: ESNext with Bundler resolution
- **Types**: `@deafwave/osrs-botmaker-types` for global bot API
- **Strict mode**: Disabled for flexibility

## Development

This repo was only made possible by @starkwolfx's amazing dedication at the start of working with botmaker and creating such an amazing git template that he allowed me to use. Without this the new setup wouldnt have been possible (atleast for months)

This project uses TypeScript for type safety and better IntelliSense in VS Code.

## License

See repository license for details.
