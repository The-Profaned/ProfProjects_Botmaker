// imports
import { generalFunctions } from "../imports/general_function.js";
import { logger } from "../imports/logger.js";
import { timeoutManager } from "./timeout_manager.js";
import { State } from "./types.js";

// inventory functions
export const inventoryFunctions = {

  // drops item from inventory and waits for it to be absent
  dropItem: (state: State, itemId: number, failResetState?: string): boolean => {
    if (bot.inventory.containsId(itemId)) {
      bot.inventory.interactWithIds([itemId], ['Drop']);
      inventoryFunctions.itemInventoryTimeout.absent(state, itemId, failResetState);
      return false;
    }
    return true;
  },

  // gets first existing item from list
  getFirstExistingItemId: (itemIds: number[]): number | undefined => {
    if (!bot.inventory.containsAnyIds(itemIds)) return undefined;
    return itemIds.find(itemIds => bot.inventory.containsId(itemIds));
  },

  // gets random existing item from list
  getRandomExistingItemId: (itemIds: number[]): number | undefined => {
    if (!bot.inventory.containsAnyIds(itemIds)) return undefined;
    const existingItemIds = itemIds.filter(itemIds => bot.inventory.containsId(itemIds));
    if (existingItemIds.length === 0) return undefined;
    return existingItemIds[Math.floor(Math.random() * existingItemIds.length)];
  },

  // checks if inventory has specific quantities of items
  checkQuantities: (state: State, items: {itemId: number, quantity: number}[]): boolean => {
    logger(state, 'debug', `checkQuantities`, 'Checking inventory item quantities.');
    for (const item of items) {
      if (bot.inventory.getQuantityOfId(item.itemId) !== item.quantity) return false;
    }
    return true;
  },

  // waits for item to be present or absent in inventory with timeout
  itemInventoryTimeout: {
    present: (state: State, itemId: number, failResetState?: string): boolean => itemInventoryTimeoutCore(state, itemId, failResetState, true),
    absent: (state: State, itemId: number, failResetState?: string): boolean => itemInventoryTimeoutCore(state, itemId, failResetState, false),
  },

  // gear swapping function with ID and name support
  swapGear: (state: State, itemIds: number[], itemNames: string[], targetSlot: number, failResetState?: string): boolean => {
    // Try to find item by ID first
    if (bot.inventory.containsAnyIds(itemIds)) {
      const sourceSlot = bot.inventory.interactWithIds(itemIds, ['Equip']);
      if (sourceSlot !== undefined) { // Check only for undefined
        logger(state, 'debug', 'swapGear', `Swapping item ID ${itemIds} from slot ${sourceSlot} to slot ${targetSlot}`);
        return true;
      }
    }
    
    // Fallback to item names if IDs not found
    if (itemNames && itemNames.length > 0) {
      const sourceSlot = bot.inventory.interactWithNames(itemNames, ['Equip']);
      if (sourceSlot !== undefined) {
        logger(state, 'debug', 'swapGear', `Swapping item by name "${itemNames}" from slot ${sourceSlot} to slot ${targetSlot}`);
        return true;
      }
    }
    
    logger(state, 'debug', 'swapGear', `No items found with IDs ${itemIds} or names ${itemNames}`);
    if (failResetState) {
      generalFunctions.handleFailure(state, 'swapGear', `Item not found for swapping`, failResetState);
    }
    return false;
  }
};

// core function for item inventory timeout
function itemInventoryTimeoutCore(state: State, itemId: number, failResetState?: string, waitForPresence: boolean = true): boolean {
  const inInventory = bot.inventory.containsId(itemId);
  const shouldPass = waitForPresence ? inInventory : !inInventory;
  if (!shouldPass) {
    logger(state, 'debug', 'inventoryFunctions.itemInventoryTimeout', `Item ID ${itemId} ${waitForPresence ?  'not in' : 'still in'} inventory.`);
    timeoutManager.add({state, conditionFunction: () => waitForPresence ? bot.inventory.containsId(itemId) : !bot.inventory.containsId(itemId), initialTimeout: 1, maxWait: 10, onFail: () =>
      generalFunctions.handleFailure(state, 'inventoryFunctions.itemInventoryTimeout', `Item ID ${itemId} ${waitForPresence ?  'not in' : 'still in'} inventory after 10 ticks.`, failResetState)
    });
    return false;
  }
  logger(state, 'debug', 'inventoryFunctions.itemInventoryTimeout', `Item ID ${itemId} is ${waitForPresence ?  'in' : 'not in'} inventory.`);
  return true;
}