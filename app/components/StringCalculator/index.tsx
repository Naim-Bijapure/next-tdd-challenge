"use client";

import React, { useState } from "react";
import { add } from "./actions";

export default function Home() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const result: any = await add(input);
            setOutput(result);
            setError(null);
        } catch (err: any) {
            setError(err.message);
            setOutput(null);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="font-bold m-2">String Calculator TDD</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter numbers"
                    rows={5}
                    cols={40}
                    data-testid="numbers-input"
                    className="textarea textarea-bordered"
                />
                <button type="submit" data-testid="calculate-button" className="btn btn-primary m-2">
                    Calculate
                </button>
            </form>

            {output !== null && <div data-testid="output">Output: {output}</div>}
            {error && (
                <div style={{ color: "red" }} data-testid="error">
                    Error: {error}
                </div>
            )}
        </div>
    );
}