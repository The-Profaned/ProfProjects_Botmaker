/* eslint-disable @typescript-eslint/no-unused-vars, unicorn/prevent-abbreviations */
import collisionDataFlagMap from '../rollup/CollisionDataFlag.js';
import componentIdMap from '../rollup/ComponentID.js';
import enumIdMap from '../rollup/EnumID.js';
import interfaceIdMap from '../rollup/InterfaceID.js';
import itemIdMap from '../rollup/ItemID.js';
import npcIdMap from '../rollup/NpcID.js';
import objectIdMap from '../rollup/ObjectID.js';
import parameterIdMap from '../rollup/ParamID.js';
import spriteIdMap from '../rollup/SpriteID.js';
// Gameval imports
import gamevalAnimationIdMap from '../rollup/gameval/AnimationID.js';
import gamevalDbTableIdMap from '../rollup/gameval/DBTableID.js';
import gamevalInterfaceIdMap from '../rollup/gameval/InterfaceID.js';
import gamevalInventoryIdMap from '../rollup/gameval/InventoryID.js';
import gamevalItemIdMap from '../rollup/gameval/ItemID.js';
import gamevalNpcIdMap from '../rollup/gameval/NpcID.js';
import gamevalObjectIdMap from '../rollup/gameval/ObjectID.js';
import gamevalObjectId1Map from '../rollup/gameval/ObjectID1.js';
import gamevalSpotanimIdMap from '../rollup/gameval/SpotanimID.js';
import gamevalSpriteIdMap from '../rollup/gameval/SpriteID.js';
import gamevalVarbitIdMap from '../rollup/gameval/VarbitID.js';
import gamevalVarClientIdMap from '../rollup/gameval/VarClientID.js';
import gamevalVarPlayerIdMap from '../rollup/gameval/VarPlayerID.js';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function _zRhinoRuneliteRollupBugFixes() {
    return {
        name: 'rhino-runelite-bug-fixes',
        renderChunk(code, _chunk, _options) {
            const replacements = [
                {
                    regex: /net\.runelite\.api\.NpcID\.(.*?)([\n ),:;\]])/g,
                    map: npcIdMap,
                },
                {
                    regex: /net\.runelite\.api\.EnumID\.(.*?)([\n ),:;\]])/g,
                    map: enumIdMap,
                },
                {
                    regex: /net\.runelite\.api\.ItemID\.(.*?)([\n ),:;\]])/g,
                    map: itemIdMap,
                },
                {
                    regex: /net\.runelite\.api\.SpriteID\.(.*?)([\n ),:;\]])/g,
                    map: spriteIdMap,
                },
                {
                    regex: /net\.runelite\.api\.CollisionDataFlag\.(.*?)([\n ),:;\]])/g,
                    map: collisionDataFlagMap,
                },
                {
                    regex: /net\.runelite\.api\.ParamID\.(.*?)([\n ),:;\]])/g,
                    map: parameterIdMap,
                },
                {
                    regex: /net\.runelite\.api\.widgets\.ComponentID\.(.*?)([\n ),:;\]])/g,
                    map: componentIdMap,
                },
                {
                    regex: /net\.runelite\.api\.widgets\.InterfaceID\.(.*?)([\n ),:;\]])/g,
                    map: interfaceIdMap,
                },
                {
                    regex: /net\.runelite\.api\.ObjectID\.(.*?)([\n ),:;\]])/g,
                    map: objectIdMap,
                },
                // Gameval replacements
                {
                    regex: /net\.runelite\.api\.gameval\.AnimationID\.(.*?)([\n ),:;\]])/g,
                    map: gamevalAnimationIdMap,
                },
                {
                    regex: /net\.runelite\.api\.gameval\.DBTableID\.(.*?)([\n ),:;\]])/g,
                    map: gamevalDbTableIdMap,
                },
                {
                    regex: /net\.runelite\.api\.gameval\.InterfaceID\.(.*?)([\n ),:;\]])/g,
                    map: gamevalInterfaceIdMap,
                },
                {
                    regex: /net\.runelite\.api\.gameval\.InventoryID\.(.*?)([\n ),:;\]])/g,
                    map: gamevalInventoryIdMap,
                },
                {
                    regex: /net\.runelite\.api\.gameval\.ItemID\.(.*?)([\n ),:;\]])/g,
                    map: gamevalItemIdMap,
                },
                {
                    regex: /net\.runelite\.api\.gameval\.NpcID\.(.*?)([\n ),:;\]])/g,
                    map: gamevalNpcIdMap,
                },
                {
                    regex: /net\.runelite\.api\.gameval\.ObjectID\.(.*?)([\n ),:;\]])/g,
                    map: gamevalObjectIdMap,
                },
                {
                    regex: /net\.runelite\.api\.gameval\.ObjectID1\.(.*?)([\n ),:;\]])/g,
                    map: gamevalObjectId1Map,
                },
                {
                    regex: /net\.runelite\.api\.gameval\.SpotanimID\.(.*?)([\n ),:;\]])/g,
                    map: gamevalSpotanimIdMap,
                },
                {
                    regex: /net\.runelite\.api\.gameval\.SpriteID\.(.*?)([\n ),:;\]])/g,
                    map: gamevalSpriteIdMap,
                },
                {
                    regex: /net\.runelite\.api\.gameval\.VarbitID\.(.*?)([\n ),:;\]])/g,
                    map: gamevalVarbitIdMap,
                },
                {
                    regex: /net\.runelite\.api\.gameval\.VarClientID\.(.*?)([\n ),:;\]])/g,
                    map: gamevalVarClientIdMap,
                },
                {
                    regex: /net\.runelite\.api\.gameval\.VarPlayerID\.(.*?)([\n ),:;\]])/g,
                    map: gamevalVarPlayerIdMap,
                },
            ];
            let modifiedCode = code;
            for (const { regex, map } of replacements) {
                // @ts-expect-error can ignore the type failure on map[p1] because it's near-non-critical
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                modifiedCode = modifiedCode.replaceAll(regex, (_, p1, p2) => `${map[p1]}${p2}`);
            }
            return {
                code: modifiedCode,
                map: null,
            };
        },
    };
}
