// =====================================================
// Lesson 4 - Streams & Buffers
// Date: 01-03-2026
// =====================================================

const fs = require("fs");


// =====================================================
// BUFFER
// =====================================================

// Buffer is a temporary memory storage used to handle binary data.

// Allocate 10 bytes
let buffer = Buffer.alloc(10);
console.log("Allocated Buffer:", buffer);

// Create buffer from string
buffer = Buffer.from("Hello");
console.log("Buffer from String:", buffer);


// =====================================================
// STREAMS
// =====================================================

// A Stream is a way to read or write data piece by piece,
// instead of loading everything into memory at once.

/*
Why Streams Are Important?

Imagine a 2GB video file.

Without streams:
    - Entire file loads into memory
    - App may crash

With streams:
    - Data is processed in chunks
    - Memory usage stays low
*/

/*
Types of Streams:
Readable  - Used to read data
Writable  - Used to write data
Duplex    - Used to read and write
Transform - Used to modify data while reading
*/

/*
ReadStream reads data in chunks.

Default chunk size is controlled by:
    highWaterMark

For fs.createReadStream():
    Default = 64KB
    = 64 * 1024
    = 65536 bytes
*/


// =====================================================
// READ STREAM EXAMPLE
// =====================================================

const readStream = fs.createReadStream("hugeFile.txt");

readStream.on("data", (chunk) => {
    console.log("Chunk received");
    console.log("Chunk Length:", chunk.length);
});

readStream.on("end", () => {
    console.log("Finished Reading File");
});

readStream.on("error", (err) => {
    console.log("Read Error:", err.message);
});


// =====================================================
// WRITE STREAM EXAMPLE
// =====================================================

const writeStream = fs.createWriteStream("output.txt");

writeStream.write("I am Abishek\n");
writeStream.write("Learning NodeJS Streams\n");
writeStream.end();

writeStream.on("finish", () => {
    console.log("Written Successfully");
});

writeStream.on("error", (err) => {
    console.log("Write Error:", err.message);
});


// =====================================================
// PIPE METHOD (Best Practice)
// =====================================================

const pipeReadStream = fs.createReadStream("hugeFile.txt");
const pipeWriteStream = fs.createWriteStream("pipeOutput.txt");

pipeReadStream.pipe(pipeWriteStream);

pipeWriteStream.on("finish", () => {
    console.log("Pipe Operation Completed");
});


// =====================================================
// MANUAL PIPE VERSION
// =====================================================

const manualReadStream = fs.createReadStream("hugeFile.txt");
const manualWriteStream = fs.createWriteStream("manualOutput.txt");

manualReadStream.on("data", (chunk) => {
    manualWriteStream.write(chunk);
});

manualReadStream.on("end", () => {
    manualWriteStream.end();
    console.log("Manual Copy Completed");
});

manualReadStream.on("error", (err) => {
    console.log("Manual Read Error:", err.message);
});


/* 
Flowing Mode vs Paused Mode
 Mode           Who Controls
 Flowing Mode   Stream pushes data automatically
 Paused  Mode   We manually pull data
 */

 // Flowing Mode
 const flowingReadStream = fs.createReadStream('hugeFile.txt');

 flowingReadStream.on('data', (chunk) => {
    console.log("Flowing Mode : ", chunk.length) // =====> Flowing Mode : It automatically pushes data
 }) 

 // Paused Mode
 const pausedReadingStream = fs.createReadStream('hugeFile.txt');

 pausedReadingStream.on('readable', () => {
    let chunk;
    while((chunk = pausedReadingStream.read()) !== null) // ==> Paused Mode : We decide when to read
    {
        console.log("Paused Mode : ", chunk.length);
    }
 })


 /*
 BackPressure Mode
 Why BackPressure ?
    Because 
    Buffer Reading is faster but
    Buffer writing is slower

Why does this happen ?
    Readable stream reads up to highWaterMark size (default 64KB).
    
    If WriteStream can't write fast enough:
        Data waits in internal buffer
        Buffer keeps growing
        Memory grows

readStream.pipe(writeStream) - Here pipe() handles backpressure automatically.
But manually the previously written [ MANUALLY WRITTE PIPE ] code may cause fatal error.
*/

// =====================================
// CORRECT MANUAL BACK PRESSURE HANDLING
// =====================================
const bpreadStream = fs.createReadStream('hugeFile.txt');
const bpwriteStream = fs.createWriteStream('backPressureOutput.txt')

bpreadStream.on("data", (chunk) => {
    const canContinue = writeStream.write(chunk); 
    // Returns true (safe to continue writing) or false (stop, buffer full)

    if (!canContinue) {
        readStream.pause();
    }
});

bpwriteStream.on("drain", () => { // 'drain' - starts when buffer becomes free again
    readStream.resume();
});

/* 
highWaterMark Internals
Default Maximum Size : 64KB but can be changed manually
*/

const HWMreadStream = fs.createReadStream("hugeFile.txt", {
    highWaterMark: 1024
});

console.log("New HighWaterMark: ", HWMreadStream.readableHighWaterMark);




/*
Encoding vs Buffer Mode
Diffference 
Buffer - Chunk is buffer object of binary data
Encoding - Chunk can be directly converted into string using 
           encoding mode instead of using toString manually
When Both Mode is used ?
Buffer   - Reading Image, Video, PDFs, ZIP files
Encoding - Text. JSON, CSV Files
*/

const bufferMode = fs.createReadStream('hugeFile.txt');
bufferMode.on('data', (chunk) => {
    console.log("Data Type of Chunk in Buffer Mode : " + typeof chunk);
})

const encodingMode = fs.createReadStream('hugeFile.txt', {encoding : 'utf-8'});
encodingMode.on('data', (chunk) => {
    console.log("Data Type of Chunk in Encoding Mode : " + typeof chunk);
})