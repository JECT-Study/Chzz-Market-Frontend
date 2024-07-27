const Header = ({ header }: { header: string }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <button className="text-gray-500" aria-label="뒤로 가기">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 className="text-lg font-semibold">{header}</h1>
      <div />
    </header>
  );
};

export default Header;
