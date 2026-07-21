import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Draws an embossed notary-seal medallion onto a canvas: outer/inner rings,
// curved "NOTARY PUBLIC" / "STATE OF <state>" text, and a center star emblem.
function buildSealCanvas(stateName: string) {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.47;

  const gold = ctx.createRadialGradient(cx, cy, outerR * 0.1, cx, cy, outerR);
  gold.addColorStop(0, "#f4dfa3");
  gold.addColorStop(0.55, "#dcab4a");
  gold.addColorStop(1, "#93691f");
  ctx.fillStyle = gold;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.fill();

  const ink = "#3c2508";
  ctx.strokeStyle = ink;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR * 0.97, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR * 0.78, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR * 0.5, 0, Math.PI * 2);
  ctx.stroke();

  function drawArcText(text: string, radius: number, startAngle: number, clockwise: boolean) {
    ctx.save();
    ctx.font = "700 46px 'Space Grotesk', 'Arial', sans-serif";
    ctx.fillStyle = ink;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    const dir = clockwise ? 1 : -1;
    const widths = [...text].map((ch) => ctx.measureText(ch).width + 6);
    const totalAngle = widths.reduce((a, w) => a + w / radius, 0) * dir;
    let angle = startAngle - totalAngle / 2;
    for (let i = 0; i < text.length; i++) {
      const w = widths[i];
      angle += (w / radius / 2) * dir;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + (Math.PI / 2) * dir);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
      angle += (w / radius / 2) * dir;
    }
    ctx.restore();
  }

  const textRadius = outerR * 0.875;
  drawArcText("★ NOTARY PUBLIC ★", textRadius, -Math.PI / 2, true);
  drawArcText(`★ STATE OF ${stateName.toUpperCase()} ★`, textRadius, Math.PI / 2, false);

  // center five-point star emblem
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = ink;
  ctx.beginPath();
  const spikes = 5;
  const outer = outerR * 0.32;
  const inner = outerR * 0.13;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / spikes) * i - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  return canvas;
}

function makeGlowTexture(color: string) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, color);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

export function NotarySeal({ stateName = "Oklahoma" }: { stateName?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 16);

    let renderer: THREE.WebGLRenderer;
    try {
      const probe = document.createElement("canvas");
      const gl = probe.getContext("webgl2") || probe.getContext("webgl");
      if (!gl) throw new Error("no-webgl");
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // --- lighting: warm key light + cool rim light for a metallic emboss ---
    scene.add(new THREE.AmbientLight(0xfff2d9, 0.55));
    const key = new THREE.DirectionalLight(0xffe3a3, 1.4);
    key.position.set(6, 8, 10);
    scene.add(key);
    const rim = new THREE.PointLight(0x6fe3d9, 1.1, 40);
    rim.position.set(-8, -4, 6);
    scene.add(rim);

    // --- the seal medallion ---
    const group = new THREE.Group();
    scene.add(group);

    const sealTexture = new THREE.CanvasTexture(buildSealCanvas(stateName));
    sealTexture.colorSpace = THREE.SRGBColorSpace;
    const faceMat = new THREE.MeshStandardMaterial({
      map: sealTexture,
      metalness: 0.55,
      roughness: 0.35,
    });
    const edgeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x8a6a2a),
      metalness: 0.7,
      roughness: 0.4,
    });

    const seal = new THREE.Mesh(
      new THREE.CylinderGeometry(7.5, 7.5, 0.55, 128),
      [edgeMat, faceMat, faceMat],
    );
    seal.rotation.x = Math.PI / 2;
    group.add(seal);

    // --- ambient gold particle field ---
    const PARTICLE_COUNT = 90;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 11 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const glowTexture = makeGlowTexture("rgba(240,200,120,0.9)");
    const particleMat = new THREE.PointsMaterial({
      size: 0.5,
      map: glowTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color(0xf0c878),
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- interaction: pointer parallax ---
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    const onResize = () => {
      if (!container.clientWidth || !container.clientHeight) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const speedFactor = prefersReduced ? 0 : 1;

      group.rotation.y += dt * 0.22 * speedFactor;
      particles.rotation.y += dt * 0.03 * speedFactor;

      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;
      camera.position.x = current.x * 1.4;
      camera.position.y = -current.y * 1.4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      sealTexture.dispose();
      glowTexture.dispose();
      faceMat.dispose();
      edgeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      seal.geometry.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [stateName]);

  if (failed) {
    return (
      <div className="absolute inset-0 h-full w-full overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(217,164,65,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <span className="absolute bottom-6 right-6 font-mono text-[11px] text-muted-foreground">
          WebGL unavailable — showing static view
        </span>
      </div>
    );
  }

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
