import * as THREE from "three";

import AsciiEffect from "./AsciiEffect";
import D10 from './dice/d10';

const dice = {
  d20: (size = 200) => new THREE.IcosahedronGeometry(size, 0),
  d10: (size = 200) => D10(size),
  d100: (size = 200) => D10(size),
  d6: (size = 200) =>
    new THREE.BoxGeometry(size * 1.25, size * 1.25, size * 1.25),
  d8: (size = 200) => new THREE.OctahedronGeometry(size, 0),
  d4: (size = 200) => new THREE.TetrahedronGeometry(size, 0),
};

export type Die = keyof typeof dice;

function init(element: HTMLDivElement, dieType: Die = "d20") {
  let camera: THREE.Camera, scene: THREE.Scene, renderer, effect: AsciiEffect, die: THREE.Mesh, start: number;

  function animate() {
    requestAnimationFrame(animate);
    render();
  }
  
  function render() {
    if(!die || !start || !effect) return;
    const timer = Date.now() - start;
  
    die.position.y = Math.abs(Math.sin(timer * 0.002)) * 150 + 100;
    die.rotation.x = timer * 0.003;
    die.rotation.z = timer * 0.002;
  
    effect.render(scene, camera);
  }

  return () => {
  const size = 100;
  const width = size;
  const height = size;
  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.y = size + size / 3;
  camera.position.z = size * 2;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(255, 255, 255);

  const pointLight1 = new THREE.PointLight(0xffffff, 0.25);
  pointLight1.position.set(size + 150, size + 150, size + 150);
  pointLight1.castShadow = true;
  pointLight1.shadow.mapSize.width = 512; // default
  pointLight1.shadow.mapSize.height = 512; // default
  pointLight1.shadow.camera.near = 0.5; // default
  pointLight1.shadow.camera.far = 500; // default

  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffffff, 0.25);
  pointLight2.position.set(
    -1 * (size + 150),
    -1 * (size + 150),
    -1 * (size + 150)
  );
  scene.add(pointLight2);

  const dieFunc = dice[dieType] ? dice[dieType] : dice["d20"];

  die = new THREE.Mesh(
    dieFunc(size - size / 10),
    new THREE.MeshPhongMaterial()
  );
  die.castShadow = true;
  scene.add(die);

  const geometry = new THREE.PlaneGeometry(size, size);
  const material = new THREE.ShadowMaterial();
  const plane = new THREE.Mesh(geometry, material);
  plane.position.y = 0;
  plane.receiveShadow = true;
  scene.add(plane);

  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(width, height);

  effect = new AsciiEffect(renderer, " .:H#░▒▓█", {
    resolution: 0.25,
  });
  effect.setSize(width, height);
  effect.domElement.style.color = "black";
  element.innerHTML = "";
  element.appendChild(effect.domElement);
  start = Date.now();
  animate();
}
}

export default init;
