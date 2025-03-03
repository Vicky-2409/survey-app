import React, { useState } from "react";

interface FormInputProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  helpText?: string;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  autoComplete?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  required = false,
  error,
  placeholder = "",
  helpText,
  className = "",
  disabled = false,
  maxLength,
  autoComplete,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Determine if the field should appear in "filled" state
  const isFloating = isFocused || value;

  return (
    <div className={`mb-6 ${className}`}>
      <div className="relative">
        {/* Floating label using absolute positioning */}
        <label
          htmlFor={id}
          className={`absolute transition-all duration-200 ${
            isFloating
              ? "text-xs -top-2.5 left-2 bg-white px-1 text-indigo-600"
              : "text-gray-500 top-2 left-3"
          } ${disabled ? "text-gray-400" : ""}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={isFocused ? placeholder : ""}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete={autoComplete}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-3 py-2 bg-white border rounded-lg transition-all duration-200 ${
            disabled ? "bg-gray-50 cursor-not-allowed" : ""
          } ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-gray-300 focus:border-indigo-500"
          } focus:outline-none focus:ring-1 ${
            error ? "focus:ring-red-500" : "focus:ring-indigo-300"
          } text-gray-700`}
        />

        {/* Show character count for inputs with maxLength */}
        {maxLength && (
          <div className="absolute right-2 bottom-2 text-xs text-gray-400">
            {value.length}/{maxLength}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>
      )}

      {/* Help text - only show if no error */}
      {helpText && !error && (
        <p className="text-gray-500 text-xs mt-1">{helpText}</p>
      )}
    </div>
  );
};

export default FormInput;
