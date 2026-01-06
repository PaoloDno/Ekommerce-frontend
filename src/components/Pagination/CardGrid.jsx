const CardGrid = ({ children }) => {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-1 space-y-1 justify-center items-center
      w-full min-h-screen p-1 px-2 pb-4 bg-gradient-primary-buttons-95 bg-opacity-20"
    >
      {children}
    </div>
  );
};

export default CardGrid;
