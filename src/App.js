import "./App.css";
import { getData, ShopDataContext, ShopDataProvider } from "./context";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <ShopDataProvider>
        <MainPage />
      </ShopDataProvider>
    </div>
  );
}

export default App;
