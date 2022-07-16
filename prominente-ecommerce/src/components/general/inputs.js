export const SelectBox = ({ label, value, onChange, options }) => {
  return (
    <div className="space-y-2">
      <p className="font-semibold">{label}</p>
      <select className="select-box" required value={value} onChange={onChange}>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SelectBoxWChildren = ({ label, value, onChange, children }) => {
  return (
    <div className="space-y-2">
      <p className="font-semibold">{label}</p>
      <select className="select-box" required value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
};

export const NumberInput = ({ label, value, onChange, min, max, step }) => {
  return (
    <div className="space-y-2">
      <p className="font-semibold">{label}</p>
      <input
        className="input-outline"
        required
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

export const RadioButton = ({ value, label, defaultChecked, name }) => {
  return (
    <label className="cursor-pointer flex items-center">
      <input
        type="radio"
        className="mr-2 sm:mr-3 cursor-pointer text-teal-400 focus:ring-0"
        value={value}
        name={name}
        defaultChecked={defaultChecked === value}
        // defaultChecked={defaultChecked}
      />
      {label}
    </label>
  );
};

export const TextInput = ({ label, value, onChange }) => {
  return (
    <div className="space-y-2">
      <p className="font-semibold">{label}</p>
      <input
        className="input-outline"
        required
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
