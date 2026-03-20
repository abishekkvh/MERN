// Lesson 2 - Aggregation 

require("dotenv").config();
const mongoose = require('mongoose');

// Schema Definiton

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  department: String,
  cgpa: Number
});

const Student = mongoose.model("Student", studentSchema);

// App Entry Point
async function start() 
{
  try 
  {
    console.log("ENV VALUE:", process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await run();

  } 
  catch (err) 
  {
    console.error("Error:", err);
  } 
  finally 
  {
    await mongoose.connection.close();
    console.log("\nConnection Closed");
  }
}

start();

/*
Aggregation process documents through stages

Student.aggregate([
   { stage1 },
   { stage2 },
   { stage3 }
])
*/

async function run() {
    
    await Student.deleteMany({});

    await Student.insertMany([
    { name: "Arun", age: 21, department: "IT", cgpa: 7.8 },
    { name: "Priya", age: 22, department: "CSE", cgpa: 9.1 },
    { name: "Karthik", age: 20, department: "ECE", cgpa: 8.2 }
  ]);

    const sampleData = await Student.find().lean();
    console.table(sampleData);
    
}