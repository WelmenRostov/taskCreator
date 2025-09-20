const LoadSpinner = () => {
  return (
    <div className={`h-screen  rounded-b-[1vw] flex justify-center items-center`}>
      {' '}
      <div className="flex justify-center items-center mt-10 mb-10">
        <span className="w-[100px] bg-indigo-700 loading loading-spinner loading-xl"></span>
      </div>
    </div>
  );
};

export default LoadSpinner;
