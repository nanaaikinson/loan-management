const ProgressBar = () => {
  return (
    <>
      <div className="w-full bg-gray-200 rounded-sm">
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-sm"
          style={{ width: "45%" }}
        >
          {" "}
          45%
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
