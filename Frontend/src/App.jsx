// // import React, { useState } from "react";

// // export default function SimpleChatBot() {
// //   const [message, setMessage] = useState("");
// //   const [chat, setChat] = useState([
// //     { sender: "bot", text: "Hello 👋 Ask me something!" },
// //   ]);

// //   // Bot reply logic
// //   const getBotReply = (msg) => {
// //     const text = msg.toLowerCase();

// //     if (text.includes("hello") || text.includes("hi")) {
// //       return "Hi Sahil 👋";
// //     } else if (text.includes("how are you")) {
// //       return "I am fine 😄";
// //     } else if (text.includes("react")) {
// //       return "React is a JavaScript library for UI.";
// //     } else if (text.includes("bye")) {
// //       return "Goodbye 🚀";

// //     } 
// //     else {
// //       return "Sorry, I don't understand.";
// //     }
// //   };

// //   const handleSend = () => {
// //     if (message.trim() === "") return;

// //     // User message add
// //     const userMessage = {
// //       sender: "user",
// //       text: message,
// //     };

// //     // Bot reply
// //     const botMessage = {
// //       sender: "bot",
// //       text: getBotReply(message),
// //     };

// //     setChat([...chat, userMessage, botMessage]);
// //     setMessage("");
// //   };

// //   return (
// //     <div
// //       style={{
// //         width: "350px",
// //         margin: "50px auto",
// //         border: "1px solid #ccc",
// //         borderRadius: "10px",
// //         padding: "15px",
// //         fontFamily: "Arial",
// //       }}
// //     >
// //       <h2>Simple ChatBot</h2>

// //       {/* Chat Messages */}
// //       <div
// //         style={{
// //           height: "300px",
// //           overflowY: "auto",
// //           border: "1px solid #ddd",
// //           padding: "10px",
// //           marginBottom: "10px",
// //         }}
// //       >
// //         {chat.map((msg, index) => (
// //           <div
// //             key={index}
// //             style={{
// //               textAlign: msg.sender === "user" ? "right" : "left",
// //               margin: "10px 0",
// //             }}
// //           >
// //             <span
// //               style={{
// //                 background:
// //                   msg.sender === "user" ? "#007bff" : "#e5e5e5",
// //                 color: msg.sender === "user" ? "white" : "black",
// //                 padding: "8px 12px",
// //                 borderRadius: "10px",
// //                 display: "inline-block",
// //               }}
// //             >
// //               {msg.text}
// //             </span>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Input */}
// //       <div style={{ display: "flex", gap: "10px" }}>
// //         <input
// //           type="text"
// //           placeholder="Type message..."
// //           value={message}
// //           onChange={(e) => setMessage(e.target.value)}
// //           style={{
// //             flex: 1,
// //             padding: "10px",
// //           }}
// //         />

// //         <button
// //           onClick={handleSend}
// //           style={{
// //             padding: "10px 15px",
// //             cursor: "pointer",
// //           }}
// //         >
// //           Send
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [file, setFile] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [uploadMessage, setUploadMessage] = useState("");

//   const BACKEND_URL = "http://127.0.0.1:8000";

//   // Handle File Change
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Upload PDF
//   const uploadPDF = async () => {
//     if (!file) {
//       alert("Please select a PDF");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await axios.post(
//         `${BACKEND_URL}/upload-pdf`,
//         formData
//       );

//       setUploadMessage(response.data.message);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//       alert("PDF upload failed");
//     }
//   };

//   // Ask Question
//   const askQuestion = async () => {
//     if (!question) {
//       alert("Please enter question");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         `${BACKEND_URL}/ask?question=${question}`
//       );

//       setAnswer(response.data.answer);

//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//       alert("Error getting answer");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#0f172a",
//         color: "white",
//         padding: "40px",
//         fontFamily: "Arial",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "800px",
//           margin: "0 auto",
//           background: "#1e293b",
//           padding: "30px",
//           borderRadius: "12px",
//         }}
//       >
//         <h1
//           style={{
//             textAlign: "center",
//             marginBottom: "30px",
//           }}
//         >
//           AI PDF Chatbot
//         </h1>

//         {/* Upload Section */}
//         <div
//           style={{
//             marginBottom: "30px",
//           }}
//         >
//           <h2>Upload PDF</h2>

//           <input
//             type="file"
//             accept=".pdf"
//             onChange={handleFileChange}
//             style={{
//               marginTop: "10px",
//               marginBottom: "20px",
//             }}
//           />

//           <br />

//           <button
//             onClick={uploadPDF}
//             style={{
//               padding: "12px 20px",
//               background: "#2563eb",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             Upload PDF
//           </button>

//           {uploadMessage && (
//             <p
//               style={{
//                 marginTop: "15px",
//                 color: "#4ade80",
//               }}
//             >
//               {uploadMessage}
//             </p>
//           )}
//         </div>

//         {/* Ask Question Section */}
//         <div>
//           <h2>Ask Question</h2>

//           <input
//             type="text"
//             placeholder="Ask question from PDF..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "14px",
//               borderRadius: "8px",
//               border: "none",
//               marginTop: "10px",
//               marginBottom: "20px",
//               fontSize: "16px",
//             }}
//           />

//           <button
//             onClick={askQuestion}
//             style={{
//               padding: "12px 20px",
//               background: "#16a34a",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//             }}
//           >
//             Ask AI
//           </button>
//         </div>

//         {/* Loading */}
//         {loading && (
//           <p
//             style={{
//               marginTop: "20px",
//             }}
//           >
//             Loading...
//           </p>
//         )}

//         {/* Answer */}
//         {answer && (
//           <div
//             style={{
//               marginTop: "30px",
//               background: "#334155",
//               padding: "20px",
//               borderRadius: "10px",
//             }}
//           >
//             <h3>AI Answer</h3>

//             <p
//               style={{
//                 lineHeight: "1.8",
//               }}
//             >
//               {answer}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

 const BACKEND_URL = "https://chatbotai-bkaw.onrender.com";

  // File Change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload PDF
  const uploadPDF = async () => {
    if (!file) {
      alert("Please select PDF");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${BACKEND_URL}/upload-pdf`,
        formData
      );

      setUploadMessage(response.data.message);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);

      alert("Upload Failed");
    }
  };

  // Ask Question
  const askQuestion = async () => {
    if (!question.trim()) {
      alert("Enter question");
      return;
    }

    try {
      setLoading(true);

      // Add User Message
      const userMessage = {
        sender: "user",
        text: question,
      };

      setMessages((prev) => [...prev, userMessage]);

      const response = await axios.post(
        `${BACKEND_URL}/ask`,
        null,
        {
          params: {
            question: question,
          },
        }
      );

      console.log(response.data);

      // Add Bot Message
      const botMessage = {
        sender: "bot",
        text: response.data.answer,
      };

      setMessages((prev) => [...prev, botMessage]);

      setQuestion("");
      setLoading(false);

    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Error getting response from AI",
        },
      ]);

      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          AI PDF Chatbot
        </h1>

        {/* Upload Section */}
        <div style={{ marginBottom: "30px" }}>
          <h2>Upload PDF</h2>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />

          <br />
          <br />

          <button
            onClick={uploadPDF}
            style={{
              padding: "12px 20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Upload PDF
          </button>

          {uploadMessage && (
            <p
              style={{
                color: "#4ade80",
                marginTop: "15px",
              }}
            >
              {uploadMessage}
            </p>
          )}
        </div>

        {/* Question Input */}
        <div>
          <h2>Ask Question</h2>

          <input
            type="text"
            placeholder="Ask anything from PDF..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askQuestion();
              }
            }}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "8px",
              border: "none",
              marginTop: "10px",
              marginBottom: "20px",
              fontSize: "16px",
            }}
          />

          <button
            onClick={askQuestion}
            style={{
              padding: "12px 20px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Ask AI
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p
            style={{
              marginTop: "20px",
            }}
          >
            Loading...
          </p>
        )}

        {/* Chat Messages */}
        <div
          style={{
            marginTop: "30px",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign:
                  msg.sender === "user"
                    ? "right"
                    : "left",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background:
                    msg.sender === "user"
                      ? "#2563eb"
                      : "#334155",
                  padding: "14px",
                  borderRadius: "10px",
                  maxWidth: "80%",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;