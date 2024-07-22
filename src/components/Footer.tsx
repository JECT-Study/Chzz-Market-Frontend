import {
  AiOutlineBell,
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineUser,
} from 'react-icons/ai';

function Footer() {
  return (
    <footer className="flex items-center gap-2 justify-around w-full min-h-[3.5rem] bg-yellow-500">
      <AiOutlineHome size={25} />
      <AiOutlineBell size={25} />
      <AiOutlineHeart size={25} />
      <AiOutlineUser size={25} />
    </footer>
  );
}

export default Footer;
