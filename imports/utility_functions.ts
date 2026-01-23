/**
 * Utility Functions
 * Contains utility helper functions for common operations
 */

export const utilityFunctions (

    randInt: { // random integer between min and max (inclusive)
        min: number, max: number}: number => Math.floor(Math.random() * (max - min + 1)) + min,

);
