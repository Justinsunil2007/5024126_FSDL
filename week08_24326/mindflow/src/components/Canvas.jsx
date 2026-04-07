import { useRef, useEffect } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;
      ctx.fillStyle = `hsl(${(time * 50) % 360}, 70%, 50%)`;
      ctx.beginPath();
      ctx.arc(100 + Math.sin(time) * 50, 100 + Math.cos(time) * 50, 30, 0, Math.PI * 2);
      ctx.fill();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} width={200} height={200} style={{ position: 'fixed', top: '20px', right: '20px', zIndex: -1, opacity: 0.3 }} />;
};

export default Canvas;