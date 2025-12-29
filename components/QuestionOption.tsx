import React from 'react';

interface QuestionOptionProps {
  label: string;
  text: string;
  selected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  onClick?: () => void;
}

export default function QuestionOption({
  label,
  text,
  selected = false,
  isCorrect = false,
  isWrong = false,
  onClick,
}: QuestionOptionProps) {
  const getClasses = () => {
    const baseClasses = 'w-full p-4 rounded-lg border-2 text-left transition-all duration-200 cursor-pointer hover:shadow-md';
    
    if (isCorrect) {
      return `${baseClasses} border-green-500 bg-green-50`;
    }
    
    if (isWrong) {
      return `${baseClasses} border-red-500 bg-red-50`;
    }
    
    if (selected) {
      return `${baseClasses} border-blue-500 bg-blue-50`;
    }
    
    return `${baseClasses} border-gray-300 hover:border-blue-400`;
  };

  return (
    <button onClick={onClick} className={getClasses()}>
      <div className="flex items-start gap-3">
        <span className="font-bold text-lg text-gray-700">{label}.</span>
        <span className="text-gray-800 flex-1">{text}</span>
      </div>
    </button>
  );
}
