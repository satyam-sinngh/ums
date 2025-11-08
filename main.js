import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectToDB } from "./database/mongoose.js";
config();
const app = express();
connectToDB();

const PORT = process.env.PORT || 5000;
app.use(cors());


app.get("/", (req, res) => {
  res.json({ status: "ok" }).status(200);
});



app.listen(PORT, (err) => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
