// hooks/useProblemApi.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import * as Sentry from "@sentry/react";

/* ---------------------------
   GET /problems (with pagination & filter)
---------------------------- */
export const useProblems = ({ page = 1, limit = 10, search = "", tag = "" }) =>
  useQuery({
    queryKey: ["problems", { page, limit, search, tag }],
    queryFn: () => {
      const params = new URLSearchParams({
        page,
        limit,
        search,
        tag,
      }).toString();

      return api(`/api/problems?${params}`);
    },
    keepPreviousData: true, // smooth pagination
    staleTime: 5_000,
    onError: (err) => Sentry.captureException(err),
  });

/* ---------------------------
   GET /problem/:id
---------------------------- */
export const useProblem = (id) =>
  useQuery({
    queryKey: ["problem", id],
    queryFn: () => api(`/api/problems/${id}`),
    enabled: !!id,
    onError: (err) => Sentry.captureException(err),
  });

/* ---------------------------
   POST /create
---------------------------- */
export const useCreateProblem = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body) =>
      api("/api/problems/create", {
        method: "POST",
        body: JSON.stringify(body),
      }),

    onSuccess: () => {
      qc.invalidateQueries(["problems"]);
      Sentry.captureMessage("Problem created", { level: "info" });
    },

    onError: (err) => Sentry.captureException(err),
  });
};

/* ---------------------------
   PUT /update/:id
---------------------------- */
export const useUpdateProblem = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...body }) =>
      api(`/api/problems/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),

    onSuccess: (_, { id }) => {
      qc.invalidateQueries(["problem", id]);
      qc.invalidateQueries(["problems"]);
      Sentry.captureMessage("Problem updated", { level: "info" });
    },

    onError: (err) => Sentry.captureException(err),
  });
};

/* ---------------------------
   DELETE /delete/:id
---------------------------- */
export const useDeleteProblem = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      api(`/api/problems/${id}`, {
        method: "DELETE",
      }),

    onSuccess: (_, id) => {
      qc.invalidateQueries(["problems"]);
      Sentry.captureMessage("Problem deleted", {
        level: "warning",
        extra: { id },
      });
    },

    onError: (err) => Sentry.captureException(err),
  });
};
