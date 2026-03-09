'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Viewer360Props {
  imageUrl: string;
  onExit: () => void;
}

export default function Viewer360({ imageUrl, onExit }: Viewer360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);

    // Sphere with equirectangular texture
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Flip inside out

    const loader = new THREE.TextureLoader();
    const texture = loader.load(imageUrl);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Camera rotation state
    let lon = 0;
    let lat = 0;

    // Drag tracking
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let dragStartX = 0;
    let dragStartY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      lon -= (e.clientX - prevX) * 0.15;
      lat += (e.clientY - prevY) * 0.15;
      lat = Math.max(-85, Math.min(85, lat));
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = (e: MouseEvent) => {
      isDragging = false;
      const dx = Math.abs(e.clientX - dragStartX);
      const dy = Math.abs(e.clientY - dragStartY);
      if (dx < 8 && dy < 8) onExitRef.current();
    };

    // Touch tracking
    let touchStartX = 0;
    let touchStartY = 0;
    let prevTouchX = 0;
    let prevTouchY = 0;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      prevTouchX = t.clientX;
      prevTouchY = t.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      lon -= (t.clientX - prevTouchX) * 0.15;
      lat += (t.clientY - prevTouchY) * 0.15;
      lat = Math.max(-85, Math.min(85, lat));
      prevTouchX = t.clientX;
      prevTouchY = t.clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      const dx = Math.abs(t.clientX - touchStartX);
      const dy = Math.abs(t.clientY - touchStartY);
      if (dx < 8 && dy < 8) onExitRef.current();
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false });
    renderer.domElement.addEventListener('touchend', onTouchEnd);

    // Gyroscope on mobile
    let gyroEnabled = false;
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!gyroEnabled || e.beta === null || e.gamma === null) return;
      lat = Math.max(-85, Math.min(85, (e.beta ?? 0) - 90));
      lon = -(e.gamma ?? 0);
    };

    if (typeof DeviceOrientationEvent !== 'undefined') {
      const req = (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission;
      if (req) {
        req().then(perm => {
          if (perm === 'granted') {
            gyroEnabled = true;
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          }
        }).catch(() => {});
      } else {
        gyroEnabled = true;
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    }

    // Render loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);
      camera.lookAt(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta),
      );
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchmove', onTouchMove);
      renderer.domElement.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [imageUrl]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black">
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm pointer-events-none">
        Touche l&apos;écran pour continuer
      </div>
    </div>
  );
}
