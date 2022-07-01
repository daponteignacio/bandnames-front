import { useContext } from "react";
import { BandAdd } from "./components/BandAdd";
import { SocketContext } from "./context/SocketContext";
import { BandList } from "./components/BandList";
import { BandChart } from "./components/BandChart";

const App = () => {
  const { online } = useContext(SocketContext);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:{" "}
          {online ? (
            <span className="text-success text-uppercase">online</span>
          ) : (
            <span className="text-danger text-uppercase">offline</span>
          )}
        </p>
      </div>

      <h1>Band names</h1>
      <hr />

      <div className="row">
        <div className="col-8">
           <BandChart />
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <BandList />
        </div>

        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  );
};

export default App;
