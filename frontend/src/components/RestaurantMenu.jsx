// src/components/RestaurantMenu.jsx

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMessageSquare, FiX } from 'react-icons/fi'; // Optional: for icons

const RestaurantMenu = () => {
    const { restaurantName } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [chatResponses, setChatResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        fetch(`/api/restaurants/${restaurantName}/`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRestaurant(data);
            })
            .catch(error => console.error('Error fetching restaurant:', error));
    }, [restaurantName]);

    useEffect(() => {
        scrollToBottom();
    }, [chatResponses, isLoading]);

    const toggleChat = () => {
        setChatOpen(!chatOpen);
    };

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;
        setIsLoading(true);

        setChatResponses(prev => [...prev, { sender: 'user', message: userMessage }]);

        try {
            const response = await fetch('/api/ai-recommendation/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: userMessage,
                    restaurant: restaurantName,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.recommendations && Array.isArray(data.recommendations)) {
                    setChatResponses(prev => [
                        ...prev,
                        { sender: 'ai', message: 'Here are some recommendations for you:' },
                        ...data.recommendations.map(item => ({ sender: 'ai', message: JSON.stringify(item) }))
                    ]);
                } else {
                    setChatResponses(prev => [...prev, { sender: 'ai', message: 'No recommendations found.' }]);
                }
            } else {
                setChatResponses(prev => [...prev, { sender: 'ai', message: data.error }]);
            }
        } catch (error) {
            console.error('Error fetching AI recommendation:', error);
            setChatResponses(prev => [...prev, { sender: 'ai', message: 'An error occurred. Please try again later.' }]);
        }

        setIsLoading(false);
        setUserMessage('');
    };

    const renderChatMessage = (chat, index) => {
        if (chat.sender === 'ai' && isJSON(chat.message)) {
            const item = JSON.parse(chat.message);
            return (
                <motion.div
                    key={index}
                    className="mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="text-sm mt-2">{item.description}</p>
                        <div className="mt-2 flex justify-between">
                            <span className="text-sm">Size: {item.size}</span>
                            <span className="text-sm">Cost: ${item.cost}</span>
                        </div>
                    </div>
                </motion.div>
            );
        } else {
            return (
                <motion.div
                    key={index}
                    className={`mb-2 flex ${chat.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
                    initial={{ opacity: 0, x: chat.sender === 'ai' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <span
                        className={`inline-block px-4 py-2 rounded-full max-w-xs break-words ${chat.sender === 'ai'
                            ? 'bg-blue-600 text-white'
                            : 'bg-green-600 text-white'
                            }`}
                    >
                        {chat.message}
                    </span>
                </motion.div>
            );
        }
    };

    const isJSON = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!restaurant) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen p-8 relative">
            {/* Chat Toggle Button */}
            <motion.button
                onClick={toggleChat}
                className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                aria-label="Toggle Chat"
            >
                {chatOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {chatOpen && (
                    <motion.div
                        className="fixed bottom-16 right-4 bg-gray-800 text-white w-96 max-w-full h-96 rounded-lg shadow-lg flex flex-col overflow-hidden"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Chat Header */}
                        <div className="flex items-center justify-between p-4 bg-gray-700">
                            <h2 className="text-lg font-semibold">Chat with us</h2>
                            <button onClick={toggleChat} aria-label="Close Chat">
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-4 overflow-y-auto">
                            {chatResponses.map((chat, index) => renderChatMessage(chat, index))}
                            {isLoading && (
                                <motion.div
                                    className="flex items-center space-x-2 mt-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-400"></div>
                                </motion.div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-gray-700 bg-gray-700">
                            <div className="flex">
                                <input
                                    type="text"
                                    value={userMessage}
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    className="flex-1 p-2 bg-gray-600 text-white rounded-l-full focus:outline-none placeholder-gray-300"
                                    placeholder="Type your message..."
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSendMessage();
                                        }
                                    }}
                                    aria-label="Type your message"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-blue-600 px-4 py-2 rounded-r-full hover:bg-blue-700 transition-colors flex items-center justify-center"
                                    aria-label="Send Message"
                                >
                                    <FiSend size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Restaurant Content */}
            <h1 className="text-4xl mb-6">Welcome to {restaurant.name}</h1>
            {restaurant.categories.map(category => (
                <div key={category.id} className="mb-8">
                    <h2 className="text-2xl mb-4">{category.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.meals.map(meal => (
                            <motion.div
                                key={meal.id}
                                className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-xl font-semibold">{meal.name}</h3>
                                <p className="text-sm mt-2">{meal.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span>Size: {meal.size}</span>
                                    <span className="font-bold">${meal.cost}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RestaurantMenu;
