import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import StickyNavbar from "./StickyNavbar";
import SmallNav from "./SmallHeader";
import Hero from "./Hero";
import FoodEmojiLoader from "./MenuLoadingScreen"; // Import FoodEmojiLoader

const RestaurantMenu = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Appetizers");
  const [loading, setLoading] = useState(true); // Track loading state
  const [progress, setProgress] = useState(0); // Progress bar state
  const menuRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);

          const staticRestaurant = {
            name: "Gourmet Heaven",
            phone: "123-456-7890",
            mail: "eathere@gmail.com",
            address: "1234 Main St, City, State 12345",
            categories: [
              {
                id: 1,
                name: "Appetizers",
                meals: [
                  {
                    id: 1,
                    name: "Spring Rolls",
                    description: "Crispy fried rolls with vegetable filling",
                    size: "Medium",
                    cost: 5.99,
                    image: "https://restabook.kwst.net/dark/images/menu/1.jpg",
                  },
                  {
                    id: 2,
                    name: "Garlic Bread",
                    description: "Soft bread topped with garlic butter and herbs",
                    size: "Large",
                    cost: 3.99,
                    image: "https://restabook.kwst.net/dark/images/menu/1.jpg",
                  },
                  {
                    id: 3,
                    name: "Chicken Wings",
                    description: "Our soft chicken wings with amazing sauces",
                    size: "Large",
                    cost: 2.99,
                    image: "https://restabook.kwst.net/dark/images/menu/1.jpg",
                  },
                ],
              },
              {
                id: 2,
                name: "Main Courses",
                meals: [
                  {
                    id: 3,
                    name: "Grilled Chicken",
                    description: "Tender chicken breast grilled to perfection",
                    size: "Large",
                    cost: 12.99,
                    image: "https://restabook.kwst.net/dark/images/menu/1.jpg",
                  },
                  {
                    id: 4,
                    name: "Spaghetti Bolognese",
                    description: "Pasta with a rich, savory meat sauce",
                    size: "Medium",
                    cost: 9.99,
                    image: "https://restabook.kwst.net/dark/images/menu/1.jpg",
                  },
                ],
              },
              {
                id: 3,
                name: "Desserts",
                meals: [
                  {
                    id: 5,
                    name: "Chocolate Lava Cake",
                    description: "Warm chocolate cake with a molten center",
                    size: "Small",
                    cost: 6.99,
                    image: "https://restabook.kwst.net/dark/images/menu/1.jpg",
                  },
                  {
                    id: 6,
                    name: "Cheesecake",
                    description: "Creamy cheesecake with a graham cracker crust",
                    size: "Large",
                    cost: 7.99,
                    image: "https://restabook.kwst.net/dark/images/menu/1.jpg",
                  },
                ],
              },
            ],
          };
          setRestaurant(staticRestaurant);

          setLoading(false);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 25); // Adjust speed of progress increase (ms per increment)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleTabClick = (category) => {
    if (selectedCategory !== category) {
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setSelectedCategory(category);
          gsap.to(menuRef.current, { opacity: 1, duration: 0.5, height: "0px" });
        },
      });
    }
  };

  const onLoadingComplete = () => {
    setLoading(false); // Hide the loader once it's collapsed
  };

  if (loading) {
    return <FoodEmojiLoader onComplete={onLoadingComplete} />; // Show the emoji loader while loading
  }

  return (
    <div className="bg-[#212121] text-white min-h-screen relative">
      {/* Small Nav Content */}
      <SmallNav restaurant={restaurant} />
      <Hero />

      {/* Sticky Navbar Content */}
      <StickyNavbar />

      {/* Categories Selection Content */}
      <div className="menu-tabs mx-auto w-[70%] flex p-5 justify-around items-center space-x-4 mt-[90px] mb-[40px] bg-[#303030]">
        {restaurant?.categories.map((category) => (
          <a
            key={category.id}
            className={`cursor-pointer menu-tab-item ${
              selectedCategory === category.name ? "text-[#C19D60] selected" : ""
            }`}
            onClick={() => handleTabClick(category.name)}
          >
            {category.name}
          </a>
        ))}
      </div>

      {/* Menu Part Content */}
      <div className="p-8" ref={menuRef}>
        {restaurant?.categories.map((category) =>
          selectedCategory === category.name ? (
            <div key={category.id} className="mb-8 cursor-pointer">
              <h2 className="text-2xl mb-4">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.meals.map((meal) => (
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
                          {" "}
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
    </div>
  );
};

export default RestaurantMenu;
