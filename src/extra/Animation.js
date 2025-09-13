import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Animation = () => {
  const refContainer = useRef(null);

  useEffect(() => {
    // create scene
    const scene = new THREE.Scene();
    // define geometry of object
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // define material of object
    const material = new THREE.MeshBasicMaterial({ color: "red" });

    // create object
    const box = new THREE.Mesh(geometry, material);

    // set position of the box
    box.position.set(1, -3, 1);

    console.log(box.position.length());
    box.position.normalize();
    // adding box to scene
    scene.add(box);
    // define camera
    const size = {
      height: 500,
      width: 700,
    };
    const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
    camera.position.z = 5;
    camera.position.x = 2;
    // adding camera to scene
    scene.add(camera);
    console.log(box.position.distanceTo(new THREE.Vector3(0, 0, 0)));
    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    // renderer/director
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(size.width, size.height);
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    // Cleanup
    return () => {
      refContainer.current &&
        refContainer.current.removeChild(renderer.domElement);
    };
  }, []); // Empty dependency array

  return <div ref={refContainer}></div>;
};

export default Animation;
