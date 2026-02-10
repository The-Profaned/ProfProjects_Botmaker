# ProfProjects_Botmaker

BotMaker projects - TypeScript utilities and compiled scripts for OSRS bot development.

## Project Structure

```
ProfProjects_Botmaker/
├── .gitignore                      # Local ignores (includes SOPS key file)
├── .sops/                          # Local SOPS key material (not committed)
├── .sops.yaml                      # SOPS encryption rules for sensitive files
├── imports/                        # Shared utility modules
│   ├── bank-functions.ts           # Banking operations and item management
│   ├── debug-functions.ts          # Debugging and inspection utilities
│   ├── general-function.ts         # Game tick and common operations
│   ├── inventory-functions.ts      # Inventory management and interaction
│   ├── item-ids.ts                 # OSRS item ID constants
│   ├── location-functions.ts       # World point and movement utilities
│   ├── logger.ts                   # Centralized logging utility
│   ├── loot-tables/                # Loot table helpers + organized boss loot
|       ├── ammo.ts                 # ammot tables
|       ├── armour-weapons.ts       # armor + weapon tables
|       ├── combat-supplies.ts      # combat supply tables (food/potions)
|       ├── gems.ts                 # gems table
|       ├── general-loot.ts         # general loot tables
|       ├── herbs-seeds.ts          # herbs + seed tables
|       ├── loot-index.ts           # loot index for catagory usage/calling functions
|       ├── loot-priority.ts        # loot priority override filters
|       ├── loot-utils.ts           # all helper functions for using the loot tables
|       ├── ores-bars.ts            # ores + bar tables
|       ├── runes.ts                # runes table
|       ├── tertiary.ts             # tertiary drop table
|       ├── uniques.ts              # custom unique table to be built for script specific drops
│   ├── npc-functions.ts            # NPC detection and interaction
│   ├── npc-ids.ts                  # OSRS NPC IDs and animation mappings
│   ├── object-ids.ts               # OSRS object ID constants
│   ├── player-functions.ts         # Player state and prayer utilities
│   ├── prayer-functions.ts         # Prayer management
│   ├── projectile-functions.ts     # Projectile tracking
│   ├── sharefile.ts                # Shared file utilities
│   ├── tile-functions.ts           # Tile and object interaction
│   ├── tile-sets.ts                # Tile set definitions
│   ├── timeout-manager.ts          # Async timeout management
│   ├── types.ts                    # Core type definitions
│   ├── ui-functions.ts             # UI utilities
│   └── utility-functions.ts        # General helper functions
├── javaSource/                     # Compiled bot scripts (JavaScript output)
│   ├── AutoTears.js                # WIP - not restructured, does not work
│   ├── example-state-progression.js
│   ├── example-ui-components.js
│   ├── profChins.js
│   └── profLeviathan.js            # Encrypted with SOPS
├── profChins/                      # Chinchompa bot script
│   ├── index.ts
│   ├── ui.ts
│   ├── util-functions.ts
│   └── README.md
├── profLeviathan/                  # Leviathan boss bot script (encrypted)
│   ├── index.ts
│   └── README.md
├── api_list.txt                    # BotMaker API reference
├── decrypt commands.txt            # Local SOPS decryption notes
├── Index-template.ts               # Bot script template
└── README.md
```

## Description

This directory contains:

- **imports/**: Reusable utility modules for bot development, covering banking, inventory, NPCs, prayers, UI, and more
- **javaSource/**: Pre-compiled JavaScript bot scripts ready for BotMaker use
- **profChins/**: Chinchompa trapping bot implementation
- **profLeviathan/**: Leviathan boss bot implementation (encrypted with SOPS)
- **.sops/**: Local SOPS key material (ignored by git)
- **.sops.yaml**: Encryption rules for sensitive files
- **decrypt commands.txt**: Local decryption notes for SOPS-managed files
- **Index-template.ts**: Template for creating new bot scripts
- **api_list.txt**: Reference documentation for available BotMaker APIs

## Usage

Use the modules in `imports/` to build bot logic. Refer to the individual script READMEs (e.g., `profChins/README.md`) for script-specific details.

The compiled scripts in `javaSource/` can be directly imported into BotMaker.

## License

See repository license for details.
