const Header = ({ name }: { name: string }) => {
  return (
    <header className="w-full min-h-[3.5rem] bg-yellow-500 flex items-center pl-4 text-lg">
      {name}
    </header>
  );
};

export default Header;
