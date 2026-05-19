import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
};

type InputFieldProps = BaseProps & {
  multiline?: false;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
};

type TextareaFieldProps = BaseProps & {
  multiline: true;
  inputProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export function FormField(props: InputFieldProps | TextareaFieldProps) {
  const { label, htmlFor, hint, error, required, multiline, inputProps } = props;

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[10rem_1fr] sm:items-center sm:gap-4">
      <label htmlFor={htmlFor} className="label justify-start p-0 sm:justify-end">
        <span className="label-text font-medium">
          {label}
          {required && <span className="text-error"> *</span>}
        </span>
      </label>
      <div className="min-w-0">
        {multiline ? (
          <textarea
            id={htmlFor}
            className={`textarea textarea-bordered w-full ${error ? "textarea-error" : ""}`}
            {...inputProps}
          />
        ) : (
          <input
            id={htmlFor}
            className={`input input-bordered w-full ${error ? "input-error" : ""}`}
            {...inputProps}
          />
        )}
        {hint && <p className="mt-1 text-sm opacity-70">{hint}</p>}
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    </div>
  );
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body gap-4">
        <div>
          <h2 className="card-title text-xl">{title}</h2>
          {description && <p className="text-sm opacity-70 mt-1">{description}</p>}
        </div>
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}
