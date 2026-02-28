require("dotenv").config();
const mongoose = require("mongoose");

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
    await mongoose.connect(process.env.MONGO_URI);
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

// Main Logic Function

async function run() {

  // Clear Previous Data
  await Student.deleteMany({});

  // Insert One
  await Student.create({
    name: "Abishek",
    age: 19,
    department: "CSE",
    cgpa: 9.3
  });

  // Insert Many
  await Student.insertMany([
    { name: "Arun", age: 21, department: "IT", cgpa: 7.8 },
    { name: "Priya", age: 22, department: "CSE", cgpa: 9.1 },
    { name: "Karthik", age: 20, department: "ECE", cgpa: 8.2 }
  ]);

  console.log("\n==============================");
  console.log("READ OPERATIONS");
  console.log("==============================");

  // 1️⃣ Find All Students
  const allStudents = await Student.find().lean();
  console.log("\nAll Students");
  console.table(allStudents);

  // 2️⃣ Find students in CSE department
  const cseStudents = await Student.find({ department: "CSE" }).lean();
  console.log("\nCSE Students");
  console.table(cseStudents);

  // 3️⃣ Find students with CGPA > 8
  const gtStudents = await Student.find({ cgpa: { $gt: 8 } }).lean();
  console.log("\nCGPA > 8");
  console.table(gtStudents);

  // 4️⃣ Find students with CGPA < 8
  const ltStudents = await Student.find({ cgpa: { $lt: 8 } }).lean();
  console.log("\nCGPA < 8");
  console.table(ltStudents);

  // 5️⃣ Find students with CGPA exactly equal to 8
  const eqStudents = await Student.find({ cgpa: { $eq: 8 } }).lean();
  console.log("\nCGPA = 8");
  console.table(eqStudents);

  // 6️⃣ Find students in CSE AND CGPA = 8
  const cse8Students = await Student.find({
    department: "CSE",
    cgpa: { $eq: 8 }
  }).lean();
  console.log("\nCSE with CGPA = 8");
  console.table(cse8Students);

  // 7️⃣ OR Condition → CSE OR CGPA = 8
  const orStudents = await Student.find({
    $or: [
      { department: "CSE" },
      { cgpa: 8 }
    ]
  }).lean();
  console.log("\nCSE OR CGPA = 8");
  console.table(orStudents);

  // 8️⃣ Select only name & cgpa
  const selectSpecificFields = await Student.find()
    .select("name cgpa -_id")
    .lean();
  console.log("\nOnly Name & CGPA");
  console.table(selectSpecificFields);

  console.log("\n==============================");
  console.log("MASTER QUERIES");
  console.log("==============================");

  // Q1: Find students with CGPA between 8 and 9
  const betweenStudents = await Student.find({
    cgpa: { $gte: 8, $lte: 9 }
  }).lean();
  console.log("\nCGPA between 8 and 9");
  console.table(betweenStudents);

  // Q2: Find students NOT in CSE department
  const notCSE = await Student.find({
    department: { $ne: "CSE" }
  }).lean();
  console.log("\nNOT CSE Students");
  console.table(notCSE);

  // Q3: Find students whose name starts with 'A'
  const startsWithA = await Student.find({
    name: { $regex: "^A", $options: "i" }
  }).lean();
  console.log("\nName starts with A");
  console.table(startsWithA);

  // Q4: Sort students by CGPA descending
  const sortedStudents = await Student.find()
    .sort({ cgpa: -1 })
    .lean();
  console.log("\nSorted by CGPA Desc");
  console.table(sortedStudents);

  // Q5: Top 3 students by CGPA
  const top3 = await Student.find()
    .sort({ cgpa: -1 })
    .limit(3)
    .lean();
  console.log("\nTop 3 Students");
  console.table(top3);

    console.log("\n==============================");
  console.log("DELETE OPERATIONS");
  console.log("==============================");

  // Q15: Delete one student
  await Student.deleteOne({ name: "Karthik" });
  console.log("\nAfter deleteOne (Karthik)");
  console.table(await Student.find().lean());

  // Q16: Delete many students with CGPA < 8
  await Student.deleteMany({ cgpa: { $lt: 8 } });
  console.log("\nAfter deleteMany (CGPA < 8)");
  console.table(await Student.find().lean());

  // Q17: Find and Delete one document
  const deletedDoc = await Student.findOneAndDelete({ name: "Arun" }).lean();
  console.log("\nDeleted Document (findOneAndDelete)");
  console.table([deletedDoc]);

  console.log("\nAfter findOneAndDelete");
  console.table(await Student.find().lean());

  // Q18: Delete all documents
  await Student.deleteMany({});
  console.log("\nAfter deleting all students");
  console.table(await Student.find().lean());
}


