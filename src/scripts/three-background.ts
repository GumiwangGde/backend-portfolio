import * as THREE from "three";

export class ThreeBackgroundScene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private particles: THREE.Points | null = null;
  private mouse = new THREE.Vector2(0, 0);
  private targetMouse = new THREE.Vector2(0, 0);
  private isDestroyed = false;
  private animationFrameId = 0;
  private isVisible = true;

  constructor(container: HTMLElement) {
    this.container = container;
    this.scene = new THREE.Scene();

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    this.camera.position.z = 400;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.container.appendChild(this.renderer.domElement);

    this.initParticles();
    this.bindEvents();
    this.animate();
  }

  private initParticles() {
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 600;

      // Deep cyan to electric blue gradient colors
      const t = Math.random();
      colors[i * 3] = 0.05 + t * 0.1;
      colors[i * 3 + 1] = 0.6 + t * 0.3;
      colors[i * 3 + 2] = 0.95;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private bindEvents() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("pointermove", this.onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", this.onVisibilityChange);
  }

  private onVisibilityChange = () => {
    this.isVisible = !document.hidden;
  };

  private onResize = () => {
    if (!this.container || this.isDestroyed) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private onPointerMove = (e: PointerEvent) => {
    this.targetMouse.x = (e.clientX - window.innerWidth / 2) * 0.08;
    this.targetMouse.y = (e.clientY - window.innerHeight / 2) * 0.08;
  };

  private animate = () => {
    if (this.isDestroyed) return;
    this.animationFrameId = requestAnimationFrame(this.animate);

    if (!this.isVisible) return;

    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.03;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.03;

    if (this.particles) {
      this.particles.rotation.y += 0.0006;
      this.particles.rotation.x += 0.0003;
      this.camera.position.x = this.mouse.x;
      this.camera.position.y = -this.mouse.y;
      this.camera.lookAt(this.scene.position);
    }

    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);

    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
    }
  }
}
