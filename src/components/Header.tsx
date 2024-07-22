function Header({ pageName }: { pageName: string }) {
  return (
    <header className="w-full min-h-[3.5rem] bg-yellow-500 flex items-center pl-4 text-lg">
      {pageName}
    </header>
  );
}

export default Header;
