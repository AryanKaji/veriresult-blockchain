"use client";

import { FormEvent } from "react";
import { Button } from "@/src/components/ui/Button";
import { StatusMessage } from "@/src/components/ui/StatusMessage";
import { TextField } from "@/src/components/ui/TextField";
import { LoginCredentials, LoginStatus } from "@/src/types/auth/login.types";
import { LoginOption } from "../constants/loginOptions";

type LoginFormProps = {
  credentials: LoginCredentials;
  isSubmitting: boolean;
  message: string;
  option: LoginOption;
  status: LoginStatus;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdateCredential: (name: keyof LoginCredentials, value: string) => void;
};

export function LoginForm({
  credentials,
  isSubmitting,
  message,
  option,
  status,
  onSubmit,
  onUpdateCredential,
}: LoginFormProps) {
  const identifierValue = credentials[option.identifierName];

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <TextField
        autoComplete={option.identifierName === "email" ? "email" : "username"}
        label={option.identifierLabel}
        name={option.identifierName}
        onChange={(event) =>
          onUpdateCredential(option.identifierName, event.target.value)
        }
        placeholder={option.identifierPlaceholder}
        required
        type={option.identifierType}
        value={identifierValue}
      />

      <TextField
        autoComplete="current-password"
        label="Password"
        name="password"
        onChange={(event) => onUpdateCredential("password", event.target.value)}
        placeholder="Enter your password"
        required
        showPasswordToggle
        type="password"
        value={credentials.password}
      />

      <StatusMessage message={message} status={status} />

      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Signing in..." : `Sign in as ${option.label}`}
      </Button>
    </form>
  );
}
