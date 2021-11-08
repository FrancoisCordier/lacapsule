import logo from "./logo.svg";
import "./App.css";
import Dice from "./components/Dice";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const randomDiceNumber = () => {
    return Math.floor(Math.random() * 6) + 1;
  };
  return (
    <div className="App">
      <div className="container d-flex justify-content-center vh-100 align-items-center">
        {[...Array(5)].map(() => (
          <Dice number={randomDiceNumber()} />
        ))}
      </div>
    </div>
  );
}

export default App;
