// La cadena de transmisión: la tesis de la línea de diseño.
// Cada soporte le entregó el texto al siguiente; la pantalla es el último eslabón.

const ESLABONES = ["Piedra", "Arcilla", "Papiro", "Pergamino", "Códice", "Imprenta", "Pantalla"];

export default function Cadena() {
  return (
    <footer className="pt-2 text-center sm:pt-4">
      <hr className="filete" />
      <p className="rotulo sobre-roca mt-3.5 sm:mt-5" style={{ lineHeight: 1.9 }}>
        {ESLABONES.map((e, i) => (
          <span key={e}>
            <span style={i === ESLABONES.length - 1 ? { color: "var(--rubrica)" } : undefined}>{e}</span>
            {i < ESLABONES.length - 1 && <span style={{ opacity: 0.5 }}> · </span>}
          </span>
        ))}
      </p>
      <p className="serif sobre-roca mt-1 text-[0.95rem] italic sm:text-[1.05rem]" style={{ margin: "0.25rem 0 0" }}>
        Tres mil años de manos copiando este texto para que llegara a la tuya.
      </p>
    </footer>
  );
}
