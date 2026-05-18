"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AdminCourse,
  AdminSemester,
  CourseInput,
  SemesterInput,
} from "@/src/types/academic/adminAcademic.types";
import {
  getAcademicPayload,
  removeCourse,
  removeSemester,
  saveCourse,
  saveSemester,
} from "../services/adminAcademicClient";

const EMPTY_COURSE: CourseInput = {
  courseCode: "",
  courseName: "",
  description: "",
  durationInYears: 3,
  isAvailable: true,
};

const EMPTY_SEMESTER: SemesterInput = {
  courseId: "",
  endingDate: "",
  semesterCode: "",
  semesterNumber: 1,
  startingDate: "",
};

type AcademicStatus = "idle" | "submitting" | "success" | "error";

export function useAdminAcademic() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [semesters, setSemesters] = useState<AdminSemester[]>([]);
  const [courseForm, setCourseForm] = useState<CourseInput>(EMPTY_COURSE);
  const [semesterForm, setSemesterForm] = useState<SemesterInput>(EMPTY_SEMESTER);
  const [editingCourseId, setEditingCourseId] = useState("");
  const [editingSemesterId, setEditingSemesterId] = useState("");
  const [status, setStatus] = useState<AcademicStatus>("idle");
  const [message, setMessage] = useState("");

  const isSubmitting = status === "submitting";

  const courseLookup = useMemo(
    () => new Map(courses.map((course) => [course.id, course])),
    [courses]
  );

  async function refreshAcademicData() {
    const payload = await getAcademicPayload();

    setCourses(payload.courses);
    setSemesters(payload.semesters);
  }

  useEffect(() => {
    let isActive = true;

    async function loadAcademicData() {
      try {
        const payload = await getAcademicPayload();

        if (!isActive) {
          return;
        }

        setCourses(payload.courses);
        setSemesters(payload.semesters);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Unable to load academic data.");
      }
    }

    void loadAcademicData();

    return () => {
      isActive = false;
    };
  }, []);

  function updateCourseField(name: keyof CourseInput, value: string | number | boolean) {
    setCourseForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function updateSemesterField(name: keyof SemesterInput, value: string | number) {
    setSemesterForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetCourseForm() {
    setCourseForm(EMPTY_COURSE);
    setEditingCourseId("");
  }

  function resetSemesterForm() {
    setSemesterForm(EMPTY_SEMESTER);
    setEditingSemesterId("");
  }

  function editCourse(course: AdminCourse) {
    setCourseForm({
      courseCode: course.courseCode,
      courseName: course.courseName,
      description: course.description,
      durationInYears: course.durationInYears,
      isAvailable: course.isAvailable,
    });
    setEditingCourseId(course.id);
  }

  function editSemester(semester: AdminSemester) {
    setSemesterForm({
      courseId: semester.courseId,
      endingDate: semester.endingDate,
      semesterCode: semester.semesterCode,
      semesterNumber: semester.semesterNumber,
      startingDate: semester.startingDate,
    });
    setEditingSemesterId(semester.id);
  }

  async function submitCourse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const result = await saveCourse(courseForm, editingCourseId || undefined);

      setStatus("success");
      setMessage(result.message);
      resetCourseForm();
      await refreshAcademicData();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to save course.");
    }
  }

  async function submitSemester(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const result = await saveSemester(semesterForm, editingSemesterId || undefined);

      setStatus("success");
      setMessage(result.message);
      resetSemesterForm();
      await refreshAcademicData();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to save semester.");
    }
  }

  async function deleteCourse(courseId: string) {
    if (!window.confirm("Delete this course and all related semesters?")) {
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const result = await removeCourse(courseId);

      setStatus("success");
      setMessage(result.message);
      resetCourseForm();
      resetSemesterForm();
      await refreshAcademicData();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to delete course.");
    }
  }

  async function deleteSemester(semesterId: string) {
    if (!window.confirm("Delete this semester?")) {
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const result = await removeSemester(semesterId);

      setStatus("success");
      setMessage(result.message);
      resetSemesterForm();
      await refreshAcademicData();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to delete semester.");
    }
  }

  return {
    courseForm,
    courseLookup,
    courses,
    editingCourseId,
    editingSemesterId,
    isSubmitting,
    message,
    semesterForm,
    semesters,
    status,
    deleteCourse,
    deleteSemester,
    editCourse,
    editSemester,
    resetCourseForm,
    resetSemesterForm,
    submitCourse,
    submitSemester,
    updateCourseField,
    updateSemesterField,
  };
}
