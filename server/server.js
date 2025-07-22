import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRouter from "./routes/contactRoutes.js";
import groupRouter from "./routes/groupRoutes.js";
import mongoose from "mongoose";

dotenv.config();

app.use(cors({
  origin: "https://contactmanagerapps.netlify.app",
  credentials: true
}));
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));


app.use("/contacts", contactRouter);
app.use("/groups", groupRouter);


const PORT = process.env.PORT || 4000;
connectDB(mongoose).then(() => {
    mongoose.connection.once("open", () => {
        console.log("Connected to MongoDB");
    });
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});