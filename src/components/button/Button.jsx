import "./button.css";

function Boton({ text, onClick, className, ...props }) {
  return (
    <button className={`button${className ? ` ${className}` : ""}`} onClick={onClick} {...props}>
      {text}
    </button>
  );
}

export default Boton;
