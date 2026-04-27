"use client";

import React, { FormEvent, useEffect, useState } from "react";
import {
  AlertCircle,
  Loader2,
  Mail,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Shield,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { AdminUser, AdminUserPayload, api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

const ROLE_OPTIONS = [
  { value: "SUPERADMIN", label: "Super Admin" },
  { value: "ADMIN", label: "Admin" },
  { value: "EDITOR", label: "Editor" },
  { value: "MODERATOR", label: "Moderator" },
];

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "EDITOR",
  isActive: true,
};

function formatRole(role: string) {
  if (role === "SUPERADMIN") return "SUPER ADMIN";
  return role.replace(/_/g, " ");
}

function formatLastLogin(value: string | null) {
  if (!value) {
    return { date: "Never", time: "No login yet" };
  }

  const date = new Date(value);
  return {
    date: date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export function AccessControlPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const records = await api.adminUsers.list();
      setUsers(records);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const openCreateForm = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (adminUser: AdminUser) => {
    setEditingUser(adminUser);
    setForm({
      name: adminUser.name,
      email: adminUser.email,
      password: "",
      role: adminUser.role,
      isActive: adminUser.isActive,
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    if (saving) return;
    setIsFormOpen(false);
    setEditingUser(null);
    setForm(emptyForm);
    setFormError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setNotice(null);

    const trimmedPassword = form.password.trim();
    if (!editingUser && trimmedPassword.length === 0) {
      setFormError("Password is required for a new user.");
      return;
    }

    if (trimmedPassword && trimmedPassword.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }

    const payload: AdminUserPayload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role,
      isActive: form.isActive,
    };

    if (trimmedPassword) {
      payload.password = trimmedPassword;
    }

    setSaving(true);
    try {
      if (editingUser) {
        await api.adminUsers.update(editingUser.id, payload);
        setNotice("User updated.");
      } else {
        await api.adminUsers.create(payload);
        setNotice("User added.");
      }

      setIsFormOpen(false);
      setEditingUser(null);
      setForm(emptyForm);
      setFormError(null);
      await loadUsers();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Unable to save user.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget.id);
    setNotice(null);
    setError(null);

    try {
      await api.adminUsers.delete(deleteTarget.id);
      setUsers((current) => current.filter((item) => item.id !== deleteTarget.id));
      setNotice("User deleted.");
      setDeleteTarget(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete user.");
    } finally {
      setDeletingId(null);
    }
  };

  const columns = [
    {
      header: "User Details",
      accessor: (item: AdminUser) => (
        <div className="flex items-center gap-4 py-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 border border-slate-200 shadow-inner">
            {item.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-black text-slate-900 text-[15px]">{item.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Mail className="w-3 h-3 text-slate-400" />
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                {item.email}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "System Role",
      accessor: (item: AdminUser) => (
        <div className="flex items-center gap-2">
          <Shield
            className={`w-4 h-4 ${
              item.role === "SUPERADMIN" ? "text-blue-600" : "text-slate-400"
            }`}
          />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            {formatRole(item.role)}
          </span>
        </div>
      ),
    },
    {
      header: "Last Login",
      accessor: (item: AdminUser) => {
        const login = formatLastLogin(item.lastLogin);
        return (
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-700">{login.date}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              {login.time}
            </p>
          </div>
        );
      },
    },
    {
      header: "Account Status",
      accessor: (item: AdminUser) => (
        <span
          className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm ${
            item.isActive
              ? "bg-emerald-500 text-white shadow-emerald-500/20"
              : "bg-slate-300 text-white"
          }`}
        >
          {item.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Access Control
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
            User Management & Permissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => void loadUsers()}
            className="h-10 w-10 inline-flex items-center justify-center bg-white text-slate-500 rounded-2xl hover:bg-slate-50 hover:text-slate-900 transition-all border border-slate-200 shadow-sm"
            aria-label="Refresh users"
            title="Refresh users"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={openCreateForm}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20"
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      {(error || notice) && (
        <div
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold border ${
            error
              ? "bg-rose-50 text-rose-700 border-rose-100"
              : "bg-emerald-50 text-emerald-700 border-emerald-100"
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error || notice}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <DataTable
          columns={columns}
          data={users}
          loading={loading}
          actions={(item) => {
            const isCurrentUser = currentUser?.id === item.id;
            return (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEditForm(item)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(item)}
                  disabled={isCurrentUser || deletingId === item.id}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-rose-500/20"
                  title={isCurrentUser ? "Current user cannot be deleted" : "Delete user"}
                >
                  {deletingId === item.id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  Delete
                </button>
              </div>
            );
          }}
        />
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                  <UserRound className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    {editingUser ? "Edit User" : "Add User"}
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Access Control
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="h-10 w-10 inline-flex items-center justify-center rounded-2xl text-slate-400 hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {formError && (
                <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold bg-rose-50 text-rose-700 border border-rose-100">
                  <AlertCircle className="w-4 h-4" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Name
                  </span>
                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, name: event.target.value }))
                    }
                    required
                    className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Email
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, email: event.target.value }))
                    }
                    required
                    className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    System Role
                  </span>
                  <select
                    value={form.role}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, role: event.target.value }))
                    }
                    className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white"
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Password
                  </span>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    required={!editingUser}
                    minLength={form.password ? 8 : undefined}
                    placeholder={editingUser ? "Leave blank to keep current" : ""}
                    className="w-full h-12 rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </label>
              </div>

              <label className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-3">
                <span>
                  <span className="block text-sm font-black text-slate-900">
                    Active Account
                  </span>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">
                    Login access
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      isActive: event.target.checked,
                    }))
                  }
                  className="h-5 w-5 accent-blue-600"
                />
              </label>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-black text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60 font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-200 p-6">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-black text-slate-900">Delete User</h2>
            <p className="text-sm font-semibold text-slate-500 mt-2">
              Delete {deleteTarget.name} from Access Control?
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={deletingId === deleteTarget.id}
                className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-black text-xs uppercase tracking-widest disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={deletingId === deleteTarget.id}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-60 font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-500/20"
              >
                {deletingId === deleteTarget.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
