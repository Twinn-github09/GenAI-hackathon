// import "./sidebar.css";
// import { assets } from "../../assets/assets.js";
// import { useContext, useState } from "react";
// import { Context } from "../../Context.jsx";

// const Sidebar = () => {
//     const [extended, setExtended] = useState(false);
//     const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

//     // Save the current chat to a "JSON file" (simulated with localStorage)
//     const saveChatToJSON = (prompt) => {
//         const chats = JSON.parse(localStorage.getItem("chatHistory")) || [];
//         chats.push({ prompt });  // Save chat prompt, modify as needed to store chat data
//         localStorage.setItem("chatHistory", JSON.stringify(chats));
//     };

//     // Load previous chat from "JSON file" (simulated with localStorage)
//     const loadPreviousPrompt = async (prompt) => {
//         const chats = JSON.parse(localStorage.getItem("chatHistory")) || [];
//         const cachedChat = chats.find(chat => chat.prompt === prompt); // Modify as needed for data structure

//         if (cachedChat) {
//             setRecentPrompt(cachedChat.prompt);
//             await onSent(cachedChat.prompt);
//         } else {
//             console.warn("Chat not found in cache");
//         }
//     };

//     // New Chat Handler
//     const handleNewChat = () => {
//         newChat();
//         saveChatToJSON("New Chat"); // Add logic to save the actual new chat content
//     };

//     return (
//         <div className="sidebar">
//             <div className="top">
//                 {/* Menu Icon */}
//                 <img
//                     src={assets.menu_icon}
//                     className="menu"
//                     alt="menu-icon"
//                     onClick={() => setExtended((prev) => !prev)}
//                 />

//                 {/* New Chat Section */}
//                 <div className="new-chat" onClick={handleNewChat}>
//                     <img src={assets.plus} alt="new-chat-icon" />
//                     {extended && <p>New Chat</p>}
//                 </div>

//                 {/* Recent Prompts */}
//                 {extended && (
//                     <div className="recent">
//                         <p className="recent-title">Recent</p>
//                         {prevPrompts.map((item, index) => (
//                             <div
//                                 key={index}
//                                 onClick={() => loadPreviousPrompt(item)}
//                                 className="recent-entry"
//                             >
//                                 <img src={assets.recent} alt="message-icon" />
//                                 <p>{item.slice(0, 14)}...</p>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* Bottom Section */}
//             <div className="bottom">
//                 <div className="bottom-item recent-entry">
//                     <img src={assets.setting_icon} alt="settings-icon" />
//                     {extended && <p>Settings</p>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;

import "./sidebar.css";
import { assets } from "../../assets/assets.js";
import { useContext, useState } from "react";
import { Context } from "../../Context.jsx";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat, resetChatState } = useContext(Context);

    // Save the current chat to a "JSON file" (simulated with localStorage)
    const saveChatToJSON = (prompt) => {
        const chats = JSON.parse(localStorage.getItem("chatHistory")) || [];
        chats.push({ prompt });  // Save chat prompt, modify as needed to store chat data
        localStorage.setItem("chatHistory", JSON.stringify(chats));
    };

    // Load previous chat from "JSON file" (simulated with localStorage)
    const loadPreviousPrompt = async (prompt) => {
        const chats = JSON.parse(localStorage.getItem("chatHistory")) || [];
        const cachedChat = chats.find(chat => chat.prompt === prompt); // Modify as needed for data structure

        if (cachedChat) {
            setRecentPrompt(cachedChat.prompt);
            await onSent(cachedChat.prompt);
        } else {
            console.warn("Chat not found in cache");
        }
    };

    // New Chat Handler
    const handleNewChat = () => {
        // Reset chat state to simulate "back" functionality
        if (resetChatState) {
            resetChatState(); // Call context method to reset the chat if available
        }
        newChat(); // Start a new chat
        saveChatToJSON("New Chat"); // Add logic to save the actual new chat content
    };

    return (
        <div className="sidebar">
            <div className="top">
                {/* Menu Icon */}
                <img
                    src={assets.menu_icon}
                    className="menu"
                    alt="menu-icon"
                    onClick={() => setExtended((prev) => !prev)}
                />

                {/* New Chat Section */}
                <div className="new-chat" onClick={handleNewChat}>
                    <img src={assets.plus} alt="new-chat-icon" />
                    {extended && <p>New Chat</p>}
                </div>

                {/* Recent Prompts */}
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => loadPreviousPrompt(item)}
                                className="recent-entry"
                            >
                                <img src={assets.recent} alt="message-icon" />
                                <p>{item.slice(0, 14)}...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Section */}
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="settings-icon" />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
