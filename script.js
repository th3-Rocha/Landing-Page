let scene,
  camera,
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane,
  renderer,
  container,
  object,
  HEIGHT,
  WIDTH;
let State = "pyphone";
let createScene = () => {
  
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 10;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.x = 0;
  camera.position.z = 300;
  camera.position.y = 0;
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  container = document.getElementById("canvas");
  container.appendChild(renderer.domElement);
  window.addEventListener("resize", handleWindowResize, true);
  const geometry = new THREE.CircleGeometry( 5, 64 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffa500 } );
  const circle = new THREE.Mesh( geometry, material );
  scene.add( circle );
  circle.scale.set(2, 2, 2);
  circle.position.x = 30;
  circle.position.z = -30;
  let loader = new THREE.GLTFLoader();
  if(State == "pyphone"){
    loader.load( "gltf/PyPhone.gltf",
      (gltf) => {
        object = gltf.scene;
        object.position.y = -5;
        object.position.z = 0;
        object.position.x = 25;
        object.scale.set(2,2,2);
        scene.add(object);
      }
    );
  }
};

let stateFunction = (name) =>{
  State = name;
  console.log(State);
  
}

const handleWindowResize = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
};

const createLights = () => {
  const ambientLight = new THREE.HemisphereLight(0x404040, 0x404040,5);

  const directionalLight = new THREE.DirectionalLight(0xdfebff, 3);
  directionalLight.position.set(-300, 0, 600);

  const pointLight = new THREE.PointLight(0xf9e514, 2, 500, 015);
  pointLight.position.set(200, -100, 50);

  scene.add(ambientLight, directionalLight, pointLight);
};


const loop = () => {
  console.log(State);
  renderer.render(scene, camera);
  renderer.outputEncoding = THREE.sRGBEncoding;
  if (object) {
    object.rotation.y -= 0.01;
  }
  
  requestAnimationFrame(loop);

};



let main = () => {
 // stateFunction();
  var textOfTitle = document.getElementsByTagName("h3");
  var textOfMain = document.getElementsByTagName("p");
  // create and renders 3d objects
  createScene();
  createLights();
  renderer.render(scene, camera);
  loop();
  // create and renders 3d objects
};

main();
