// hooks/useProfileApi.js
import { useQuery, useMutation } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";

const api = async (url, opts = {}) => {
  Sentry.addBreadcrumb({
    category: "api-request",
    message: `${opts.method || "GET"} ${url}`,
    level: "info",
    data: opts.body ? JSON.parse(opts.body) : undefined,
  });

  const res = await fetch(url, {
    method: opts.method || "GET",
    headers: { "Content-Type": "application/json" },
    ...opts,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    Sentry.captureMessage(`API Error: ${url}`, {
      level: "error",
      extra: data,
    });
    throw new Error(data.error || "Something went wrong");
  }

  return data;
};

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: () => api("/api/profile"),
    retry: 1,
    onSuccess: (data) => {
      Sentry.setUser({ email: data.email, id: data.id });
    },
    onError: (err) => {
      Sentry.captureException(err);
    },
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: (body) =>
      api("/api/profile/update", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onError: (err) => {
      Sentry.captureException(err);
    },
  });
