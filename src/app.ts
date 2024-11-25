import express from "express";
// import memberRoutes from "./routes/memberRoutes";
import testIniRoutes from "./routes/testIniRoutes";

const app = express();
app.use(express.json());

app.use("/", testIniRoutes);

export default app;
