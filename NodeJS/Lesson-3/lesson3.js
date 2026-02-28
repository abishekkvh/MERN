// Lesson-3 : File Systems
// Date     : 28-02-2026

// fs : Used to Create, Read, Write (or) Delete Files
// Sync - Waits till that event finishes
// Async - Keeps running the next line without bothering whether the event is successfully completed or not

const fs = require('fs');

// Read a File
const data = fs.readFileSync('sample.txt', 'utf-8');
console.log(data);

// Link Between 2 Files
// fs.linkSync('new.txt', ''); // linkSync is not for creation just to create a hard link between files


// Create & Write a File
fs.writeFileSync('new.txt', 'I am Abishek');

// Append a File
fs.appendFileSync('new.txt', '\nLiving in Madurai');

const fileContent = fs.readFileSync('new.txt', 'utf-8');
console.log(fileContent);

//Delete a File
fs.unlinkSync('new.txt');
console.log("File 'New.txt' Deleted.");

//Create a Folder
if (!fs.existsSync("New-Folder")) 
{
    fs.mkdirSync("New-Folder");
}

// Delete a Folder
fs.rmSync("New-Folder", {recursive : true}); //rmdirSync() - Deprecated Older Version
console.log("'New-Folder' Deleted Successfully");