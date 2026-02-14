import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  pulse: number;
  pulseSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  drift: number;
  driftSpeed: number;
}

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    // Stars
    const starCount = Math.floor((width * height) / 4000);
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.15 + 0.02,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    let shootingTimer = 0;

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        len: Math.random() * 80 + 40,
        speed: Math.random() * 6 + 4,
        angle: Math.PI / 6 + Math.random() * (Math.PI / 6),
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 40 + 30,
      });
    };

    // Nebula clouds
    const nebulae: Nebula[] = [
      {
        x: width * 0.2,
        y: height * 0.3,
        radius: 300,
        color: "139, 92, 246",
        opacity: 0.03,
        drift: 0,
        driftSpeed: 0.003,
      },
      {
        x: width * 0.8,
        y: height * 0.2,
        radius: 250,
        color: "34, 211, 238",
        opacity: 0.025,
        drift: Math.PI,
        driftSpeed: 0.002,
      },
      {
        x: width * 0.5,
        y: height * 0.7,
        radius: 350,
        color: "52, 211, 153",
        opacity: 0.02,
        drift: Math.PI / 2,
        driftSpeed: 0.0015,
      },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw nebulae
      for (const n of nebulae) {
        n.drift += n.driftSpeed;
        const ox = Math.sin(n.drift) * 20;
        const oy = Math.cos(n.drift * 0.7) * 15;
        const gradient = ctx.createRadialGradient(
          n.x + ox,
          n.y + oy,
          0,
          n.x + ox,
          n.y + oy,
          n.radius,
        );
        gradient.addColorStop(0, `rgba(${n.color}, ${n.opacity * 1.5})`);
        gradient.addColorStop(0.4, `rgba(${n.color}, ${n.opacity})`);
        gradient.addColorStop(1, `rgba(${n.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw stars
      for (const star of stars) {
        star.pulse += star.pulseSpeed;
        const twinkle = 0.5 + Math.sin(star.pulse) * 0.5;
        const alpha = star.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 220, 255, ${alpha})`;
        ctx.fill();

        // Star glow
        if (star.size > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 180, 255, ${alpha * 0.08})`;
          ctx.fill();
        }

        // Slow drift
        star.y += star.speed;
        if (star.y > height + 2) {
          star.y = -2;
          star.x = Math.random() * width;
        }
      }

      // Shooting stars
      shootingTimer++;
      if (shootingTimer > 180 + Math.random() * 300) {
        spawnShootingStar();
        shootingTimer = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        const progress = s.life / s.maxLife;
        s.opacity = progress < 0.1 ? progress * 10 : 1 - progress;

        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        grad.addColorStop(0.7, `rgba(200, 200, 255, ${s.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.opacity * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();

        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.7,
      }}
      aria-hidden="true"
    />
  );
}
