import * as React from "react"
import { render, screen } from "@testing-library/react"
import App from "../gala"

describe("App", () => {
  it("renders without crashing", async () => {
    const { getByText } = render(<App />)

    expect(getByText(/Fr. /i)).toBeInTheDocument()
  })
})
