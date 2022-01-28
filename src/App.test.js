import ReactDOM from "react-dom"
import React from "react"
import { Inspector } from "./App"

describe("The Inspector component", () => {
	it("renders without throwing", () => {
		// Random dummy data just to satisfy the component
		const dummySelectedData = {
			properties: ["First", "Second"],
		}

		// Render the component and fail if it throws
		const root = document.createElement("div")
		ReactDOM.render(<Inspector selected={dummySelectedData} />, root)
	})
})
