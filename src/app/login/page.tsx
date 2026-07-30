import { entrar } from "./actions";

export default function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return <LoginForm searchParams={searchParams} />;
}

async function LoginForm({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-sm flex-col items-center justify-center gap-6 text-center">
      <div>
        <p className="text-5xl">🌳</p>
        <h1 className="mt-3 text-4xl">La Biblia</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-2)" }}>
          «Lámpara es a mis pies tu palabra» — Salmo 119:105
        </p>
      </div>
      <form action={entrar} className="card flex w-full flex-col gap-3 p-6">
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          autoFocus
          className="w-full rounded-2xl px-4 py-3 text-base"
          style={{ border: "1.5px solid var(--line)", background: "var(--bg-a)", color: "var(--ink)", outline: "none" }}
        />
        {error && (
          <p className="text-sm font-bold" style={{ color: "#c0563b" }}>
            Contraseña incorrecta — intenta de nuevo.
          </p>
        )}
        <button
          type="submit"
          className="pill w-full px-6 py-3 text-base"
          style={{ background: "var(--gold)", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
