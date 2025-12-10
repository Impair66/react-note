import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export function createSupabaseServer() {
  const cookieStore = cookies();

  return createServerClient(
    "https://eskewjqinihxuykxhmrb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVza2V3anFpbmloeHV5a3hobXJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNjgwMTMsImV4cCI6MjA4MDg0NDAxM30.zC3t8OjTieQ_CEMEZ8BRXeXhVkkEhuQ7AyTeC_ankok",
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}
