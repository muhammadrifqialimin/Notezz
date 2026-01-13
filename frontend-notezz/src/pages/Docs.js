import React from "react";

export default function Docs() {
  return (
    <div className="container" style={{ maxWidth: "900px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>📚 Dokumentasi API Notezz</h1>
        <p style={{ color: "#666" }}>
          Panduan lengkap integrasi API untuk pengembang. <br />
          Terdapat dua jenis endpoint: <strong>Management</strong> (Akun & Key)
          dan <strong>Public</strong> (Catatan).
        </p>
      </div>

      {/* --- BAGIAN 1: AUTHENTICATION FLOW --- */}
      <div
        className="card"
        style={{ borderLeft: "5px solid #8e44ad", marginBottom: "30px" }}
      >
        <h2>🔐 Konsep Autentikasi</h2>
        <p>Sistem ini menggunakan 2 lapis keamanan:</p>
        <ol>
          <li>
            <strong>JWT Token (Bearer):</strong> Digunakan hanya untuk Login dan
            Generate API Key di Dashboard.
          </li>
          <li>
            <strong>API Key (x-api-key):</strong> Digunakan untuk mengakses
            endpoint Public (CRUD Catatan).
          </li>
        </ol>
      </div>

      {/* --- BAGIAN 2: MANAGEMENT API --- */}
      <h2 style={{ borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
        1. Management API (Internal)
      </h2>
      <p>Digunakan untuk mendaftar akun dan membuat API Key.</p>
      <code style={styles.baseUrl}>Base URL: http://localhost:3000</code>

      {/* Register */}
      <div style={styles.endpointBox}>
        <div style={styles.headerBox}>
          <span style={styles.badgePost}>POST</span>{" "}
          <code style={styles.url}>/auth/register</code>
        </div>
        <p>Mendaftarkan akun developer baru.</p>

        <div style={styles.codeBlock}>
          <strong>Request Body:</strong>
          <pre>{`{
  "name": "Rifqy",
  "email": "rifqy@example.com",
  "password": "rahasia123"
}`}</pre>
        </div>
      </div>

      {/* Login */}
      <div style={styles.endpointBox}>
        <div style={styles.headerBox}>
          <span style={styles.badgePost}>POST</span>{" "}
          <code style={styles.url}>/auth/login</code>
        </div>
        <p>Login untuk mendapatkan Token JWT.</p>

        <div style={styles.codeBlock}>
          <strong>Request Body:</strong>
          <pre>{`{
  "email": "rifqy@example.com",
  "password": "rahasia123"
}`}</pre>

          <strong>Response Success (200):</strong>
          <pre>{`{
  "message": "Login sukses",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "name": "Rifqy"
}`}</pre>
        </div>
      </div>

      {/* Generate Key */}
      <div style={styles.endpointBox}>
        <div style={styles.headerBox}>
          <span style={styles.badgePost}>POST</span>{" "}
          <code style={styles.url}>/dashboard/generate-key</code>
        </div>
        <p>Membuat API Key baru. Memerlukan header Authorization.</p>

        <div style={styles.codeBlock}>
          <strong>Headers:</strong>
          <pre>Authorization: Bearer [JWT_TOKEN_DARI_LOGIN]</pre>

          <strong>Response Success (201):</strong>
          <pre>{`{
  "message": "API Key berhasil dibuat",
  "apiKey": "sk_live_8a7b9c2d..."
}`}</pre>
        </div>
      </div>

      {/* --- BAGIAN 3: PUBLIC API --- */}
      <br />
      <br />
      <h2 style={{ borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
        2. Public API (Product)
      </h2>
      <p>Digunakan oleh aplikasi luar untuk mengelola catatan.</p>
      <code style={styles.baseUrl}>Base URL: http://localhost:3000/api/v1</code>

      <div
        style={{
          background: "#e8f6f3",
          padding: "10px",
          borderRadius: "5px",
          margin: "10px 0",
        }}
      >
        <strong>⚠️ Wajib Header:</strong> Semua request di bawah ini harus
        menyertakan header <code>x-api-key</code>.
      </div>

      {/* GET ALL */}
      <div style={styles.endpointBox}>
        <div style={styles.headerBox}>
          <span style={styles.badgeGet}>GET</span>{" "}
          <code style={styles.url}>/notes</code>
        </div>
        <p>Mengambil semua catatan milik API Key tersebut.</p>
        <div style={styles.codeBlock}>
          <strong>Response Success (200):</strong>
          <pre>{`{
  "success": true,
  "total": 2,
  "data": [
    { "id": 1, "title": "Catatan A", "content": "...", "createdAt": "..." },
    { "id": 2, "title": "Catatan B", "content": "...", "createdAt": "..." }
  ]
}`}</pre>
        </div>
      </div>

      {/* GET DETAIL */}
      <div style={styles.endpointBox}>
        <div style={styles.headerBox}>
          <span style={styles.badgeGet}>GET</span>{" "}
          <code style={styles.url}>/notes/:id</code>
        </div>
        <p>Melihat detail satu catatan spesifik.</p>
      </div>

      {/* POST */}
      <div style={styles.endpointBox}>
        <div style={styles.headerBox}>
          <span style={styles.badgePost}>POST</span>{" "}
          <code style={styles.url}>/notes</code>
        </div>
        <p>Membuat catatan baru.</p>
        <div style={styles.codeBlock}>
          <strong>Request Body:</strong>
          <pre>{`{
  "title": "Ide Skripsi",
  "content": "Membuat Open API Platform"
}`}</pre>
        </div>
      </div>

      {/* PUT */}
      <div style={styles.endpointBox}>
        <div style={styles.headerBox}>
          <span style={styles.badgePut}>PUT</span>{" "}
          <code style={styles.url}>/notes/:id</code>
        </div>
        <p>Update judul atau isi catatan.</p>
        <div style={styles.codeBlock}>
          <strong>Request Body:</strong>
          <pre>{`{
  "title": "Revisi Ide Skripsi", 
  "content": "Ganti judul jadi Backend Service"
}`}</pre>
        </div>
      </div>

      {/* DELETE */}
      <div style={styles.endpointBox}>
        <div style={styles.headerBox}>
          <span style={styles.badgeDelete}>DELETE</span>{" "}
          <code style={styles.url}>/notes/:id</code>
        </div>
        <p>Menghapus catatan secara permanen.</p>
        <div style={styles.codeBlock}>
          <strong>Response Success (200):</strong>
          <pre>{`{ "success": true, "message": "Catatan berhasil dihapus" }`}</pre>
        </div>
      </div>
    </div>
  );
}

// --- STYLING ---
const styles = {
  baseUrl: {
    background: "#2c3e50",
    color: "#ecf0f1",
    padding: "10px",
    display: "block",
    borderRadius: "5px",
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  endpointBox: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  headerBox: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  codeBlock: {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "5px",
    marginTop: "10px",
    fontSize: "0.9rem",
  },
  url: {
    background: "#eee",
    padding: "5px 10px",
    borderRadius: "4px",
    fontWeight: "bold",
    marginLeft: "10px",
    fontFamily: "monospace",
    fontSize: "1.1rem",
  },
  badgeGet: {
    background: "#3498db",
    color: "white",
    padding: "5px 10px",
    borderRadius: "4px",
    fontWeight: "bold",
  },
  badgePost: {
    background: "#27ae60",
    color: "white",
    padding: "5px 10px",
    borderRadius: "4px",
    fontWeight: "bold",
  },
  badgePut: {
    background: "#f39c12",
    color: "white",
    padding: "5px 10px",
    borderRadius: "4px",
    fontWeight: "bold",
  },
  badgeDelete: {
    background: "#c0392b",
    color: "white",
    padding: "5px 10px",
    borderRadius: "4px",
    fontWeight: "bold",
  },
};
