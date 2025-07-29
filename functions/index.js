const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const mockJobs = [
  {
    id: 1,
    title: "Frontend-разработчик",
    company: "JobMatch",
    location: "Стамбул",
    salary: "₺15,000 - ₺20,000",
    skills: ["React", "JavaScript", "HTML/CSS"],
    status: "в ожидании"
  }
];

app.get("/jobs", (req, res) => {
  res.status(200).json(mockJobs);
});

exports.api = functions.https.onRequest(app);

