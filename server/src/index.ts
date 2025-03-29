require("dotenv").config(); //va importato all'inizio
import express from "express";
import api from "./routes/api";
import cors from "cors";
import "./models/associations";

const app = express();

// Abilita CORS per tutte le richieste
app.use(cors());

// Parse any incoming JSON
app.use(express.json());

// Versioning delle APIs
app.use("/v1", api);

export default app;
