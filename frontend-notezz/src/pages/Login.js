import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Tembak API Login Backend
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );

      // Simpan token dan nama user di browser
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.name);

      alert("Login Sukses!");
      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message || "Login Gagal. Cek email/password."
      );
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "400px", margin: "50px auto" }}>
        <h2>Login Developer</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button type="submit" style={{ width: "100%" }}>
            Masuk Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
