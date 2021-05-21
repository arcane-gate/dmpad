import Roll from "roll";

const roller = Promise.all([
  import("three"),
  import("cannon"),
  import("../vendor/ColladaLoader"),
]).then(([THREE, CANNON, { ColladaLoader }]) => {
  function gen_polyhedron(child) {
    let points = [],
      faces = [],
      i = 0,
      v = null,
      f = null;
    const { geometry } = child;

    const position = geometry.attributes.position.array;
    const vector = new THREE.Vector3();
    for (let i = 0; i < position.length; i += 3) {
      points.push(
        new CANNON.Vec3(position[i], position[i + 1], position[i + 2])
      );
    }

    for (let i = 0, l = position.count; i < l; i++) {
      vector.fromBufferAttribute(position, i);
      vector.applyMatrix4(child.matrixWorld);
      vertices[i] = new CANNON.Vec3(vector.x, vector.y, vector.z);
    }
    for (let i = 0; i < position.count / 3; i += 3) {
      faces.push([i, i + 1, i + 2]);
    }

    return new CANNON.ConvexPolyhedron(points, faces);
  }
  let world, diceBody, camera, scene, renderer, geometry, material, die;
  const timeStep = 1 / 60;
  const D20 = () =>
    new Promise((resolve, reject) => {
      const loader = new ColladaLoader();
      loader.load("./images/die_20.dae", (collada) => {
        const d20 = collada.scene;
        d20.castShadow = true;
        d20.position.set(200, 0, 0);

        diceBody = new CANNON.Body({
          mass: 50,
          shape: gen_polyhedron(d20.children[0]),
          material: new CANNON.Material(),
        });

        world.addBody(diceBody);
        resolve(d20);
      });
    });
  function animate(time) {
    requestAnimationFrame(animate);
    world.step(timeStep);
    die.position.copy(diceBody.position);
    die.quaternion.copy(diceBody.quaternion);
    render();
  }
  function render() {
    renderer.render(scene, camera);
  }
  const init = (element) => {
    if (!element) return;
    scene = new THREE.Scene();
    scene.background = new THREE.Color("white");

    camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene.add(camera);

    // CANNON

    world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    world.add(
      new CANNON.Body({
        shape: new CANNON.Plane(),
        mass: 0,
        quaternion: new CANNON.Quaternion().setFromEuler(-Math.PI * 0.5, 0, 0),
      })
    );

    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    element.appendChild(renderer.domElement);

    const velocity = () => {
      return (0.5 + Math.random() * 0.1) * Math.PI;
    };

    // DIE
    return D20().then((d20) => {
      die = d20;
      scene.add(die);
      return () => {
        var angle = (Math.random() - 0.5) * Math.PI * 2 * 0.1;

        diceBody.position.set(0, 2, -10);
        diceBody.velocity.set(Math.sin(angle) * 7, -1, Math.cos(angle) * 9);

        diceBody.angularVelocity.set(velocity(20), velocity(20), velocity(20));

        diceBody.quaternion.setFromEuler(
          Math.random() * 2 * Math.PI,
          2 * Math.PI,
          Math.random() * 2 * Math.PI
        );
        animate();
      };
    });
  };
  return init;
});

export default roller;
