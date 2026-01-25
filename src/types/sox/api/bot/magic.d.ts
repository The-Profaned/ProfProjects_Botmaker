/// <reference path="../../../runelite/index.d.ts" />
/// <reference path="./types.d.ts" />

declare namespace bot {
    /**
     * Valid spell names that can be cast in the game
     */
    type SpellName =
        // Standard spellbook teleports
        | 'HOME_TELEPORT' | 'VARROCK_TELEPORT' | 'LUMBRIDGE_TELEPORT' | 'FALADOR_TELEPORT'
        | 'TELEPORT_TO_HOUSE' | 'CAMELOT_TELEPORT' | 'ARDOUGNE_TELEPORT' | 'WATCHTOWER_TELEPORT'
        | 'TROLLHEIM_TELEPORT' | 'TELEPORT_TO_APE_ATOLL' | 'TELEPORT_TO_KOUREND'
        | 'TELEOTHER_LUMBRIDGE' | 'TELEOTHER_FALADOR' | 'TELEPORT_TO_BOUNTY_TARGET' | 'TELEOTHER_CAMELOT'
        // Standard spellbook combat spells
        | 'WIND_STRIKE' | 'WATER_STRIKE' | 'EARTH_STRIKE' | 'FIRE_STRIKE'
        | 'WIND_BOLT' | 'WATER_BOLT' | 'EARTH_BOLT' | 'FIRE_BOLT'
        | 'WIND_BLAST' | 'WATER_BLAST' | 'EARTH_BLAST' | 'FIRE_BLAST'
        | 'WIND_WAVE' | 'WATER_WAVE' | 'EARTH_WAVE' | 'FIRE_WAVE'
        | 'WIND_SURGE' | 'WATER_SURGE' | 'EARTH_SURGE' | 'FIRE_SURGE'
        | 'SARADOMIN_STRIKE' | 'CLAWS_OF_GUTHIX' | 'FLAMES_OF_ZAMORAK'
        | 'CRUMBLE_UNDEAD' | 'IBAN_BLAST' | 'MAGIC_DART'
        // Standard spellbook other spells
        | 'CONFUSE' | 'WEAKEN' | 'CURSE' | 'BIND' | 'SNARE' | 'VULNERABILITY'
        | 'ENFEEBLE' | 'ENTANGLE' | 'STUN' | 'TELE_BLOCK' | 'CHARGE'
        | 'BONES_TO_BANANAS' | 'LOW_LEVEL_ALCHEMY' | 'SUPERHEAT_ITEM' | 'HIGH_LEVEL_ALCHEMY' | 'BONES_TO_PEACHES'
        | 'LVL_1_ENCHANT' | 'LVL_2_ENCHANT' | 'LVL_3_ENCHANT' | 'LVL_4_ENCHANT'
        | 'LVL_5_ENCHANT' | 'LVL_6_ENCHANT' | 'LVL_7_ENCHANT'
        | 'CHARGE_WATER_ORB' | 'CHARGE_EARTH_ORB' | 'CHARGE_FIRE_ORB' | 'CHARGE_AIR_ORB'
        | 'TELEKINETIC_GRAB'
        // Ancient spellbook
        | 'EDGEVILLE_HOME_TELEPORT' | 'PADDEWWA_TELEPORT' | 'SENNTISTEN_TELEPORT' | 'KHARYRLL_TELEPORT'
        | 'LASSAR_TELEPORT' | 'DAREEYAK_TELEPORT' | 'CARRALLANGER_TELEPORT' | 'BOUNTY_TARGET_TELEPORT'
        | 'ANNAKARL_TELEPORT' | 'GHORROCK_TELEPORT'
        | 'SMOKE_RUSH' | 'SHADOW_RUSH' | 'BLOOD_RUSH' | 'ICE_RUSH'
        | 'SMOKE_BURST' | 'SHADOW_BURST' | 'BLOOD_BURST' | 'ICE_BURST'
        | 'SMOKE_BLITZ' | 'SHADOW_BLITZ' | 'BLOOD_BLITZ' | 'ICE_BLITZ'
        | 'SMOKE_BARRAGE' | 'SHADOW_BARRAGE' | 'BLOOD_BARRAGE' | 'ICE_BARRAGE'
        // Lunar spellbook
        | 'LUNAR_HOME_TELEPORT' | 'MOONCLAN_TELEPORT' | 'TELE_GROUP_MOONCLAN' | 'OURANIA_TELEPORT'
        | 'WATERBIRTH_TELEPORT' | 'TELE_GROUP_WATERBIRTH' | 'BARBARIAN_TELEPORT' | 'TELE_GROUP_BARBARIAN'
        | 'KHAZARD_TELEPORT' | 'TELE_GROUP_KHAZARD' | 'FISHING_GUILD_TELEPORT' | 'TELE_GROUP_FISHING_GUILD'
        | 'CATHERBY_TELEPORT' | 'TELE_GROUP_CATHERBY' | 'ICE_PLATEAU_TELEPORT' | 'TELE_GROUP_ICE_PLATEAU'
        | 'MONSTER_EXAMINE' | 'CURE_OTHER' | 'CURE_ME' | 'CURE_GROUP' | 'STAT_SPY' | 'DREAM'
        | 'STAT_RESTORE_POT_SHARE' | 'BOOST_POTION_SHARE' | 'ENERGY_TRANSFER'
        | 'HEAL_OTHER' | 'VENGEANCE_OTHER' | 'VENGEANCE' | 'HEAL_GROUP'
        | 'BAKE_PIE' | 'GEOMANCY' | 'CURE_PLANT' | 'NPC_CONTACT' | 'HUMIDIFY'
        | 'HUNTER_KIT' | 'SPIN_FLAX' | 'SUPERGLASS_MAKE' | 'TAN_LEATHER' | 'STRING_JEWELLERY'
        | 'MAGIC_IMBUE' | 'FERTILE_SOIL' | 'PLANK_MAKE' | 'RECHARGE_DRAGONSTONE' | 'SPELLBOOK_SWAP'
        // Arceuus spellbook
        | 'ARCEUUS_HOME_TELEPORT' | 'ARCEUUS_LIBRARY_TELEPORT' | 'DRAYNOR_MANOR_TELEPORT' | 'BATTLEFRONT_TELEPORT'
        | 'MIND_ALTAR_TELEPORT' | 'RESPAWN_TELEPORT' | 'SALVE_GRAVEYARD_TELEPORT' | 'FENKENSTRAINS_CASTLE_TELEPORT'
        | 'WEST_ARDOUGNE_TELEPORT' | 'HARMONY_ISLAND_TELEPORT' | 'CEMETERY_TELEPORT' | 'BARROWS_TELEPORT'
        | 'APE_ATOLL_TELEPORT'
        | 'GHOSTLY_GRASP' | 'SKELETAL_GRASP' | 'UNDEAD_GRASP'
        | 'INFERIOR_DEMONBANE' | 'SUPERIOR_DEMONBANE' | 'DARK_DEMONBANE'
        | 'LESSER_CORRUPTION' | 'GREATER_CORRUPTION'
        | 'RESURRECT_LESSER_GHOST' | 'RESURRECT_LESSER_SKELETON' | 'RESURRECT_LESSER_ZOMBIE'
        | 'RESURRECT_SUPERIOR_GHOST' | 'RESURRECT_SUPERIOR_SKELETON' | 'RESURRECT_SUPERIOR_ZOMBIE'
        | 'RESURRECT_GREATER_GHOST' | 'RESURRECT_GREATER_SKELETON' | 'RESURRECT_GREATER_ZOMBIE'
        | 'DARK_LURE' | 'MARK_OF_DARKNESS' | 'WARD_OF_ARCEUUS'
        | 'BASIC_REANIMATION' | 'ADEPT_REANIMATION' | 'EXPERT_REANIMATION' | 'MASTER_REANIMATION'
        | 'DEMONIC_OFFERING' | 'SINISTER_OFFERING' | 'SHADOW_VEIL' | 'VILE_VIGOUR'
        | 'DEGRIME' | 'RESURRECT_CROPS' | 'DEATH_CHARGE';

    /**
     * Interface for casting magic spells in the game
     * Provides methods to cast spells on various targets
     */
    interface magic {
        /**
         * Casts a magic spell
         * @param spellName The name of the spell to cast
         * @param actionIndex Action index for the spell
         */
        cast: (spellName: SpellName, actionIndex?: number) => void;

        /**
         * Casts a magic spell on an inventory item by its ID
         * @param spellName The name of the spell to cast
         * @param itemId The ID of the inventory item to cast the spell on
         */
        castOnInventoryItemId: (spellName: SpellName, itemId: number) => void;

        /**
         * Casts a magic spell on an inventory item by its name
         * @param spellName The name of the spell to cast
         * @param itemName The name of the inventory item to cast the spell on
         */
        castOnInventoryItemName: (spellName: SpellName, itemName: string) => void;

        /**
         * Casts a magic spell on an NPC
         * @param spellName The name of the spell to cast
         * @param npc The NPC to cast the spell on
         */
        castOnNpc: (spellName: SpellName, npc: net.runelite.api.NPC) => void;

        /**
         * Casts a magic spell on a player
         * @param spellName The name of the spell to cast
         * @param player The player to cast the spell on
         */
        castOnPlayer: (spellName: SpellName, player: net.runelite.api.Player) => void;

        /**
         * Casts a magic spell on a tile item (item on the ground)
         * @param spellName The name of the spell to cast
         * @param tileItem The tile item to cast the spell on
         */
        castOnTileItem: (spellName: SpellName, tileItem: bot.TileItemInfo) => void;

        /**
         * Casts a magic spell on a tile object (game object in the world)
         * @param spellName The name of the spell to cast
         * @param tileObject The tile object to cast the spell on
         */
        castOnTileObject: (spellName: SpellName, tileObject: net.runelite.api.TileObject) => void;
    }
}
