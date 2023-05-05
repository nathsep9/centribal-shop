import { Toolbar } from "./components/Toolbar";
import { Container } from "components/Container";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import ThemeProvider from "contexts/Theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Toolbar />
        <Container />
      </ThemeProvider>
    </div>
  );
}

export default App;
