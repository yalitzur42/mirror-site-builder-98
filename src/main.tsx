import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Critical assets to wait for before mounting the app.
const CRITICAL_IMAGES = ["/images/marble-bg.png", "/logo.png"];
const MAX_WAIT_MS = 6000; // safety ceiling so we never hang on a slow asset
const MIN_SPLASH_MS = 900; // make sure the loader doesn't flash on fast loads

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });

const waitForWindowLoad = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === "complete") return resolve();
    window.addEventListener("load", () => resolve(), { once: true });
  });

const withTimeout = <T,>(p: Promise<T>, ms: number) =>
  Promise.race([p, new Promise<void>((resolve) => setTimeout(() => resolve(), ms))]);

const hideSplash = () => {
  const splash = document.getElementById("initial-splash");
  if (!splash) return;
  splash.classList.add("hide");
  setTimeout(() => splash.remove(), 450);
};

const mount = () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

const start = performance.now();

const ready = Promise.all([
  waitForWindowLoad(),
  (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready ?? Promise.resolve(),
  ...CRITICAL_IMAGES.map(preloadImage),
]);

withTimeout(ready, MAX_WAIT_MS).then(() => {
  const elapsed = performance.now() - start;
  const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);
  setTimeout(() => {
    mount();
    // Give React one paint to populate #root before fading the splash.
    requestAnimationFrame(() => requestAnimationFrame(hideSplash));
  }, remaining);
});
