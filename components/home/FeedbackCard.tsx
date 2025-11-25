"use client";

import { useState } from "react";

export default function FeedbackCard() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const maxChars = 280;

  const remaining = maxChars - feedback.length;
  const nameError = name.trim().length === 0 ? "Vui lòng nhập tên của bạn" : "";
  const fbError =
    feedback.trim().length < 10
      ? "Góp ý nên có ít nhất 10 ký tự"
      : feedback.length > maxChars
      ? `Vượt quá ${maxChars} ký tự`
      : "";

  const hasError = !!nameError || !!fbError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasError) return;
    // Fake submit
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setName("");
    setFeedback("");
  };

  return (
    <div className="relative mx-auto p-0">
      {/* Gradient border */}
      <div className="absolute -inset-0.5 rounded-2xl shadow-2xl opacity-60"></div>

      {/* Card body */}
      <div className="relative rounded-2xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-xl ring-1 ring-black/5 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-green-500 to-teal-500 text-white grid place-items-center">
            ✨
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Góp ý cho chúng tôi</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Nói bất cứ điều gì bạn nghĩ—chúng tôi trân trọng từng ý kiến.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="px-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pt-5 pb-6 space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Tên của bạn
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ví dụ: Nam"
                className={[
                  "w-full rounded-xl border bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm px-4 py-3",
                  "text-sm outline-none transition-all",
                  "placeholder:text-neutral-400",
                  "border-neutral-200 dark:border-neutral-800",
                  !nameError
                    ? "focus:border-violet-400 focus:ring-2 focus:ring-violet-200/60 dark:focus:ring-violet-800/40"
                    : "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200/60 dark:focus:ring-rose-800/40",
                ].join(" ")}
              />
              {/* Glow accent */}
              <span className="pointer-events-none absolute inset-px rounded-[0.9rem] ring-1 ring-white/40 dark:ring-black/20" />
            </div>
            {nameError && (
              <p className="text-xs text-rose-600 dark:text-rose-400">{nameError}</p>
            )}
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <label htmlFor="feedback" className="text-sm font-medium">
              Nội dung góp ý
            </label>
            <div className="relative">
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Bạn thích điều gì? Điều gì cần cải thiện? Hãy kể cụ thể..."
                rows={5}
                className={[
                  "w-full rounded-xl border bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm px-4 py-3",
                  "text-sm outline-none transition-all resize-y",
                  "placeholder:text-neutral-400",
                  "border-neutral-200 dark:border-neutral-800",
                  !fbError
                    ? "focus:border-sky-400 focus:ring-2 focus:ring-sky-200/60 dark:focus:ring-sky-800/40"
                    : "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200/60 dark:focus:ring-rose-800/40",
                ].join(" ")}
              />
              {/* Character counter */}
              <div className="absolute bottom-2 right-3 text-[11px]">
                <span
                  className={[
                    "px-2 py-1 rounded-lg",
                    remaining < 0
                      ? "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300"
                      : remaining <= 20
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
                  ].join(" ")}
                >
                  {remaining} ký tự còn lại
                </span>
              </div>
              <span className="pointer-events-none absolute inset-px rounded-[0.9rem] ring-1 ring-white/40 dark:ring-black/20" />
            </div>
            {fbError && (
              <p className="text-xs text-rose-600 dark:text-rose-400">{fbError}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-green-500 to-teal-500 text-white">
                💬
              </span>
              <span>Phản hồi của bạn giúp sản phẩm tốt hơn mỗi ngày.</span>
            </div>

            <button
              type="submit"
              disabled={hasError}
              className={[
                "group relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-semibold",
                "transition-all focus:outline-none",
                hasError
                  ? "bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 cursor-not-allowed"
                  : "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute inset-0 opacity-0 transition-opacity",
                  hasError ? "" : "group-hover:opacity-100",
                  "bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500",
                ].join(" ")}
              />
              <span className="relative z-10 flex items-center gap-2">
                {submitted ? "Đã gửi! Cảm ơn bạn" : "Gửi góp ý"}
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.5 10a.75.75 0 0 1 .75-.75h11.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H3.25A.75.75 0 0 1 2.5 10Z" />
                </svg>
              </span>
            </button>
          </div>
        </form>

        {/* Subtle success toast */}
        {submitted && (
          <div className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2">
            <div className="rounded-lg bg-white/90 dark:bg-neutral-900/90 px-4 py-2 shadow-lg ring-1 ring-black/5">
              <p className="text-sm">
                Cảm ơn bạn đã chia sẻ! Mình sẽ đọc kỹ từng dòng.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}