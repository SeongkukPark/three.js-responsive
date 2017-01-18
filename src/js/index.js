import '../css/style.css';
import $ from 'jquery';
import * as THREE from 'three';

$(document).ready(() => {
  let scene, camera, renderer;
  let geometry, material, mesh;

  init();
  animate();

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 40;

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 0, 40);
    spotLight.castShadow = true;
    scene.add(spotLight);

    geometry = new THREE.BoxGeometry(10, 10, 10);
    material = new THREE.MeshLambertMaterial({ color: 0xcccccc });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    renderer.domElement.style.position = "relative";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    $('#sketch').append(renderer.domElement);
  }

  function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render(scene, camera);

    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }
})
