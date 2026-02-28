// Lesson 1 - Global Object, setTimeout, setInterval, clearInterval, __dirname, __filename
// Date     - 28 - 02 - 2026

// Prints after 3 seconds and stops after excecution
globalThis.setTimeout(() => {
    console.log("Clearing Nodes");
    clearInterval(nodes); // Cancels interval - node
    console.log("Node " + i + " Cleared Successfully");
}, 3000) 

let i = 0;

// Prints every 1 sec untill there is keyboard interrupt or clearInterval(interva_name) mentioned
const nodes = setInterval(() => {
    console.log(`Node ${i}`);
    i++;
}, 1000)

console.log(__dirname);  // Directory Path
console.log(__filename); // Filename + Directory Path