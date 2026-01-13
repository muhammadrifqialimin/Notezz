const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Import Controller
// MENGGUNAKAN (..) KARENA KITA MUNDUR DARI FOLDER ROUTES
const dashboardController = require("../controllers/dashboardController");
const notesController = require("../controllers/notesController");

// Import Middleware
const apiKeyAuth = require("../middleware/apiKeyAuth");

// Middleware Cek Login Dashboard (JWT) - Sederhana
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Butuh login" });
  try {
    // Pastikan "rahasia_negara_123" sama dengan yang di Controller Login
    const decoded = jwt.verify(token.split(" ")[1], "rahasia_negara_123");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid" });
  }
};

// === GROUP 1: ROUTE DASHBOARD (Dipakai Frontend React Kamu) ===
router.post("/auth/register", dashboardController.register);
router.post("/auth/login", dashboardController.login);
router.post(
  "/dashboard/generate-key",
  verifyToken,
  dashboardController.generateKey
);
router.get("/dashboard/my-keys", verifyToken, dashboardController.getMyKeys);

// === GROUP 2: OPEN API (Dipakai Developer Lain / Postman) ===
// Endpoint ini diproteksi oleh apiKeyAuth, bukan login user

// GET semua catatan
router.get("/api/v1/notes", apiKeyAuth, notesController.getAllNotes);

// GET detail 1 catatan (NEW)
router.get("/api/v1/notes/:id", apiKeyAuth, notesController.getNoteDetail);

// POST buat catatan
router.post("/api/v1/notes", apiKeyAuth, notesController.createNote);

// PUT update catatan (NEW)
router.put("/api/v1/notes/:id", apiKeyAuth, notesController.updateNote);

// DELETE hapus catatan
router.delete("/api/v1/notes/:id", apiKeyAuth, notesController.deleteNote);

module.exports = router;
