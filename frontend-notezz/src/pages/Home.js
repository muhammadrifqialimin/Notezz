import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="container"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      <div
        className="card"
        style={{
          padding: "50px 20px",
          background: "linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)",
        }}
      >
        <h1
          style={{ fontSize: "3rem", color: "#2c3e50", marginBottom: "10px" }}
        >
          🚀 Notezz Open API
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#7f8c8d",
            maxWidth: "600px",
            margin: "0 auto 30px",
          }}
        >
          Solusi backend siap pakai untuk menyimpan catatan di aplikasi Anda.
          Fokus pada Frontend, biarkan kami yang mengurus datanya.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Link to="/register">
            <button
              style={{
                padding: "12px 30px",
                fontSize: "1.1rem",
                borderRadius: "50px",
              }}
            >
              Mulai Gratis
            </button>
          </Link>
          <Link to="/docs">
            <button
              style={{
                padding: "12px 30px",
                fontSize: "1.1rem",
                borderRadius: "50px",
                background: "transparent",
                border: "2px solid #3498db",
                color: "#3498db",
              }}
            >
              Baca Dokumentasi
            </button>
          </Link>
        </div>
      </div>

      <div
        style={{
          marginTop: "50px",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <FeatureBox
          icon="⚡"
          title="Cepat"
          desc="Response time rendah dengan arsitektur modern."
        />
        <FeatureBox
          icon="🔒"
          title="Aman"
          desc="Dilengkapi autentikasi API Key dan JWT."
        />
        <FeatureBox
          icon="📚"
          title="Terdocumentasi"
          desc="Panduan integrasi lengkap dan mudah dipahami."
        />
      </div>
    </div>
  );
}

// Komponen kecil untuk kotak fitur (biar rapi)
function FeatureBox({ icon, title, desc }) {
  return (
    <div
      className="card"
      style={{ width: "250px", textAlign: "left", marginTop: 0 }}
    >
      <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{icon}</div>
      <h3 style={{ margin: "0 0 10px" }}>{title}</h3>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>{desc}</p>
    </div>
  );
}
