const { ApiKey } = require("../models");

const apiKeyAuth = async (req, res, next) => {
  // 1. Ambil key dari header 'x-api-key'
  const keyFromHeader = req.headers["x-api-key"];

  if (!keyFromHeader) {
    return res.status(401).json({
      success: false,
      message: "API Key tidak ditemukan. Sertakan header 'x-api-key'.",
    });
  }

  try {
    // 2. Cek ke database apakah key ada dan aktif
    const validKey = await ApiKey.findOne({
      where: { key: keyFromHeader, isActive: true },
    });

    if (!validKey) {
      return res.status(403).json({
        success: false,
        message: "API Key tidak valid atau tidak aktif.",
      });
    }

    // 3. PENTING: Simpan data key ini ke request agar bisa dipakai di controller
    req.apiKeyData = validKey;

    next(); // Lanjut ke controller
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = apiKeyAuth;
