import { SupabaseClient, createClient } from "@supabase/supabase-js";

export const supabase = new SupabaseClient(
  "https://ifajmjqjttcioleifdnu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmYWptanFqdHRjaW9sZWlmZG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwMzYxMTksImV4cCI6MjAxNzYxMjExOX0.GvXuZsHsNFeEmIEn2ZmRDUJWzBx4OT8OXSngM-a4_xQ"
);
