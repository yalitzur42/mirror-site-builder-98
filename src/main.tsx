import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Hide the initial splash loader once React has mounted.
window.addEventListener("load", () => {
  const splash = document.getElementById("initial-splash");
  if (!splash) return;
  // Small delay so the animation reads as intentional, not a flash.
  setTimeout(() => {
    splash.classList.add("hide");
    setTimeout(() => splash.remove(), 450);
  }, 1800);
});
