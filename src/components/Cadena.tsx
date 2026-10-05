// La cadena de transmisión: cada soporte le entregó el texto al siguiente.
// La estela (piedra) es el primer eslabón; la pantalla, el último.

const ESLABONES = ["Piedra", "Arcilla", "Papiro", "Pergamino", "Códice", "Imprenta", "Pantalla"];

export default function Cadena() {
  return (
    <footer className="pad mono gris py-5" style={{ lineHeight: 1.9 }}>
      {ESLABONES.map((e, i) => (
        <span key={e}>
          <span style={i === ESLABONES.length - 1 ? { color: "var(--grafito)" } : undefined}>{e}</span>
          {i < ESLABONES.length - 1 && " → "}
        </span>
      ))}
    </footer>
  );
}
