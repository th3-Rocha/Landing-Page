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
let State;

if(State == null){
  State = "pyphone";
}

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
  const material = new THREE.MeshBasicMaterial( { color: 0x14F9E5 } );
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
        object.position.y = 5;
        object.position.z = 0;
        object.position.x = 25;
        object.scale.set(6,6,6);
        scene.add(object);
      }
    );
  }
  else if (State == "pac"){
    loader.load( "gltf/Pac.gltf",
      (gltf) => {
        object = gltf.scene;
        object.position.y = 5;
        object.position.z = 0;
        object.position.x = 25;
        object.scale.set(6,6,6);
        scene.add(object);
      }
    );
  }
  else if (State == "pypad"){
    loader.load( "gltf/PyPad.gltf",
      (gltf) => {
        object = gltf.scene;
        object.position.y = 5;
        object.position.z = 0;
        object.position.x = 25;
        object.scale.set(6,6,6);
        scene.add(object);
      }
    );
  }
  else if (State == "pytv"){
    loader.load( "gltf/PyTv.gltf",
      (gltf) => {
        object = gltf.scene;
        object.position.y = 5;
        object.position.z = 0;
        object.position.x = 25;
        object.scale.set(6,6,6);
        scene.add(object);
      }
    );
  }
};



const handleWindowResize = () => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
};

const createLights = () => {
  const ambientLight = new THREE.HemisphereLight(0x404040, 0x404040,5);

  const directionalLight = new THREE.DirectionalLight(0xdfebff, 2);
  directionalLight.position.set(-300, 0, 600);

  const pointLight = new THREE.PointLight(0xf9e514, 2, 500, 015);
  pointLight.position.set(200, -100, 50);

  scene.add(ambientLight, directionalLight, pointLight);
};


const loop = () => {
  renderer.render(scene, camera);
  if (object) {
    object.rotation.y -= 0.01;
  }
  requestAnimationFrame(loop);
};


let stateFunction = (name) =>{
  State = name;
  console.log(name);
}

let main = () => {
  var textOfTitle = document.getElementsByTagName("h3");
  var textOfMain = document.getElementsByTagName("p");
  if(State == "pyphone"){
    textOfTitle[0].innerHTML = "Apresentando o <strong>PyPhone 4</strong>";
    textOfMain[0].textContent = "Mais rapido";
    textOfMain[1].textContent = "Biodegradável";
    textOfMain[2].textContent = "Cabe na palma da mão";
    textOfMain[3].textContent = "À prova d'água";

  }else if (State == "pac"){
    textOfTitle[0].innerHTML = "Apresentando o <strong>Pac Book Pro</strong>";
    textOfMain[0].textContent = "Ultra Leve";
    textOfMain[1].textContent = "Bateria dura semanas";
    textOfMain[2].textContent = "Teclado orgânico";
    textOfMain[3].textContent = "Ja vem com o Sistema Operacional PearOS";
  }else if (State == "pypad"){
    textOfTitle[0].innerHTML = "Apresentando o <strong>PyPad Max 2</strong>";
    textOfMain[0].textContent = "Camera 4k";
    textOfMain[1].textContent = "Ergonômico";
    textOfMain[2].textContent = "Tela Super Vled";
    textOfMain[3].textContent = "Utiliza Sistema Operacional PearOS Peartable";
  }
  else if (State == "pytv"){
    textOfTitle[0].innerHTML = "Apresentando o <strong>PyTv Vision</strong>";
    textOfMain[0].textContent = "Tela Ultra Luminosa";
    textOfMain[1].textContent = "Som Sosurand 3";
    textOfMain[2].textContent = "Tela TV Touch";
    textOfMain[3].textContent = "Suporta 5G wireless";
  }

  // create and renders 3d objects
  createScene();
  createLights();
  renderer.render(scene, camera);
  loop();
  // create and renders 3d objects
};

main();