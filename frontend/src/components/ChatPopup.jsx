// ChatPopup.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ChatPopup = ({ onClose, restaurantName }) => {
    const popupRef = useRef(null);
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I help you today?" },
    ]);
    const [loadingResponse, setLoadingResponse] = useState(false);

    // Animate the chat popup on mount using GSAP
    useEffect(() => {
        gsap.from(popupRef.current, {
            opacity: 1,
            y: 50,
            duration: 0.5,
            ease: "power3.out",
        });
    }, []);

    // Handle sending a message
    const sendMessage = async () => {
        if (!query.trim()) return;
        // Add user's message to the chat
        setMessages((prev) => [...prev, { sender: "user", text: query }]);
        setQuery("");
        setLoadingResponse(true);

        try {
            // Call your AI Recommendation API endpoint
            const response = await fetch("http://127.0.0.1:8000/api/ai-recommendation/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query, restaurant: restaurantName }),
            });
            const data = await response.json();
            if (data.recommendations) {
                // For simplicity, just join the recommendations as text
                const botText = data.recommendations
                    .map((rec) => rec.name)
                    .join(", ");
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: `You might like: ${botText}` },
                ]);
            } else if (data.error) {
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: `Error: ${data.error}` },
                ]);
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "There was an error processing your request." },
            ]);
        }
        setLoadingResponse(false);
    };

    return (
        <div
            ref={popupRef}
            className="fixed bottom-20 right-6 w-80 bg-[#303030] text-white rounded-lg shadow-xl overflow-hidden flex flex-col z-[9999999]"
        >
            {/* Chat Header */}
            <div className="bg-[#212121] p-4 flex justify-between items-center">
                <span className="font-bold">AI Assistant</span>
                <button onClick={onClose} className="text-xl">&times;</button>
            </div>
            {/* Chat Messages */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`${msg.sender === "user" ? "text-right" : "text-left"
                            }`}
                    >
                        <span
                            className={`inline-block p-2 rounded ${msg.sender === "user" ? "bg-[#C19D60]" : "bg-[#444]"
                                }`}
                        >
                            {msg.text}
                        </span>
                    </div>
                ))}
                {loadingResponse && <div className="text-left italic">Typing...</div>}
            </div>
            {/* Chat Input */}
            <div className="p-3 border-t border-[#555] flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1 bg-[#212121] p-2 rounded outline-none"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
                    }}
                />
                <button
                    onClick={sendMessage}
                    className="bg-[#C19D60] p-2 rounded hover:bg-[#b38f52]"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPopup;
