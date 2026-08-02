

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json());


const defaultData = {
  preferences: { lang: "en", userType: "senior", watchConnected: false },
  contacts: [
    { id: 1, name: "Priya (Daughter)", phone: "+91 98765 43210", relation: "Family" },
    { id: 2, name: "Dr. Sharma", phone: "+91 87654 32109", relation: "Doctor" },
    { id: 3, name: "Ambulance", phone: "108", relation: "Emergency" },
    { id: 4, name: "Police", phone: "100", relation: "Emergency" },
    { id: 5, name: "Neighbor – Rajan", phone: "+91 76543 21098", relation: "Neighbor" },
  ],
};

function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch (err) {
    console.error("Failed to read data file, falling back to defaults:", err);
    return defaultData;
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}


app.get("/api/preferences", (req, res) => {
  const data = readData();
  res.json(data.preferences);
});

app.put("/api/preferences", (req, res) => {
  const data = readData();
  data.preferences = { ...data.preferences, ...req.body };
  writeData(data);
  res.json(data.preferences);
});


app.get("/api/contacts", (req, res) => {
  const data = readData();
  res.json(data.contacts);
});

app.post("/api/contacts", (req, res) => {
  const { name, phone, relation } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "name and phone are required" });
  }
  const data = readData();
  const newContact = { id: Date.now(), name, phone, relation: relation || "Other" };
  data.contacts.push(newContact);
  writeData(data);
  res.status(201).json(newContact);
});

app.put("/api/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readData();
  const idx = data.contacts.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "contact not found" });
  data.contacts[idx] = { ...data.contacts[idx], ...req.body, id };
  writeData(data);
  res.json(data.contacts[idx]);
});

app.delete("/api/contacts/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readData();
  const before = data.contacts.length;
  data.contacts = data.contacts.filter((c) => c.id !== id);
  if (data.contacts.length === before) return res.status(404).json({ error: "contact not found" });
  writeData(data);
  res.status(204).end();
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Saathi backend running on http://localhost:${PORT}`);
});