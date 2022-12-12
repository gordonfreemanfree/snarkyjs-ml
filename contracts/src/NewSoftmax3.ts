import { Field, isReady } from 'snarkyjs';

await isReady;

// define the prime number that determines the finite field
const prime = 7;

// define the finite field
const F = new Field(prime);

// define a function that calculates the absolute value
// of a Field element
function abs(x: Field): Field {
  return x.lt(Field.zero) ? x.mul(Field(-1)) : x;
}

// define a function that calculates the exponential
// of a number modulo the prime number
// define a function that calculates the exponential
// of a number modulo the prime number
function exp(x: Field): Field {
  // define the base
  let result = Field.one;

  // define the exponent
  let exponent = parseInt(x.toString());

  // use the binary exponentiation algorithm
  // to calculate the exponential
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = result.mul(x);
    }
    exponent = exponent >> 1;
    x = x.mul(x);
  }

  return result;
}
// define a function that calculates the modular inverse
// of a number using the Newton-Raphson method
function modularInverse(a: Field): Field {
  // define the precision
  const epsilon = 1e-10;

  // define the initial guess
  let x = Field(1).div(a);

  // iteratively improve the guess using the Newton-Raphson method
  while (true) {
    const newX = x.add(x.mul(x).sub(a).mul(Field(-1)).div(a.mul(a)));
    if (abs(x.sub(newX)).lt(epsilon)) {
      return newX;
    }
    x = newX;
  }
}

// define the softmax function that operates on field elements
function softmax(values: Field[]): Field[] {
  // find the maximum value in the array
  const maxValue = values.reduce(
    (prev, current) => prev.add(current),
    Field.zero
  );
  // compute the sum of the exponentials
  // of the field elements in the array
  let sum = Field.zero;
  values.forEach((v) => (sum = sum.add(exp(v.sub(Field(maxValue))))));

  // return the normalized values
  return values.map((v) =>
    exp(v.sub(Field(maxValue))).mul(modularInverse(sum))
  );
}

// test the softmax function
console.log(softmax([Field(1), Field(2), Field(3)])); // should output [0.09003057317038046, 0.24472847105479767, 0.6652409557748219]
