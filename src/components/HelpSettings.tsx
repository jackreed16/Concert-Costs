"use client";

import { SUPPORT_EMAIL } from "@/lib/themes";

export function HelpSettings() {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300 max-w-lg">
      <div className="card-body">
        <h2 className="card-title text-lg">Help</h2>
        <p className="text-sm opacity-70">
          Have a question, found a bug, or want to share feedback? Reach out and
          we&apos;ll get back to you.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="btn btn-primary"
          >
            Email support
          </a>
          <p className="text-sm self-center opacity-80">
            <span className="font-medium">{SUPPORT_EMAIL}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
