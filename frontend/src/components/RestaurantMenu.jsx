import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';  // Import GSAP
import { FiSend, FiMessageSquare, FiX } from 'react-icons/fi';
import '@fortawesome/fontawesome-free/css/all.min.css';

const RestaurantMenu = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [chatResponses, setChatResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Appetizers');
    const chatEndRef = useRef(null);

    useEffect(() => {
        const staticRestaurant = {
            name: 'Gourmet Heaven',
            categories: [
                {
                    id: 1,
                    name: 'Appetizers',
                    meals: [
                        { id: 1, name: 'Spring Rolls', description: 'Crispy fried rolls with vegetable filling', size: 'Medium', cost: 5.99 },
                        { id: 2, name: 'Garlic Bread', description: 'Soft bread topped with garlic butter and herbs', size: 'Large', cost: 3.99 },
                    ],
                },
                {
                    id: 2,
                    name: 'Main Courses',
                    meals: [
                        { id: 3, name: 'Grilled Chicken', description: 'Tender chicken breast grilled to perfection', size: 'Large', cost: 12.99 },
                        { id: 4, name: 'Spaghetti Bolognese', description: 'Pasta with a rich, savory meat sauce', size: 'Medium', cost: 9.99 },
                    ],
                },
                {
                    id: 3,
                    name: 'Desserts',
                    meals: [
                        { id: 5, name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center', size: 'Small', cost: 6.99 },
                        { id: 6, name: 'Cheesecake', description: 'Creamy cheesecake with a graham cracker crust', size: 'Large', cost: 7.99 },
                    ],
                },
            ],
        };

        setRestaurant(staticRestaurant);
    }, []);

    useEffect(() => {
        if (restaurant) {
            gsap.fromTo(".menu-tab-item", 
                { opacity: 0, y: -20 }, 
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
            );
        }
    }, [restaurant]);

    const toggleChat = () => {
        setChatOpen(!chatOpen);
    };

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;
        setIsLoading(true);

        setChatResponses(prev => [...prev, { sender: 'user', message: userMessage }]);

        try {
            const recommendations = [
                { name: 'Grilled Chicken', description: 'Tender chicken breast grilled to perfection', size: 'Large', cost: 12.99 },
                { name: 'Spring Rolls', description: 'Crispy fried rolls with vegetable filling', size: 'Medium', cost: 5.99 },
            ];

            setChatResponses(prev => [
                ...prev,
                { sender: 'ai', message: 'Here are some recommendations for you:' },
                ...recommendations.map(item => ({ sender: 'ai', message: JSON.stringify(item) })),
            ]);
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
                <div key={index} className="mb-4">
                    <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="text-sm mt-2">{item.description}</p>
                        <div className="mt-2 flex justify-between">
                            <span className="text-sm">Size: {item.size}</span>
                            <span className="text-sm">Cost: ${item.cost}</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    key={index}
                    className={`mb-2 flex ${chat.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
                    ref={(el) => gsap.fromTo(el, { opacity: 0, x: chat.sender === 'ai' ? -20 : 20 }, { opacity: 1, x: 0, duration: 0.5 })}
                >
                    <span
                        className={`inline-block px-4 py-2 rounded-full max-w-xs break-words ${chat.sender === 'ai' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}
                    >
                        {chat.message}
                    </span>
                </div>
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

    const handleTabClick = (category) => {
        setSelectedCategory(category);
    };

    if (!restaurant) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="bg-[#292929] text-white min-h-screen p-8 relative">
            <h1 className="text-4xl mb-6">Welcome to {restaurant.name}</h1>

            {/* Chat Toggle Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                aria-label="Toggle Chat"
            >
                {chatOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
            </button>

            {/* Menu Tabs */}
            <div className="menu-tabs mx-auto w-[70%] flex p-5 justify-around items-center space-x-4 mt-8 bg-[#333]">
                {restaurant.categories.map(category => (
                    <a
                        href="#"
                        key={category.id}
                        className={`menu-tab-item ${selectedCategory === category.name ? 'text-[#C19D60] selected' : ''}`}
                        onClick={() => handleTabClick(category.name)}
                    >
                        {category.name}
                    </a>
                ))}
            </div>

            {/* Restaurant Content */}
            {restaurant.categories.map(category => (
                selectedCategory === category.name && (
                    <div
                        key={category.id}
                        className="mb-8"
                        ref={(el) => gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5 })}
                    >
                        <h2 className="text-2xl mb-4">{category.name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.meals.map(meal => (
                                <div
                                    key={meal.id}
                                    className="meal-item bg-[#333] p-6 rounded-lg shadow hover:bg-gray-700 transition-colors"
                                    ref={(el) => gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })}
                                >
                                    <h3 className="text-xl font-semibold">{meal.name}</h3>
                                    <p className="text-sm mt-2">{meal.description}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span>Size: {meal.size}</span>
                                        <span className="font-bold">${meal.cost}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default RestaurantMenu;
