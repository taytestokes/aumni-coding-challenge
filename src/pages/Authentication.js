import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

import aumniLogo from "../images/logo.png";

import { paths } from "../constants/Routes";

import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

import { LoadingSpinner } from "../components/LoadingSpinner";

const Authentication = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isAuthed, signIn } = useAuth();
  const { formData, formError, formLoading, handleInputChange, handleSubmit } =
    useForm(
      {
        username: "",
        password: "",
      },
      () => {
        signIn(formData.username, formData.password);
        navigate(state?.path || paths.dashboard);
      },
    );

  if (isAuthed) {
    return <Navigate to={paths.dashboard} replace />;
  }

  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <form
        className="w-full max-w-[320px] relative flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <img alt="Aumni Logo" src={aumniLogo} loading="lazy" className="w-36" />

        <p className="mt-6">Welcome Back! Sign in to get started.</p>

        <section className="w-full flex flex-col mt-8">
          <label htmlFor="username" className="font-medium text-sm">
            Username
          </label>
          <input
            id="username"
            type="username"
            name="username"
            value={formData.username}
            className="h-[44px] p-2 mt-1 border border-gray-200 rounded-md"
            onChange={handleInputChange}
          />
        </section>

        <section className="w-full flex flex-col mt-2">
          <label htmlFor="password" className="font-medium text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            className="h-[44px] p-2 mt-1 border border-gray-200 rounded-md"
            onChange={handleInputChange}
          />
        </section>

        <button
          type="submit"
          className="w-full h-[44px] p-2 mt-4 bg-zinc-900 font-medium text-white text-sm rounded-md pointer transition hover:bg-zinc-800"
        >
          {formLoading ? <LoadingSpinner /> : "Sign In"}
        </button>

        {formError && (
          <p
            role="alert"
            className="w-full flex items-center gap-1 absolute -bottom-8 text-red-500 text-sm"
          >
            <ExclamationCircleIcon className="w-4 h-4" />
            {formError}
          </p>
        )}
      </form>
    </main>
  );
};

export default Authentication;
