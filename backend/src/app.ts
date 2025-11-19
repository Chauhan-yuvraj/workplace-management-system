import express from "express";
import cors from "cors";
import visitorRoutes from "./routes/visitor.routes";

const app = express();

app.use(cors({
    origin: '*', // Allow all origins in development
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use("/api/visitors", visitorRoutes);


export default app;
