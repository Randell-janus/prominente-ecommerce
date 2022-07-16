import Link from "next/link";
import Image from "next/image";

import Logo from "../Logo";

export const FormHeroImage = ({ logoPos }) => {
  return (
    <div className="xl:flex flex-col items-center justify-center flex-1 h-screen bg-slate-100 hidden relative">
      <Logo className={`absolute hidden xl:block ${logoPos}`} />
      <Image
        src="/undraw_hero.svg"
        alt="right places image"
        width={450}
        height={450}
      />
    </div>
  );
};

export const FormLayout = ({ children }) => {
  return (
    <div className="xl:w-1/2 w-full min-h-screen flex items-center justify-center px-8 xl:px-0">
      <div className="max-w-md w-full space-y-8">{children}</div>
    </div>
  );
};

export const FormHeading = ({ header, subheader }) => {
  return (
    <div className="flex flex-col xl:items-start items-center space-y-2">
      {/* <Logo logoSize={12} /> */}
      <p className="text-2xl md:text-3xl font-bold">{header}</p>
      <p>{subheader}</p>
    </div>
  );
};

export const FormControl = ({ onSubmit, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="px-0 rounded-md space-y-6 flex flex-col"
    >
      {children}
    </form>
  );
};

export const FormInput = ({
  fieldLabel,
  type,
  value,
  name,
  onChange,
  passwordCondition,
  placeholder,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="font-medium">{fieldLabel}</label>
        <p className="font-light text-slate-400 text-xs md:text-sm">
          {passwordCondition}
        </p>
      </div>
      <input
        className="auth-form-input w-full"
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        required
      />
    </div>
  );
};

export const FormFooter = ({ footer, href, type }) => {
  return (
    <div className="text-center border-t pt-8">
      <p className="mb-4">
        {footer}{" "}
        <Link href={href}>
          <a className="text-link">{type}</a>
        </Link>
      </p>
      <Link href="/">
        <a className="hover:underline">Cancel</a>
      </Link>
    </div>
  );
};
