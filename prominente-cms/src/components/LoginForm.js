const LoginForm = ({ fieldLabel, type, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-medium">{fieldLabel}</label>
      </div>
      <input
        className="auth-form-input w-full"
        type={type}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default LoginForm;
