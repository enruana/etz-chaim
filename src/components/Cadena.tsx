// La cadena de transmisión: la tesis de la línea de diseño.
// Cada soporte le entregó el texto al siguiente; la pantalla es el último eslabón.

const ESLABONES = ["Piedra", "Arcilla", "Papiro", "Pergamino", "Códice", "Imprenta", "Pantalla"];

export default function Cadena() {
  return (
    <footer className="pt-4 text-center">
      <hr className="filete" />
      <p className="rotulo mt-5" style={{ lineHeight: 2 }}>
        {ESLABONES.map((e, i) => (
          <span key={e}>
            <span style={i === ESLABONES.length - 1 ? { color: "var(--rubrica)" } : undefined}>{e}</span>
            {i < ESLABONES.length - 1 && <span style={{ opacity: 0.5 }}> · </span>}
          </span>
        ))}
      </p>
      <p className="serif nota mt-1 italic" style={{ fontSize: "1.05rem" }}>
        Tres mil años de manos copiando este texto para que llegara a la tuya.
      </p>
    </footer>
  );
}
