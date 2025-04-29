import { useEffect, useState } from "react";
import "../styles/FloatingKana.css";
import kana from '../data/floatingKana.json';

const hiragana = kana.hiragana;
const katakana = kana.katakana;

function FloatingKana() {
  const [kana, setKana] = useState([]);

  useEffect(() => {
    setKana(generateKana());
  }, []);

const generateKana = () => {
  const list = [...hiragana, ...katakana];

  let totalKana;
  const screenWidth = window.innerWidth;

  if (screenWidth < 500) {
    totalKana = 60;   // Small phones
  } else if (screenWidth < 800) {
    totalKana = 100;  // Tablets / small laptops
  } else if (screenWidth < 1200) {
    totalKana = 180;  // Medium desktops
  } else {
    totalKana = 250;  // Large desktops
  }
  
  console.log(`Total Kana: ${totalKana}`);

  const slotSize = 100 / totalKana;

  return Array.from({ length: totalKana }).map((_, i) => {
    const horizontalPos = Math.random() * 100;

    const centerOfSlot = (i + 0.5) * slotSize;

    return {
      char: list[Math.floor(Math.random() * list.length)],
      top: centerOfSlot,
      left: horizontalPos,
      size: Math.random() * 1.5 + 1,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
    };
  });
};


  return (
    <div className="floating-kana-wrapper">
      {kana.map((item, index) => (
        <span
          key={index}
          className="kana"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            fontSize: `${item.size}rem`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}

export default FloatingKana;
