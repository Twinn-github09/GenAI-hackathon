// import { useContext, useState, useEffect, useRef } from "react";
// import { assets } from "../../assets/assets";
// import "./main2.css";
// import { Context } from "../../Context";
// import { marked } from "marked";

// marked.setOptions({
//   breaks: true,
//   gfm: true,
//   headerIds: false,
// });

// const Main = () => {
//   const { onSent } = useContext(Context);
//   const [loading, setLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [input, setInput] = useState("");
//   const [recentPrompt, setRecentPrompt] = useState("");
//   const [resultData, setResultData] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [filePreviewURL, setFilePreviewURL] = useState(null);
//   const [relatedCases, setRelatedCases] = useState([]);
//   const [legalContext, setLegalContext] = useState("");
//   const [error, setError] = useState(null);
//   const [showRelatedCases, setShowRelatedCases] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   // New state for help form
//   const [showHelpForm, setShowHelpForm] = useState(false);
//   const [helpFormData, setHelpFormData] = useState({
//     name: "",
//     address: "",
//     issue: ""
//   });

//   const sidebarRef = useRef(null);
//   const backButtonRef = useRef(null);
//   const bodyRef = useRef(document.body);
//   const fileInputRef = useRef(null);
//   const imageInputRef = useRef(null);

//   const handleHelpFormChange = (e) => {
//     const { name, value } = e.target;
//     setHelpFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleHelpFormSubmit = async (e) => {
//     e.preventDefault();
    
//       setLoading(true);
//       setShowResults(true);
//       setError(null);

//       const formattedPrompt = `Name: ${helpFormData.name}\nAddress: ${helpFormData.address}\nIssue: ${helpFormData.issue}`;
      
//       const response = await fetch("http://localhost:5000/get-help", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user_prompt: formattedPrompt }),
//       });
      

//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data)
//       setRecentPrompt(`Help request from ${helpFormData.name}`);
//       setResultData(marked(data.main_response));
//       setRelatedCases(data.related_cases || []);
//       setLegalContext(data.legal_context || "");
//       setShowHelpForm(false); 
//       setLoading(false);
//   };

//   const handleGetHelp = () => {
//     setShowHelpForm(true);
//     setShowResults(false);
//   };
  
//   const renderHelpForm = () => (
//     <div className="help-form-container">
//       <h2>Request Legal Help</h2>
//       <form onSubmit={handleHelpFormSubmit} className="help-form">
//         <div className="form-group">
//           <label htmlFor="name">Full Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={helpFormData.name}
//             onChange={handleHelpFormChange}
//             required
//             className="form-input"
//             placeholder="Enter your full name"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="address">Address:</label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             value={helpFormData.address}
//             onChange={handleHelpFormChange}
//             required
//             className="form-input"
//             placeholder="Enter your address"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="issue">Legal Issue:</label>
//           <textarea
//             id="issue"
//             name="issue"
//             value={helpFormData.issue}
//             onChange={handleHelpFormChange}
//             required
//             className="form-textarea"
//             placeholder="Please describe your legal issue in detail"
//             rows="4"
//           />
//         </div>
//         <div className="form-actions">
//           <button type="submit" className="submit-button">
//             Submit
//           </button>
//           <button
//             type="button"
//             className="cancel-button"
//             onClick={() => setShowHelpForm(false)}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setFilePreviewURL(URL.createObjectURL(file));
//       setShowResults(true);
//     }
//   };

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       try {
//         setLoading(true);
//         setShowResults(true);
//         setError(null);
        
//         const formData = new FormData();
//         formData.append('image', file);
        
//         const response = await fetch('http://localhost:5000/process_image', {
//           method: 'POST',
//           body: formData,
//         });
        
//         if (!response.ok) {
//           throw new Error('Failed to process image');
//         }
        
//         const data = await response.json();
//         setRecentPrompt(`Image Analysis: ${data.caption}`);
//         setResultData(marked(data.main_response));
//         setRelatedCases(data.related_cases || []);
//         setLegalContext(data.legal_context || "");
        
//       } catch (error) {
//         console.error('Error processing image:', error);
//         setError(error.message || "An unexpected error occurred");
//         setResultData("");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleAnalyzeDocument = () => {
//     fileInputRef.current.click();
//   };

//   const handleAnalyzeImage = () => {
//     imageInputRef.current.click();
//   };


//   const handleSend = async () => {
//     try {
//       setLoading(true);
//       setShowResults(true);
//       setError(null);      

//       let response;
//       if (selectedFile) {
//         const formData = new FormData();
//         formData.append('pdf', selectedFile);
        
//         response = await fetch('http://localhost:5000/pdf_chat', {
//           method: 'POST',
//           body: formData,
//         });
        
//         setRecentPrompt(`Analyzing document: ${selectedFile.name}`);
//       }
//       else {
//         const trimmedInput = input.trim();
//         if (!trimmedInput) {
//           setError("Please enter a query or upload a document.");
//           setLoading(false);
//           return;
//         }
//         setRecentPrompt(trimmedInput);
//         const requestBody = { user_prompt: trimmedInput };
//         response = await fetch("http://localhost:5000/chat", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(requestBody),
//         });
//       }
      
//       if (!response.ok) {
//         let errorData;
//         try {
//           errorData = await response.json();
//         } catch (e) {
//           console.error("Failed to parse error response:", e);
//           errorData = { error: await response.text() };
//         }
//         throw new Error(errorData?.error || `Server error: ${response.status}`);
//       }

//       const data = await response.json();
//       setResultData(marked(data.main_response));
//       setRelatedCases(data.related_cases || []);
//       setLegalContext(data.legal_context || "");

//       if (onSent) onSent();
//     } catch (error) {
//       console.error("Error in handleSend:", error);
//       setError(error.message || "An unexpected error occurred");
//       setResultData("");
//     } finally {
//       setLoading(false);
//       setInput("");
//     }
//   };

//   const toggleRelatedCases = () => {
//     setShowRelatedCases(!showRelatedCases);
//   };

//   const downloadReport = () => {
//     const reportData = {
//       query: recentPrompt,
//       response: resultData,
//       legalContext,
//       relatedCases,
//     };
//     const blob = new Blob([JSON.stringify(reportData, null, 2)], {
//       type: "application/json",
//     });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "report.json";
//     link.click();
//   };

//   const renderFileCard = () => {
//     if (!selectedFile) return null;
//     return (
//       <div className="file-card">
//         <div className="file-details">
//           <p className="file-name">{selectedFile.name}</p>
//           <p className="file-size">{(selectedFile.size / 1024).toFixed(2)} KB</p>
//         </div>
//         <div className="file-actions">
//           <button
//             className="preview-button"
//             onClick={() => window.open(filePreviewURL, "_blank")}
//           >
//             Preview
//           </button>
//           <button
//             className="remove-button"
//             onClick={() => {
//               setSelectedFile(null);
//               setFilePreviewURL(null);
//             }}
//           >
//             Remove
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const showSidebar = () => {
//     if (sidebarRef.current) {
//       sidebarRef.current.style.display = "block";
//       bodyRef.current.classList.add("blur-background"); 
//       bodyRef.current.classList.add("unblur-sidebar");
//     }
//   };

//   const hideSidebar = () => {
//     if (sidebarRef.current) {
//       sidebarRef.current.style.display = "none";
//       bodyRef.current.classList.remove("blur-background");
//     }
//   };

//   useEffect(() => {
//     if (showRelatedCases) {
//       showSidebar();
//     } else {
//       hideSidebar();
//     }
//   }, [showRelatedCases]);

//   const renderResults = () => (
//     <div className="results-container">
//       <div className="main-response">
//         <div className="response-card">
//           <div className="user-query">
//             <img src={assets.user} alt="User Icon" />
//             <p>{recentPrompt}</p>
//           </div>
//           <div className="bot-response">
//             <img src={assets.chatbot} alt="Chatbot Icon" />
//             <div className="response-content">
//               {loading ? (
//                 <div className="loader">
//                   <div className="spinner"></div>
//                 </div>
//               ) : (
//                 <div dangerouslySetInnerHTML={{ __html: resultData }} />
//               )}
//               {legalContext && (
//                 <div className="legal-context">
//                   <h3>Legal Context</h3>
//                   <p>{legalContext}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="action-buttons">
//           <button className="view-cases-button" onClick={toggleRelatedCases}>
//             View Related Cases
//           </button>
//           <button className="download-report-button" onClick={downloadReport}>
//             Download Report
//           </button>
//         </div>
//       </div>
//       {showRelatedCases && relatedCases.length > 0 && (
//         <div className="related-cases-sidebar" ref={sidebarRef}>
//           <button className="back-button" ref={backButtonRef} onClick={hideSidebar}>Back</button>
//           <h3>Related Cases</h3>
//           <div className="cases-list">
//             {relatedCases.map((case_, index) => (
//               <div key={index} className="case-item">
//                 <h4>{case_.title}</h4>
//                 <a
//                   href={case_.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="case-link"
//                 >
//                   View Case → 
//                 </a>
//                 <div
//                   className="case-summary"
//                   dangerouslySetInnerHTML={{
//                     __html: marked(case_.summary_and_advice),
//                   }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="main">
//       <div className="nav">
//         <p>Legal Advisor Bot</p>
//         <img src={assets.user} alt="User Icon" />
//       </div>
//       <div className="main-container">
//         {showHelpForm ? (
//           renderHelpForm()
//         ) : !showResults ? (
//           <>
//             <div className="greet">
//               <br></br>
//               <br></br>
//               <p>
//                 <span>Welcome to Legal Advisor Bot!</span>
//               </p>
//               <p>How can I assist you with your legal queries today?</p>
//               <div className="welcome-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
//                 <br></br>
//                 <button className="analyze-doc-button" onClick={handleAnalyzeDocument}>
//                   Analyze Document
//                 </button>
//                 <button className="analyze-image-button" onClick={handleAnalyzeImage}>
//                   Analyze Image
//                 </button>
//                 <button className="get-help-button" onClick={handleGetHelp}>
//                   Get Help
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           renderResults()
//         )}
//         <div className="main-bottom">
//           <div className="search-box">
//             <input
//               onChange={(e) => setInput(e.target.value)}
//               value={input}
//               type="text"
//               placeholder="Enter your legal query here"
//               onKeyPress={(e) => {
//                 if (e.key === "Enter") {
//                   handleSend();
//                 }
//               }}
//             />
//             <div className="icon-buttons">
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept=".pdf"
//                 style={{ display: "none" }}
//                 onChange={handleFileUpload}
//               />
//               <input
//                 ref={imageInputRef}
//                 type="file"
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={handleImageUpload}
//               />
//               <img
//                 src={assets.mic_icon}
//                 alt="Voice Input"
//                 onClick={() => setIsListening(!isListening)}
//                 className={isListening ? "listening" : ""}
//               />
//               <img
//                 src={assets.send_icon}
//                 alt="Send Query"
//                 onClick={handleSend}
//               />
//             </div>
//           </div>
//           {renderFileCard()}
//           <div className="bottom-info">
//             <p>
//               Legal Advisor Bot aims to assist with legal information. Always
//               verify details with a certified legal professional.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;

import { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../../assets/assets";
import "./main3.css";
import { Context } from "../../Context";
import { marked } from "marked";


marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
});




const Main = () => {
  const [view, setView] = useState("home"); 
  const { onSent } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [resultData, setResultData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filePreviewURL, setFilePreviewURL] = useState(null);
  const [relatedCases, setRelatedCases] = useState([]);
  const [legalContext, setLegalContext] = useState("");
  const [error, setError] = useState(null);
  const [showRelatedCases, setShowRelatedCases] = useState(false);
  const [isListening, setIsListening] = useState(false);
  // New state for help form
  const [showHelpForm, setShowHelpForm] = useState(false);
  const [helpFormData, setHelpFormData] = useState({
    name: "",
    address: "",
    issue: ""
  });

  const sidebarRef = useRef(null);
  const backButtonRef = useRef(null);
  const bodyRef = useRef(document.body);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleHelpFormChange = (e) => {
    const { name, value } = e.target;
    setHelpFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHelpFormSubmit = async (e) => {
    e.preventDefault();
    
      setLoading(true);
      setShowResults(true);
      setError(null);

      const formattedPrompt = `Name: ${helpFormData.name}\nAddress: ${helpFormData.address}\nIssue: ${helpFormData.issue}`;
      
      const response = await fetch("http://localhost:5000/get-help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_prompt: formattedPrompt }),
      });
      

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      setRecentPrompt(`Help request from ${helpFormData.name}`);
      setResultData(marked(data.main_response));
      setRelatedCases(data.related_cases || []);
      setLegalContext(data.legal_context || "");
      setShowHelpForm(false); 
      setLoading(false);
  };

  const handleGetHelp = () => {
    setShowHelpForm(true);
    setShowResults(false);
  };
  
  const renderHelpForm = () => (
    <div className="help-form-container">
      <h2 className="form-heading">Request Legal Help</h2>
      <form onSubmit={handleHelpFormSubmit} className="help-form">
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={helpFormData.name}
            onChange={handleHelpFormChange}
            required
            className="form-input"
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={helpFormData.address}
            onChange={handleHelpFormChange}
            required
            className="form-input"
            placeholder="Enter your address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="issue">Legal Issue:</label>
          <textarea
            id="issue"
            name="issue"
            value={helpFormData.issue}
            onChange={handleHelpFormChange}
            required
            className="form-textarea"
            placeholder="Please describe your legal issue in detail"
            rows="4"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => setShowHelpForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
  

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreviewURL(URL.createObjectURL(file));
      setShowResults(true);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setLoading(true);
        setShowResults(true);
        setError(null);
        
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch('http://localhost:5000/process_image', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Failed to process image');
        }
        
        const data = await response.json();
        setRecentPrompt(`Image Analysis: ${data.caption}`);
        setResultData(marked(data.main_response));
        setRelatedCases(data.related_cases || []);
        setLegalContext(data.legal_context || "");
        
      } catch (error) {
        console.error('Error processing image:', error);
        setError(error.message || "An unexpected error occurred");
        setResultData("");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAnalyzeDocument = () => {
    fileInputRef.current.click();
  };

  const handleAnalyzeImage = () => {
    imageInputRef.current.click();
  };

  const handleSend = async () => {
    try {
      setLoading(true);
      setShowResults(true);
      setError(null);
  
      let response;
      if (selectedFile) {
        const formData = new FormData();
        formData.append('pdf', selectedFile);
  
        response = await fetch('http://localhost:5000/pdf_chat', {
          method: 'POST',
          body: formData,
        });
  
        setRecentPrompt(`Analyzing document: ${selectedFile.name}`);
      } else {
        const trimmedInput = input.trim();
        if (!trimmedInput) {
          setError("Please enter a query or upload a document.");
          setLoading(false);
          return;
        }
        setRecentPrompt(trimmedInput);
        const requestBody = { user_prompt: trimmedInput };
        response = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });
      }
  
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          console.error("Failed to parse error response:", e);
          errorData = { error: await response.text() };
        }
        throw new Error(errorData?.error || `Server error: ${response.status}`);
      }
  
      const data = await response.json();
      setResultData(marked(data.main_response));
      setRelatedCases(data.related_cases || []);
      setLegalContext(data.legal_context || "");
  
      if (selectedFile) {
        // Clear file and preview after successful analysis
        setSelectedFile(null);
        setFilePreviewURL(null);
      }
  
      if (onSent) onSent();
    } catch (error) {
      console.error("Error in handleSend:", error);
      setError(error.message || "An unexpected error occurred");
      setResultData("");
    } finally {
      setLoading(false);
      setInput("");
    }
  };
  

  // const handleSend = async () => {
  //   try {
  //     setLoading(true);
  //     setShowResults(true);
  //     setError(null);      

  //     let response;
  //     if (selectedFile) {
  //       const formData = new FormData();
  //       formData.append('pdf', selectedFile);
        
  //       response = await fetch('http://localhost:5000/pdf_chat', {
  //         method: 'POST',
  //         body: formData,
  //       });
        
  //       setRecentPrompt(`Analyzing document: ${selectedFile.name}`);
  //     }
  //     else {
  //       const trimmedInput = input.trim();
  //       if (!trimmedInput) {
  //         setError("Please enter a query or upload a document.");
  //         setLoading(false);
  //         return;
  //       }
  //       setRecentPrompt(trimmedInput);
  //       const requestBody = { user_prompt: trimmedInput };
  //       response = await fetch("http://localhost:5000/chat", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(requestBody),
  //       });
  //     }
      
  //     if (!response.ok) {
  //       let errorData;
  //       try {
  //         errorData = await response.json();
  //       } catch (e) {
  //         console.error("Failed to parse error response:", e);
  //         errorData = { error: await response.text() };
  //       }
  //       throw new Error(errorData?.error || `Server error: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setResultData(marked(data.main_response));
  //     setRelatedCases(data.related_cases || []);
  //     setLegalContext(data.legal_context || "");

  //     if (onSent) onSent();
  //   } catch (error) {
  //     console.error("Error in handleSend:", error);
  //     setError(error.message || "An unexpected error occurred");
  //     setResultData("");
  //   } finally {
  //     setLoading(false);
  //     setInput("");
  //   }
  // };

  const toggleRelatedCases = () => {
    setShowRelatedCases(!showRelatedCases);
  };

  const downloadReport = () => {
    const reportData = {
      query: recentPrompt,
      response: resultData,
      legalContext,
      relatedCases,
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.json";
    link.click();
  };
  
  const handleBack = () => {
    setShowResults(false); // Go back to the home view
    setShowHelpForm(false); // Ensure help form is hidden
    setRecentPrompt(""); // Clear the recent prompt
    setResultData(""); // Clear any previous results
    setLegalContext(""); // Clear legal context
    setRelatedCases([]); // Clear related cases
  };
  

  const renderFileCard = () => {
    if (!selectedFile) return null;
    return (
      <div className="file-card">
        <div className="file-details">
          <p className="file-name">{selectedFile.name}</p>
          <p className="file-size">{(selectedFile.size / 1024).toFixed(2)} KB</p>
        </div>
        <div className="file-actions">
          <button
            className="preview-button"
            onClick={() => window.open(filePreviewURL, "_blank")}
          >
            Preview
          </button>
          <button
            className="remove-button"
            onClick={() => {
              setSelectedFile(null);
              setFilePreviewURL(null);
            }}
          >
            Remove
          </button>
        </div>
      </div>
    );
  };

  const showSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.display = "block";
      bodyRef.current.classList.add("blur-background"); 
      bodyRef.current.classList.add("unblur-sidebar");
    }
  };

  const hideSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.display = "none";
      bodyRef.current.classList.remove("blur-background");
    }
  };

  useEffect(() => {
    if (showRelatedCases) {
      showSidebar();
    } else {
      hideSidebar();
    }
  }, [showRelatedCases]);

  const renderResults = () => (
    <div className="results-container">
      <div className="main-response">
        <div className="response-card">
          <div className="user-query">
            <img src={assets.user} alt="User Icon" />
            <p>{recentPrompt}</p>
          </div>
          <div className="bot-response">
            <img src={assets.law} alt="Chatbot Icon" />
            <div className="response-content">
              {loading ? (
                <div className="loader">
                  <div className="spinner"></div>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
              {legalContext && (
                <div className="legal-context">
                  <h3>Legal Context</h3>
                  <p>{legalContext}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <button className="view-cases-button" onClick={toggleRelatedCases}>
            View Related Cases
          </button>
          <button className="download-report-button" onClick={downloadReport}>
            Download Report
          </button>
        </div>
      </div>
      {showRelatedCases && relatedCases.length > 0 && (
        <div className="related-cases-sidebar" ref={sidebarRef}>
          <button className="back-button" ref={backButtonRef} onClick={hideSidebar}>Back</button>
          <h3>Related Cases</h3>
          <div className="cases-list">
            {relatedCases.map((case_, index) => (
              <div key={index} className="case-item">
                <h4>{case_.title}</h4>
                <a
                  href={case_.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-link"
                >
                  View Case → 
                </a>
                <div
                  className="case-summary"
                  dangerouslySetInnerHTML={{
                    __html: marked(case_.summary_and_advice),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="main">
      <div className="nav">
        <p>Legal Advisor Bot</p>
        <img src={assets.user} alt="User Icon" />
      </div>
      <div className="main-container">
        {showHelpForm ? (
          renderHelpForm()
        ) : !showResults ? (
          <>
            <div className="greet">
              <br></br>
              <br></br>
              <p>
                <span>Welcome to Legal Advisor Bot!</span>
              </p>
              <p>How can I assist you with your legal queries today?</p>
              <div className="welcome-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <br></br>
                
                <button className="get-help-button" onClick={handleGetHelp}>
                  Get Help
                </button>
              </div>
            </div>
          </>
        ) : (<>
          {/* Render Results */}
          {renderResults()}
  
          {/* Home Button Visible Only When Results Are Loaded */}
          <button onClick={handleBack} className="back-button-main">
            Home
          </button>
        </>
         
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter your legal query here"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <div className="icon-buttons">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <img
                src={assets.mic_icon}
                alt="Voice Input"
                onClick={() => setIsListening(!isListening)}
                className={isListening ? "listening" : ""}
              />
            <button className="analyze-doc-button" onClick={handleAnalyzeDocument}>
  <img src={assets.pdf} alt="Analyze Document" />
</button>
<button className="analyze-image-button" onClick={handleAnalyzeImage}>
  <img src={assets.image} alt="Analyze Image" />
</button>

              <img
                src={assets.send_icon}
                alt="Send Query"
                onClick={handleSend}

              />
            </div>
          </div>
          {renderFileCard()}
          <div className="bottom-info">
            <p>
              Legal Advisor Bot aims to assist with legal information. Always
              verify details with a certified legal professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;