import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";
import Boton from "../../components/button/Button";
import logo from "../../assets/img/logo.png";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <main className="login">
      <section className="login__panel" aria-label="Iniciar sesión">
        <div className="login__contenido">
          <form className="login__formulario" onSubmit={handleSubmit}>
            <img className="login__logo" src={logo} alt="JC Casas" />
            <p className="login__intro">Inicia sesión para hacer tu pedido</p>

            <label className="login__campo" htmlFor="login-correo">
              <span>Email - Correo electrónico</span>
              <input
                id="login-correo"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="micorreo@ejemplo.com"
                required
              />
            </label>

            <label className="login__campo" htmlFor="login-contrasena">
              <span>Contraseña</span>
              <span className="login__entrada-contrasena">
                <input
                  id="login-contrasena"
                  name="password"
                  type={mostrarContrasena ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  required
                />
                <button
                  className="login__alternar-contrasena"
                  type="button"
                  aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
                  aria-pressed={mostrarContrasena}
                  onClick={() => setMostrarContrasena((visible) => !visible)}
                >
                  {mostrarContrasena ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                </button>
              </span>
            </label>

            <Boton
              className="login__enviar"
              text="Iniciar sesión"
              type="submit"
            />
            <a className="login__ayuda" href="#recuperar-contrasena">
              ¿Olvidaste tu contraseña?
            </a>
            <a className="login__ayuda" href="#crear-cuenta">
              ¿No tienes una cuenta?
            </a>
            <Link className="login__ayuda login__volver--movil" to="/">
              <FaArrowLeft aria-hidden="true" />
              <span>Volver al inicio</span>
            </Link>
          </form>
        </div>
      </section>

      <aside className="login__imagen">
        <header className="login__encabezado">
          <p className="login__sobrelinea">JC Casas · Restaurante</p>
          <h1>Una buena mesa te espera</h1>
          <p>
            Inicia sesión o crea tu cuenta para disfrutar tu próximo pedido.
          </p>
          <Boton
            className="login__volver login__volver--escritorio"
            text={
              <>
                <FaArrowLeft aria-hidden="true" />
                <span>Volver al inicio</span>
              </>
            }
            type="button"
            onClick={() => navigate("/")}
          />
        </header>
      </aside>
    </main>
  );
}

export default Login;
