import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Final/Navbar"; // Import Navbar
import Home from "./components/Final/Home";
import Main from "./components/Final/Main";
import CaseStudies from "./components/Final/CaseStudies";
import FAQ from "./components/Final/FAQ";
import Gn1 from "./components/Final/Gn"
import "./App.css";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Navbar */}
        <Navbar />
        {/* Content Area */}
        <div style={{ flex: 1, padding: "1rem", marginTop: "60px" }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/main" element={<Main />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/Gn" element={< Gn1/>} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
