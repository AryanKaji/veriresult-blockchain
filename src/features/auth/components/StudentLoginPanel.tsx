"use client";

import Link from "next/link";
import { STUDENT_LOGIN_OPTION } from "../constants/loginOptions";
import { useLoginForm } from "../hooks/useLoginForm";
import { LoginForm } from "./LoginForm";

export function StudentLoginPanel() {
  const {
    credentials,
    isSubmitting,
    message,
    selectedOption,
    status,
    submitLogin,
    updateCredential,
  } = useLoginForm({
    allowedRoles: ["student"],
    initialRole: "student",
  });

  return (
    <section className="flex flex-col justify-center bg-white p-6 sm:p-10">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-semibold text-cyan-700">Student access</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            {selectedOption.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Sign in with your enrollment number to view marks and results.
          </p>
        </div>

        <div className="grid gap-6">
          <LoginForm
            credentials={credentials}
            isSubmitting={isSubmitting}
            message={message}
            onSubmit={submitLogin}
            onUpdateCredential={updateCredential}
            option={STUDENT_LOGIN_OPTION}
            status={status}
          />

          <p className="text-center text-sm text-slate-500">
            New student?{" "}
            <Link
              className="font-semibold text-slate-950 hover:text-cyan-700"
              href="/student/register"
            >
              Register here
            </Link>
          </p>

          <p className="text-center text-sm text-slate-500">
            Staff member?{" "}
            <Link
              className="font-semibold text-slate-950 hover:text-cyan-700"
              href="/login"
            >
              Use staff login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
