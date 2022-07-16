import { useRouter } from "next/router";

import { ChevronRight } from "./icons";
import { useAuth } from "../../utils/contexts/AuthContext";

export const ProfileNav = ({ href, label, desc }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="relative border rounded-md p-8 w-full group cursor-pointer hover:scale-105 transition-all"
    >
      <ChevronRight className="h-5 w-5 md:h-6 md:w-6 absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2" />
      <div className="space-y-2">
        <h3 className="group-hover:underline capitalize">{label}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export const ProfilePersonalInfo = ({
  label,
  formHandler,
  submitHandler,
  isUpdating,
  credential,
  innerRef,
  onChange,
  inputClassName,
  placeholder,
  inputType,
}) => {
  return (
    <div className="rounded-md border p-10 space-y-2">
      <div className="flex justify-between">
        <h3 className="font-semibold">{label}</h3>
        <h3
          onClick={formHandler}
          className="font-semibold underline cursor-pointer"
        >
          {isUpdating ? "Cancel" : "Update"}
        </h3>
      </div>
      <form onSubmit={submitHandler} className="space-y-8">
        <input
          type={inputType}
          placeholder={placeholder}
          required
          ref={innerRef}
          disabled={!isUpdating}
          className={`${inputClassName} input-credentials py-2 ${
            isUpdating && "border-b"
          }`}
          value={credential}
          onChange={onChange}
        />

        {isUpdating && (
          <button
            className="btn-primary-filled w-max px-4"
            type="submit"
            // onClick={submitHandler}
          >
            Save changes
          </button>
        )}
      </form>
    </div>
  );
};

export const ProfileAccountSettings = ({
  label,
  formHandler,
  submitHandler,
  isUpdating,
  children,
}) => {
  return (
    <div className="rounded-md border p-10 space-y-4">
      <div className="flex justify-between">
        <h3 className="font-semibold">{label}</h3>
        <h3
          onClick={formHandler}
          className="font-semibold underline cursor-pointer"
        >
          {isUpdating ? "Cancel" : "Update"}
        </h3>
      </div>
      <form onSubmit={submitHandler} className="space-y-5">
        {children}
      </form>
    </div>
  );
};
