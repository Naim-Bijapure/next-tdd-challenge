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

    it("should return the number itself for a single number", async () => {
        setup("1");

        // Wait for the output to be displayed
        await waitFor(() => {
            expect(screen.getByTestId("output")).toBeInTheDocument();
        });

        // Check the output value
        expect(screen.getByTestId("output")).toHaveTextContent("Output: 1");
    });

    it("should return the sum of two numbers", async () => {
        setup("1,5");

        // Wait for the output to be displayed
        await waitFor(() => {
            expect(screen.getByTestId("output")).toBeInTheDocument();
        });

        // Check the output value
        expect(screen.getByTestId("output")).toHaveTextContent("Output: 6");
    });

    it("should return the sum of multiple numbers", async () => {
        const arr = [1, 2, 3, 5, 6, 10, 10, 30];
        const sum = arr.reduce((acc, num) => acc + num, 0);

        setup(arr.join(","));

        // Wait for the output to be displayed
        await waitFor(() => {
            expect(screen.getByTestId("output")).toBeInTheDocument();
        });

        // Check the output value
        expect(screen.getByTestId("output")).toHaveTextContent(`Output: ${sum}`);
    });

    it("should handle new lines between numbers", async () => {
        setup("1\n2,3");

        // Wait for the output to be displayed
        await waitFor(() => {
            expect(screen.getByTestId("output")).toBeInTheDocument();
        });

        // Check the output value
        expect(screen.getByTestId("output")).toHaveTextContent(`Output: 6`);
    });

    it("should support different delimiters", async () => {
        setup("//;\n1;2");

        // Wait for the output to be displayed
        await waitFor(() => {
            expect(screen.getByTestId("output")).toBeInTheDocument();
        });

        // Check the output value
        expect(screen.getByTestId("output")).toHaveTextContent(`Output: 3`);
    });

    it("should throws an exception for negative numbers", async () => {
        setup("1,-2,3");

        // Wait for the output to be displayed
        await waitFor(() => {
            expect(screen.getByTestId("error")).toBeInTheDocument();
        });

        // Check the output value
        expect(screen.getByTestId("error")).toHaveTextContent("Error: negatives not allowed: -2");
    });

    it("should throw an exception for multiple negative numbers", async () => {
        setup("1,-2,-45");

        // Wait for the output to be displayed
        await waitFor(() => {
            expect(screen.getByTestId("error")).toBeInTheDocument();
        });

        // Check the output value
        expect(screen.getByTestId("error")).toHaveTextContent("Error: negatives not allowed: -2, -45");
    });

    it("should ignore numbers bigger than 1000", async () => {
        setup("2,1001");

        // Wait for the output to be displayed
        await waitFor(() => {
            expect(screen.getByTestId("output")).toBeInTheDocument();
        });

        // Check the output value
        expect(screen.getByTestId("output")).toHaveTextContent(`Output: 2`);
    });

    it("should supports delimiters of any length", async () => {
        setup("//[***]\n1***2***33");

        // Wait for the output to be displayed
        await waitFor(() => {
            expect(screen.getByTestId("output")).toBeInTheDocument();
        });

        // Check the output value
        expect(screen.getByTestId("output")).toHaveTextContent(`Output: 36`);
    });

    it("should supports multiple delimiters", async () => {
        setup("//[*][%]\n1*2%3");

        // Wait for the output to be displayed
        await waitFor(() => {
            expect(screen.getByTestId("output")).toBeInTheDocument();
        });

        // Check the output value
        expect(screen.getByTestId("output")).toHaveTextContent(`Output: 6`);
    });

    it("should supports multiple delimiters with length longer than one char", async () => {
        setup("//[***][%%%]\n1***2%%%3");

        // Wait for the output to be displayed
        await waitFor(() => {
            expect(screen.getByTestId("output")).toBeInTheDocument();
        });

        // Check the output value
        expect(screen.getByTestId("output")).toHaveTextContent(`Output: 6`);
    });
});
