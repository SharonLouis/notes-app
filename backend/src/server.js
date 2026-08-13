import express from "express"; 
import routes from "./Routes/routes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/ratelimiter.js";
import cors from "cors"

 
dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 5001;

//middleware 
app.use(
    cors({
    origin:"http://localhost:5173",
})
);
app.use(express.json());//this middleware will parse JSON bodies:req.body
app.use(ratelimiter);


app.use("/api/notes", routes);

connectDB().then(()=>{
app.listen(PORT,()=>{
console.log("Server started on port :",PORT);
});
});


