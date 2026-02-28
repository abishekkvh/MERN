// Lesson 2 - Modules & Require
// Date     - 28 - 02 - 2026

// Module : Blocks of Code mainly for code reusability and Maintainability
// require() : Used to import but not only import it also excecutes a file once.

const {studentName, schools} = require('./data');
console.log("\n" + "Student-Name   : " + studentName);
console.log("School-Name    : " + schools + "\n");

// Built-In Module:
const os = require('os');
console.log("Home-Directory : " + os.homedir());
console.log("Version        : " + os.version());
console.log("Type           : " + os.type());
console.log("HostName       : " + os.hostname());
console.log("Patform        : " + os.platform());
console.log("Release        : " + os.release() + "\n");
