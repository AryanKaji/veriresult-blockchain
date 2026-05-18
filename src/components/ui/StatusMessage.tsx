type MessageStatus = "idle" | "submitting" | "success" | "error";

type StatusMessageProps = {
  message: string;
  status: MessageStatus;
};

export function StatusMessage({ message, status }: StatusMessageProps) {
  if (!message || status === "idle" || status === "submitting") {
    return null;
  }

  const isError = status === "error";

  return (
    <p
      aria-live="polite"
      className={`rounded-lg border px-3 py-2 text-sm ${
        isError
          ? "border-rose-200 bg-rose-50 text-rose-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}
    >
      {message}
    </p>
  );
}
