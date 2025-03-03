import React, { useState, ChangeEvent, FormEvent } from "react";
import { Survey, Gender } from "../../types/survey.types";
import { SurveyService } from "../../services/survey.service";
import { Messages } from "../../constants/messages.constant";

// Helper for nation list
const nationalities = [
  { value: "USA", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Japan", label: "Japan" },
  { value: "China", label: "China" },
  { value: "India", label: "India" },
  { value: "Other", label: "Other" },
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

// Custom Form Input Component with proper types
interface FormInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  error = "",
  placeholder = "",
}) => (
  <div className="mb-5">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-600 mb-1"
    >
      {label} {required && <span className="text-blue-500">*</span>}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
        error ? "border-red-400" : "border-gray-200"
      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// Custom Form Select Component with proper types
interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  error?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  required = false,
  error = "",
}) => (
  <div className="mb-5">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-600 mb-1"
    >
      {label} {required && <span className="text-blue-500">*</span>}
    </label>
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`appearance-none w-full px-4 py-3 rounded-lg bg-gray-50 border ${
          error ? "border-red-400" : "border-gray-200"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// Custom Form Textarea Component with proper types
interface FormTextAreaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  error?: string;
  rows?: number;
  placeholder?: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  error = "",
  rows = 3,
  placeholder = "",
}) => (
  <div className="mb-5">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-600 mb-1"
    >
      {label} {required && <span className="text-blue-500">*</span>}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
        error ? "border-red-400" : "border-gray-200"
      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none`}
    ></textarea>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// Notification Component with proper types
interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  const bgColor =
    type === "success"
      ? "bg-green-100 border-green-500 text-green-700"
      : type === "error"
      ? "bg-red-100 border-red-500 text-red-700"
      : "bg-blue-100 border-blue-500 text-blue-700";

  return (
    <div
      className={`${bgColor} border-l-4 p-4 mb-6 rounded-lg flex justify-between items-center`}
    >
      <p>{message}</p>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition duration-200"
        type="button"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

// Hidden field for anti-spam (honeypot)
const HoneypotField: React.FC = () => (
  <div className="hidden">
    <label htmlFor="website">Website</label>
    <input
      type="text"
      id="website"
      name="website"
      tabIndex={-1}
      autoComplete="off"
    />
  </div>
);

const SurveyForm: React.FC = () => {
  const initialFormState: Survey = {
    name: "",
    gender: "prefer_not_to_say" as Gender,
    nationality: "",
    email: "",
    phoneNumber: "",
    address: "",
    message: "",
  };

  const [formData, setFormData] = useState<Survey>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    show: false,
    message: "",
    type: "info",
  });

  // Honeypot state to catch bots
  const [honeypot, setHoneypot] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    // Nationality validation
    if (!formData.nationality) {
      newErrors.nationality = "Please select a nationality";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Handle honeypot field
    if (name === "website") {
      setHoneypot(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // If honeypot field is filled, silently reject the submission
    if (honeypot) {
      console.log("Spam detected");
      setNotification({
        show: true,
        message: Messages.FORM_SUBMIT_SUCCESS, // Fake success message to not alert bots
        type: "success",
      });
      return;
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await SurveyService.submitSurvey(formData);

      if (response.data) {
        // Successful submission
        setNotification({
          show: true,
          message: Messages.FORM_SUBMIT_SUCCESS,
          type: "success",
        });

        // Reset form
        setFormData(initialFormState);
      } else {
        // API returned errors
        const errorMessage = response.message || Messages.FORM_SUBMIT_ERROR;
        setNotification({
          show: true,
          message: errorMessage,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      setNotification({
        show: true,
        message: Messages.FORM_SUBMIT_ERROR,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progress indicator
  const calculateProgress = () => {
    const totalFields = 7; // Total number of required fields
    let filledFields = 0;

    if (formData.name.trim()) filledFields++;
    if (formData.gender) filledFields++;
    if (formData.nationality) filledFields++;
    if (formData.email.trim()) filledFields++;
    if (formData.phoneNumber.trim()) filledFields++;
    if (formData.address.trim()) filledFields++;
    if (formData.message.trim()) filledFields++;

    return (filledFields / totalFields) * 100;
  };

  const progress = calculateProgress();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Share Your Thoughts
          </h2>

          {notification.show && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification({ ...notification, show: false })}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="name"
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                error={errors.name}
                placeholder="Your name"
              />

              <FormSelect
                id="gender"
                name="gender"
                label="Gender"
                value={formData.gender}
                onChange={handleChange}
                options={genderOptions}
                required
                error={errors.gender}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                id="nationality"
                name="nationality"
                label="Nationality"
                value={formData.nationality}
                onChange={handleChange}
                options={nationalities}
                required
                error={errors.nationality}
              />

              <FormInput
                id="email"
                name="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                error={errors.email}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                error={errors.phoneNumber}
                placeholder="+1 (555) 123-4567"
              />

              <FormInput
                id="address"
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                required
                error={errors.address}
                placeholder="Your address"
              />
            </div>

            <FormTextArea
              id="message"
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleChange}
              required
              error={errors.message}
              rows={4}
              placeholder="What would you like to share with us?"
            />

            {/* Honeypot field for anti-spam */}
            <HoneypotField />

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 
                  ${
                    isSubmitting
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Submit Survey"
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              By submitting this form, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
