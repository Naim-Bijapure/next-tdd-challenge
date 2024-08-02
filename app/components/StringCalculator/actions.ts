"use server";

export async function add(input: string): Promise<number> {
    // on false input value
    if (!input) return 0;
    // split all elements in a string
    const splittedInput = input.split("");

    // extract only numbers in the same order from splitted string array
    const extractedNumbers = extractNumbers(splittedInput);

    // perform filtering and mapping on extracted numbers
    const numbers = extractedNumbers
        .map((value) => (!isNaN(Number(+value)) ? +value : 0)) // ignore NaN values
        .filter((value) => value <= 1000); // ignore numbers bigger than 1000

    // if any negative number in input
    let negativeNumbers = numbers.filter((num) => num < 0);
    if (negativeNumbers.length > 0) {
        throw new Error(`negatives not allowed: ${negativeNumbers.join(", ")}`);
    }

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
    let isNegative = false;

    // iterate over all elements
    for (const char of arr) {
        if (char === "-") {
            isNegative = true;
        } else if (!isNaN(Number(char)) && char !== " " && char !== "\n" && char !== ",") {
            currentNumber += char;
        } else {
            if (currentNumber) {
                result.push(isNegative ? -Number(currentNumber) : Number(currentNumber));
                currentNumber = "";
                isNegative = false;
            }
        }
    }

    // If there's any remaining number in the string, add it to the result
    if (currentNumber) {
        result.push(isNegative ? -Number(currentNumber) : Number(currentNumber));
    }

    return result;
}
