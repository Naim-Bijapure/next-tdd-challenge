import { add } from "../actions";

describe("String Calculator:add", () => {
    it("should return 0 for an empty string", async () => {
        expect(await add("")).toBe(0);
    });

    it("should return the number itself for a single number", async () => {
        expect(await add("1")).toBe(1);
    });

    it("should return the sum of two numbers", async () => {
        expect(await add("1,5")).toBe(6);
    });

    it("should return the sum of multiple numbers", async () => {
        const arr = [1, 2, 3, 5, 6, 10, 10, 30];
        const sum = arr.reduce((acc, num) => acc + num, 0);
        expect(await add(arr.join(","))).toBe(sum);
    });

    it("should handle new lines between numbers", async () => {
        expect(await add("1\n2,3")).toBe(6);
    });

    it("should support different delimiters", async () => {
        expect(await add("//;\n1;2")).toBe(3);
    });

    it("should throws an exception for negative numbers", async () => {
        await expect(add("1,-2,3")).rejects.toThrow("negatives not allowed: -2");
    });

    it("should throw an exception for multiple negative numbers", async () => {
        await expect(add("1,-2,-45")).rejects.toThrow("negatives not allowed: -2, -45");
    });
});
