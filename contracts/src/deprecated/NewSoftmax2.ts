import { Field, isReady } from 'snarkyjs';

// await isReady;

// // define the prime number that determines the finite field
// const prime = 7;

// // define the finite field
// const F = new Field(prime);

// // define a function that calculates the exponential
// // of a number modulo the prime number
// function exp(x: Field): Field {
//   let result = Field.one;
//   for (let i = 0; i < parseInt(x.toString()); i++) {
//     result = result.mul(x);
//   }
//   return result;
// }

// // define a function that calculates the absolute value
// // of a Field element
// function abs(x: Field): Field {
//   if (x.lt(Field.zero)) {
//     return x.neg();
//   }
//   return x;
// }

// // define a function that calculates the modular inverse
// // of a number using the Extended Euclidean algorithm
// // define a function that calculates the modular inverse
// // of a number using the Extended Euclidean algorithm
// function modularInverse(a: Field): Field {
//   // define the base field
//   const baseField = new Field(2);

//   // calculate the modular inverse using the Extended Euclidean algorithm
//   let s = Field.zero;
//   let oldS = Field.one;
//   let t = Field.one;
//   let oldT = Field.zero;
//   let r = a;
//   let oldR = prime;
//   while (!r.equals(Field.zero)) {
//     const quotient = oldR.div(r);
//     [oldR, r] = [r, oldR.sub(quotient.mul(r))];
//     [oldS, s] = [s, oldS.sub(quotient.mul(s))];
//     [oldT, t] = [t, oldT.sub(quotient.mul(t))];
//   }

//   // return the modular inverse
//   return oldS.mul(Field.pow(prime.sub(Field.two)));
// }

// // define the softmax function that operates on field elements
// function softmax(values: Field[]): Field[] {
//   // find the maximum value in the array
//   const maxValue = values.reduce(
//     (prev, current) => prev.add(current),
//     Field.zero
//   );
//   // compute the sum of the exponentials
//   // of the field elements in the array
//   let sum = Field.zero;
//   values.forEach((v) => (sum = sum.add(exp(v.sub(Field(maxValue))))));

//   // return the normalized values
//   return values.map((v) =>
//     exp(v.sub(Field(maxValue))).mul(modularInverse(sum))
//   );
// }

// // test the softmax function
// console.log(softmax([Field(1), Field(2), Field(3)])); // should output [0.09003057317038046, 0.24472847105479767, 0.6652409557748219]
