export const ImageOverlay = ({ image }: { image: string }) => {
  return (
    <div
      className="relative flex items-center justify-center w-full h-full overflow-hidden transition-opacity opacity-70 cursor-grabbing"
    >
      <img
        src={image}
        alt="dragging item"
        className="object-cover w-full h-full"
      />
    </div>
  );
}