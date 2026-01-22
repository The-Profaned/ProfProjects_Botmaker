/**
 * Index Template
 * Template file for creating index modules
 * 
 * This file serves as a template for creating index files that aggregate
 * and re-export modules from various parts of the project.
 */

// Import modules from imports folder
import * as types from './imports/types';
import * as generalFunctions from './imports/general-function';
import * as itemIds from './imports/item-ids';
import * as objectIds from './imports/object-ids';
import * as uiFunctions from './imports/ui-functions';
import * as utilityFunctions from './imports/utility-functions';
import * as locationFunctions from './imports/location-functions';
import * as debugFunctions from './imports/debug-functions';

// Import from profChins
import * as profChins from './profChins/index';

// Re-export all modules
export {
  types,
  generalFunctions,
  itemIds,
  objectIds,
  uiFunctions,
  utilityFunctions,
  locationFunctions,
  debugFunctions,
  profChins,
};
