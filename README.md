# ProfProjects_Botmaker

Botmaker projects - TypeScript + JavaScript codes

## Project Structure

This repository contains the source code and utilities for creating bot projects.

### Directory Structure

```
ProfProjects_Botmaker/
├── imports/              # Shared utilities and functions
│   ├── types.ts          # Type definitions
│   ├── general-function.ts   # General utility functions
│   ├── item-ids.ts       # Item identifier constants
│   ├── object-ids.ts     # Object identifier constants
│   ├── ui-functions.ts   # UI interaction functions
│   ├── utility-functions.ts  # Helper utilities
│   ├── location-functions.ts # Location-based operations
│   ├── debug-functions.ts    # Debugging utilities
│   └── placeholder*.ts   # Placeholder files for future features
├── js_sources/           # JavaScript source files
├── profChins/            # ProfChins module
│   └── index.ts          # ProfChins entry point
└── Index-template.ts     # Template for creating index modules
```

## Getting Started

This is a TypeScript-based project. To use the modules:

1. Import the required modules from the `imports` directory
2. Use `Index-template.ts` as a reference for creating module aggregators
3. Implement your bot logic using the provided utilities

## Modules

- **imports/**: Contains all shared utility functions and type definitions
- **profChins/**: Custom module for specialized bot functionality
- **js_sources/**: JavaScript source files and implementations

## Development

This project uses TypeScript for type safety and better development experience.

## License

See repository license for details.
