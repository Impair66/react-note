"use client";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "951686812@qq.com",
      password: "A5972758",
    });

    console.log("LOGIN:", data, error);
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>登录</button>
    </div>
  );
}
