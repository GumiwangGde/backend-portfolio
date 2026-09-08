import * as THREE from "three";

export interface NodeInfo {
  id: string;
  name: string;
  type: string;
  color: number;
  description: string;
  position: [number, number, number];
  metrics: string;
}

export const ARCHITECTURE_NODES: NodeInfo[] = [
  {
    id: "gateway",
    name: "API Gateway & Edge",
    type: "Ingress / Routing",
    color: 0x06b6d4, // Cyan
    description: "Reverse proxy, rate limiting, and SSL termination handling ingress traffic.",
    position: [0, 2.2, 0],
    metrics: "Sub-5ms Latency • 100% Ingress"
  },
  {
    id: "auth",
    name: "Auth & RBAC Service",
    type: "Security Core",
    color: 0x8b5cf6, // Purple
    description: "JWT verification, token rotation, and strict role permissions checks.",
    position: [-2.2, 0.8, 0.8],
    metrics: "HMAC-SHA256 • Zero-Trust"
  },
  {
    id: "api",
    name: "Core API Microservice",
    type: "Business Logic",
    color: 0x3b82f6, // Blue
    description: "High-throughput REST/gRPC backend handling domain transactions.",
    position: [2.0, 0.9, -0.6],
    metrics: "ASP.NET Core & Node.js"
  },
  {
    id: "queue",
    name: "RabbitMQ Message Broker",
    type: "Async Queue",
    color: 0x10b981, // Emerald
    description: "Decoupled asynchronous worker queues ensuring zero race conditions.",
    position: [-1.8, -1.2, -0.8],
    metrics: "AMQP 0-9-1 • 10k msg/s"
  },
  {
    id: "worker",
    name: ".NET Background Worker",
    type: "Batch & Event Consumer",
    color: 0x0ea5e9, // Sky blue
    description: "Background processing pool consuming real-time bid events & jobs.",
    position: [1.8, -1.1, 0.9],
    metrics: "Parallel Task Execution"
  },
  {
    id: "db",
    name: "PostgreSQL Primary Cluster",
    type: "Relational Persistence",
    color: 0xf59e0b, // Amber
    description: "ACID transactions with indexed relational tables & partition sharding.",
    position: [0, -2.2, 0],
    metrics: "ACID Compliant • WAL Logs"
  },
  {
    id: "cache",
    name: "Redis Memory Cache",
    type: "In-Memory Store",
    color: 0xf43f5e, // Rose
    description: "Distributed locks, fast session store, and sub-millisecond query cache.",
    position: [0, 0, 1.8],
    metrics: "< 1ms Cache Hit"
  }
];

export class ThreeNetworkScene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private nodeMeshes: { mesh: THREE.Mesh; halo: THREE.Mesh; data: NodeInfo }[] = [];
  private connectionLines: THREE.LineSegments | null = null;
  private packetParticles: {
    curve: THREE.CatmullRomCurve3;
    progress: number;
    speed: number;
    mesh: THREE.Mesh;
  }[] = [];
  private backgroundParticles: THREE.Points | null = null;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private targetRotation: THREE.Vector2 = new THREE.Vector2(0, 0);
  private currentRotation: THREE.Vector2 = new THREE.Vector2(0, 0);
  private hoveredNode: NodeInfo | null = null;
  private onNodeHoverCallback?: (node: NodeInfo | null) => void;
  private isDestroyed = false;
  private animationFrameId = 0;
  private clock = new THREE.Clock();
  private rootGroup = new THREE.Group();

  constructor(
    container: HTMLElement,
    onNodeHover?: (node: NodeInfo | null) => void
  ) {
    this.container = container;
    this.onNodeHoverCallback = onNodeHover;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.add(this.rootGroup);

    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 9.5);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Raycaster & Mouse
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(999, 999);

    this.initLights();
    this.initNodes();
    this.initConnections();
    this.initDataPackets();
    this.initBackgroundParticles();
    this.bindEvents();
    this.animate();
  }

  private initLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x06b6d4, 2.0);
    dirLight1.position.set(5, 8, 5);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 1.5);
    dirLight2.position.set(-5, -6, -3);
    this.scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x38bdf8, 2, 20);
    pointLight.position.set(0, 0, 3);
    this.scene.add(pointLight);
  }

  private initNodes() {
    ARCHITECTURE_NODES.forEach((nodeData) => {
      // Main node core
      const geometry = new THREE.IcosahedronGeometry(0.38, 1);
      const material = new THREE.MeshStandardMaterial({
        color: nodeData.color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: nodeData.color,
        emissiveIntensity: 0.35,
        wireframe: false
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...nodeData.position);
      (mesh as any).nodeData = nodeData;

      // Outer Wireframe Glow / Halo
      const haloGeo = new THREE.IcosahedronGeometry(0.55, 1);
      const haloMat = new THREE.MeshBasicMaterial({
        color: nodeData.color,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(mesh.position);

      this.rootGroup.add(mesh);
      this.rootGroup.add(halo);

      this.nodeMeshes.push({ mesh, halo, data: nodeData });
    });
  }

  private initConnections() {
    // Connect nodes logically (Gateway -> Auth, API, Queue -> Worker -> DB, Cache)
    const connections: [number, number][] = [
      [0, 1], // Gateway -> Auth
      [0, 2], // Gateway -> API
      [1, 2], // Auth -> API
      [2, 3], // API -> Queue
      [2, 6], // API -> Cache
      [3, 4], // Queue -> Worker
      [4, 5], // Worker -> DB
      [2, 5], // API -> DB
      [6, 5], // Cache -> DB
      [0, 6]  // Gateway -> Cache
    ];

    const linePoints: THREE.Vector3[] = [];
    const colors: number[] = [];

    connections.forEach(([i, j]) => {
      const p1 = new THREE.Vector3(...ARCHITECTURE_NODES[i].position);
      const p2 = new THREE.Vector3(...ARCHITECTURE_NODES[j].position);
      linePoints.push(p1, p2);

      const c1 = new THREE.Color(ARCHITECTURE_NODES[i].color);
      const c2 = new THREE.Color(ARCHITECTURE_NODES[j].color);
      colors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
    });

    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    lineGeo.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    this.connectionLines = new THREE.LineSegments(lineGeo, lineMat);
    this.rootGroup.add(this.connectionLines);
  }

  private initDataPackets() {
    const connections: [number, number][] = [
      [0, 1], [0, 2], [1, 2], [2, 3], [3, 4], [4, 5], [2, 5], [2, 6]
    ];

    const packetGeo = new THREE.SphereGeometry(0.07, 8, 8);

    connections.forEach(([i, j]) => {
      const p1 = new THREE.Vector3(...ARCHITECTURE_NODES[i].position);
      const p2 = new THREE.Vector3(...ARCHITECTURE_NODES[j].position);
      const curve = new THREE.CatmullRomCurve3([p1, p2]);

      for (let p = 0; p < 2; p++) {
        const packetMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending
        });

        const packetMesh = new THREE.Mesh(packetGeo, packetMat);
        this.rootGroup.add(packetMesh);

        this.packetParticles.push({
          curve,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          mesh: packetMesh
        });
      }
    });
  }

  private initBackgroundParticles() {
    const count = 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const isCyan = Math.random() > 0.5;
      colors[i * 3] = isCyan ? 0.02 : 0.4;
      colors[i * 3 + 1] = isCyan ? 0.7 : 0.3;
      colors[i * 3 + 2] = 0.95;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    this.backgroundParticles = new THREE.Points(geometry, material);
    this.rootGroup.add(this.backgroundParticles);
  }

  private bindEvents() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("pointermove", this.onPointerMove);
  }

  private onResize = () => {
    if (!this.container || this.isDestroyed) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  private onPointerMove = (event: PointerEvent) => {
    const rect = this.container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Check if within bounds
    if (x >= -1.2 && x <= 1.2 && y >= -1.2 && y <= 1.2) {
      this.mouse.x = x;
      this.mouse.y = y;
      this.targetRotation.x = y * 0.35;
      this.targetRotation.y = x * 0.55;
    }
  };

  private updateRaycasting() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = this.nodeMeshes.map((n) => n.mesh);
    const intersects = this.raycaster.intersectObjects(meshes);

    let newlyHovered: NodeInfo | null = null;

    if (intersects.length > 0) {
      const topMesh = intersects[0].object as THREE.Mesh;
      newlyHovered = (topMesh as any).nodeData || null;
    }

    if (this.hoveredNode !== newlyHovered) {
      this.hoveredNode = newlyHovered;
      if (this.onNodeHoverCallback) {
        this.onNodeHoverCallback(this.hoveredNode);
      }
    }

    // Visual feedback for hovered node
    this.nodeMeshes.forEach(({ mesh, halo, data }) => {
      const isCurrent = this.hoveredNode?.id === data.id;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const haloMat = halo.material as THREE.MeshBasicMaterial;

      if (isCurrent) {
        mesh.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.15);
        halo.scale.lerp(new THREE.Vector3(1.4, 1.4, 1.4), 0.15);
        mat.emissiveIntensity = 0.9;
        haloMat.opacity = 0.8;
      } else {
        mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        halo.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        mat.emissiveIntensity = 0.35;
        haloMat.opacity = 0.35;
      }
    });
  }

  private animate = () => {
    if (this.isDestroyed) return;
    this.animationFrameId = requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth camera / root group parallax
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;

    this.rootGroup.rotation.x = this.currentRotation.x + Math.sin(elapsedTime * 0.3) * 0.08;
    this.rootGroup.rotation.y = this.currentRotation.y + elapsedTime * 0.12;

    // Rotate halos
    this.nodeMeshes.forEach(({ halo }, idx) => {
      halo.rotation.x += 0.01 * (idx % 2 === 0 ? 1 : -1);
      halo.rotation.y += 0.015;
    });

    // Update data packets
    this.packetParticles.forEach((packet) => {
      packet.progress += packet.speed;
      if (packet.progress > 1) {
        packet.progress = 0;
      }
      const pt = packet.curve.getPoint(packet.progress);
      packet.mesh.position.copy(pt);
    });

    // Subtle background particles drift
    if (this.backgroundParticles) {
      this.backgroundParticles.rotation.y = -elapsedTime * 0.02;
    }

    this.updateRaycasting();
    this.renderer.render(this.scene, this.camera);
  };

  public triggerPing(nodeId: string) {
    const target = this.nodeMeshes.find((n) => n.data.id === nodeId);
    if (target) {
      const mat = target.mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.8;
      setTimeout(() => {
        if (!this.isDestroyed) {
          mat.emissiveIntensity = 0.35;
        }
      }, 500);
    }
  }

  public destroy() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("pointermove", this.onPointerMove);

    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
    }
  }
}
