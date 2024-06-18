import React from 'react';

interface StarRatingProps {
  value: number;
  max?: number;
}

const Rating: React.FC<StarRatingProps> = ({ value, max = 5 }) => {
  const fullStars = Math.floor(value);
  const halfStar = value % 1 >= 0.5;
  const emptyStars = max - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: fullStars }).map((_, index) => (
        <svg key={index} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21 16.54 14.07 22 10.63 15.08 10.24 12 4 8.92 10.24 2 10.63 7.46 14.07 5.82 21 12 17.27z" />
        </svg>
      ))}
      {halfStar && (
        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-6.97L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.03 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
        </svg>
      )}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <svg key={index} className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-6.97L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.03 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
        </svg>
      ))}
    </div>
  );
};

export default Rating;
