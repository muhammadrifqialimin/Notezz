import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NotesManager() {
  const [notes, setNotes] = useState([]);
  const [apiKey, setApiKey] = useState(""); // Menyimpan Key yang sedang dipakai
  const [loading, setLoading] = useState(true);

  // State untuk Form (Create/Update)
  const [form, setForm] = useState({ title: "", content: "" });
  const [editMode, setEditMode] = useState(null); // ID note yang sedang diedit (null jika mode create)

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 1. SAAT LOAD: Cari API Key user dulu
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchApiKey();
    // eslint-disable-next-line
  }, []);

  // 2. Jika API Key sudah dapat, baru ambil data Notes
  useEffect(() => {
    if (apiKey) {
      fetchNotes();
    }
    // eslint-disable-next-line
  }, [apiKey]);

  // FUNGSI: Ambil API Key dari Dashboard
  const fetchApiKey = async () => {
    try {
      const res = await axios.get("http://localhost:3000/dashboard/my-keys", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const keys = res.data.data;
      if (keys.length > 0) {
        // Ambil key pertama yang aktif
        const activeKey = keys.find((k) => k.isActive) || keys[0];
        setApiKey(activeKey.key);
      } else {
        setLoading(false); // Tidak punya key
      }
    } catch (error) {
      alert("Gagal mengambil API Key user.");
    }
  };

  // FUNGSI: CRUD - GET NOTES
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/notes", {
        headers: { "x-api-key": apiKey }, // PENTING: Pakai header API Key
      });
      setNotes(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // FUNGSI: CRUD - CREATE & UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey) return alert("Anda belum punya API Key!");

    try {
      if (editMode) {
        // Mode UPDATE (PUT)
        await axios.put(
          `http://localhost:3000/api/v1/notes/${editMode}`,
          form,
          {
            headers: { "x-api-key": apiKey },
          }
        );
        alert("Catatan berhasil diupdate!");
      } else {
        // Mode CREATE (POST)
        await axios.post("http://localhost:3000/api/v1/notes", form, {
          headers: { "x-api-key": apiKey },
        });
        alert("Catatan berhasil dibuat!");
      }

      // Reset Form & Refresh Data
      setForm({ title: "", content: "" });
      setEditMode(null);
      fetchNotes();
    } catch (error) {
      alert(
        "Gagal menyimpan catatan: " + (error.response?.data?.message || "Error")
      );
    }
  };

  // FUNGSI: CRUD - DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus catatan ini?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/v1/notes/${id}`, {
        headers: { "x-api-key": apiKey },
      });
      fetchNotes();
    } catch (error) {
      alert("Gagal menghapus.");
    }
  };

  // FUNGSI: Persiapan Edit
  const handleEdit = (note) => {
    setEditMode(note.id);
    setForm({ title: note.title, content: note.content });
    // Scroll ke atas (ke form)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // RENDER TAMPILAN
  if (loading && !apiKey)
    return (
      <div className="container">
        <p>Loading API Key...</p>
      </div>
    );

  return (
    <div className="container">
      <h1>📒 Notes Manager (Demo App)</h1>

      {/* INFO SECTION */}
      {!apiKey ? (
        <div className="card" style={{ borderColor: "red" }}>
          <p style={{ color: "red" }}>⚠️ Anda belum memiliki API Key.</p>
          <button onClick={() => navigate("/dashboard")}>
            Ke Dashboard & Generate Key
          </button>
        </div>
      ) : (
        <p
          style={{
            background: "#e8f6f3",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Menggunakan API Key: <strong>{apiKey}</strong>
        </p>
      )}

      {/* FORM SECTION */}
      {apiKey && (
        <div className="card">
          <h3>{editMode ? "✏️ Edit Catatan" : "📝 Buat Catatan Baru"}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Judul Catatan"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Isi Catatan..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows="3"
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
              required
            ></textarea>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{ background: editMode ? "#f39c12" : "#3498db" }}
              >
                {editMode ? "Update Note" : "Simpan Note"}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(null);
                    setForm({ title: "", content: "" });
                  }}
                  style={{ background: "#95a5a6" }}
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* LIST SECTION */}
      <div style={{ marginTop: "30px" }}>
        <h3>Daftar Catatan Anda</h3>
        {notes.length === 0 ? (
          <p>Belum ada catatan.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="card"
              style={{ borderLeft: "5px solid #3498db" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <h2 style={{ margin: "0 0 10px 0" }}>{note.title}</h2>
                  <p style={{ whiteSpace: "pre-wrap" }}>{note.content}</p>
                  <small style={{ color: "#888" }}>
                    Dibuat: {new Date(note.createdAt).toLocaleString()}
                  </small>
                </div>
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => handleEdit(note)}
                    style={{
                      background: "#f1c40f",
                      padding: "5px 10px",
                      fontSize: "14px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    style={{
                      background: "#e74c3c",
                      padding: "5px 10px",
                      fontSize: "14px",
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
