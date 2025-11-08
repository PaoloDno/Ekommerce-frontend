const CardGrid = ({ children }) => {
  return (
    <div
      className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 
      justify-center items-center w-full h-full"
    >
      {children}
    </div>
  );
};

export default CardGrid;
