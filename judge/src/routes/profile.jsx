import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: Profile
})
// pages/Profile.jsx
import { useState, useEffect } from "react";
import { useProfile, useUpdateProfile } from "../hooks/useProfileApi";
import * as Sentry from "@sentry/react";

 function Profile() {
  const { data, isPending, error } = useProfile();
  const updateMutation = useUpdateProfile();

  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
  });

  // Fill form when profile loads
  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        email: data.email || "",
        bio: data.bio || "",
      });
    }
  }, [data]);

  const onChange = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    Sentry.addBreadcrumb({
      category: "profile-edit",
      message: `Edited ${key}`,
      level: "info",
      data: { value },
    });
  };

  const save = () => {
    updateMutation.mutate(form, {
      onSuccess: () => {
        Sentry.captureMessage("Profile updated", {
          level: "info",
          extra: form,
        });
        alert("Saved!");
      },
      onError: (err) => {
        alert(err.message);
      },
    });
  };

  if (isPending) return <div>Loading profile...</div>;
  if (error) return <div>Failed to load profile</div>;

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>

      <div className="field">
        <label>Name</label>
        <input
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </div>

      <div className="field">
        <label>Email (readonly)</label>
        <input value={form.email} disabled />
      </div>

      <div className="field">
        <label>Bio</label>
        <textarea
          rows={4}
          value={form.bio}
          onChange={(e) => onChange("bio", e.target.value)}
        />
      </div>

      <button disabled={updateMutation.isPending} onClick={save}>
        {updateMutation.isPending ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
