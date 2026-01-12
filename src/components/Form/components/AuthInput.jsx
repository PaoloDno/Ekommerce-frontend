const AuthInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  helper,
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full px-1 py-1 text-stylep3 relative">
        <input
          type={type}
          name={name}
          placeholder={label}
          value={value}
          onChange={onChange}
          className="peer w-full bg-skin-colorContent/60 backdrop-blur-md
            border border-white/20 rounded-lg
            px-4 py-2 text-stylep2 text-skin-colorContent
            placeholder-transparent
            focus:outline-none focus:ring-2 focus:ring-white/30
            transition-all duration-200"
        />

        <label
          className="absolute left-4 top-1/2 -translate-y-1/3 text-stylep2
            text-skin-colorContent/80 pointer-events-none
            transition-all duration-200
            peer-placeholder-shown:-translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-stylep2
            peer-focus:-translate-y-8 peer-focus:scale-90 peer-focus:text-stylep4
            peer-[&:not(:placeholder-shown)]:-translate-y-8 peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:text-stylep4"
        >
          {label}
        </label>
      </div>

      <div className="min-h-[1rem] px-1 mt-1 items-start justify-start w-full">
        <p
          className={`text-stylep4 text-skin-colorContent/70 scale-y-75 transition-opacity duration-200
            ${helper ? "opacity-100" : "opacity-0"}`}
        >
          {helper || " "}
        </p>
      </div>

      <div className="min-h-[1rem]">
        <p
          className={`text-stylep4 text-red-500 scale-90 transition-opacity duration-200
            ${error ? "opacity-100" : "opacity-0"}`}
        >
          {error || " "}
        </p>
      </div>
    </div>
  );
};

export default AuthInput;
