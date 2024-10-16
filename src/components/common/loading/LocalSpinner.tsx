const LocalSpinner = ({ height }: { height: number }) => {
  return (
    <div className={`flex items-center justify-center w-full h-[${height}px]`}>
      <div className='border-4 border-white rounded-full size-10 border-b-cheeseYellow animate-spin' />
    </div>
  );
}

export default LocalSpinner;
