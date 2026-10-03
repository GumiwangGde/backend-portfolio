import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export function initThreeDolphin(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Clean existing canvas if any
  container.innerHTML = "";

  // 1. Scene & Camera Setup
  const scene = new THREE.Scene();
  const width = container.clientWidth || 500;
  const height = container.clientHeight || 500;

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 0.2, 5.0);

  // 2. Renderer Setup
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  // 3. Lighting (Tuned for Richer, Deeper Tones)
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0x0d47a1, 3.0);
  mainLight.position.set(4, 5, 4);
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0x3b82f6, 2.0);
  fillLight.position.set(-4, -3, -2);
  scene.add(fillLight);

  const topCyanLight = new THREE.PointLight(0x0099ff, 3.0, 15);
  topCyanLight.position.set(0, 4, 2);
  scene.add(topCyanLight);

  // 4. Custom Holographic Cyber Material with Skinning Support
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    #include <skinning_pars_vertex>

    void main() {
      #include <skinbase_vertex>
      #include <begin_vertex>
      #include <skinning_vertex>
      #include <project_vertex>

      vec4 modelPosition = modelMatrix * vec4(transformed, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;

      vUv = uv;
      vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
      vNormal = normalize(modelNormal.xyz);
      vPosition = modelPosition.xyz;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uPrimaryColor;
    uniform vec3 uSecondaryColor;
    uniform vec3 uRimColor;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      if (!gl_FrontFacing) {
        normal = -normal;
      }

      vec3 viewDir = normalize(cameraPosition - vPosition);
      float fresnel = 1.0 - max(dot(viewDir, normal), 0.0);
      float rim = pow(fresnel, 2.4);

      // Gradient along body (richer deep ocean gradient)
      vec3 bodyColor = mix(uPrimaryColor, uSecondaryColor, clamp(vPosition.y * 0.5 + 0.5, 0.0, 1.0));
      
      // Cyber scanline / wave pulse effect
      float wave = sin(vPosition.x * 6.0 - uTime * 3.0) * 0.06 + 0.94;
      bodyColor *= wave;

      vec3 finalColor = mix(bodyColor, uRimColor, rim * 0.65);

      gl_FragColor = vec4(finalColor, 0.95 + rim * 0.05);

      #include <colorspace_fragment>
    }
  `;

  const dolphinMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPrimaryColor: { value: new THREE.Color(0x0c3b7a) }, // Deep Ocean Blue
      uSecondaryColor: { value: new THREE.Color(0x1a62bf) }, // Rich Sapphire
      uRimColor: { value: new THREE.Color(0x38bdf8) } // Crisp Cyan Accent Rim
    },
    transparent: true,
    depthWrite: true,
    side: THREE.DoubleSide
  });

  // 5. Floating Light Particles
  const particleCount = 60;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSpeeds: number[] = [];

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 7;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    particleSpeeds.push(0.003 + Math.random() * 0.006);
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x0071e3,
    size: 0.045,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // 6. Model Loading with DRACOLoader
  let mixer: THREE.AnimationMixer | null = null;
  let dolphinModel: THREE.Group | null = null;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/gltf/");

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  gltfLoader.load(
    "/models/dolphin_anim.glb",
    (gltf) => {
      dolphinModel = gltf.scene;

      // Apply cyber material to all meshes/skinned meshes
      dolphinModel.traverse((child) => {
        if ((child as THREE.Mesh).isMesh || (child as THREE.SkinnedMesh).isSkinnedMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = dolphinMaterial;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.frustumCulled = false;
        }
      });

      // Position and Scale (sleek compact size)
      dolphinModel.scale.set(1.1, 1.1, 1.1);
      dolphinModel.position.set(0, -0.05, 0);
      dolphinModel.rotation.y = -Math.PI / 4; // Friendly dynamic initial angle

      // Start Swimming Animation
      if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(dolphinModel);
        const action = mixer.clipAction(gltf.animations[0]);
        action.setEffectiveTimeScale(0.9);
        action.play();
      }

      scene.add(dolphinModel);
    },
    undefined,
    (error) => {
      console.error("Error loading dolphin model:", error);
    }
  );

  // 7. Interactive Controls: ONLY rotate when user clicks & holds (drag)
  let targetRotationY = -Math.PI / 4;
  let targetRotationX = 0;
  let isDragging = false;
  let prevPos = { x: 0, y: 0 };

  const onMouseDown = (e: MouseEvent) => {
    isDragging = true;
    prevPos = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isDragging = false;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevPos.x;
    const deltaY = e.clientY - prevPos.y;

    targetRotationY += deltaX * 0.008;
    targetRotationX += deltaY * 0.008;

    // Limit pitch angle so dolphin doesn't flip upside down
    targetRotationX = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotationX));

    prevPos = { x: e.clientX, y: e.clientY };
  };

  // Touch Drag Support
  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const onTouchEnd = () => {
    isDragging = false;
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - prevPos.x;
    const deltaY = e.touches[0].clientY - prevPos.y;

    targetRotationY += deltaX * 0.008;
    targetRotationX += deltaY * 0.008;
    targetRotationX = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotationX));

    prevPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  container.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseup", onMouseUp);
  window.addEventListener("mousemove", onMouseMove);

  container.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd);
  container.addEventListener("touchmove", onTouchMove, { passive: true });

  // 8. Animation Loop
  const clock = new THREE.Clock();
  let animationId: number;

  const animate = () => {
    animationId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    dolphinMaterial.uniforms.uTime.value = elapsed;

    if (mixer) {
      mixer.update(delta);
    }

    if (dolphinModel) {
      // Smooth dampening rotation
      dolphinModel.rotation.y += (targetRotationY - dolphinModel.rotation.y) * 0.05;
      dolphinModel.rotation.x += (targetRotationX - dolphinModel.rotation.x) * 0.05;

      // Natural organic swimming glide & float
      dolphinModel.position.y = -0.1 + Math.sin(elapsed * 1.6) * 0.15;
      dolphinModel.position.x = Math.cos(elapsed * 0.9) * 0.1;
      dolphinModel.rotation.z = Math.sin(elapsed * 1.3) * 0.06;
    }

    // Animate light bubbles
    const positions = particleGeometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] += particleSpeeds[i];
      if (positions[i * 3 + 1] > 3.0) {
        positions[i * 3 + 1] = -3.0;
      }
    }
    particleGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  };

  animate();

  // 9. Resize Handling
  const handleResize = () => {
    if (!container) return;
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    if (newWidth === 0 || newHeight === 0) return;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(container);

  return () => {
    container.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
    container.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend", onTouchEnd);
    container.removeEventListener("touchmove", onTouchMove);
    resizeObserver.disconnect();
    cancelAnimationFrame(animationId);
    renderer.dispose();
  };
}
