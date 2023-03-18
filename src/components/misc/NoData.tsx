const NoData = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-36">
        <img src="/images/no_data.svg" alt="no data" className="h-20 mb-4" />
        <p className="text-gray-400">No data found</p>
      </div>
    </>
  );
};

export default NoData;
