import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Docs from "./pages/Docs";
import NotesManager from "./pages/NotesManager";
import Home from "./pages/Home"; // <--- Import Home

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>
          {/* Ubah Route "/" menjadi ke Home */}
          <Route path="/" element={<Home />} />

          <Route path="/docs" element={<Docs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<NotesManager />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
