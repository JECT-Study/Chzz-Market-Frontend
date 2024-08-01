const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
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
      {children ? (
        <h1 className="text-lg font-semibold">{children}</h1>
      ) : (
        <svg
          className="w-6 h-6 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="2" />
        </svg>
      )}
      <div className="w-6" />
    </header>
  );
};

export default Header;
