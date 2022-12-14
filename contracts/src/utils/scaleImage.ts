import { Field, isReady, UInt64 } from 'snarkyjs';

import fs from 'fs';
// import { weights_l1, weights_l2 } from '../assets/weights_positiver_10x10.js';
import {
  image_0_label_7,
  image_1_label_2,
  image_2_label_1,
  image_3_label_0,
} from '../assets/test_images_10x10.js';

await isReady;
function floatToScaledField(num: number, power: number = 3): number {
  let scale_factor = Math.pow(10, power);
  let scaled_num = Math.round(num * scale_factor);

  return scaled_num;
}

// the function reads the weights from the file and prints them to a new file
function readWeights(weigth_float: number[]) {
  let weights = weigth_float;
  let scaled_weights: Array<number> = [];
  //   for (let i = 0; i < weights.length; i++) {
  //     scaled_weights[i] = new Array(weights[i].length);
  for (let j = 0; j < weights.length; j++) {
    scaled_weights[j] = floatToScaledField(weights[j]);
  }

  return scaled_weights;
}

export function scaleImage(image: number[]): Field[] {
  let scaled_image = new Array(image.length);
  for (let i = 0; i < image.length; i++) {
    scaled_image[i] = Field(floatToScaledField(image[i]));
    // scaled_image[i] = Field(image[i]);
  }
  return scaled_image;
}

// write two scaled array to js file
function writeScaledArray(array: number[], name: string) {
  let scaled_array = readWeights(array);
  fs.writeFileSync(
    name + '.js',
    'export const ' + name + ' = ' + JSON.stringify(scaled_array)
  );
}

console.log('writing weights to file');
// writeScaledArray(image_0_label_7, 'image_0_label_7');
writeScaledArray(image_1_label_2, 'image_1_label_2');
writeScaledArray(image_2_label_1, 'image_2_label_1');
writeScaledArray(image_3_label_0, 'image_3_label_0');

console.log('done');
