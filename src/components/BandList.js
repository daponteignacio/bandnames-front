import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });

    return () => socket.off("current-bands");
  }, [socket]);

  const cambioNombre = (e, id) => {
    const newName = e.target.value;

    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }

        return band;
      })
    );
  };

  const votar = (id) => {
    socket.emit("votar-banda", id);
  };

  const borrar = (id) => {
    socket.emit("borrar-banda", id);
  };

  const onPerdioFoco = (id, nombre) => {
    socket.emit("cambiar-nombre-banda", { id, nombre });
  };

  const crearRows = () => {
    return (
      <>
        {bands.map((band) => (
          <tr key={band.id}>
            <td>
              <button
                onClick={() => votar(band.id)}
                className="btn btn-primary"
              >
                +1
              </button>
            </td>
            <td>
              <input
                className="form-control"
                value={band.name}
                onChange={(e) => cambioNombre(e, band.id)}
                onBlur={() => onPerdioFoco(band.id, band.name)}
              />
            </td>
            <td>
              <h3>{band.votes}</h3>
            </td>
            <td>
              <button
                onClick={() => borrar(band.id)}
                className="btn btn-danger"
              >
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </>
    );
  };
  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Botos</th>
            <th>Borrar</th>
          </tr>
        </thead>

        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};
