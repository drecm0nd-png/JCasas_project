import { useEffect, useId } from "react";
import "./modal.css";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeLabel = "Cerrar ventana",
}) {
  const tituloId = useId();

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose?.();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) onClose?.();
  }

  return (
    <div className="modal__fondo" onMouseDown={handleBackdropClick}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? tituloId : undefined}
        aria-label={title ? undefined : "Ventana modal"}
      >
        <button
          className="modal__cerrar"
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
        {title && (
          <h2 className="modal__titulo" id={tituloId}>
            {title}
          </h2>
        )}
        <div className="modal__contenido">{children}</div>
      </section>
    </div>
  );
}

export default Modal;
