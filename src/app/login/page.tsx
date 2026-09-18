import { entrar } from "./actions";
import Cadena from "@/components/Cadena";

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="mx-auto flex min-h-[80dvh] max-w-sm flex-col items-center justify-center gap-7 text-center">
      <div>
        <p className="fleuron">❦</p>
        <h1 className="tallada-roja mt-4 text-4xl sm:text-5xl">La Biblia</h1>
        <p className="serif sobre-roca mt-3 text-base italic sm:text-lg">
          «Lámpara es a mis pies tu palabra» — Salmo 119:105
        </p>
      </div>
      <form action={entrar} className="hoja flex w-full flex-col gap-3 p-6">
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          autoFocus
          className="w-full px-4 py-3 text-base"
          style={{
            border: "1px solid var(--filete-fuerte)",
            borderRadius: 3,
            background: "var(--papel-hundido)",
            boxShadow: "inset 1px 2px 4px rgb(30 22 14 / 0.25)",
            color: "var(--tinta)",
            outline: "none",
          }}
        />
        {error && (
          <p className="text-sm font-bold" style={{ color: "var(--rubrica)", margin: 0 }}>
            Contraseña incorrecta — intenta de nuevo.
          </p>
        )}
        <button type="submit" className="boton boton-tinta w-full">
          Entrar
        </button>
      </form>
      <Cadena />
    </main>
  );
}
