import "./route-skeleton.css";

function RouteSkeleton() {
  return (
    <main className="ruta-skeleton" role="status" aria-live="polite">
      <span className="ruta-skeleton__sr-only">Cargando página</span>
      <div className="ruta-skeleton__cabecera" aria-hidden="true" />
      <div className="ruta-skeleton__bloque" aria-hidden="true" />
      <div className="ruta-skeleton__bloque ruta-skeleton__bloque--corto" aria-hidden="true" />
      <div className="ruta-skeleton__fila" aria-hidden="true">
        <div className="ruta-skeleton__tarjeta" />
        <div className="ruta-skeleton__tarjeta" />
      </div>
    </main>
  );
}

export default RouteSkeleton;
