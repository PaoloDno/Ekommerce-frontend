
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
    "auth-label peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-translate-y-4 peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:text-sm";

  const inputClasses = "auth-inputs peer";
  const helperClasses =
    "form-helper hidden opacity-0 peer-focus:block peer-focus:opacity-80 transition-opacity duration-200";

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
      </div>
      {helper && <div className={helperClasses}>{helper}</div>}
      {error && <p className="error-p">{error}</p>}
    </div>
  );
};

export default AuthInput;
