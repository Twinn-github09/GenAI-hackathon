
import FeedbackForm from "./FeedbackForm";
import "./faq.css"; // Import the CSS file for styling
import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <div className="faq-content">
        <p className="faq-intro">
          Welcome to our FAQ section! Here you'll find answers to common questions about our chatbot and its features. If you don't find what you're looking for, feel free to leave feedback below.
        </p>

        <ul className="faq-list">
          {[
            {
              question: "What is Nyaya Sethu?",
              answer:
                "Nyaya Sethu is a chatbot designed to provide legal assistance, advice, and resources with a focus on promoting gender equality and social justice. It ensures that legal information is accessible to everyone.",
              icon: "⚖️",
            },
            {
              question: "How does Nyaya Sethu work?",
              answer:
                "Getting started is simple! Just ask Nyaya Sethu your legal questions or concerns, and it will provide guidance based on the information available in its database. The chatbot is designed to ensure a fair and equal experience for everyone.",
              icon: "💬",
            },
            {
              question: "Can Nyaya Sethu help with gender-related legal issues?",
              answer:
                "Yes! Nyaya Sethu is specifically designed to assist with gender equality issues, including workplace discrimination, equal pay, rights to education, and more. It empowers individuals with knowledge to fight for equal rights.",
              icon: "♀️",
            },
          ].map((faq, index) => (
            <li key={index} className="faq-item">
              <div className="faq-item-header" onClick={() => toggleAnswer(index)}>
                <strong className="faq-question">{faq.question}</strong>
                <span className="faq-icon">{faq.icon}</span>
              </div>
              {openIndex === index && (
                <p className="faq-answer">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
     

        <div className="feedback-section">
          <h2 className="feedback-title">Your Feedback Matters</h2>
          <p className="feedback-description">
            Have suggestions or need more information? Share your thoughts below to help us improve!
          </p>
          <FeedbackForm />
        </div>
      </div>

      <div className="cta-section">
        <h2 className="cta-title">Still Have Questions?</h2>
        <p className="cta-description">
          Our team is here to help! Reach out to us anytime, and we'll get back to you as soon as possible.
        </p>
        <button className="cta-button">Contact Support</button>
      </div>

      <div className="decorative-section">
        <div className="rotating-3d-box">
          <span className="box-side front">Empower</span>
          <span className="box-side back">Educate</span>
          <span className="box-side left">Support</span>
          <span className="box-side right">Justice</span>
        </div>
      </div>
    </div>
  );
};


export default FAQ;
