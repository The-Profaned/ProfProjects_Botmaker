// Utility functions
export const utilityFunctions = {

    // random integer between min and max (inclusive)
    randInt: (min: number, max: number): number =>
        Math.floor(Math.random() * (max - min + 1)) + min,

};