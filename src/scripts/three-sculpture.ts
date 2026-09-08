import * as THREE from "three";

export class ThreeSculptureScene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private sculptureGroup = new THREE.Group();
  private mouse = new THREE.Vector2(0, 0);
  private targetMouse = new THREE.Vector2(0, 0);
  private targetScrollY = 0;
  private currentScrollY = 0;
  private isDestroyed = false;
  private animationFrameId = 0;
  private isVisible = true;
  private clock = new THREE.Clock();

  constructor(container: HTMLElement) {
    this.container = container;
    this.scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 7.5);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.container.appendChild(this.renderer.domElement);

    this.scene.add(this.sculptureGroup);

    this.initLights();
    this.initSculpture();
    this.bindEvents();
    this.animate();
  }

  private initLights() {
    // Soft deep midnight ambient fill
    const ambientLight = new THREE.AmbientLight(0x0a162b, 1.5);
    this.scene.add(ambientLight);

    // Key ice-platinum studio rim light
    const keyLight = new THREE.DirectionalLight(0xf0f9ff, 4.8);
    keyLight.position.set(6, 8, 4);
    this.scene.add(keyLight);

    // Cool cobalt/ice-blue fill light
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    fillLight.position.set(-6, -3, 2);
    this.scene.add(fillLight);

    // Backlit rim halo
    const rimLight = new THREE.DirectionalLight(0x7dd3fc, 3.8);
    rimLight.position.set(0, -6, -5);
    this.scene.add(rimLight);

    // Subtle center highlight
    const pointLight = new THREE.PointLight(0x93c5fd, 2.2, 10);
    pointLight.position.set(2, 2, 3);
    this.scene.add(pointLight);
  }

  private initSculpture() {
    // Deep Midnight Sapphire / Titanium liquid metallic material
    const material = new THREE.MeshStandardMaterial({
      color: 0x081324,
      roughness: 0.2,
      metalness: 0.95,
      envMapIntensity: 1.8,
      flatShading: false
    });

    // Primary sculpture: Monolithic Torus Knot
    const mainGeometry = new THREE.TorusKnotGeometry(1.6, 0.48, 220, 36, 2, 3);
    const mainMesh = new THREE.Mesh(mainGeometry, material);
    mainMesh.scale.set(1.1, 1.1, 1.1);
    this.sculptureGroup.add(mainMesh);

    // Secondary architectural orbit ring with platinum sheen
    const ringGeo = new THREE.TorusGeometry(2.6, 0.03, 32, 120);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 1.0,
      emissive: 0x0c2548,
      emissiveIntensity: 0.4
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    this.sculptureGroup.add(ringMesh);

    // Floating ice-platinum micro-particles
    const particleCount = 75;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xbae6fd,
      transparent: true,
      opacity: 0.65
    });
    const particles = new THREE.Points(pGeo, pMat);
    this.sculptureGroup.add(particles);
  }

  private bindEvents() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("pointermove", this.onPointerMove, { passive: true });
    window.addEventListener("scroll", this.onScroll, { passive: true });
    document.addEventListener("visibilitychange", this.onVisibilityChange);
  }

  private onVisibilityChange = () => {
    this.isVisible = !document.hidden;
  };

  private onResize = () => {
    if (!this.container || this.isDestroyed) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  private onPointerMove = (e: PointerEvent) => {
    this.targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    this.targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  };

  private onScroll = () => {
    this.targetScrollY = window.scrollY;
  };

  private animate = () => {
    if (this.isDestroyed) return;
    this.animationFrameId = requestAnimationFrame(this.animate);

    if (!this.isVisible) return;

    const elapsedTime = this.clock.getElapsedTime();

    // Smooth mouse lerp
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    // Smooth scroll interpolation
    this.currentScrollY += (this.targetScrollY - this.currentScrollY) * 0.05;
    const scrollFactor = this.currentScrollY * 0.001;

    // Organic rotation with scroll interaction
    this.sculptureGroup.rotation.y = elapsedTime * 0.15 + this.mouse.x * 0.4 + scrollFactor * 0.8;
    this.sculptureGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.15 + this.mouse.y * 0.3 - scrollFactor * 0.3;
    this.sculptureGroup.rotation.z = Math.cos(elapsedTime * 0.08) * 0.1;

    // Parallax position
    this.sculptureGroup.position.x = this.mouse.x * 0.3;
    this.sculptureGroup.position.y = this.mouse.y * 0.2 - (scrollFactor * 0.5);

    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("scroll", this.onScroll);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);

    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
    }
  }
}
