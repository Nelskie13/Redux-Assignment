import { Provider } from "react-redux";
import "./App.css";
import store from "./Features/store";
import Weather from "./Features/Weather";
import City from "./Features/City";

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Weather App</h1>
        <City />
        <Weather />
      </div>
    </Provider>
  );
}

export default App;
