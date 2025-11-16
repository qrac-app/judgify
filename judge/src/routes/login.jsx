import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: Login
})

// Login.jsx
// pages/Login.jsx
import { useState } from "react";
import { useLogin } from "../hooks/useAuthApi";
import * as Sentry from "@sentry/react";

 function Login() {
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    if (!email || !password) {
      Sentry.captureMessage("Missing login fields", {
        level: "warning",
        extra: { email },
      });
      alert("Enter email and password");
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          alert("Logged in");
        },
        onError: (err) => {
          alert(err.message);
        },
      }
    );
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={loginMutation.isPending} onClick={submit}>
        {loginMutation.isPending ? "..." : "Login"}
      </button>
    </div>
  );
}
