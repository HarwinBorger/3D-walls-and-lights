import React, {useRef, useState} from 'react'
import * as THREE from 'three'

import {Canvas, useFrame, extend, useThree} from 'react-three-fiber'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

extend({OrbitControls});

const CameraControls = () => {  // Get a reference to the Three.js Camera, and the canvas html element.  // We need these to setup the OrbitControls component.  // https://threejs.org/docs/#examples/en/controls/OrbitControls  const {    camera,    gl: { domElement },  } = useThree();  // Ref to the controls, so that we can update them on every frame using useFrame
	const controls = useRef();
	const {gl, camera} = useThree();
	camera.zoom = 2;
	useFrame((state) => controls.current.update());
	return <orbitControls ref={controls} args={[camera, gl.domElement]}/>;
};

export default function Scene() {
	return (
		<Canvas shadowMap antialias="true">
			<fog attach="fog" args={['white', 0, 100]}/>
			<gridHelper args={[200, 200, 0xff0000]}/>
			<ambientLight intensity={0.05}/>
			{/*<spotLight position={[2.5, 0.5, 0]} color="pink" castShadow="true" angle="270" distance="10"/>*/}
			<Light position={[- 4, 2, - 4]} color="green"/>
			<Light position={[- 3, 2, - 1]} color="blue"/>
			<Light position={[2.5, 2, 0]} color="red"/>
			<Light position={[4, 2, 3]} color="blue"/>

			<Light position={[- 4.5, 2, 1]} color="orange"/>
			<Light position={[- 4.5, 2, 2]} color="orange"/>
			<Light position={[- 4.5, 2, 3]} color="orange"/>
			<CameraControls/>
			{/*<Box position={[- 1.2, 0, 0]}/>*/}
			{/*<Box position={[1.2, 0, 0]}/>*/}

			<Wall size={{x: 0.1, y: 2.3, z: 5}} position={{x: - 1, z: - 1}}/>
			<Wall size={{x: 0.1, y: 2.3, z: 5}} position={{x: 2, z: 1}} />

			// toilet
			<Wall size={{x: 0.1, y: 2.3, z: 2.1}} position={{x: - 4, z: 2}}/>
			<Wall size={{x: 0.1, y: 2.3, z: 2.1}} position={{x: - 2, z: 2}}/>
			<Wall size={{x: 2.1, y: 2.3, z: 0.1}} position={{x: - 3, z: 1}}/>
			<Wall size={{x: 2.1, y: 2.3, z: 0.1}} position={{x: - 3, z: 3}}/>

			// walls around
			<Wall size={{x: 0.1, y: 2.3, z: 10.1}} position={{x: 5, z: 0}}/>
			<Wall size={{x: 0.1, y: 2.3, z: 10.1}} position={{x: - 5, z: 0}}/>
			<Wall size={{x: 10.1, y: 2.3, z: 0.1}} position={{x: 0, z: 5}}/>
			<Wall size={{x: 10.1, y: 2.3, z: 0.1}} position={{x: 0, z: - 5}}/>

			// low wall
			<Wall size={{x: 2, y: 1, z: 0.5}} position={{x: 4, z: - 3}}/>
			<Light position={[4, 2,- 4]} color="white"/>

			<Floor size={{x: 10, y: 10}}/>
		</Canvas>
	);
}

function Floor({size = {x: 5, y: 5}}) {
	return (
		<mesh receiveShadow position={[0, 0.1]}>
			<boxGeometry args={[size.x, 0.15, size.y]}/>
			<meshStandardMaterial color="gray"/>
		</mesh>
	);
}

function Wall({size = {y: 1, z: 2}, position = {x: 0, z: 0}}) {
	const y = size.y / 2;
	return (
		<mesh receiveShadow position={[position.x, y, position.z]} castShadow>
			<boxGeometry args={[size.x, size.y, size.z]}/>
			<meshStandardMaterial color="#999"/>
		</mesh>
	)
}

function Light(props) {
	return (
		<pointLight {...props} castShadow="true" distance="5"/>
	);
}


//
//function Box(props) {
//	// This reference will give us direct access to the mesh
//	const mesh = useRef()
//
//	// Set up state for the hovered and active state
//	const [hovered, setHover] = useState(false)
//	const [active, setActive] = useState(false)
//
//	// Rotate mesh every frame, this is outside of React without overhead
//	useFrame(() => {
//		mesh.current.rotation.x = mesh.current.rotation.y += 0.01
//	})
//
//	return (
//		<mesh
//			{...props}
//			ref={mesh}
//			scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
//			onClick={(event) => setActive(!active)}
//			onPointerOver={(event) => setHover(true)}
//			onPointerOut={(event) => setHover(false)}>
//			<boxBufferGeometry args={[1, 1, 1]}/>
//			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>
//		</mesh>
//	)
//}