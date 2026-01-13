const express = require("express");
const cors = require("cors");
const app = express();

// Load Routes yang baru saja kita buat di langkah 1
// Node.js otomatis mencari file index.js di dalam folder routes
const router = require("./routes");

// === MIDDLEWARE GLOBAL ===
app.use(cors()); // Agar bisa diakses frontend React
app.use(express.json()); // Agar bisa baca body JSON (penting!)
app.use(express.urlencoded({ extended: true }));

// === GUNAKAN ROUTES ===
app.use(router);

// === JALANKAN SERVER ===
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Open API berjalan di http://localhost:${PORT}`);
});
