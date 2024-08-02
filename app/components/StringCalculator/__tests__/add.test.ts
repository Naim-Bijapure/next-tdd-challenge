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
});
