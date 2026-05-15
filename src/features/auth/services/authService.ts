import { LoginCredentials, LoginResult, LoginRole } from "@/src/types/auth/login.types";
import { getLoginOption } from "../constants/loginOptions";

type LoginRequest = {
  role: LoginRole;
  credentials: LoginCredentials;
};

export async function loginUser({ role, credentials }: LoginRequest): Promise<LoginResult> {
  const option = getLoginOption(role);
  const payload =
    option.identifierName === "email"
      ? { email: credentials.email.trim(), password: credentials.password }
      : {
        enrollmentNumber: credentials.enrollmentNumber.trim(),
        password: credentials.password,
      };

  const response = await fetch(option.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as Partial<LoginResult>;

  if (!response.ok) {
    throw new Error(data.message ?? "Unable to sign in. Please check your details.");
  }

  return {
    message: data.message ?? "Login successful",
  };
}
