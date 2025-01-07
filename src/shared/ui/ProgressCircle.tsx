export const ProgressCircle = ({ progress }: { progress: number }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative w-24 h-24">
      <svg className="absolute inset-0 transform rotate-90" viewBox="0 0 36 36">
        <circle
          className="text-gray-300 stroke-current"
          strokeWidth="2"
          fill="transparent"
          r={radius}
          cx="18"
          cy="18"
          strokeDasharray={circumference}
          strokeDashoffset={0}
        />
        <circle
          className="stroke-current text-mainCheeseYellow"
          strokeWidth="2"
          fill="transparent"
          r={radius}
          cx="18"
          cy="18"
          strokeDasharray={circumference}
          strokeDashoffset={(1 - progress / 100) * circumference}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
        {progress}%
      </div>
    </div>

  );
}