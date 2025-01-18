import React, { useState } from "react";
import "./casestudies.css";
import { marked } from "marked";

const CaseStudies = () => {
  const [legalFormData, setLegalFormData] = useState({ term: "" });
  const [resultData, setResultData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [suggestions, setSuggestions] = useState(["Contract", "Liability", "Tort", "Patent", "Intellectual Property"]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLegalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/explain-legal-term", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_prompt: legalFormData.term }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const parsedData = marked.parse(data.main_response);
      setResultData(parsedData);
      setShowForm(false);
      setShowResults(true);
    } catch (err) {
      setError(`Failed to fetch the explanation. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLegalFormData({ term: "" });
    setShowForm(true);
    setShowResults(false);
    setResultData("");
  };

  const renderForm = () => (

    <div className="form-container1 glass1">
      <h2 className="form-heading1">Legal Term Explanation</h2>
      <form onSubmit={handleFormSubmit} className="legal-form1">
        <div className="form-group1">
          <label htmlFor="term" className="tooltip-label1">
            Legal Term:
            <span className="tooltip1">Enter any legal term to get a detailed explanation</span>
          </label>
          <br></br>
          <br></br>
          <input
            type="text"
            id="term"
            name="term"
            value={legalFormData.term}
            onChange={handleFormChange}
            required
            className="form-input1"
            placeholder="Enter the legal term"
          />
        </div>
        <div className="suggestions1">
          <h4>Suggestions:</h4>
          <br></br>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => setLegalFormData({ term: suggestion })}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
        <div className="form-actions1">
          <button type="submit" className="submit1-button">
            {loading ? "Loading..." : "Submit"}
          </button>
          <button type="button" className="cancel-button1" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
      {error && <div className="error-message1">{error}</div>}
    </div>
  
  );

  const renderResults = () => (
    <div className="results-container1 glass1">
      <h2 className="results-heading1">Explanation</h2>
      <div
        className="results-content1"
        dangerouslySetInnerHTML={{ __html: resultData }}
      />
      <button className="back-button1" onClick={handleReset}>
        Back to Form
      </button>
    </div>
  );

  return (
    <div className="legal-term-help1">
      {showForm && renderForm()}
      {showResults && renderResults()}
    </div>
  );
};

export default CaseStudies;
