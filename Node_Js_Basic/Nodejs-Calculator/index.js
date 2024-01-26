// index.js

const crypto = require("crypto");
const operation = process.argv[2];
const num1 = process.argv[3];
const num2 = process.argv[4];

//  import the crypto module

function add(num1, num2) {
  return +num1 + +num2;
}
function sub(num1, num2) {
  return +num1 - +num2;
}
function mult(num1, num2) {
  return +num1 * +num2;
}
function divide(num1, num2) {
  return +num1 / +num2;
}

//  get a commands using process.argv

// complete the  function

switch (operation) {
  case "add":
    console.log(add(num1, num2));
    break;
  case "sub":
    console.log(sub(num1, num2));
    break;
  case "mult":
    console.log(mult(num1, num2));
    break;
  case "divide":
    console.log(divide(num1, num2));
    break;
  case "sin":
    console.log(Math.sin(num1));
    break;
  case "cos":
    console.log(Math.cos(num1));
    break;
  case "tan":
    console.log(Math.tan(num1));
    break;
  case "random":
    if(!num1){
      console.log("Provide length for random number generation.")
    }
    const newRandomNum = crypto.randomBytes(+num1);
    const number = newRandomNum.toString("binary");
    console.log(number)
    break;

  default:
    console.log("Invalid operation");
}
