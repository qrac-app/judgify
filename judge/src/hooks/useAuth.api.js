// hooks/useAuthApi.js
import { useMutation } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";

const api = async (url, body) => {
  Sentry.addBreadcrumb({
    category: "api-request",
    message: `POST ${url}`,
    level: "info",
    data: body,
  });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    Sentry.captureMessage(`API Error at ${url}`, {
      level: "error",
      extra: { body, serverError: data },
    });
    throw new Error(data.error || "Unknown error");
  }

  return data;
};

export const useLogin = () =>
  useMutation({
    mutationFn: ({ email, password }) =>
      api("/api/login", { email, password }),
    onSuccess: (data, variables) => {
      Sentry.setUser({ email: variables.email });
      Sentry.addBreadcrumb({ message: "User logged in", level: "info" });
    },
    onError: (err) => {
      Sentry.captureException(err);
    },
  });

export const useSignup = () =>
  useMutation({
    mutationFn: ({ email, password }) =>
      api("/api/signup", { email, password }),
    onError: (err) => {
      Sentry.captureException(err);
    },
  });
