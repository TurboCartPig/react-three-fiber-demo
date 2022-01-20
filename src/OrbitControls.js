import React, { useRef } from "react"
import { extend, useThree, useFrame } from "@react-three/fiber"
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls"

/**
 * This is mostly copied from: https://codeworkshop.dev/blog/2020-04-03-adding-orbit-controls-to-react-three-fiber/
 */

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls: ThreeOrbitControls })

function OrbitControls() {
	// Get a reference to the Three.js Camera, and the canvas html element.
	// We need these to setup the OrbitControls component.
	// https://threejs.org/docs/#examples/en/controls/OrbitControls
	const {
		camera,
		gl: { domElement },
	} = useThree()

	// Ref to the controls, so that we can update them on every frame using useFrame
	const controls = useRef()
	useFrame(() => controls.current.update())

	return <orbitControls ref={controls} args={[camera, domElement]} />
}

export default OrbitControls
