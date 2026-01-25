# ProfProjects_Botmaker

Botmaker projects - TypeScript + JavaScript codes

## Project Structure

This repository contains the source code and utilities for creating OSRS BotMaker bot projects using TypeScript.

### Directory Structure


```
ProfProjects_Botmaker/
├── .vscode/                        
├── imports/                        # Core bot utility and logic modules
│   ├── bank_functions.ts           # Banking operations and item management
│   ├── debug_functions.ts          # State debugging and inspection tools
│   ├── general_function.ts         # Game tick handling, failure management, script termination
│   ├── inventory_functions.ts      # Inventory management and item interaction
│   ├── item_ids.ts                 # OSRS item ID constants
│   ├── location_functions.ts       # World point conversion, walking, distance calculations
│   ├── logger.ts                   # Centralized logging utility
│   ├── npc_functions.ts            # NPC detection, interaction, and attack animation tracking
│   ├── npc_Ids.ts                  # OSRS NPC IDs, animation mappings, and prayer maps
│   ├── object_ids.ts               # OSRS object ID constants and hazards
│   ├── player_functions.ts         # Player state, dialogue checks, and prayer management
│   ├── prayer_functions.ts         # Prayer activation and management utilities
│   ├── projectile_functions.ts     # Projectile tracking and prayer activation
│   ├── tile_functions.ts           # Tile objects and interactions
│   ├── tile_sets.ts                # Tile set definitions and helpers
│   ├── timeout_manager.ts          # Async timeout and delay management system
│   ├── types.ts                    # Core type definitions (State, LocationCoordinates)
│   ├── ui_functions.ts             # UI creation and management
│   └── utility_functions.ts        # General helper functions
├── Index-template.ts           # Example bot entry point template
├── profChins/
│   └── index.ts                # Chinchompa bot script entry
├── profLeviathan/
│   └── index.ts                # Leviathan bot script entry
├── .gitattributes
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

### Hidden Folders & Files (in .gitignore & VS Code)

The following are excluded from git tracking and hidden in the VS Code explorer:
- `node_modules/` - NPM dependencies
- `osrs-botmaker-typescript/` - Cloned reference repository from GitHub
- `temp_osrs_botmaker_repo/` - Temporary folder from initial repo pull
- `package.json` - NPM package configuration
- `pnpm-lock.yaml` - PNPM dependency lock file
- `tsconfig.json` - TypeScript compiler configuration

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

- **player_functions.ts**: Player state, dialogue checks, and automated prayer switching
- **npc_functions.ts**: NPC detection, interaction, and attack animation tracking for preemptive prayers
- **projectile_functions.ts**: Projectile tracking and distance-based prayer activation
- **prayer_functions.ts**: Prayer activation, deactivation, and state management
- **tile_functions.ts**: Tile objects and interactions
- **location_functions.ts**: World point conversion, walking, distance calculations
- **bank_functions.ts**: Banking operations and item management
- **ui_functions.ts**: UI creation and management

### Constants

- **item_ids.ts**: OSRS item IDs
- **npc_Ids.ts**: OSRS NPC IDs, animation-to-prayer mappings, projectile-to-prayer mappings
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
