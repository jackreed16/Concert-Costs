import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <header className="container mx-auto px-4 py-4 max-w-6xl w-full">
        <Link href="/login" className="btn btn-ghost btn-sm">
          ← Log in
        </Link>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
