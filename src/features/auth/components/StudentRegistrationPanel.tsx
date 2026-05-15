"use client";

import Link from "next/link";
import { useStudentRegistrationForm } from "../hooks/useStudentRegistrationForm";
import { StudentRegistrationForm } from "./StudentRegistrationForm";

export function StudentRegistrationPanel() {
  const {
    form,
    isSubmitting,
    message,
    status,
    submitRegistration,
    updateField,
  } = useStudentRegistrationForm();

  return (
    <section className="flex flex-col justify-center bg-white p-6 sm:p-10">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-semibold text-cyan-700">Student registration</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            Create student access
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Register with course details to generate a student enrollment number.
          </p>
        </div>

        <div className="grid gap-6">
          <StudentRegistrationForm
            form={form}
            isSubmitting={isSubmitting}
            message={message}
            onSubmit={submitRegistration}
            onUpdateField={updateField}
            status={status}
          />

          <p className="text-center text-sm text-slate-500">
            Already registered?{" "}
            <Link
              className="font-semibold text-slate-950 hover:text-cyan-700"
              href="/student/login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
