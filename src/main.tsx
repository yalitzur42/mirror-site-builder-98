import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const MIN_SPLASH_MS = 600;
const start = performance.now();

const hideSplash = () => {
  const splash = document.getElementById("initial-splash");
  if (!splash) return;
  splash.classList.add("hide");
  setTimeout(() => splash.remove(), 450);
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Hide splash once React paints, but enforce a brief minimum so it doesn't flash.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const elapsed = performance.now() - start;
    const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);
    setTimeout(hideSplash, remaining);
  });
});

// Safety net: never let the splash linger.
setTimeout(hideSplash, 4000);

// Don't let stray unhandled rejections (e.g. Paper Shaders texture timing) bubble.
window.addEventListener("unhandledrejection", (e) => {
  if (String(e.reason?.message || e.reason).includes("Paper Shaders")) {
    e.preventDefault();
  }
});
