import { useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";

const GoTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  function handleScroll() {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  function handleClick() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }

  return (
    <>
      {isVisible && (
        <button
          className="fixed bottom-10 right-4 backdrop-blur-2xl bg-[#23ba9e] text-white rounded-full p-3 text-lg shadow-lg focus:outline-none border  hover:bg-green-600/80 z-50 hover:shadow-xl "
          onClick={handleClick}
        >
          <BiUpArrowAlt className="to-top-arrow text-lg font-lg" />
        </button>
      )}
    </>
  );
};

export default GoTopButton;
