import * as THREE from 'three';

// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas') });

// Create a geometry
const geometry = new THREE.BoxGeometry();
// Create a material
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// Create a mesh with geometry and material
const cube = new THREE.Mesh(geometry, material);
// Add the cube to the scene
scene.add(cube);

// Position the camera
camera.position.z = 5;

// Render function
const animate = function () {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Start the animation loop
animate();
