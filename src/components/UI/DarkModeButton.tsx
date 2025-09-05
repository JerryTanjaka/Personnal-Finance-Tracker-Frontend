import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Switch = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="relative w-[90px] h-[40px]">
      <label className="relative block w-full h-full cursor-pointer">
        <input
          type="checkbox"
          className="hidden peer"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        {/* Slider */}
        <span
          className={`absolute w-full h-full rounded-full border-2 transition-colors duration-300 
            ${checked ? "bg-gray-300 border-gray-500" : "bg-gray-800 border-gray-800"}`}
        />
        {/* Icon */}
        <span
          className={`absolute top-[10px] left-[10px] w-[25px] h-[25px] flex items-center justify-center rounded-full transition-transform duration-300
            ${checked ? "translate-x-[45px]" : ""}`}
        >
          {checked ? (
            <FaSun className="text-black text-xl" />
          ) : (
            <FaMoon className="text-white text-xl" />
          )}
        </span>
      </label>
    </div>
  );
};

export default Switch;
