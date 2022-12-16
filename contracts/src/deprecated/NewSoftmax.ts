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

// // define a function that calculates the modular inverse
// // of a number using the extended Euclidean algorithm
// // function modularInverse(a: Field): [Field, Field] {
// //   if (a.equals(Field.zero)) {
// //     return [Field.one, Field.zero];
// //   }

// //   // instead of using Math.floor, we can simply divide
// //   // the prime by the divisor and round down to the nearest integer
// //   // using the bitwise OR operator with 0
// //   const div = Field((prime / parseInt(a.toString())) | 0);

// //   const [x, y] = modularInverse(a.add(Field(prime)));
// //   return [y, y.sub(x.mul(div))];
// // }
// function modularInverse(a: Field): Field {
//   // define the precision
//   const epsilon = 1e-10;

//   // define the initial guess
//   let x = Field(1).div(a);

//   // iteratively improve the guess using the Newton-Raphson method
//   while (true) {
//     const newX = x.add(x.mul(x).sub(a).mul(Field(-1)).div(a.mul(a)));
//     if (x.sub(newX).abs().lt(epsilon)) {
//       return newX;
//     }
//     x = newX;
//   }
// }

// // define

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
//     exp(v.sub(Field(maxValue))).mul(modularInverse(sum)[0])
//   );
// }

// // test the softmax function
// console.log(softmax([Field(1), Field(2), Field(3)])); // should output [0.09003057317038046, 0.24472847105479767, 0.6652409557748219]
