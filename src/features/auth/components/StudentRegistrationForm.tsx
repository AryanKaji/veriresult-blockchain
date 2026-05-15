"use client";

import { FormEvent } from "react";
import { Button } from "@/src/components/ui/Button";
import { StatusMessage } from "@/src/components/ui/StatusMessage";
import { TextField } from "@/src/components/ui/TextField";
import {
  StudentRegistrationFormValues,
  StudentRegistrationStatus,
} from "@/src/types/auth/studentRegistration.types";

type StudentRegistrationFormProps = {
  form: StudentRegistrationFormValues;
  isSubmitting: boolean;
  message: string;
  status: StudentRegistrationStatus;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdateField: (name: keyof StudentRegistrationFormValues, value: string) => void;
};

export function StudentRegistrationForm({
  form,
  isSubmitting,
  message,
  status,
  onSubmit,
  onUpdateField,
}: StudentRegistrationFormProps) {
  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          autoComplete="given-name"
          label="First name"
          name="firstName"
          onChange={(event) => onUpdateField("firstName", event.target.value)}
          placeholder="First name"
          required
          type="text"
          value={form.firstName}
        />

        <TextField
          autoComplete="family-name"
          label="Last name"
          name="lastName"
          onChange={(event) => onUpdateField("lastName", event.target.value)}
          placeholder="Last name"
          required
          type="text"
          value={form.lastName}
        />
      </div>

      <TextField
        autoComplete="email"
        label="Email address"
        name="email"
        onChange={(event) => onUpdateField("email", event.target.value)}
        placeholder="student@example.com"
        required
        type="email"
        value={form.email}
      />

      <TextField
        autoComplete="new-password"
        label="Password"
        minLength={6}
        name="password"
        onChange={(event) => onUpdateField("password", event.target.value)}
        placeholder="Create a password"
        required
        showPasswordToggle
        type="password"
        value={form.password}
      />

      <TextField
        autoComplete="new-password"
        label="Confirm password"
        minLength={6}
        name="confirmPassword"
        onChange={(event) => onUpdateField("confirmPassword", event.target.value)}
        placeholder="Confirm your password"
        required
        showPasswordToggle
        type="password"
        value={form.confirmPassword}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Course code"
          name="courseCode"
          onChange={(event) => onUpdateField("courseCode", event.target.value)}
          placeholder="BCA"
          required
          type="text"
          value={form.courseCode}
        />

        <TextField
          label="Date of birth"
          name="dateOfBirth"
          onChange={(event) => onUpdateField("dateOfBirth", event.target.value)}
          type="date"
          value={form.dateOfBirth}
        />
      </div>

      <StatusMessage message={message} status={status} />

      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Registering..." : "Register student"}
      </Button>
    </form>
  );
}
