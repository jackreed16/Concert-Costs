import { redirect } from "next/navigation";
import { AppearanceSettings } from "@/components/AppearanceSettings";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";
import { HelpSettings } from "@/components/HelpSettings";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="opacity-70 mt-1">
          Manage your account, appearance, and get help.
        </p>
      </div>
      <AppearanceSettings />
      <ChangePasswordForm userEmail={user.email ?? ""} />
      <HelpSettings />
    </div>
  );
}
