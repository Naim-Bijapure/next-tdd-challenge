import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../index";

// reused test cases from backend tests
describe("String Calculator:index", () => {
    const setup = (inputValue: string) => {
        render(<Home />);
        const textarea = screen.getByTestId("numbers-input");
        const button = screen.getByTestId("calculate-button");

        // Simulate user input
        fireEvent.change(textarea, { target: { value: inputValue } });

        // Simulate form submission
        fireEvent.click(button);
    };


	it("should return 0 for an empty string", async () => {
		setup("");

		// Wait for the output to be displayed
		await waitFor(() => {
			expect(screen.getByTestId("output")).toBeInTheDocument();
		});


		// Check the output value
		expect(screen.getByTestId("output")).toHaveTextContent("Output: 0");
	});

});
