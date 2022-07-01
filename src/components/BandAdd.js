import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";


export const BandAdd = () => {
  const [nombre, setNombre] = useState("");
  const { socket } = useContext(SocketContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim().length > 0) {
      socket.emit("crear-banda", { nombre: nombre });

      setNombre("");
    }
  };
  return (
    <div>
      <h3>Agregar banda</h3>
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Agregar una banda"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </form>
    </div>
  );
};
