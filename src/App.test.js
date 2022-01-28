import ReactDOM from "react-dom"
import React from "react"
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { Inspector } from "./App"

/*
 * See: https://create-react-app.dev/docs/running-tests
 */

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

	it("renders the supplied properties", () => {
		// Random dummy data just to satisfy the component
		const dummySelectedData = {
			properties: ["First", "Second"],
		}

		const comp = render(<Inspector selected={dummySelectedData} />)
		expect(comp.getByText("First")).toBeInTheDocument()
	})
})
