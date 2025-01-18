import React, { useState } from "react";
import "./faq.css"; // Import CSS for styling

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback submitted: ${feedback}`);
    setFeedback("");
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter your feedback here"
        rows="4"
        className="feedback-textarea"
        required
      />
      <br />
      <button type="submit" className="submit-button">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
