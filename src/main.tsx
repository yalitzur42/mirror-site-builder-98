import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Hide the initial splash loader after a fixed duration from page start,
// so it doesn't wait for the Lottie iframe's `load` event on fast connections.
const hideSplash = () => {
  const splash = document.getElementById("initial-splash");
  if (!splash) return;
  splash.classList.add("hide");
  setTimeout(() => splash.remove(), 450);
};
setTimeout(hideSplash, 1600);
