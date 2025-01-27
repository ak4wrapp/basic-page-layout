import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; // This path is relative, and it should work as long as App.tsx is in the 'src' folder

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
