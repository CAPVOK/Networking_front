import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./core/store/index.ts";
import { AppThemeProvider } from "./hooks/ThemeProvider.tsx";
import { WebSocketProvider } from "./hooks/WebSocketProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <WebSocketProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </WebSocketProvider>
  </Provider>
);
