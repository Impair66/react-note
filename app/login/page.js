"use client";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  async function handleLogin() {
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: "962945973@qq.com",
        password: "A5972758",
      });
    const { data, error } = await supabase
      .from("userinfo")
      .select("*")
      .eq("age", 23);
    console.log("数据:", data);
    console.log("错误:", error);
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>登录</button>
    </div>
  );
}
