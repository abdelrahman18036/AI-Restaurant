import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const FoodEmojiLoader = ({ onComplete }) => {
  const foodEmojis = ["🍔", "🍕", "🍣", "🍜", "🍩"];
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);
  const loaderRef = useRef(null);
  const emojiContainerRef = useRef(null);

  useEffect(() => {
    const emojiInterval = setInterval(() => {
      if (currentEmojiIndex < foodEmojis.length - 1) {
        setCurrentEmojiIndex((prev) => prev + 1);
      } else {
        clearInterval(emojiInterval);
        // Once emojis are done, start the collapsing animation
        gsap.to(emojiContainerRef.current, {
          height: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: onComplete,
        });
      }
    }, 100); // Adjust this for how fast you want each emoji to appear (in ms)

    return () => clearInterval(emojiInterval); // Cleanup interval
  }, [currentEmojiIndex]);

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-full h-full bg-[#292929] flex justify-center items-center z-50"
    >
      <div
        ref={emojiContainerRef}
        className="flex justify-center items-center"
        style={{ height: "100%" }}
      >
        <span className="text-6xl">{foodEmojis[currentEmojiIndex]}</span>
      </div>
    </div>
  );
};

export default FoodEmojiLoader;
