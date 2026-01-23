import { State } from "./types.js";

export const inventoryFunctions = {
  itemInventoryTimeout: {
    present: (_state: State, _itemId: number, _failResetState?: string): boolean => {
      return true;
    },
  },
};
