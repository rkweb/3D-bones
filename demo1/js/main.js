var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45,$(window).width()/$(window).height(),1,1000);
camera.position.set(0, 20, 100);
scene.add(camera);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setClearColor(0x333333);
renderer.shadowMapEnabled = true;
renderer.setSize($(window).width(),$(window).height());

var light = new THREE.AmbientLight(0xffffff,1.5);
scene.add(light);

var light = new THREE.DirectionalLight(0x999999);
light.position.set(-100,100,130);
light.castShadow = true
light.shadowCameraVisible = true;
light.shadowCameraNear = 0;
light.shadowCameraFar = 500;
light.shadowCameraLeft = -100;
light.shadowCameraRight = 50;
light.shadowCameraTop = -50;
light.shadowCameraBottom = 50;
light.shadowMapWidth = 1000;
light.shadowMapHeight = 1000;
// light.shadowDarkness = 0;
renderer.shadowMapSoft = true;
scene.add(light);


var planeGeometry = new THREE.PlaneGeometry(200,200);
var planeMaterial = new THREE.MeshLambertMaterial({color:0x666666});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -.5*Math.PI;
plane.position.x = 0;
plane.position.y = -21;
plane.position.z = 0;
scene.add(plane);

var ani1 = true;
var jsonLoader = new THREE.JSONLoader(true);
var mixer;
jsonLoader.load('models/animation.js', function(geometry, materials) {
  materials.forEach(function(mat){
    mat.skinning = true;
  });
  var modelMesh = new THREE.SkinnedMesh(
    geometry, new THREE.MeshFaceMaterial(materials)
  );

  mixer = new THREE.AnimationMixer(modelMesh);
  ani1 = geometry.animations[0];
  ani2 = geometry.animations[1];
  action = mixer.clipAction(ani1);
  action.play();
  modelMesh.position.set(0, -20, 0);
  var scale = 2;
  modelMesh.scale.set(scale, scale, scale);
  scene.add(modelMesh);
   modelMesh.castShadow = true;
  modelMesh.receiveShadow = true;
  mixer = mixer;
});

$('.tiao').click(function(){
    action.stop();
    action = mixer.clipAction(ani1);
    action.play();
});
$('.quan').click(function(){
    action.stop();
    action = mixer.clipAction(ani2);
    action.play();
});

var controls = new THREE.OrbitControls(camera);
document.getElementById("canvas").appendChild(renderer.domElement);
 var clock = new THREE.Clock();
function render(){
  var delta = clock.getDelta();
  controls.update(delta);
  requestAnimationFrame(render);
  renderer.render(scene,camera);
  THREE.AnimationHandler.update(delta);
  if(mixer){
      mixer.update(delta);
  }
  renderer.render(scene,camera);
}
render();









