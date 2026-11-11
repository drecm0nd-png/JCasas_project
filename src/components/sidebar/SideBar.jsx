import { useState } from "react";
import {
  FaBars,
  FaClipboardList,
  FaHouse,
  FaKitchenSet,
  FaPrint,
  FaUser,
  FaXmark,
} from "react-icons/fa6";
import logo from "../../assets/img/logo.png";
import "./sidebar.css";

const opciones = [
  { nombre: "Inicio", href: "#inicio", Icono: FaHouse },
  { nombre: "Menú", href: "#menu", Icono: FaKitchenSet },
  { nombre: "Pedidos", href: "#pedidos", Icono: FaClipboardList },
  {
    nombre: "Impresión comandas",
    href: "#impresion-comandas",
    Icono: FaPrint,
    soloAdmin: true,
  },
  { nombre: "Perfil", href: "#perfil", Icono: FaUser },
];

function SideBar({
  role = "admin",
  usuario = "",
  activeItem = "Inicio",
  onLogout,
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const esAdmin = role === "admin" || role === "administrador";

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  return (
    <>
      <button
        className={`sidebar__alternador${menuAbierto ? " sidebar__alternador--abierto" : ""}`}
        type="button"
        aria-label={menuAbierto ? "Cerrar navegación" : "Abrir navegación"}
        aria-expanded={menuAbierto}
        aria-controls="navegacion-sidebar"
        onClick={() => setMenuAbierto((abierto) => !abierto)}
      >
        {menuAbierto ? <FaXmark /> : <FaBars />}
      </button>
      {menuAbierto && (
        <button
          className="sidebar__fondo-movil"
          type="button"
          aria-label="Cerrar navegación"
          onClick={cerrarMenu}
        />
      )}
      <aside
        className={`sidebar${menuAbierto ? " sidebar--abierto" : ""}`}
        aria-label="Barra lateral"
      >
        <a className="sidebar__marca" href="#inicio" onClick={cerrarMenu}>
          <img className="sidebar__logo" src={logo} alt="" />
          <span className="sidebar__marca-texto">
            <strong>JC Casas</strong>
            <small>Restaurante</small>
          </span>
        </a>

        <div className="sidebar__seccion">Navegación</div>
        <nav
          className="sidebar__navegacion"
          id="navegacion-sidebar"
          aria-label="Navegación del panel"
        >
          {opciones
            .filter(({ soloAdmin }) => !soloAdmin || esAdmin)
            .map(({ nombre, href, Icono }) => (
              <a
                className={`sidebar__enlace${activeItem === nombre ? " sidebar__enlace--activo" : ""}`}
                href={href}
                key={nombre}
                aria-current={activeItem === nombre ? "page" : undefined}
                onClick={cerrarMenu}
              >
                <Icono className="sidebar__icono" aria-hidden="true" />
                <span>{nombre}</span>
              </a>
            ))}
        </nav>

        <div className="sidebar__pie">
          {usuario && <span className="sidebar__usuario">{usuario}</span>}
          <button className="sidebar__salir" type="button" onClick={onLogout}>
            Cerrar sesión
          </button>
          <small className="sidebar__legal">© JC Casas · Xuafood</small>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
