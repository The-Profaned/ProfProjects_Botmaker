# ProfProjects_Botmaker

BotMaker projects - TypeScript utilities and compiled scripts for OSRS bot development.

## Project Structure

```
ProfProjects_Botmaker/
├── .gitignore                      # Local ignores (includes SOPS key file + profLeviathan)
├── .sops.yaml                      # SOPS encryption rules for sensitive files
├── api_list.txt                    # BotMaker API reference
├── Index-template.ts               # Bot script template
├── imports/                        # Shared utility modules
│   ├── attack-timers.ts            # Attack timing and cycle tracking
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
│   ├── sailing-functions.ts        # Sailing operations
│   ├── sharefile.txt               # Shared file utilities
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
│   ├── profGlassBlowing.js
│   ├── profMiner.js
│   ├── profSailTrawling.js
│   ├── profTears.js
│   └── profWoodcutting.js
├── profChinBurst/                  # Chinchompa burst bot script
│   ├── chinburst-functions.ts
│   ├── index.ts
│   └── ui.ts
├── profChins/                      # Chinchompa trapping bot script
│   ├── index.ts
│   ├── ui.ts
│   ├── util-functions.ts
│   └── State Manager/
│       ├── script-state.ts
│       └── state-manager.ts
├── profGlassBlowing/               # Glassblowing bot script
│   ├── index.ts
│   ├── ui.ts
│   ├── README.md
│   └── State Manager/
│       ├── constants.ts
│       ├── glass-utils.ts
│       ├── logging.ts
│       ├── script-state.ts
│       ├── seaweed-spore-utils.ts
│       ├── state-manager.ts
│       └── State/
│           ├── banking.ts
│           ├── glassblowing.ts
│           ├── looting-seaweed-spore.ts
│           ├── return-to-bank.ts
│           ├── spores-only.ts
│           └── travel-to-rowboat.ts
├── profMiner/                      # Mining bot script
│   ├── index.ts
│   ├── ui.ts
│   ├── README.md
│   └── State Manager/
│       ├── constants.ts
│       ├── logging.ts
│       ├── mining-utils.ts
│       ├── script-state.ts
│       ├── state-manager.ts
│       └── State/
│           ├── depositing-items.ts
│           ├── mining.ts
│           ├── opening-deposit-box.ts
│           └── travel-to-rock.ts
├── profSailTrawling/               # Sail trawling bot script
│   ├── index.ts
│   └── State Manager/
│       ├── state-manager.ts
│       └── State/
│           ├── banking.ts
│           ├── boat.ts
│           ├── fishing.ts
│           ├── movement.ts
│           ├── Banking/
│           ├── Boat/
│           ├── Fishing/
│           └── Movement/
├── profTears/                      # Tears of Guthix bot script
│   ├── index.ts
│   ├── tear-utils.ts
│   ├── ui.ts
│   ├── readme.md
│   └── State Manager/
│       ├── constants.ts
│       ├── script-state.ts
│       ├── script-utils.ts
│       ├── state-manager.ts
│       └── State/
│           ├── click-blue-tears.ts
│           ├── navigate-to-cave.ts
│           ├── navigate-to-juna.ts
│           ├── start-state.ts
│           ├── talk-to-juna.ts
│           └── walk-in-cave.ts
├── profWoodcutting/                # Woodcutting bot script
│   ├── index.ts
│   ├── ui.ts
│   ├── README.md
│   └── State Manager/
│       ├── constants.ts
│       ├── logging.ts
│       ├── script-state.ts
│       ├── special-attack.ts
│       ├── state-manager.ts
│       └── State/
│           ├── closing-bank.ts
│           ├── depositing-items.ts
│           ├── moving-to-bank.ts
│           ├── opening-bank.ts
│           ├── traveling.ts
│           └── woodcutting.ts
└── README.md
```

## Description

This directory contains:

- **imports/**: Reusable utility modules for bot development, covering banking, inventory, NPCs, prayers, UI, and more
- **javaSource/**: Pre-compiled JavaScript bot scripts ready for BotMaker use
- **profChinBurst/**: Chinchompa burst bot implementation
- **profChins/**: Chinchompa trapping bot implementation
- **profGlassBlowing/**: Glassblowing and seaweed spore collection bot implementation (State Manager architecture)
- **profMiner/**: Mining bot implementation (State Manager architecture)
- **profSailTrawling/**: Sail trawling bot implementation (State Manager architecture)
- **profTears/**: Tears of Guthix bot implementation (State Manager architecture)
- **profWoodcutting/**: Woodcutting bot implementation (State Manager architecture)
- **.sops/**: Local SOPS key material (ignored by git)
- **.sops.yaml**: Encryption rules for sensitive files
- **decrypt commands.txt**: Local decryption notes for SOPS-managed files
- **Index-template.ts**: Template for creating new bot scripts
- **api_list.txt**: Reference documentation for available BotMaker APIs

## Usage

Use the modules in `imports/` to build bot logic. Most scripts follow a **State Manager architecture** with modular state handlers organized in dedicated folders.

Refer to the individual script READMEs (e.g., `profGlassBlowing/README.md`) for script-specific details.

The compiled scripts in `javaSource/` can be directly imported into BotMaker.

## License

See repository license for details.
