import express from "express";
import authRoutes from "./routes/authRoutes.js"; 
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/auth", authRoutes); // Use the auth routes
app.use("/api/users", userRoutes);  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});