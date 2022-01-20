import React, { useRef, useState, useReducer } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
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

function Viewport({ items, select }) {
	return (
		<Canvas className="viewport">
			<OrbitControls />
			<ambientLight intensity={0.1} />
			<pointLight position={[10, 10, 10]} />

			{/* Render all the items as models */}
			{items.map((item, index) => (
				<Model
					key={index}
					position={item.position}
					onClick={() => select(index)}
				/>
			))}
		</Canvas>
	)
}

function Inspector({ selected }) {
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
	console.log(action)
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
