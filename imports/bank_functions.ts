// imports
import { generalFunctions } from "./general_function.js";
import { inventoryFunctions } from "./inventory_functions.js";
import { logger } from "./logger.js";
import { timeoutManager } from "./timeout_manager.js";
import { State } from "./types.js";

// Bank-related utility functions
export const bankFunction = {

    // Open the bank if it is not already open
    openBank: (state: State): boolean => {
        if (!bot.bank.isOpen()) {
            logger(state, 'debug', 'bankFunctions.openBank', 'Opening the bank');
            bot.bank.open();
            timeoutManager.add({
                state, conditionFunction: () => bot.bank.isOpen(), initialTimeout: 1, maxWait: 10, onFail: () =>
                    generalFunctions.handleFailure(state, 'bankFunction.openBank', 'Bank is not open after 10 ticks.')
            });
            return false;
        }
        return true;
    },

    // Close the bank if it is open
    closeBank: (state: State): boolean => {
        if (bot.bank.isOpen()) {
            logger(state, 'debug', 'bankFunctions.closeBank', 'Closing the bank');
            bot.bank.close();
            timeoutManager.add({
                state, conditionFunction: () => !bot.bank.isOpen(), initialTimeout: 1, maxWait: 10, onFail: () =>
                    generalFunctions.handleFailure(state, 'bankFunction.closeBank', 'Bank is still open after 10 ticks.')
            });
            return false;
        }
        return true;
    },

    // Ensure the bank is open, otherwise set fallback state
    requireOpenBank: (state: State, fallbackState: string,): boolean => {
        if (!bot.bank.isOpen()) { state.mainState = fallbackState;
            return false;
        }
        return true;
    },

    // Ensure the bank is closed, otherwise set fallback state
    requireClosedBank: (state: State, fallbackState: string,): boolean => {
        if (bot.bank.isOpen()) { state.mainState = fallbackState;
            return false;
        }
        return true;
    },

    // Check if item quantity in bank is below specified amount
    lowQuantityInBank: (itemId: number, quanitty: number): boolean => bot.bank.getQuantityOfId(itemId) < quanitty,

    // Check if any of the specified items have low quantity in bank
    anyQuantityLowInBank: (items: {id: number; quantity: number}[]): boolean => items.some(item => bankFunction.lowQuantityInBank(item.id, item.quantity)),

    // Deposit items with timeout handling
    depositItemsTimeout: {
        all: (state: State, failResetState?: string) => depositItemsTimeoutBase(state, undefined, failResetState),
        some: (state: State, itemId: number, failResetState?: string) => depositItemsTimeoutBase(state, itemId, failResetState),
    },

    // Withdraw missing items from bank
    withdrawMissingItems: (state: State, items: {id: number; quantity: number | 'all';}[], failResetState?: string): boolean => {
        for (const item of items){
            if (!bot.inventory.containsId(item.id)) {
                logger(state, 'debug', 'bankFunctions.withdrawMissingItems', `Withdrawing item ID ${item.id} with wuantity ${item.quantity}`)
                item.quantity == 'all' ? bot.bank.withdrawAllWithId(item.id) : bot.bank.withdrawQuantityWithId(item.id, item.quantity);
                if (!inventoryFunctions.itemInventoryTimeout.present(state, item.id, failResetState)) 
                    return false;
            }
        }
    },
    
    // Withdraw the first existing item from a list of item IDs
    withdrawFirstExistingItem: (state: State, itemIds: number[], quantity: number, failResetState?: string): boolean => {
        for (const itemId of itemIds){
            if (bot.bank.getQuantityOfId(itemId))
                logger(state, 'debug', 'bankFunctions.withdrawFirstExistingItem', `Withdrawing item ID ${itemId} with quantity ${quantity}`);
                bot.bank.withdrawQuantityWithId(itemId, quantity);
            if (!inventoryFunctions.itemInventoryTimeout.present(state, itemId, failResetState)) 
                return false; 
        }
    },
};

// Base function to deposit items with timeout handling
const depositItemsTimeoutBase = (state: State, itemId?: number, failResetState?: string): boolean => {
    const currentEmptySlots = bot.inventory.getEmptySlots();
     if (currentEmptySlots == 28) return true;
     if (!itemId || (itemId && bot.inventory.containsId(itemId))) {
         logger(state, 'debug', 'bankFunctions.depositItemsTimeout', `Depositing ${itemId ? `item ID ${itemId}` : 'all items'}`);
        itemId ? bot.bank.depositAllWithId(itemId) : bot.bank.depositAll();
        timeoutManager.add({
             state, conditionFunction: () => currentEmptySlots < bot.inventory.getEmptySlots(), initialTimeout: 1, maxWait: 10, onFail: () =>
                generalFunctions.handleFailure(state, 'bankFunctions.depositItemsTimeout', `Failed to deposit ${itemId ? `item ID ${itemId}` : 'all items'} after 10 ticks.`, failResetState)
        });
        return false;
    }
    return true;
 }