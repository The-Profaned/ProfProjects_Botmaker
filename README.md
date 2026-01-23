# ProfProjects_Botmaker

Botmaker projects - TypeScript + JavaScript codes

## Project Structure

This repository contains the source code and utilities for creating OSRS BotMaker bot projects using TypeScript.

### Directory Structure

```
ProfProjects_Botmaker/
├── .vscode/
│   └── settings.json              # VS Code workspace settings (files.exclude config)
├── imports/                       # Shared utilities and functions
│   ├── bank_functions.ts          # Bank interaction utilities
│   ├── debug_functions.ts         # Debugging utilities
│   ├── general_function.ts        # General utility functions
│   ├── item_ids.ts                # Item identifier constants
│   ├── location_functions.ts      # Location-based operations
│   ├── logger.ts                  # Logging utility
│   ├── npc_functions.ts           # NPC interaction functions
│   ├── npc_Ids.ts                 # NPC identifier constants
│   ├── object_ids.ts              # Object identifier constants
│   ├── player_functions.ts        # Player-related functions
│   ├── tile_functions.ts          # Tile and TileObject functions
│   ├── timeout_manager.ts         # Timeout/delay management
│   ├── types.ts                   # Type definitions (State, etc.)
│   ├── ui_functions.ts            # UI interaction functions
│   ├── utility_functions.ts       # Helper utilities
│   └── placeholder*.ts            # Placeholder files for future features
├── js_sources/                    # Compiled JavaScript output
├── profChins/                     # ProfChins bot module
│   └── index.ts                   # ProfChins entry point
├── types/                         # Global type declarations
│   └── global.d.ts                # Reference to @deafwave/osrs-botmaker-types
├── node_modules/                  # NPM dependencies (hidden in workspace)
├── osrs-botmaker-typescript/      # Cloned example repo (hidden in workspace)
├── temp_osrs_botmaker_repo/       # Temporary clone folder (hidden in workspace)
├── .gitattributes                 # Git attributes configuration
├── .gitignore                     # Git ignore rules
├── Index-template.ts              # Template for creating bot entry points
├── package.json                   # NPM package configuration
├── pnpm-lock.yaml                 # PNPM lock file
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
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
