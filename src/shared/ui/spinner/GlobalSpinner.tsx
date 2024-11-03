export const GlobalSpinner = () => {
  return (
    <div className='flex justify-center w-full h-screen'>
      <div className='relative w-[46rem] min-w-[23rem] h-full'>
        <div className="flex flex-col items-center justify-center h-full gap-3">
          <span className="border-4 border-white rounded-full size-16 border-b-mainCheeseYellow animate-spin" />
        </div>
      </div>
    </div>

  );
};