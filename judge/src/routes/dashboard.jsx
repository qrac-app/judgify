import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard
})
import { useState } from "react";
import {
  useProblems,
  useDeleteProblem,
} from "../hooks/useProblemApi";
import * as Sentry from "@sentry/react";

function Dashboard() {
  // UI local states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");

  // Query: GET problems w/ pagination + filtering
  const { data, isPending, isError, error } = useProblems({
    page,
    limit,
    search,
    tag,
  });

  const deleteProblem = useDeleteProblem();

  // Capture unexpected UI issues
  const handleDelete = async (id) => {
    try {
      await deleteProblem.mutateAsync(id);
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  const problems = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* FILTER BAR */}
      <div className="flex items-center gap-3 mb-6">
        <input
          className="border px-3 py-2 rounded w-64"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          className="border px-3 py-2 rounded"
          value={tag}
          onChange={(e) => {
            setPage(1);
            setTag(e.target.value);
          }}
        >
          <option value="">All Tags</option>
          <option value="array">Array</option>
          <option value="dp">DP</option>
          <option value="graph">Graph</option>
          <option value="string">String</option>
        </select>
      </div>

      {/* MAIN CONTENT */}
      {isPending && (
        <p className="text-gray-500">Loading problems...</p>
      )}

      {isError && (
        <p className="text-red-600">
          Error loading problems: {error.message}
        </p>
      )}

      {!isPending && problems.length === 0 && (
        <p className="text-gray-600">No problems found.</p>
      )}

      {/* PROBLEMS TABLE */}
      {!isPending && problems.length > 0 && (
        <table className="w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Tag</th>
              <th className="p-3 border">Difficulty</th>
              <th className="p-3 border w-32">Actions</th>
            </tr>
          </thead>

          <tbody>
            {problems.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3 border">{p.title}</td>
                <td className="p-3 border">{p.tag}</td>
                <td className="p-3 border">{p.difficulty}</td>
                <td className="p-3 border">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                      onClick={() => console.log("Edit", p.id)}
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PAGINATION */}
      {total > 0 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage((old) => old - 1)}
            >
              Prev
            </button>

            <button
              className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
              disabled={page === totalPages}
              onClick={() => setPage((old) => old + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
