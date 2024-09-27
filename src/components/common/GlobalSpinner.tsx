const GlobalSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-5">
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <span className="border-4 border-white rounded-full size-16 border-b-mainCheeseYellow animate-spin" />
      </div>
    </div>
  );
};

export default GlobalSpinner;
