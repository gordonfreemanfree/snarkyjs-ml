// This file helps to convert the weights to a scaled integer array
// The weights are scaled by 10^4
// The result is written to a js file
// This is done because we canot use floating point numbers in the snarky circuit

import { Field, isReady, UInt64 } from 'snarkyjs';
import { Int65 } from '../Int65_v4.js';
import fs from 'fs';
import { weights_l1, weights_l2 } from '../assets/weights.js';

await isReady;
function floatToScaledInt65(num: number, power: number = 4): number {
  let scale_factor = Math.pow(10, power);
  let scaled_num = Math.round(num * scale_factor);

  return scaled_num;
}

// the function reads the weights from the file and prints them to a new file
function readWeights(weigth_float: number[][]) {
  let weights = weigth_float;
  let scaled_weights: Array<Array<number>> = [[]];
  for (let i = 0; i < weights.length; i++) {
    scaled_weights[i] = new Array(weights[i].length);
    for (let j = 0; j < weights[i].length; j++) {
      scaled_weights[i][j] = floatToScaledInt65(weights[i][j]);
    }
  }
  return scaled_weights;
}

export function scaleImage(image: number[]): Int65[] {
  let scaled_image = new Array(image.length);
  for (let i = 0; i < image.length; i++) {
    scaled_image[i] = Int65.from(floatToScaledInt65(image[i]));
  }
  return scaled_image;
}

// write two scaled array to js file
function writeScaledArray(array: number[][], name: string) {
  let scaled_array = readWeights(array);
  fs.writeFileSync(
    name + '.js',
    'export const ' + name + ' = ' + JSON.stringify(scaled_array)
  );
}

console.log('writing weights to file');
writeScaledArray(weights_l1, 'weights_l1_scaled');
writeScaledArray(weights_l2, 'weights_l2_scaled');
console.log('done');

// // let scaled_weights = readWeights();
// console.log(scaled_weights.length);
// console.log(scaled_weights[0].length);
// console.log(scaled_weights[0][0].toString());
