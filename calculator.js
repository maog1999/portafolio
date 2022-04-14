const data = [10, 5, 30, 25];

function sum(num1, num2){
    return num1 + num2;
}

function substract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

const firstData = data[0];

let sumTotal = firstData;
let subsTotal = firstData;
let multiplyTotal = firstData;
let divTotal = firstData;

data.forEach((number,index) => {
    if(index > 0){
        sumTotal = sum(sumTotal, number);
        subsTotal = substract(subsTotal, number);
        multiplyTotal = multiply(multiplyTotal, number);
        divTotal = divide(divTotal, number);
    }
})
console.log(sumTotal, subsTotal, multiplyTotal, divTotal);

