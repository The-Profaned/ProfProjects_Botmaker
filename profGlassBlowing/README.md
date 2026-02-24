# 🧪 **ProfGlassBlowing** - Glassblowing + Seaweed Spore Automation

> **Fast. Reliable. Flexible.**
>
> Automates molten glass crafting with optional underwater seaweed spore collection.

---

### 🎯 **Modes**

✅ **Craft Only** - Bank + craft loop (pipe on molten glass)  
✅ **Craft + Spores** - Craft loop plus underwater spore pickups  
✅ **Spores only** - No crafting, only collects spores (start at bank or underwater)

---

### ⚙️ **Key Features**

✅ Smart state recovery if crafting stalls (idle watchdog)  
✅ Crafting XP check prevents false watchdog restarts with flippers
✅ Boat dialogue handling (`Continue`) with fallback widget click   
✅ Supports starting spores mode from bank-side **or** underwater

---

## 🧰 **Requirements**

- **Continue Click**: Setup the option to craft before starting the script
- **Craft Only**: Glassblowing pipe in your inventory and locked for banking
- **Craft + Spores**: Both need to be in your inventory and locked for banking
- **Spores only**: Nothing Needed

---

## 🛡️ **Reliability Notes**

- If crafting idles too long, script auto-restarts glassblowing action
- If flippers keep animation idle, Crafting XP progress suppresses false restarts
- If boat prompt appears, script auto-handles `Continue`