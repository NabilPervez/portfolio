"use client";

// AOE crystal (ported from NabilPervez/aoe-crystal): spinning gem behind the AOE section.
// Lazy-starts when visible, pauses offscreen, static frame for reduced motion.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

export default function AoeCrystal({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let raf = 0, visible = false, disposed = false, cleanup = () => {};
    const io = new IntersectionObserver(async ([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !disposed) start();
    }, { rootMargin: "200px" });
    io.observe(el);
    let started = false;
    let loop: () => void = () => {};
    async function start() {
      if (started) { loop(); return; }
      started = true;
      const THREE: any = await import("three");
      if (disposed || !el) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0.3, 6.2);
      camera.lookAt(0, 0, 0);
      const size = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
      size();
      const ro = new ResizeObserver(size); ro.observe(el);

// --- geometry: elongated square bipyramid (octahedron), matching the reference proportions
const H = 1.36, R = 1.0;
const T = new THREE.Vector3(0, H, 0), B = new THREE.Vector3(0, -H, 0);
const eq = [[R, 0, 0], [0, 0, R], [-R, 0, 0], [0, 0, -R]].map((p) => new THREE.Vector3(...(p as [number, number, number])));
const pos: number[] = [], bary: number[] = [];
const tri = (a: any, b: any, c: any) => {
  const n = new THREE.Vector3().subVectors(b, a).cross(new THREE.Vector3().subVectors(c, a));
  const cen = new THREE.Vector3().add(a).add(b).add(c);
  if (n.dot(cen) < 0) [b, c] = [c, b];
  pos.push(...a.toArray(), ...b.toArray(), ...c.toArray());
  bary.push(1, 0, 0, 0, 1, 0, 0, 0, 1);
};
for (let i = 0; i < 4; i++) { const a = eq[i], b = eq[(i + 1) % 4]; tri(T, a, b); tri(B, b, a); }
const gemGeo = new THREE.BufferGeometry();
gemGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
gemGeo.setAttribute('bary', new THREE.Float32BufferAttribute(bary, 3));
gemGeo.computeVertexNormals();

const DEEP = new THREE.Color('#2A8ED2'), LIGHT = new THREE.Color('#A2E6FF'), ICE = new THREE.Color('#E8F8FF');

const facetMat = (side: any, alpha: number, dim: number) => new THREE.ShaderMaterial({
  uniforms: { uDeep: { value: DEEP }, uLight: { value: LIGHT }, uAlpha: { value: alpha }, uDim: { value: dim }, uPulse: { value: 0.4 }, uH: { value: H } },
  vertexShader: `attribute vec3 bary; varying vec3 vN; varying vec3 vV; varying vec3 vB; varying float vY;
    void main(){ vec4 mv=modelViewMatrix*vec4(position,1.); vN=normalMatrix*normal; vV=-mv.xyz; vB=bary; vY=position.y; gl_Position=projectionMatrix*mv; }`,
  fragmentShader: `uniform vec3 uDeep,uLight; uniform float uAlpha,uDim,uPulse,uH;
    varying vec3 vN; varying vec3 vV; varying vec3 vB; varying float vY;
    void main(){
      vec3 n=normalize(vN); if(!gl_FrontFacing) n=-n;
      vec3 v=normalize(vV);
      vec3 L=normalize(vec3(-0.6,0.55,0.6));
      float lam=clamp(dot(n,L)*.5+.5,0.,1.);
      vec3 col=mix(uDeep,uLight,pow(lam,1.3));
      float ay=abs(vY)/uH;
      col=mix(col,uLight,smoothstep(.35,1.,ay)*.22);
      col*=mix(1.,.82,smoothstep(.0,.35,1.-ay)*(1.-lam));
      float facing=abs(dot(n,v));
      float fres=pow(1.-facing,3.);
      vec3 Rf=reflect(-v,n); float spec=pow(max(dot(Rf,L),0.),60.);
      float m=min(min(vB.x,vB.y),vB.z); float fw=fwidth(m);
      float edge=1.-smoothstep(fw*.6,fw*2.2,m);
      float sheen=1.-smoothstep(0.,.08,m);
      col+=vec3(1.)*spec*.7 + vec3(.9,.98,1.)*edge*(.03+pow(lam,12.)*1.8) + uLight*sheen*.12*lam + fres*.12*uLight;
      col+=vec3(.35,.75,1.)*uPulse*.10;
      col*=uDim;
      float a=clamp(uAlpha+fres*.08+edge*pow(lam,12.)*.4,0.,1.);
      gl_FragColor=vec4(col,a);
    }`,
  side, transparent: true, depthWrite: false, extensions: {},
});

const fx = new THREE.Group(); scene.add(fx);
const backMat = facetMat(THREE.BackSide, 0.95, 0.7), frontMat = facetMat(THREE.FrontSide, 0.8, 1.0);
const back = new THREE.Mesh(gemGeo, backMat); back.renderOrder = 1; fx.add(back);
const front = new THREE.Mesh(gemGeo, frontMat); front.renderOrder = 3; fx.add(front);

// --- inner energy orb: swirling filaments + rim, additive, drawn after the glass
const noiseGLSL = `
float h(vec3 p){ p=fract(p*0.3183099+.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float n3(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.-2.*f);
  return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z); }
float fbm(vec3 p){ float a=.5,s=0.; for(int i=0;i<5;i++){ s+=a*n3(p); p*=2.03; a*=.5; } return s; }`;
const orbMat = (side: any, gain: number, scale: number, sharp: number) => new THREE.ShaderMaterial({
  uniforms: { uTime: { value: 0 }, uPulse: { value: 0.4 }, uGain: { value: gain }, uScale: { value: scale }, uSharp: { value: sharp } },
  vertexShader: `varying vec3 vN; varying vec3 vV; varying vec3 vP;
    void main(){ vec4 mv=modelViewMatrix*vec4(position,1.); vN=normalMatrix*normal; vV=-mv.xyz; vP=position; gl_Position=projectionMatrix*mv; }`,
  fragmentShader: `uniform float uTime,uPulse,uGain,uScale,uSharp; varying vec3 vN; varying vec3 vV; varying vec3 vP; ${noiseGLSL}
    void main(){
      vec3 q=normalize(vP)*uScale;
      float w=fbm(q+vec3(0.,-uTime*.25,uTime*.12));
      float f=fbm(q*1.25+vec3(w*3.0)+vec3(uTime*.08,-uTime*.18,0.));
      float veins=pow(1.-abs(f*2.-1.),uSharp)*smoothstep(.35,.6,w);
      float facing=abs(dot(normalize(vN),normalize(vV)));
      float rim=pow(1.-facing,5.)*smoothstep(.0,.15,facing);
      float e=veins*(.4+uPulse*1.)*(.25+.75*facing) + rim*(.18+uPulse*.35) + pow(facing,4.)*(.08+uPulse*.22);
      vec3 col=mix(vec3(.30,.70,1.),vec3(.92,.98,1.),clamp(veins*.9+rim*.4,0.,1.));
      gl_FragColor=vec4(col*e*uGain,1.);
    }`,
  side, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
});
const orbFront = orbMat(THREE.FrontSide, 0.5, 1.7, 16.0), orbBack = orbMat(THREE.BackSide, 0.28, 1.7, 18.0);
const orbGeo = new THREE.SphereGeometry(0.56, 96, 64);
const orbB = new THREE.Mesh(orbGeo, orbBack); orbB.renderOrder = 2; fx.add(orbB);
const orbF = new THREE.Mesh(orbGeo, orbFront); orbF.renderOrder = 4; fx.add(orbF);

function radialTex(stops: [number, string][]) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g2 = c.getContext('2d')!, gr = g2.createRadialGradient(128, 128, 0, 128, 128, 128);
  stops.forEach(([o, col]) => gr.addColorStop(o, col)); g2.fillStyle = gr; g2.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const coreTex = radialTex([[0, 'rgba(240,252,255,1)'], [0.2, 'rgba(140,215,255,.55)'], [0.55, 'rgba(60,150,230,.12)'], [1, 'rgba(0,0,0,0)']]);
const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: coreTex, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, transparent: true }));
core.renderOrder = 5; fx.add(core);
const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: coreTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.12 }));
halo.renderOrder = 0; halo.scale.setScalar(6.5); fx.add(halo);


      const g = (x: number, c: number, w: number) => Math.exp(-Math.pow((x - c) / w, 2));
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const t0 = performance.now();
      loop = () => {
        const t = reduce ? 1.2 : (performance.now() - t0) / 1000;
        const x = t % 2.4;
        const beat = g(x, 0.2, 0.09) + 0.6 * g(x, 0.48, 0.11);
        const pulse = 0.3 + 0.5 * beat + 0.06 * Math.sin(t * 0.7);
        fx.rotation.y = t * 0.5;
        fx.rotation.z = 0.12;
        fx.position.y = Math.sin(t * 0.9) * 0.06;
        fx.scale.setScalar(1 + beat * 0.008);
        frontMat.uniforms.uPulse.value = backMat.uniforms.uPulse.value = pulse;
        [orbFront, orbBack].forEach((m: any) => { m.uniforms.uTime.value = t; m.uniforms.uPulse.value = pulse; });
        orbF.rotation.y = orbB.rotation.y = t * 0.15;
        core.scale.setScalar(0.7 + pulse * 0.9); core.material.opacity = Math.min(1, 0.25 + pulse * 0.5);
        halo.material.opacity = 0.07 + pulse * 0.1;
        renderer.render(scene, camera);
        raf = visible && !reduce && !disposed ? requestAnimationFrame(loop) : 0;
      };
      cleanup = () => { ro.disconnect(); renderer.dispose(); renderer.domElement.remove(); };
      loop();
    }
    return () => { disposed = true; io.disconnect(); cancelAnimationFrame(raf); cleanup(); };
  }, []);
  return <div ref={host} aria-hidden className={className} />;
}
