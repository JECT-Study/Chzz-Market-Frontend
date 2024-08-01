interface PopupTitleProps {
  children: React.ReactNode;
}

const PopupTitle = ({ children }: PopupTitleProps) => {
  return <h2 className="w-full mb-5 text-2xl font-bold">{children}</h2>;
};

export default PopupTitle;
