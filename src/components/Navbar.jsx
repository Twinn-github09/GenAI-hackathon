import React from "react";
import { Link } from "react-router-dom";
import "./style.css"; // Add your navbar styling here

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/main">Ask Legal Query</Link>
        </li>
        <li>
          <Link to="/case-studies">Know Legal Terms</Link>
        </li>
        <li>
          <Link to="/Gn">Gender-Neutral-Text-Editor</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
