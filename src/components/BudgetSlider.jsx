import React from "react";

const MIN = 1000;
const MAX = 50000;
const STEP = 500;

function BudgetSlider({ value, onChange }) {
  const percentage = ((value - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="my-6">
      <label className="block font-semibold text-lg mb-4 text-white">
        Budget per Day (₹)
      </label>
      <div className="relative">
        {/* Single range input */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-slate-700/50 slider-thumb"
          style={{
            background: `linear-gradient(to right, 
              #3b82f6 0%, 
              #8b5cf6 ${percentage}%, 
              #475569 ${percentage}%, 
              #475569 100%)`
          }}
        />
        {/* Custom thumb indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg border-2 pointer-events-none "
          style={{ left: `calc(${percentage}% - 12px)` }}
        >
          <div className="absolute inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      {/* Value display */}
      <div className="flex items-center justify-center mt-4">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl px-6 py-3 shadow-xl">
          <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ₹{value.toLocaleString()}
          </span>
        </div>
      </div>
      {/* Range indicators */}
      <div className="flex justify-between text-sm text-gray-400 mt-3 px-1">
        <div className="flex flex-col items-center">
          <span className="text-xs opacity-75">Min</span>
          <span className="font-medium">₹{MIN.toLocaleString()}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs opacity-75">Max</span>
          <span className="font-medium">₹{MAX.toLocaleString()}</span>
        </div>
      </div>
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.2s ease;
        }
        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }
        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.2s ease;
          border: none;
        }
        .slider-thumb::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }
        .slider-thumb::-moz-range-track {
          height: 12px;
          border-radius: 6px;
          background: #475569;
        }
      `}</style>
    </div>
  );
}

export default BudgetSlider;