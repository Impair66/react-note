"use client";

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://eskewjqinihxuykxhmrb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVza2V3anFpbmloeHV5a3hobXJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNjgwMTMsImV4cCI6MjA4MDg0NDAxM30.zC3t8OjTieQ_CEMEZ8BRXeXhVkkEhuQ7AyTeC_ankok"
);
