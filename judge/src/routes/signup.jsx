import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: Signup
})

import { useState } from "react";
import { useSignup } from "../hooks/useAuthApi";
import * as Sentry from "@sentry/react";

export default function Signup() {
  const signupMutation = useSignup();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    if (!email || !password) {
      Sentry.captureMessage("Missing signup fields", {
        level: "warning",
        extra: { email },
      });
      alert("Enter email and password");
      return;
    }

    signupMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          alert("Signup successful");
        },
        onError: (err) => {
          alert(err.message);
        },
      }
    );
  };

  return (
    <div className="auth-box">
      <h2>Signup</h2>

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

      <button disabled={signupMutation.isPending} onClick={submit}>
        {signupMutation.isPending ? "..." : "Signup"}
      </button>
    </div>
  );
}
