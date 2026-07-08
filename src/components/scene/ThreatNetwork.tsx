import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Interactive "threat network" — a rotating constellation of glowing nodes,
// connective edges, and signal packets that travel the graph like live traffic.
// All WebGL work runs inside useEffect so it stays client-only (SSR-safe).
export function ThreatNetwork() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 18;

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

    const group = new THREE.Group();
    scene.add(group);

    // --- Node positions (distributed on a shell for a globe-like network) ---
    const NODE_COUNT = 150;
    const RADIUS = 9;
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const t = i / NODE_COUNT;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const jitter = 0.72 + Math.random() * 0.28;
      const r = RADIUS * jitter;
      nodes.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta),
        ),
      );
    }

    // --- Round glowing sprite texture for nodes ---
    const makeGlowTexture = () => {
      const size = 128;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, "rgba(210,215,255,1)");
      grad.addColorStop(0.25, "rgba(140,130,255,0.9)");
      grad.addColorStop(0.6, "rgba(79,70,229,0.35)");
      grad.addColorStop(1, "rgba(79,70,229,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    };
    const glowTexture = makeGlowTexture();

    // --- Nodes as points ---
    const nodeGeo = new THREE.BufferGeometry();
    const nodePos = new Float32Array(NODE_COUNT * 3);
    nodes.forEach((v, i) => {
      nodePos[i * 3] = v.x;
      nodePos[i * 3 + 1] = v.y;
      nodePos[i * 3 + 2] = v.z;
    });
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.85,
      map: glowTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color(0x9c94ff),
    });
    const points = new THREE.Points(nodeGeo, nodeMat);
    group.add(points);

    // --- Edges (connect near neighbours) ---
    type Edge = { a: number; b: number };
    const edges: Edge[] = [];
    const linePositions: number[] = [];
    const CONNECT_DIST = 4.2;
    for (let i = 0; i < NODE_COUNT; i++) {
      let connections = 0;
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECT_DIST && connections < 3) {
          edges.push({ a: i, b: j });
          linePositions.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z,
          );
          connections++;
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x5b52d6),
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    // --- Signal packets travelling along edges ---
    const PACKET_COUNT = Math.min(26, edges.length);
    const packetGeo = new THREE.BufferGeometry();
    const packetPos = new Float32Array(PACKET_COUNT * 3);
    packetGeo.setAttribute("position", new THREE.BufferAttribute(packetPos, 3));
    const packetMat = new THREE.PointsMaterial({
      size: 0.6,
      map: glowTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color(0x9be7ff),
    });
    const packetsMesh = new THREE.Points(packetGeo, packetMat);
    group.add(packetsMesh);

    const packets = Array.from({ length: PACKET_COUNT }, () => ({
      edge: Math.floor(Math.random() * edges.length),
      progress: Math.random(),
      speed: 0.0025 + Math.random() * 0.006,
    }));

    // --- Interaction: mouse parallax ---
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    // --- Resize ---
    const onResize = () => {
      if (!container.clientWidth || !container.clientHeight) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    // --- Animation loop ---
    let raf = 0;
    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const speedFactor = prefersReduced ? 0 : 1;

      group.rotation.y += dt * 0.08 * speedFactor;
      group.rotation.x += dt * 0.02 * speedFactor;

      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;
      group.rotation.y += current.x * 0.0006;
      group.rotation.x += current.y * 0.0006;
      camera.position.x = current.x * 1.6;
      camera.position.y = -current.y * 1.6;
      camera.lookAt(0, 0, 0);

      // advance packets
      for (let i = 0; i < packets.length; i++) {
        const p = packets[i];
        p.progress += p.speed * speedFactor;
        if (p.progress >= 1) {
          p.progress = 0;
          p.edge = Math.floor(Math.random() * edges.length);
          p.speed = 0.0025 + Math.random() * 0.006;
        }
        const e = edges[p.edge];
        tmp.copy(nodes[e.a]).lerp(nodes[e.b], p.progress);
        packetPos[i * 3] = tmp.x;
        packetPos[i * 3 + 1] = tmp.y;
        packetPos[i * 3 + 2] = tmp.z;
      }
      packetGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      glowTexture.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (failed) {
    return (
      <div className="absolute inset-0 h-full w-full overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,oklch(0.3_0.11_278/0.55),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <span className="absolute bottom-6 right-6 font-mono text-[11px] text-muted-foreground">
          WebGL unavailable — showing static view
        </span>
      </div>
    );
  }

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}