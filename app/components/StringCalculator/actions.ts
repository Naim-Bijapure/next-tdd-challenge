"use server";

export async function add(input: string): Promise<number> {
    // on false input value
    if (!input) {
        return 0;
    }
    const numbers = input.split(",");

    // if there is only single number input
    if (numbers.length === 1) {
        return +numbers[0];
    }

    // if multiple numbers input
    if (numbers.length > 1) {
        let sum = numbers.reduce((acc, num) => acc + +num, 0);
        return sum;
    }
    return 0;
}
