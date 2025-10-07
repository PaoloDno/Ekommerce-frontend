const ProductInput = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  helper = ""
}) => {
  const peerLabel = `form-input-label
    peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm
    peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-xs
    peer-[&:not(:placeholder-shown)]:-translate-y-4 peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:text-sm`;
  const inputClasses = "form-inputs peer";
  const helperClasses = `
    form-input-helper absolute left-0
    opacity-0 hidden
    peer-focus:flex peer-focus:opacity-80 
    transition-all duration-200 
    bg-gray-600 w-full text-start z-20
  `;
  return (
    <div className="form-input-div">
      <div className="form-input-field">
        <input
          type={type}
          name={name}
          placeholder={label}
          value={value}
          onChange={onChange}
          className={inputClasses}
        />
        <label className={peerLabel}>{label}</label>
        {helper != "" && <div className={helperClasses}>{helper}</div>}
      </div>
      {error && <p className="form-input-error">{error}</p>}
    </div>
  );
};

export default ProductInput;