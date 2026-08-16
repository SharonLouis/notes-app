import express from "express"; 
import routes from "./Routes/routes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/ratelimiter.js";
import cors from "cors"
import path from "path"
 
dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware 
if(process.env.NODE_ENV !=="production"){
app.use(
    cors({
    origin:"http://localhost:5173",
})
);
}
app.use(express.json());//this middleware will parse JSON bodies:req.body
app.use("/api", ratelimiter);
app.use("/api/notes", routes);
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}



connectDB().then(()=>{
app.listen(PORT,()=>{
console.log("Server started on port :",PORT);
});
});

