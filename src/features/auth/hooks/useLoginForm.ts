"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LoginCredentials,
  LoginRole,
  LoginStatus,
} from "@/src/types/auth/login.types";
import { getLoginOption, LOGIN_OPTIONS } from "../constants/loginOptions";
import { loginUser } from "../services/authService";

const EMPTY_CREDENTIALS: LoginCredentials = {
  email: "",
  enrollmentNumber: "",
  password: "",
};

type UseLoginFormOptions = {
  initialRole?: LoginRole;
  allowedRoles?: LoginRole[];
};

export function useLoginForm({
  initialRole = "admin",
  allowedRoles = LOGIN_OPTIONS.map((option) => option.role),
}: UseLoginFormOptions = {}) {
  const router = useRouter();
  const [role, setRole] = useState<LoginRole>(initialRole);
  const [credentials, setCredentials] = useState<LoginCredentials>(EMPTY_CREDENTIALS);
  const [status, setStatus] = useState<LoginStatus>("idle");
  const [message, setMessage] = useState("");

  const selectedOption = useMemo(() => getLoginOption(role), [role]);
  const isSubmitting = status === "submitting";

  function updateCredential(name: keyof LoginCredentials, value: string) {
    setCredentials((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function selectRole(nextRole: LoginRole) {
    if (!allowedRoles.includes(nextRole)) {
      return;
    }

    setRole(nextRole);
    setStatus("idle");
    setMessage("");
  }

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const result = await loginUser({ role, credentials });
      setStatus("success");
      setMessage(result.message);
      router.replace(selectedOption.destination);
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    }
  }

  return {
    credentials,
    isSubmitting,
    message,
    role,
    selectedOption,
    status,
    selectRole,
    submitLogin,
    updateCredential,
  };
}
