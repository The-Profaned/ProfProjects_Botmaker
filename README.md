# ProfProjects_Botmaker

BotMaker projects - TypeScript utilities and compiled scripts for OSRS bot development.

## Project Structure

```
ProfProjects_Botmaker/
├── .gitignore                      # Local ignores (includes SOPS key file)
├── .sops.yaml                      # SOPS encryption rules for sensitive files
├── imports/                        # Shared utility modules
│   ├── bank-functions.ts           # Banking operations and item management
│   ├── debug-functions.ts          # Debugging and inspection utilities
│   ├── general-function.ts         # Game tick and common operations
│   ├── inventory-functions.ts      # Inventory management and interaction
│   ├── item-ids.ts                 # OSRS item ID constants
│   ├── location-functions.ts       # World point and movement utilities
│   ├── logger.ts                   # Centralized logging utility
│   ├── npc-functions.ts            # NPC detection and interaction
│   ├── npc-ids.ts                  # OSRS NPC IDs and animation mappings
│   ├── object-ids.ts               # OSRS object ID constants
│   ├── player-functions.ts         # Player state and prayer utilities
│   ├── prayer-functions.ts         # Prayer management
│   ├── projectile-functions.ts     # Projectile tracking
│   ├── tile-functions.ts           # Tile and object interaction
│   ├── tile-sets.ts                # Tile set definitions
│   ├── timeout-manager.ts          # Async timeout management
│   ├── types.ts                    # Core type definitions
│   ├── ui-functions.ts             # UI utilities
│   └── utility-functions.ts        # General helper functions
├── javaSource/                     # Compiled bot scripts (JavaScript output)
│   ├── AutoTears.js                # WIP - not restructured, dosnt work
│   ├── example-state-progression.js
│   ├── example-ui-components.js
│   ├── profChins.js
│   └── profLeviathan.js             # Encrypted with SOPS
├── profChins/                      # Chinchompa bot script
│   ├── index.ts
│   ├── ui.ts
│   ├── util-functions.ts
│   └── README.md
├── profLeviathan/                   # Leviathan boss bot script (encrypted)
│   ├── index.ts
│   └── README.md
├── api_list.txt                    # BotMaker API reference
├── Index-template.ts               # Bot script template
└── README.md
```

## Description

This directory contains:

- **imports/**: Reusable utility modules for bot development, covering banking, inventory, NPCs, prayers, UI, and more
- **javaSource/**: Pre-compiled JavaScript bot scripts ready for BotMaker use
- **profChins/**: Chinchompa trapping bot implementation
- **profLeviathan/**: Leviathan boss bot implementation (encrypted with SOPS)
- **.sops.yaml**: Encryption rules for sensitive files
- **Index-template.ts**: Template for creating new bot scripts
- **api_list.txt**: Reference documentation for available BotMaker APIs

## Usage

Use the modules in `imports/` to build bot logic. Refer to the individual script READMEs (e.g., `profChins/README.md`) for script-specific details.

The compiled scripts in `javaSource/` can be directly imported into BotMaker.

## License

See repository license for details.
