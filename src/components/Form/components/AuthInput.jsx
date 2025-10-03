const AuthInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  helper,
}) => {
  const peerLabel =
  "auth-label " +
  "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm " +
  "peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-xs " +
  "peer-[&:not(:placeholder-shown)]:-translate-y-4 peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:text-sm";

  {/** default+empty,focus,value exist **/}

const inputClasses = "auth-inputs peer";

const helperClasses = `
  form-helper absolute left-0 md:-bottom-[3rem] text-xs 
  opacity-0 hidden
  peer-focus:block peer-focus:opacity-80 
  transition-all duration-200 
  bg-gray-400 w-full text-start z-20
`;
  
    return (
    <div className="auth-field">
      <div className="auth-input-field">
        <input
          type={type}
          name={name}
          placeholder={label}
          value={value}
          onChange={onChange}
          className={inputClasses}
        />
        <label className={peerLabel}>{label}</label>
        {helper && <div className={helperClasses}>{helper}</div>}
      </div>
      {error && <p className="error-p">{error}</p>}
    </div>
  );
};

export default AuthInput;
