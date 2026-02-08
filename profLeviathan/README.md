┌──────────────┐
│ start_state  │ (Initialize weapon speed)
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ prepare_combat       │ (Validate boundary entry)
└──────┬───────────────┘
       │ Success (in bounds)
       ▼
┌─────────────────────────────────────────────┐
│      leviathan_combat (MAIN LOOP)           │
│                                             │
│  Each tick:                                 │
│  1. Handle projectiles & prayer             │
│  2. Check health for phase transitions      │
│  3. Detect dangerous tiles                  │
│  4. Execute sub_State logic                 │
│                                             │
│  Sub-States:                                │
│  ├─ manage_hp/prayer ──→ engage_combat      │
│  ├─ engage_combat ──────→ handle_danger     │
│  ├─ handle_danger_tiles  ──→ engage_combat  │
│  ├─ reset_leviathan ────→ avoid_lightning   │
│  │                    ──→ dodge_debris      │
│  ├─ avoid_lightning ────→ manage_hp/prayer  │
│  ├─ dodge_debris ──────→ manage_hp/prayer   │
│  ├─ moving_to_pathfinder→ manage_hp/prayer  │
│  │  (at 25% health)         (at 20%)        │
│  └─ track_abyss_pathfinder → pathf. drops   │
│     (at 20% health)                         │
│                                             │
└──────┬──────────────────────────────────────┘
       │ Failure (out of bounds)
       ▼
┌──────────────────────┐
│ return_to_leviathan  │ (Re-navigate to arena)
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ prepare_combat       │ (Try again)
└──────────────────────┘