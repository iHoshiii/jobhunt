import { useEffect, useState } from "react";
import { ConnectionStatus } from "../components/ConnectionStatus";
import { getApiHealth } from "../services/api";

export function HomePage() {
  const [apiStatus, setApiStatus] = useState("Checking connection");
  const connected = apiStatus === "Connected";

  useEffect(() => {
    getApiHealth()
      .then(() => setApiStatus("Connected"))
      .catch(() => setApiStatus("Not connected"));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 text-slate-950 sm:px-10">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <a className="text-xl font-bold tracking-tight" href="/">
          JobHunt<span className="text-indigo-600">.</span>
        </a>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
          Philippines
        </span>
      </header>

      <section className="mx-auto mt-20 max-w-6xl sm:mt-28">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700">
          Your job search, made simpler
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Find jobs that fit your skills.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          JobHunt will search for roles that fit your resume, highlight strong
          matches, and help you apply.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ConnectionStatus connected={connected} label={apiStatus.toLowerCase()} />
          <span className="text-sm text-slate-500">
            Dashboard setup is coming next.
          </span>
        </div>
      </section>
    </main>
  );
}
