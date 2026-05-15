"use client";

import Link from "next/link";
import { useLoginForm } from "../hooks/useLoginForm";
import { STAFF_LOGIN_OPTIONS } from "../constants/loginOptions";
import { LoginForm } from "./LoginForm";
import { RoleSelector } from "./RoleSelector";

export function LoginPanel() {
  const {
    credentials,
    isSubmitting,
    message,
    role,
    selectedOption,
    status,
    selectRole,
    submitLogin,
    updateCredential,
  } = useLoginForm({
    allowedRoles: STAFF_LOGIN_OPTIONS.map((option) => option.role),
    initialRole: "admin",
  });

  return (
    <section className="flex flex-col justify-center bg-white p-6 sm:p-10">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-semibold text-cyan-700">Welcome back</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            {selectedOption.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {selectedOption.subtitle}
          </p>
        </div>

        <div className="grid gap-6">
          <RoleSelector
            activeRole={role}
            onRoleChange={selectRole}
            options={STAFF_LOGIN_OPTIONS}
          />
          <LoginForm
            credentials={credentials}
            isSubmitting={isSubmitting}
            message={message}
            onSubmit={submitLogin}
            onUpdateCredential={updateCredential}
            option={selectedOption}
            status={status}
          />

          <p className="text-center text-sm text-slate-500">
            Student?{" "}
            <Link
              className="font-semibold text-slate-950 hover:text-cyan-700"
              href="/student/login"
            >
              Use student login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
