//scene setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;


var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#ffffff");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

//mesh setup
var geometry = new THREE.BoxGeometry(1, 1, 1);
var wireframe = new THREE.EdgesGeometry(geometry);
var material = new THREE.LineBasicMaterial({ color: 0x333333 });

var center_mat = new THREE.LineBasicMaterial({ color: 0xffa1a1 });
var center_line = new THREE.LineSegments(wireframe, center_mat);

center_line.position.x = (Math.random() - 0.5) * 10;
center_line.position.y = (Math.random() - 0.5) * 10;
center_line.position.z = (Math.random() - 0.5) * 10;

center_line.scale.set(0.5, 0.5, 0.5);

scene.add(center_line);


meshX = -10;

//spawning mesh
for (var i = 0; i < 25; i++) {
    var line = new THREE.LineSegments(wireframe, material);
    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = true;
    line.position.x = (Math.random() - 0.5) * 10;
    line.position.y = (Math.random() - 0.5) * 10;
    line.position.z = (Math.random() - 0.5) * 10;
    scene.add(line);
    meshX += 1;
}

//ligh setup
var light = new THREE.PointLight(0xFFFFFF, 1, 1000);
light.position.set(0, 0, 0);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000);
light.position.set(0, 25, 25);
scene.add(light);

var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

//animation trigger
function onMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut });
        this.tl.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut });
        this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut });
        this.tl.to(intersects[i].object.rotation, .5, { y: Math.PI * .5, ease: Expo.easeOut }, "=-1.5");
    }
}


render();
window.addEventListener('mousemove', onMouseMove);

