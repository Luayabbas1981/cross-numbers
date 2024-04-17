// function generates a random integer between min (inclusive) and max (inclusive).
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//testing
//console.log(getRandomIntInclusive(1, 99));  //The output will be a random integer between  1 and 99.


// function generates a random array of `count` integers between min and max (inclusive).
function generateRandomIntegers(min, max, count) {
    if (count < 1 || count > 10 || min > max) {
        throw new Error("Invalid arguments: count must be between 1 and 10, min must be less than or equal to max");
    }
    const randomIntegersArray = [];
    for (let i = 0; i < count; i++) {
        randomIntegersArray.push(getRandomIntInclusive(min, max));
    }
    return randomIntegersArray;
}
//testing
// try {
//     // const randomIntegersArray1 = generateRandomIntegers(5, 10, 3);
//     // console.log(randomIntegersArray1); //The output will be an array with three random integers between 5 and 10.

//     // const randomIntegersArray2 = generateRandomIntegers(15, 6, 4);
//     // console.log(randomIntegersArray2); //Error generating random array: Invalid arguments: count must be between 1 and 10, min must be less than or equal to max

//     // const randomIntegersArray3 = generateRandomIntegers(1, 15, 0);
//     // console.log(randomIntegersArray3); //Error generating random array: Invalid arguments: count must be between 1 and 10, min must be less than or equal to max

// } catch (error) {
//     console.error("Error generating random array:", error.message);
// }


//function takes an array of strings representing arithmetic expressions and returns the final calculated result. 
function calculateExpressions(expressions) {
    // Check if expressions is an array
    if (!Array.isArray(expressions)) {
        throw new Error("Input must be an array of expressions");
    }
    let result = 0;
    for (const expression of expressions) {
        // Validate expression format (+-*/ followed by a number)
        const match = expression.match(/([+\-*\/])(\d+)/);
        if (!match) {
            throw new Error("Invalid expression format. Use operators (+-*/) followed by a number.");
        }

        const operator = match[1];
        const operand = parseInt(match[2]);

        switch (operator) {
            case "+":
                result += operand;
                break;
            case "-":
                result -= operand;
                break;
            case "*":
                result *= operand;
                break;
            case "/":
                if (operand === 0) {
                    throw new Error("Division by zero is not allowed");
                }
                result /= operand;
                break;
        }
    }
    return result;
}
// testing
// try {
//     // const expressions1 = ["+5", "-1", "*2", "/2"]; //4
//     // const expressions2 = 5 //Error: Input must be an array of expressions
//     // const expressions3 = ["5"] //Error: Invalid expression format. Use operators (+-*/) followed by a number.
//     // const expressions4 = ["/0"] //Error: Division by zero is not allowed

//     // const result = calculateExpressions(expressions1);
//     // console.log(result);
// } catch (error) {
//     console.error("Error:", error.message);
// }


//function takes three arguments and returns an object containing information about reaching a target value using a series of arithmetic expressions:
//startingValue (integer): This represents the initial value to begin calculations with. It must be between 1 and 99 (inclusive).
//targetValue (integer): This represents the desired final value to reach. It must also be between 1 and 99 (inclusive).
//expressions (array of strings): This is an array containing strings representing simple arithmetic expressions. Each expression should follow the format "operator + operand" where the operator can be +, -, *, or / and the operand is a number.
function isTargetValueReached(startingValue, targetValue, expressions) {
    // Validate arguments
    if (startingValue < 1 || startingValue > 99 ||
        targetValue < 1 || targetValue > 99 ||
        !Array.isArray(expressions)) {
        throw new Error("Invalid arguments: startingValue (1-99), targetValue (1-99), expressions (array)");
    }
    let newExpression = "+" + startingValue;
    expressions.unshift(newExpression);
    let currentValue = calculateExpressions(expressions);
    let targetReached = currentValue === targetValue;

    return {
        currentValue,
        targetReached
    };
}
//testing
// try {
//     // const result1 = isTargetValueReached(5, 20, ["+5", "-3", "*2"]);
//     // console.log("Current Value:", result1.currentValue); //Current Value: 14
//     // console.log("Target Reached:", result1.targetReached); //Target Reached: false

//     // const result2 = isTargetValueReached(1, 18, ["+6", "*5", "-17"]);
//     // console.log("Current Value:", result2.currentValue); //Current Value: 18
//     // console.log("Target Reached:", result2.targetReached); //Target Reached: true
// } catch (error) {
//     console.error("Error:", error.message);
// }

// function generates a mathematical expression string with a single operand. The operand value falls within the range specified by `startingValue` and `maxValue`. It allows choosing an operator either randomly from (+, -, *, /) or by specifying it through an optional `operatorString` parameter.
function generateExpression(startingValue, maxValue, operatorString) {
    const operators = ["+", "-", "*", "/"];
    // Generate random number between startingValue and maxValue (inclusive)
    const operand = getRandomIntInclusive(startingValue, maxValue);
    const operatorIndex = Math.floor(Math.random() * operators.length);
    if (operatorString) {
        const match = operatorString.match(/[+\-*\/]/);
        if (!match) {
            throw new Error("Invalid operator format. Use operators (+-*/)");
        }
    }
    const operator = operatorString ? operatorString : operators[operatorIndex];
    return `${operator}${operand}`;
}
//testing
// try {
//     // const expression1 = generateExpression(10, 20);
//     // console.log(expression1);  // Output: Might be something like "-15" or "+8" depending on the random choices

//     // const expression2 = generateExpression(5, 12, "*");
//     // console.log(expression2);  // Output: Will always be something like "*7" because the operator is specified

//     // const expression3 = generateExpression(5, 12, "f");
//     // console.log(expression3);  // Output: Error: Invalid operator format. Use operators (+-*/)
// } catch (error) {
//     console.error("Error:", error.message);
// }

// This function generates a random math expression array that evaluates to a specific target value. It keeps trying until it finds a valid set of expressions.
function generateExpressionArray(startingValue, maxValue, operatorString, numExpression = 1) {
    let expressionArray = [];
    for (let i = 0; i < numExpression; i++) {
        const expression = generateExpression(startingValue, maxValue, operatorString);
        expressionArray.push(expression);
    }
    let newExpression = "+" + startingValue;
    const targetValue = calculateExpressions([newExpression, ...expressionArray]);

    if (targetValue > startingValue && targetValue < 100 && Number.isInteger(targetValue) && expressionArray.length === numExpression) {
        // console.log({
        //     expressionArray,
        //     targetValue
        // });
        //shuffle expression array to make it more challenging
        expressionArray.sort(() => Math.random() - 0.5);
        return {
            expressionArray,
            targetValue
        }
    }
    return generateExpressionArray(startingValue, maxValue, operatorString, numExpression);
}
//testing
// try {
//     // const expressionArray1 = generateExpressionArray(1, 10, "", 3);
//     // console.log(expressionArray1); // Output: Will be something like { expressionArray: [ '+2', '+4', '*8' ], targetValue: 14 }

//     // const expressionArray2 = generateExpressionArray(5, 10, "+", 4);
//     // console.log(expressionArray2); // Output: Will be something like { expressionArray: [ '+5', '+7', '+10', '+9' ], targetValue: 36 }

//     // const expressionArray3 = generateExpressionArray(1, 10, "a", 3);  
//     // console.log(expressionArray3); // Output: Error: Invalid operator format. Use operators (+-*/)
// } catch (error) {
//     console.error("Error:", error.message);
// }


export {
    getRandomIntInclusive,
    generateRandomIntegers,
    calculateExpressions,
    isTargetValueReached,
    generateExpression,
    generateExpressionArray,
}