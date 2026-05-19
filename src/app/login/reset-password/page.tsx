import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <header className="container mx-auto px-4 py-4 max-w-6xl w-full">
        <Link href="/login" className="btn btn-ghost btn-sm">
          ← Log in
        </Link>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
