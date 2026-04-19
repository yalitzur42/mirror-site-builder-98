import { useEffect, useRef } from "react";

/**
 * Animated starfield background for the journey map.
 * Lightweight canvas, runs once and is responsive.
 */
const StarsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stars: { x: number; y: number; r: number; a: number; s: number }[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.scale(dpr, dpr);
      const count = Math.min(120, Math.floor((clientWidth * clientHeight) / 9000));
      stars = Array.from({ length: count }).map(() => ({
        x: Math.random() * clientWidth,
        y: Math.random() * clientHeight,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random(),
        s: Math.random() * 0.015 + 0.005,
      }));
    };

    const draw = () => {
      const { clientWidth, clientHeight } = canvas;
      ctx.clearRect(0, 0, clientWidth, clientHeight);
      stars.forEach((st) => {
        st.a += st.s;
        const alpha = (Math.sin(st.a) + 1) / 2;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${alpha * 0.7})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  );
};

export default StarsBackground;
