import { redirect } from "next/navigation";
import { ConcertForm } from "@/components/ConcertForm";
import { createClient } from "@/lib/supabase/server";

export default async function AddConcertPage() {
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
        <h2 className="text-2xl font-bold">Add Concert</h2>
        <p className="opacity-70 mt-1">
          Fill in the details and costs for a show you attended.
        </p>
      </div>
      <ConcertForm userId={user.id} />
    </div>
  );
}
