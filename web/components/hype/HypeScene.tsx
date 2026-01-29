"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HypeScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const animationsRef = useRef<{
        particle: THREE.Object3D;
        circle: THREE.Object3D;
        skelet: THREE.Object3D;
    } | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- INIT ---
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = false;
        renderer.setClearColor(0x000000, 0.0);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 400;
        cameraRef.current = camera;

        const circle = new THREE.Object3D();
        const skelet = new THREE.Object3D();
        const particle = new THREE.Object3D();

        scene.add(circle);
        scene.add(skelet);
        scene.add(particle);

        animationsRef.current = { particle, circle, skelet };

        // Geometry
        const geometry = new THREE.TetrahedronGeometry(2, 0);
        const geom = new THREE.IcosahedronGeometry(7, 1);
        const geom2 = new THREE.IcosahedronGeometry(15, 1);

        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            flatShading: true
        });

        for (let i = 0; i < 1000; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
            mesh.position.multiplyScalar(90 + (Math.random() * 700));
            mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
            particle.add(mesh);
        }

        const mat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            flatShading: true
        });

        const mat2 = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            wireframe: true,
            side: THREE.DoubleSide
        });

        const planet = new THREE.Mesh(geom, mat);
        planet.scale.set(16, 16, 16);
        circle.add(planet);

        const planet2 = new THREE.Mesh(geom2, mat2);
        planet2.scale.set(10, 10, 10);
        skelet.add(planet2);

        const ambientLight = new THREE.AmbientLight(0x999999);
        scene.add(ambientLight);

        const light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(1, 0, 0);

        const light2 = new THREE.DirectionalLight(0x11E8BB, 1);
        light2.position.set(0.75, 1, 0.5);

        const light3 = new THREE.DirectionalLight(0x8200C9, 1);
        light3.position.set(-0.75, -1, 0.5);

        scene.add(light1);
        scene.add(light2);
        scene.add(light3);

        // --- ANIMATION LOOP ---
        let frameId: number;

        const animate = () => {
            frameId = requestAnimationFrame(animate);

            // Scroll interaction
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollFraction = Math.max(0, Math.min(1, scrollY / (maxScroll || 1))); // 0 to 1

            // Move camera based on scroll
            // Flies from z=400 to z=100
            if (cameraRef.current) {
                const targetZ = 400 - (scrollFraction * 300);
                cameraRef.current.position.z = targetZ;

                // Add some subtle rotation to the whole scene based on scroll
                // to feel like "tumbling" through space
                if (sceneRef.current) {
                    sceneRef.current.rotation.y = scrollFraction * Math.PI * 0.5;
                }
            }

            particle.rotation.x += 0.0000;
            particle.rotation.y -= 0.0040;
            circle.rotation.x -= 0.0020;
            circle.rotation.y -= 0.0030;
            skelet.rotation.x -= 0.0010;
            skelet.rotation.y += 0.0020;

            renderer.clear();
            renderer.render(scene, camera);
        };

        animate();

        // --- RESIZE HANDLER ---
        const handleResize = () => {
            if (!cameraRef.current || !rendererRef.current) return;
            cameraRef.current.aspect = window.innerWidth / window.innerHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            if (rendererRef.current && containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
    );
}
