import { isReady, Field } from 'snarkyjs';
import {
  image_a_7,
  image_b_2,
  image_c_1,
  image_d_0,
  image_e_4,
  image_f_1,
  image_g_4,
  image_h_9,
  image_i_5,
  image_j_9,
} from './assets/example_images.js';

import {
  image_0_label_7,
  image_1_label_2,
  image_2_label_1,
  image_3_label_0,
  image_4_label_4,
  image_5_label_1,
  image_6_label_4,
  image_7_label_9,
  image_9_label_9,
  image_10_label_0,
  image_11_label_6,
  image_12_label_9,
  image_13_label_0,
  image_14_label_1,
  image_15_label_5,
  image_16_label_9,
  image_17_label_7,
  image_18_label_3,
  image_19_label_4,
} from './assets/test_images_10x10.js';

import { SnarkyLayer, SnarkyNet } from './snarkynet.js';
import { weights_l1 } from './assets/weights_l1_scaled_3.js';
import { weights_l2 } from './assets/weights_l2_scaled_3.js';
import { num2Field_t2 } from './utils/scaledWeights2Int65.js';
import { scaleImage } from './utils/preprocessingWeightsFloat2Int.js';
await isReady;

function preprocessWeights(weightsScaled: number[][]): Array<Field>[] {
  const weights_l1_preprocessed = num2Field_t2(weightsScaled);
  // const weights_l2_preprocessed = await num2Field_t2(weights_l2);
  return weights_l1_preprocessed;
}

export async function createLayers() {
  await isReady;
  let weights_l1_Field = preprocessWeights(weights_l1);
  let weights_l2_Field = preprocessWeights(weights_l2);
  let layers = [
    new SnarkyLayer(weights_l1_Field, 'relu'),
    new SnarkyLayer(weights_l2_Field, 'softmax'),
  ];
  // console.log(layers);
  console.log('length of layers: ' + layers.length);
  // log the weights of the first layer
  console.log('weights of first layer: ' + layers[0].weights.length);
  // log the weights of the second layer
  console.log('weights of second layer: ' + layers[1].weights.length);
  // log the length of the first element of the first layer
  console.log('first element of first layer: ' + layers[0].weights[0].length);
  // log the length of the first element of the second layer
  console.log('first element of second layer: ' + layers[1].weights[0].length);
  // print the first element of the first layer
  console.log('first element of first layer: ' + layers[0].weights[0]);
  // print the first element of the second layer
  console.log('first element of second layer: ' + layers[1].weights[0]);
}

export async function generateModel() {
  await isReady;
  // get current time
  let startTime = new Date().getTime() / 1000;
  console.log('Ready');
  // weights for the model
  console.log('Create Layers', new Date().getTime() / 1000 - startTime);
  let layers = [
    new SnarkyLayer(preprocessWeights(weights_l1), 'relu'),
    new SnarkyLayer(preprocessWeights(weights_l2), 'softmax'),
  ];

  // create an instance of the model
  console.log('Create zkapp Instance', new Date().getTime() / 1000 - startTime);
  let model = new SnarkyNet(layers);
  console.log('model created', new Date().getTime() / 1000 - startTime);
  console.log(SnarkyNet);

  // predict the first image
  let startPrediction = new Date().getTime() / 1000;
  model.predict([scaleImage(image_0_label_7)]);
  console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
  console.log('Expecting to be 7');
  //   model.predict([image_b_2]);

  startPrediction = new Date().getTime() / 1000;
  model.predict([scaleImage(image_2_label_1)]);
  console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
  console.log('Expecting to be 1');

  startPrediction = new Date().getTime() / 1000;
  model.predict([scaleImage(image_3_label_0)]);
  console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
  console.log('Expecting to be 0');

  startPrediction = new Date().getTime() / 1000;
  model.predict([scaleImage(image_4_label_4)]);
  console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
  console.log('Expecting to be 4');

  startPrediction = new Date().getTime() / 1000;
  model.predict([scaleImage(image_5_label_1)]);
  console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
  console.log('Expecting to be 1');

  // startPrediction = new Date().getTime() / 1000;
  // model.predict([scaleImage(image_f_1)]);
  // console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
  // console.log('Expecting to be 1');

  // startPrediction = new Date().getTime() / 1000;
  // model.predict([scaleImage(image_g_4)]);
  // console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
  // console.log('Expecting to be 4');

  // startPrediction = new Date().getTime() / 1000;
  // model.predict([scaleImage(image_h_9)]);
  // console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
  // console.log('Expecting to be 9');
}

// local deployment of smart_snarkynet
// function deploySmartSnarkyNet() {
//   let startTime = new Date().getTime() / 1000;
//   console.log('Ready');
//   // weights for the model
//   console.log('Create Layers', new Date().getTime() / 1000 - startTime);
//   let layers = [
//     new SnarkyLayer(preprocessWeights(weights_l1), 'relu'),
//     new SnarkyLayer(preprocessWeights(weights_l2), 'softmax'),
//   ];

//   // create an instance of the model
//   console.log('Create zkapp Instance', new Date().getTime() / 1000 - startTime);
//   let model = new SnarkyNet(layers);
//   console.log('model created', new Date().getTime() / 1000 - startTime);
//   console.log(SnarkyNet);

//   // deploy the contract locally
//   console.log('Deploying Smart SnarkyNet');
//   // array<T>(elementType, length): Provable<T[]>
//   // let weights_l1_array = array(Field, 784 * 16);
// }

console.log('Start');
// await runSnarkNet();
await createLayers();
await generateModel();

console.log('End');
