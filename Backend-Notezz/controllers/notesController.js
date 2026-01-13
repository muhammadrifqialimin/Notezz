const { Note } = require("../models");

module.exports = {
  // 1. GET ALL: Ambil semua catatan milik API Key tersebut
  getAllNotes: async (req, res) => {
    try {
      // req.apiKeyData.id didapat dari middleware 'apiKeyAuth'
      // Kita filter agar hanya menampilkan catatan milik key ini saja
      const notes = await Note.findAll({
        where: { apiKeyId: req.apiKeyData.id },
        order: [["createdAt", "DESC"]], // Urutkan dari yang terbaru
      });

      res.json({
        success: true,
        total: notes.length,
        data: notes,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 2. GET DETAIL: Ambil 1 catatan spesifik
  getNoteDetail: async (req, res) => {
    try {
      const { id } = req.params; // Ambil ID dari URL (misal: /notes/5)

      const note = await Note.findOne({
        where: {
          id: id,
          apiKeyId: req.apiKeyData.id, // PENTING: Cek kepemilikan
        },
      });

      if (!note) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Catatan tidak ditemukan atau bukan milik Anda",
          });
      }

      res.json({
        success: true,
        data: note,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 3. POST: Buat catatan baru
  createNote: async (req, res) => {
    try {
      const { title, content } = req.body;

      // Validasi sederhana
      if (!title || !content) {
        return res
          .status(400)
          .json({ success: false, message: "Title dan content wajib diisi" });
      }

      // Simpan catatan nempel ke API Key ID
      const newNote = await Note.create({
        title,
        content,
        apiKeyId: req.apiKeyData.id,
      });

      res.status(201).json({
        success: true,
        message: "Catatan berhasil dibuat",
        data: newNote,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 4. PUT: Update catatan
  updateNote: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      // Cari dulu catatannya
      const note = await Note.findOne({
        where: { id: id, apiKeyId: req.apiKeyData.id },
      });

      if (!note) {
        return res
          .status(404)
          .json({ success: false, message: "Catatan tidak ditemukan" });
      }

      // Update data
      await note.update({
        title: title || note.title, // Kalau kosong, pakai data lama
        content: content || note.content,
      });

      res.json({
        success: true,
        message: "Catatan berhasil diupdate",
        data: note,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 5. DELETE: Hapus Catatan
  deleteNote: async (req, res) => {
    try {
      const { id } = req.params;

      // Langsung hapus dengan filter apiKeyId
      const deleted = await Note.destroy({
        where: {
          id: id,
          apiKeyId: req.apiKeyData.id,
        },
      });

      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Catatan tidak ditemukan" });
      }

      res.json({ success: true, message: "Catatan berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
