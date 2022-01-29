import React, { Suspense, useReducer, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, useProgress } from "@react-three/drei"
import damagedHelmet from "./DamagedHelmet.gltf"
import "./styles.css"

function Model(props) {
	// Ref with access to the THREE.Mesh object
	const meshRef = useRef()

	const [hovered, setHovered] = useState(false)

	useFrame((state, delta) => {
		meshRef.current.rotation.x += delta * 2.0
	})

	return (
		<mesh
			{...props}
			ref={meshRef}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "orange" : "blue"} />
		</mesh>
	)
}

function Scene(props) {
	const model = useGLTF(damagedHelmet)

	return <primitive position={[2.0, 0.0, 0.0]} object={model.scene} />
}

function Loading() {
	const { progress } = useProgress()

	return (
		<div style={{ width: "100%" }} className="viewport">
			<h1>Loading...</h1>
			<p style={{ textAlign: "center" }}>Progress: {progress}%</p>
		</div>
	)
}

function Viewport({ items, select }) {
	return (
		<Suspense fallback={<Loading />}>
			<Canvas className="viewport">
				<OrbitControls />
				<ambientLight intensity={0.1} />
				<pointLight position={[10, 10, 10]} />

				<Scene />

				{/* Render all the items as models */}
				{items.map((item, index) => (
					<Model
						key={index}
						position={item.position}
						onClick={() => select(index)}
					/>
				))}
			</Canvas>
		</Suspense>
	)
}

export function Inspector({ selected }) {
	return (
		<aside>
			<h1>Properties</h1>
			<ul>
				{selected.properties.map((e) => (
					<li key={e}>{e}</li>
				))}
			</ul>
		</aside>
	)
}

const items = [
	{
		position: [0.0, -1.0, 0.0],
		properties: ["Weight", "Mass", "Volume", "Speed"],
	},
	{
		position: [0.0, 1.0, 0.0],
		properties: ["Seriousness", "Novelty", "Buzzwordiness"],
	},
]

const initialState = {
	selected: 0,
}

function reducer(state, action) {
	switch (action.type) {
		case "select":
			return { selected: action.value }
		default:
			throw new Error("Invalid reducer")
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<div className="container-row">
			<Inspector selected={items[state.selected]} />
			<Viewport
				items={items}
				select={(index) => dispatch({ type: "select", value: index })}
			/>
		</div>
	)
}

export default App
