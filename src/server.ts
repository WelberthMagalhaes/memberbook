import dotenv from "dotenv";
import app from "./app";

dotenv.config();
const PORT = process.env.PORT || 3050;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});