"use client";

import { FormEvent, useEffect, useState } from "react";
import { CourseOption } from "@/src/types/academic/adminAcademic.types";
import {
  StudentRegistrationFormValues,
  StudentRegistrationStatus,
} from "@/src/types/auth/studentRegistration.types";
import { getCourseOptions } from "../../academic/services/courseCatalogClient";
import { submitStudentRegistration } from "../services/studentRegistrationClient";

const EMPTY_FORM: StudentRegistrationFormValues = {
  confirmPassword: "",
  courseCode: "",
  dateOfBirth: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};

export function useStudentRegistrationForm() {
  const [form, setForm] = useState<StudentRegistrationFormValues>(EMPTY_FORM);
  const [status, setStatus] = useState<StudentRegistrationStatus>("idle");
  const [message, setMessage] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  const isSubmitting = status === "submitting";

  useEffect(() => {
    let isActive = true;

    async function loadCourses() {
      try {
        const courseOptions = await getCourseOptions();

        if (!isActive) {
          return;
        }

        setCourses(courseOptions);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Unable to load courses.");
      } finally {
        if (isActive) {
          setIsLoadingCourses(false);
        }
      }
    }

    void loadCourses();

    return () => {
      isActive = false;
    };
  }, []);

  function updateField(name: keyof StudentRegistrationFormValues, value: string) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function submitRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    setEnrollmentNumber("");

    try {
      if (!form.courseCode) {
        setStatus("error");
        setMessage("Please select a course.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setStatus("error");
        setMessage("Password and confirm password must match.");
        return;
      }

      const result = await submitStudentRegistration({
        courseCode: form.courseCode,
        dateOfBirth: form.dateOfBirth,
        email: form.email,
        name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        password: form.password,
      });

      setStatus("success");
      setMessage(`${result.message}. Enrollment number: ${result.student.enrollmentNumber}`);
      setEnrollmentNumber(result.student.enrollmentNumber);
      setForm(EMPTY_FORM);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to register student.");
    }
  }

  return {
    courses,
    enrollmentNumber,
    form,
    isLoadingCourses,
    isSubmitting,
    message,
    status,
    submitRegistration,
    updateField,
  };
}
