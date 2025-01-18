import React from "react";
import "./Home.css"; // Updated CSS for Women theme
import { assets } from "../../assets/assets"; // Import assets

const Home = () => {
  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <h1>Welcome to Nyaya-Sethu Chatbot</h1>
        <p>
          Empowering women by simplifying legal processes and providing
          personalized guidance.
        </p>
      </header>

      {/* Key Features Section */}
      <section className="key-features">
        <h2>Key Features</h2>
        <div className="features-marquee">
          <div className="features-marquee-content">
            {[
              {
                title: "Legal Document Summaries",
                description:
                  "Upload your legal documents for concise summaries and easy-to-understand explanations.",
              },
              {
                title: "Rights and Violations Identification",
                description:
                  "The chatbot identifies rights and violations, offering tailored advice based on your situation.",
              },
              {
                title: "Personalized Legal Documents",
                description:
                  "Generate customized legal documents such as affidavits or complaints that ensure legal compliance.",
              },
              {
                title: "Step-by-Step Legal Guidance",
                description:
                  "Get step-by-step assistance on how to navigate legal issues effectively, with actionable recommendations.",
              },
              {
                title: "Document Analysis & Image Recognition",
                description:
                  "The chatbot analyzes legal documents and images, helping you understand intricate legal details.",
              },
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gender Equality Section */}
      <section className="gender-equality">
        <h2>Promoting Gender Equality</h2>
        <p>
          At Nyaya-Sethu, we believe in empowering women and creating a fair and
          just society for all. Our chatbot is designed to bridge the gap in
          access to legal resources, ensuring women can:
        </p>
        <ul>
          <li>Understand their legal rights and protections.</li>
          <li>Seek guidance on gender-based violations such as harassment or discrimination.</li>
          <li>
            Access resources to report violations, including customized legal
            documents for their specific situations.
          </li>
          <li>
            Gain clarity on complex legal processes through interactive,
            personalized support.
          </li>
        </ul>
        <p>
          By integrating advanced AI, we aim to make legal assistance accessible
          and actionable, fostering a society where equality is not just an
          ideal but a reality.
        </p>
      </section>

      {/* Video Section */}
      <section className="video-container">
        <h2>Watch Our Introduction Video</h2>
        <video controls width="1440" height="680">
          <source src={assets.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    </div>
  );
};

export default Home;
