# ProfProjects_Botmaker

BotMaker projects - TypeScript utilities and compiled scripts for OSRS bot development.

## Project Structure

```
ProfProjects_Botmaker/
├── .gitignore                      # Local ignores (includes SOPS key file)
├── .sops.yaml                      # SOPS encryption rules for sensitive files
├── api_list.txt                    # BotMaker API reference
├── Index-template.ts               # Bot script template
├── imports/                        # Shared utility modules
│   ├── bank-functions.ts           # Banking operations and item management
│   ├── debug-functions.ts          # Debugging and inspection utilities
│   ├── general-function.ts         # Game tick and common operations
│   ├── inventory-functions.ts      # Inventory management and interaction
│   ├── item-ids.ts                 # OSRS item ID constants
│   ├── location-functions.ts       # World point and movement utilities
│   ├── logger.ts                   # Centralized logging utility
│   ├── loot-tables/                # Loot table helpers + organized boss loot
│   │   ├── ammo.ts                 # Ammo tables
│   │   ├── armour-weapons.ts       # Armor + weapon tables
│   │   ├── combat-supplies.ts      # Combat supply tables (food/potions)
│   │   ├── gems.ts                 # Gems table
│   │   ├── general-loot.ts         # General loot tables
│   │   ├── herbs-seeds.ts          # Herbs + seed tables
│   │   ├── loot-index.ts           # Loot index for category usage/calling functions
│   │   ├── loot-priority.ts        # Loot priority override filters
│   │   ├── loot-utils.ts           # Helper functions for using the loot tables
│   │   ├── ores-bars.ts            # Ores + bar tables
│   │   ├── runes.ts                # Runes table
│   │   ├── tertiary.ts             # Tertiary drop table
│   │   └── uniques.ts              # Custom unique table for script-specific drops
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
│   ├── utility-functions.ts        # General helper functions
│   └── images/                     # Script image assets
├── javaSource/                     # Compiled bot scripts (JavaScript output)
│   ├── profChinBurst.js
│   ├── profChins.js
│   ├── profLeviathan.js            # Encrypted with SOPS
│   ├── profSailTrawling.js
│   ├── profTears.js
│   └── test.js
├── profChins/                      # Chinchompa bot script
│   ├── index.ts
│   ├── ui.ts
│   └── util-functions.ts
├── profLeviathan/                  # Leviathan boss bot script (encrypted)
│   ├── index.ts
│   ├── levi-utils.ts
│   └── README.md
├── profSailTrawling/               # Sail trawling bot script
│   └── index.ts
├── profTears/                      # Tears of Guthix bot script
│   ├── index.ts
│   ├── tear-utils.ts
│   └── ui.ts
└── README.md
```

## Description

This directory contains:

- **imports/**: Reusable utility modules for bot development, covering banking, inventory, NPCs, prayers, UI, and more
- **javaSource/**: Pre-compiled JavaScript bot scripts ready for BotMaker use
- **profChins/**: Chinchompa trapping bot implementation
- **profLeviathan/**: Leviathan boss bot implementation (encrypted with SOPS)
- **profSailTrawling/**: Sail trawling bot implementation
- **profTears/**: Tears of Guthix bot implementation
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
