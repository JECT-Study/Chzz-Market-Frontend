export const ImageOverlay = ({ image }: { image: string }) => {
  return (
    <div
      className="relative flex items-center justify-center w-32 h-32 overflow-hidden transition-opacity opacity-70 cursor-grabbing"
    >
      <img
        src={image}
        alt="dragging item"
        className="object-cover w-full h-full"
      />
    </div>
  );
}