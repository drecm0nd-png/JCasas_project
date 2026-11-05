import { useState } from "react";
import logo from "../../assets/img/logo.png";
import Boton from "../button/Button";
import "./header.css";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Menú", href: "#menu" },
  { label: "Contacto", href: "#contacto" },
  { label: "Registrarse", href: "#registrarse" },
];

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [opcionActiva, setOpcionActiva] = useState(() => {
    const opcion = links.find(({ href }) => href === window.location.hash);
    return opcion?.label ?? "Inicio";
  });

  function seleccionarOpcion(label) {
    setOpcionActiva(label);
    setMenuAbierto(false);
  }

  function irARegistro() {
    seleccionarOpcion("Registrarse");
    window.location.hash = "registrarse";
  }

  return (
    <header className="encabezado" id="inicio">
      <div className="encabezado__barra">
        <a
          className="encabezado__marca"
          href="#inicio"
          aria-label="JC Casas Restaurante, inicio"
          onClick={() => seleccionarOpcion("Inicio")}
        >
          <img className="encabezado__logo" src={logo} alt="" />
          <span className="encabezado__nombre">JC Casas Restaurante</span>
        </a>

        <button
          className={`encabezado__alternador${menuAbierto ? " encabezado__alternador--abierto" : ""}`}
          type="button"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          aria-controls="navegacion-principal"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`encabezado__navegacion${menuAbierto ? " encabezado__navegacion--abierta" : ""}`}
          id="navegacion-principal"
          aria-label="Navegación principal"
        >
          {links.map(({ label, href }) =>
            label === "Registrarse" ? (
              <Boton
                key={href}
                text="Registrarse"
                onClick={irARegistro}
                aria-current={opcionActiva === label ? "page" : undefined}
                className={
                  opcionActiva === label
                    ? "encabezado__registro--activo"
                    : undefined
                }
              />
            ) : (
              <a
                key={href}
                className={
                  opcionActiva === label
                    ? "encabezado__enlace--activo"
                    : undefined
                }
                href={href}
                aria-current={opcionActiva === label ? "page" : undefined}
                onClick={() => seleccionarOpcion(label)}
              >
                {label}
              </a>
            ),
          )}
        </nav>
      </div>
      <div className="encabezado__migas" aria-label="Ruta de navegación">
        <a
          href={
            links.find(({ label }) => label === opcionActiva)?.href ?? "#inicio"
          }
          aria-current="page"
        >
          {opcionActiva}
        </a>
      </div>
    </header>
  );
}

export default Header;
