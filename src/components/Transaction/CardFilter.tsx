import React from "react";

type Category = { id: string; name: string };

interface CardProps {
  categories: Category[];
  selectedCategory: string;
  onChange: (value: string) => void;
}

const Card: React.FC<CardProps> = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className="w-[300px] px-4 py-5 bg-white flex flex-col gap-3 rounded-md shadow-[0px_0px_15px_rgba(0,0,0,0.09)]">
      <legend className="text-xl font-semibold mb-3 select-none">Categories</legend>

      
      <label
        htmlFor="all"
        className={`font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg
          ${selectedCategory === "All"
            ? "text-blue-500 bg-blue-50 ring-blue-300 ring-1"
            : "text-gray-800"}`}
      >
        All
        <input
          type="radio"
          id="all"
          name="category"
          value="All"
          checked={selectedCategory === "All"}
          onChange={(e) => onChange(e.target.value)}
          className="w-4 h-4 absolute right-3 accent-current"
        />
      </label>

      
      {categories.map((cat) => (
        <label
          key={cat.id}
          htmlFor={cat.id}
          className={`font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg
            ${selectedCategory === cat.name
              ? "text-blue-500 bg-blue-50 ring-blue-300 ring-1"
              : "text-gray-800"}`}
        >
          {cat.name}
          <input
            type="radio"
            id={cat.id}
            name="category"
            value={cat.name}
            checked={selectedCategory === cat.name}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 absolute right-3 accent-current"
          />
        </label>
      ))}
    </div>
  );
};

export default Card;
