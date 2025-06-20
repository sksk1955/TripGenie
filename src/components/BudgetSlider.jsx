import React from "react";

const MIN = 1000;
const MAX = 50000;
const STEP = 500;

function BudgetSlider({ value, onChange }) {
  return (
    <div className="my-6">
      <label className="block font-semibold text-lg mb-2 text-primary">Budget per Day (₹)</label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full accent-[#f56551] h-2 rounded-lg bg-gray-200"
        />
        <span className="font-bold text-xl text-[#f56551]">₹{value.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>₹{MIN.toLocaleString()}</span>
        <span>₹{MAX.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default BudgetSlider;