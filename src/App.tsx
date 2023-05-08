import { Toolbar } from "./components/Toolbar";
import { Products } from "pages/Products";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import ThemeProvider from "contexts/Theme";
import ShoppingProvider from "contexts/ShoppingContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <ShoppingProvider>
          <Toolbar />
          <Products />
        </ShoppingProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
