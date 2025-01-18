import React, { useState } from "react";
import { marked } from "marked";
import "./Gn.css"; // Updated CSS file

const GenderEqualityEditor2 = () => {
  const [editorText, setEditorText] = useState("");
  const [suggestedText, setSuggestedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditor, setShowEditor] = useState(true);
  const [showSuggestedText, setShowSuggestedText] = useState(false);

  const handleTextChange = (e) => {
    setEditorText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/gender-neutral-language-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_text: editorText }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setSuggestedText(data.main_response); // Assuming the AI response will have this structure
      setShowEditor(false);
      setShowSuggestedText(true);
    } catch (err) {
      setError(`Failed to fetch suggestions. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEditorText("");
    setShowEditor(true);
    setShowSuggestedText(false);
    setSuggestedText("");
  };

  const renderEditor = () => (
    <div className="editor-container2 glass2">
      <h2 className="editor-heading2">Gender-Equality Text Editor</h2>
      <form onSubmit={handleSubmit} className="editor-form2">
        <div className="editor-textarea-container2">
          <label htmlFor="editorText" className="editor-label2">
            Enter your text:
            <span className="tooltip2">Input any text, and we will suggest gender-neutral alternatives.</span>
          </label>
          <textarea
            id="editorText"
            name="editorText"
            value={editorText}
            onChange={handleTextChange}
            required
            className="editor-textarea2"
            placeholder="Enter your text here"
          />
        </div>
        <div className="editor-actions2">
          <button type="submit" className="submit-button2">
            {loading ? "Loading..." : "Submit"}
          </button>
          <button type="button" className="cancel-button2" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
      {error && <div className="error-message2">{error}</div>}
    </div>
  );

  const renderSuggestedText = () => (
    <div className="suggested-text-container2 glass2">
      <h2 className="suggested-text-heading2">Suggested Gender-Neutral Language</h2>
      <div className="suggested-text-content2">
        {/* Use marked to convert markdown to HTML */}
        <div dangerouslySetInnerHTML={{ __html: marked(suggestedText) }} />
      </div>
      <button className="back-button2" onClick={handleReset}>
        Back to Editor
      </button>
    </div>
  );

  return (
    <div className="gender-equality-editor2">
      {showEditor && renderEditor()}
      {showSuggestedText && renderSuggestedText()}
    </div>
  );
};

export default GenderEqualityEditor2;
