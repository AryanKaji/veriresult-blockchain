"use client";

import { useMemo, useState } from "react";
import { IoChevronDownOutline, IoSearchOutline } from "react-icons/io5";
import { CourseOption } from "@/src/types/academic/adminAcademic.types";

type SearchableCourseSelectProps = {
  courses: CourseOption[];
  disabled?: boolean;
  label: string;
  loading?: boolean;
  name: string;
  onChange: (courseCode: string) => void;
  placeholder?: string;
  value: string;
};

export function SearchableCourseSelect({
  courses,
  disabled = false,
  label,
  loading = false,
  name,
  onChange,
  placeholder = "Search course",
  value,
}: SearchableCourseSelectProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectedCourse = courses.find((course) => course.courseCode === value);
  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return courses;
    }

    return courses.filter((course) =>
      `${course.courseCode} ${course.courseName}`.toLowerCase().includes(normalizedQuery)
    );
  }, [courses, query]);

  function selectCourse(course: CourseOption) {
    onChange(course.courseCode);
    setQuery("");
    setIsOpen(false);
  }

  return (
    <div className="grid gap-2 text-sm font-medium text-slate-700">
      <label htmlFor={name}>{label}</label>
      <div className="relative">
        <input name={name} required type="hidden" value={value} />
        <button
          className="flex h-11 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-left text-sm text-slate-950 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          disabled={disabled || loading}
          id={name}
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <span className={selectedCourse ? "" : "text-slate-400"}>
            {selectedCourse
              ? `${selectedCourse.courseCode} - ${selectedCourse.courseName}`
              : loading
                ? "Loading courses..."
                : "Select course"}
          </span>
          <IoChevronDownOutline aria-hidden="true" className="h-4 w-4 text-slate-500" />
        </button>

        {isOpen ? (
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
            <div className="relative border-b border-slate-100">
              <IoSearchOutline
                aria-hidden="true"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
              <input
                autoComplete="off"
                className="h-11 w-full px-9 text-sm text-slate-950 outline-none placeholder:text-slate-400"
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                type="search"
                value={query}
              />
            </div>

            <div className="max-h-56 overflow-auto p-1">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <button
                    className="grid w-full gap-0.5 rounded-md px-3 py-2 text-left text-sm transition hover:bg-slate-100"
                    key={course.id}
                    onClick={() => selectCourse(course)}
                    type="button"
                  >
                    <span className="font-semibold text-slate-950">
                      {course.courseCode} - {course.courseName}
                    </span>
                    <span className="text-xs text-slate-500">
                      {course.durationInYears} year course
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-4 text-sm text-slate-500">No course found.</p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
