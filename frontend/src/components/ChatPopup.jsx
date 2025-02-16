// src/components/ChatPopup.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { aiRecommendation } from "../api";

const ChatPopup = ({ onClose, restaurantName }) => {
    const popupRef = useRef(null);
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I help you today?" },
    ]);
    const [loadingResponse, setLoadingResponse] = useState(false);

    useEffect(() => {
        gsap.from(popupRef.current, {
            opacity: 1,
            y: 50,
            duration: 0.5,
            ease: "power3.out",
        });
    }, []);

    const sendMessage = async () => {
        if (!query.trim()) return;
        setMessages((prev) => [...prev, { sender: "user", text: query }]);
        setQuery("");
        setLoadingResponse(true);

        const data = await aiRecommendation(query, restaurantName);
        if (data.recommendations) {
            const botText = data.recommendations.map((rec) => rec.name).join(", ");
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
        setLoadingResponse(false);
    };

    return (
        <div
            ref={popupRef}
            className="fixed bottom-20 right-6 w-80 bg-[#303030] text-white rounded-lg shadow-xl overflow-hidden flex flex-col z-[9999999]"
        >
            <div className="bg-[#212121] p-4 flex justify-between items-center">
                <span className="font-bold">AI Assistant</span>
                <button onClick={onClose} className="text-xl">
                    &times;
                </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-3">
                {messages.map((msg, idx) => (
                    <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
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
                <button onClick={sendMessage} className="bg-[#C19D60] p-2 rounded hover:bg-[#b38f52]">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPopup;
