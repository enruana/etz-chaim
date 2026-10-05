import { entrar } from "./actions";
import { k, talla } from "@/lib/estela";
import Cadena from "@/components/Cadena";

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main>
      <section className="losa">
        <div className="pad mono flex justify-between pt-5">
          <span>Reina-Valera 1960</span>
          <span>66 libros</span>
        </div>
        <h1 className="display incisa px-4 pt-3" style={{ marginBottom: "-0.04em" }}>
          <span className="gigante block" style={talla(k("LA"))}>
            La
          </span>
          <span className="gigante block" style={talla(k("BIBLIA"))}>
            Biblia
          </span>
        </h1>
      </section>

      <section className="pad raya py-4">
        <p className="serif m-0 italic" style={{ fontSize: "1.25rem", lineHeight: 1.3 }}>
          «Lámpara es a mis pies tu palabra, Y lumbrera a mi camino.»
        </p>
        <p className="mono gris m-0 mt-2">Salmo 119:105</p>
      </section>

      <form action={entrar}>
        <div className="pad py-4">
          <label htmlFor="password" className="mono mb-2 block">
            Contraseña
          </label>
          <input id="password" type="password" name="password" autoFocus className="campo" />
          {error && <p className="mono m-0 mt-3">Contraseña incorrecta. Intenta de nuevo.</p>}
        </div>
        <button type="submit" className="bloque">
          <span>Entrar</span>
          <span>→</span>
        </button>
      </form>

      <Cadena />
    </main>
  );
}
