const { User, ApiKey } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // Bawaan Node.js

// KUNCI RAHASIA TOKEN (Idealnya taruh di file .env)
const SECRET_KEY = "rahasia_negara_123";

module.exports = {
  // 1. REGISTER (POST /auth/register)
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Validasi input
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
      }

      // Cek apakah email sudah ada
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }

      // Enkripsi password sebelum simpan ke database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan User Baru
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "Register berhasil, silakan login",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 2. LOGIN (POST /auth/login)
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Cari user berdasarkan email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Email atau password salah" });
      }

      // Cek password (bandingkan input user dengan yang di database)
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Email atau password salah" });
      }

      // Buat Token JWT (KTP Digital)
      // Token ini nanti dipakai user untuk Generate Key
      const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: "1d" } // Token berlaku 1 hari
      );

      res.json({
        message: "Login sukses",
        token: token,
        name: user.name,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 3. GENERATE API KEY (POST /dashboard/generate-key)
  generateKey: async (req, res) => {
    try {
      // req.user.id didapat dari Middleware 'verifyToken' (JWT)
      const userId = req.user.id;

      // Buat string random (contoh: sk_live_8a7b9c...)
      const randomString = crypto.randomBytes(16).toString("hex");
      const newKeyString = `sk_live_${randomString}`;

      // Simpan ke database ApiKey
      const newKey = await ApiKey.create({
        userId: userId,
        key: newKeyString,
        isActive: true,
      });

      res.status(201).json({
        message: "API Key berhasil dibuat",
        apiKey: newKey.key,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 4. LIHAT KEY SAYA (GET /dashboard/my-keys)
  getMyKeys: async (req, res) => {
    try {
      const userId = req.user.id;

      const keys = await ApiKey.findAll({
        where: { userId: userId },
        order: [["createdAt", "DESC"]],
      });

      res.json({
        success: true,
        data: keys,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
