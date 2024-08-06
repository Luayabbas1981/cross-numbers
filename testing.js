import {
  getRandomIntInclusive,
  generateRandomIntegers,
  calculateExpressions,
  isTargetValueReached,
  generateExpression,
  generateExpressionArray,
} from "./helper.js";

//testing
const randomInteger = getRandomIntInclusive(1, 99);
console.log({ randomInteger });

try {
  const randomIntegersArray = generateRandomIntegers(1, 99, 4);
  console.log({ randomIntegersArray }); //The output will be an array with 4 random integers between 1 and 99.
} catch (error) {
  console.error("Error generating random array:", error.message);
}

try {
  const expressions = ["+5", "-1", "*2", "/2"]; //4
  const calcExpression = calculateExpressions(expressions);
  console.log("5 - 1 * 2 / 2 = ", calcExpression);
} catch (error) {
  console.error("Error:", error.message);
}

try {
  const result1 = isTargetValueReached(5, 20, ["+5", "-3", "*2", "+6"]);
  console.log("Current Value:", result1.currentValue); //Current Value: 20
  console.log("Target Reached:", result1.targetReached); //Target Reached: false
} catch (error) {
  console.error("Error:", error.message);
}

try {
  const randomExpression = generateExpression(10, 20);
  console.log({ randomExpression }); // Output: Might be something like "-15" or "+8" depending on the random choices
} catch (error) {
  console.error("Error:", error.message);
}

try {
  const expressionArray1 = generateExpressionArray(1, 10, "", 3);
  console.log(expressionArray1); // Output: Will be something like { expressionArray: [ '+2', '+4', '*8' ], targetValue: 14 }
} catch (error) {
  console.error("Error:", error.message);
}

//testing so far
const startingValue1 = 1;
const maxValue = 10;
const operatorString1 = "";
const numExpression1 = 3;
let expressionArray1, targetValue1;

try {
  const expressions = generateExpressionArray(
    startingValue1,
    maxValue,
    operatorString1,
    numExpression1
  );
  expressionArray1 = expressions.expressionArray;
  targetValue1 = expressions.targetValue;
} catch (error) {
  console.error("Error:", error.message);
}
console.log({ expressionArray1, targetValue1 });
try {
  const isTargetValueReached1 = isTargetValueReached(
    startingValue1,
    targetValue1,
    expressionArray1
  );
  console.log(isTargetValueReached1); // Output: Will be something like { currentValue: 24, targetReached: true }
} catch (error) {
  console.error("Error:", error.message);
}
