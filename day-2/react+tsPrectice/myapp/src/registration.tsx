import { useState } from "react";

import { Input } from "./input";
import { Select } from "./select";
import { Checkbox } from "./checkbox";

interface FormData {
  name: string;
  email: string;
  role: string;
  acceptTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  role?: string;
  acceptTerms?: string;
}

const roleOptions: {
  label: string;
  value: string;
}[] = [
  {
    label: "Customer",
    value: "customer",
  },
  {
    label: "Seller",
    value: "seller",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

export function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    role: "customer",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain @";
    }

    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms =
        "You must accept the terms";
    }

    setErrors(newErrors);

    // Stop if there are errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // If everything is valid
    console.log("Registration data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>

      {/* Name */}
      <Input
        label="Name"
        value={formData.name}
        onChange={(value: string) => {
          setFormData({
            ...formData,
            name: value,
          });
        }}
        error={errors.name}
      />

      {/* Email */}
      <Input
        label="Email"
        value={formData.email}
        onChange={(value: string) => {
          setFormData({
            ...formData,
            email: value,
          });
        }}
        error={errors.email}
      />

      {/* Role */}
      <Select
        label="Role"
        value={formData.role}
        options={roleOptions}
        onChange={(value: string) => {
          setFormData({
            ...formData,
            role: value,
          });
        }}
        error={errors.role}
      />

      {/* Terms */}
      <Checkbox
        label="I accept the terms and conditions"
        value={formData.acceptTerms}
        onChange={(value: boolean) => {
          setFormData({
            ...formData,
            acceptTerms: value,
          });
        }}
        error={errors.acceptTerms}
      />

      <button type="submit">
        Register
      </button>
    </form>
  );
}