// RestaurantMenu.jsx
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import StickyNavbar from "./StickyNavbar";
import SmallHeader from "./SmallHeader";
import Hero from "./Hero";
import MenuLoadingScreen from "./MenuLoadingScreen";
import ChatPopup from "./ChatPopup";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const menuRef = useRef(null);
  const { restaurantName } = useParams();

  const fetchRestaurantData = async () => {
    try {
      let url = `http://127.0.0.1:8000/api/restaurants/${restaurantName}/`;
      const response = await fetch(url);
      const data = await response.json();
      setRestaurant(data);
      if (!selectedCategory && data.categories && data.categories.length > 0) {
        setSelectedCategory(data.categories[0].name);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  const handleTabClick = (category) => {
    if (selectedCategory !== category) {
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setSelectedCategory(category);
          gsap.to(menuRef.current, { opacity: 1, duration: 0.5 });
        },
      });
    }
  };

  if (loading) {
    return <MenuLoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="bg-[#212121] text-white min-h-screen relative">
      <SmallHeader restaurant={restaurant} />
      <Hero />
      <StickyNavbar />
      <div className="menu-tabs mx-auto w-[70%] flex p-5 justify-around items-center space-x-4 mt-[90px] mb-[40px] bg-[#303030]">
        {restaurant?.categories?.map((category) => (
          <a
            key={category.id}
            className={`cursor-pointer menu-tab-item ${selectedCategory === category.name ? "text-[#C19D60] selected" : ""
              }`}
            onClick={() => handleTabClick(category.name)}
          >
            {category.name}
          </a>
        ))}
      </div>
      <div className="p-8" ref={menuRef}>
        {restaurant?.categories?.map((category) =>
          selectedCategory === category.name ? (
            <div key={category.id} className="mb-8">
              <h2 className="text-2xl mb-4">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.meals?.map((meal) => (
                  <div
                    key={meal.id}
                    className="meal-item bg-[#333] p-0 shadow transition-colors group overflow-hidden"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:rotate-1 group-hover:scale-125"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">{meal.name}</h3>
                        <span className="sale text-[#C19D60] text-[13px] italic">
                          Sale -30%
                        </span>
                      </div>
                      <p className="text-sm mt-2">{meal.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="font-bold text-[#C19D60] italic">
                          <span className="text-[#fff]">Price </span>${meal.cost}
                        </span>
                      </div>
                      <button className="btn p-2 bg-[#C19D60] text-white mt-4 w-full">
                        Add To Favourite
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
      <button
        className="fixed bottom-6 right-6 bg-[#C19D60] text-white p-3 rounded-full shadow-lg hover:bg-[#b38f52]"
        onClick={() => setShowChat(true)}
      >
        Ask your AI assistant
      </button>
      {showChat && (
        <ChatPopup onClose={() => setShowChat(false)} restaurantName={restaurantName} />
      )}
    </div>
  );
};

export default RestaurantMenu;
