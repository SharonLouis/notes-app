import mongoose from "mongoose";

const uri =
  "mongodb+srv://louissharon19_db_user:SharonMongo123@cluster0.5j8zc0w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log("Mongoose:", mongoose.version);

try {
  await mongoose.connect(uri);
  console.log("✅ Connected!");
} catch (err) {
  console.error("Error name:", err.name);
  console.error("Error message:", err.message);
  console.error(err);
}