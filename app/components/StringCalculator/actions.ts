"use server";

export async function add(input: string): Promise<number> {
    // on false input value
    if (!input) return 0;
    const numbers = extractNumbers(input.split(""));

    // if there is only single number input
    if (numbers.length === 1) return +numbers[0];

    // if multiple numbers input
    if (numbers.length > 1) {
        let sum = numbers.reduce((acc, num) => acc + +num, 0);
        return sum;
    }
    return 0;
}

function extractNumbers(arr: string[]): number[] {
    const result: number[] = [];
    let currentNumber = "";

    // iterate over all elements
    for (const char of arr) {
        if (!isNaN(Number(char)) && char !== " " && char !== "\n" && char !== ",") {
            currentNumber += char;
        } else {
            if (currentNumber) {
                result.push(Number(currentNumber));
                currentNumber = "";
            }
        }
    }

    // If there's any remaining number in the string, add it to the result
    if (currentNumber) {
        result.push(Number(currentNumber));
    }

    return result;
}
