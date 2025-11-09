import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectToDB } from "./database/mongoose.js";
import registerRoute from "./routes/auth/register.js";
import loginRoute from "./routes/auth/login.js";
const app = express();
connectToDB();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());app.get("/", (req, res) => {
  res.json({ status: "ok" }).status(200);
});

app.use("/api/auth", registerRoute);
app.use("/api/auth", loginRoute);

app.listen(PORT, (err) => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
