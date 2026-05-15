"use client";

import { InputHTMLAttributes, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  showPasswordToggle?: boolean;
};

export function TextField({
  className = "",
  id,
  label,
  showPasswordToggle = false,
  type,
  ...props
}: TextFieldProps) {
  const inputId = id ?? props.name;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const canTogglePassword = showPasswordToggle && type === "password";
  const inputType = canTogglePassword && isPasswordVisible ? "text" : type;
  const PasswordIcon = isPasswordVisible ? IoEyeOffOutline : IoEyeOutline;

  return (
    <label
      className="grid gap-2 text-sm font-medium text-slate-700"
      htmlFor={inputId}
    >
      {label}
      <span className="relative">
        <input
          id={inputId}
          className={`h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-200 ${
            canTogglePassword ? "pr-11" : ""
          } ${className}`}
          type={inputType}
          {...props}
        />
        {canTogglePassword ? (
          <button
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-slate-500 transition hover:text-slate-950"
            onClick={() => setIsPasswordVisible((current) => !current)}
            type="button"
          >
            <PasswordIcon aria-hidden="true" className="h-5 w-5" />
          </button>
        ) : null}
      </span>
    </label>
  );
}
