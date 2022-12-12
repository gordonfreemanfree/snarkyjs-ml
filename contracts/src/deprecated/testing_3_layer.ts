import { isReady } from 'snarkyjs';
// import { SnarkyLayer, SnarkyNet } from './snarkynet.js';

// import {
//   weights_l1,
//   weights_l2,
//   weights_l3,
// } from './assets/3_layer_weights.js';

// import {
//   image_0_label_7,
//   image_1_label_2,
//   image_2_label_1,
//   image_3_label_0,
//   image_4_label_4,
//   image_5_label_1,
//   image_6_label_4,
//   image_7_label_9,
//   image_9_label_9,
//   image_10_label_0,
//   image_8_label_5,
//   image_11_label_6,
// } from './assets/image_test_snarky_nn.js';

// await isReady;

// export async function createLayers() {
//   await isReady;
//   let layers = [
//     new SnarkyLayer(weights_l1, 'relu'),
//     new SnarkyLayer(weights_l2, 'relu'),
//     new SnarkyLayer(weights_l3, 'softmax'),
//   ];
//   // console.log(layers);
//   console.log('length of layers: ' + layers.length);
//   // log the weights of the first layer
//   console.log('weights of first layer: ' + layers[0].weights.length);
//   // log the weights of the second layer
//   console.log('weights of second layer: ' + layers[1].weights.length);
//   // log the weights of the third layer
//   console.log('weights of third layer: ' + layers[2].weights.length);
//   // log the length of the first element of the first layer
//   console.log('first element of first layer: ' + layers[0].weights[0].length);
//   // log the length of the first element of the second layer
//   console.log('first element of second layer: ' + layers[1].weights[0].length);
//   // log the length of the first element of the third layer
//   console.log('first element of third layer: ' + layers[2].weights[0].length);
//   // print the first element of the first layer
//   console.log('first element of first layer: ' + layers[0].weights[0]);
//   // print the first element of the second layer
//   console.log('first element of second layer: ' + layers[1].weights[0]);
// }

// export async function generateModel() {
//   await isReady;
//   // get current time
//   let startTime = new Date().getTime() / 1000;
//   console.log('Ready');
//   // weights for the model
//   console.log('Create Layers', new Date().getTime() / 1000 - startTime);
//   let layers = [
//     new SnarkyLayer(weights_l1, 'relu'),
//     new SnarkyLayer(weights_l2, 'relu'),
//     new SnarkyLayer(weights_l3, 'tayler'),
//   ];

//   // create an instance of the model
//   console.log('Create zkapp Instance', new Date().getTime() / 1000 - startTime);
//   let model = new SnarkyNet(layers);
//   console.log('model created', new Date().getTime() / 1000 - startTime);
//   console.log(SnarkyNet);

//   // predict the first image
//   let startPrediction = new Date().getTime() / 1000;
//   model.predict([image_0_label_7]);
//   console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
//   console.log('Expecting to be 7');
//   //   model.predict([image_b_2]);

//   startPrediction = new Date().getTime() / 1000;
//   model.predict([image_2_label_1]);
//   console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
//   console.log('Expecting to be 1');

//   startPrediction = new Date().getTime() / 1000;
//   model.predict([image_3_label_0]);
//   console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
//   console.log('Expecting to be 0');

//   startPrediction = new Date().getTime() / 1000;
//   model.predict([image_4_label_4]);
//   console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
//   console.log('Expecting to be 4');

//   startPrediction = new Date().getTime() / 1000;
//   model.predict([image_5_label_1]);
//   console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
//   console.log('Expecting to be 1');

//   startPrediction = new Date().getTime() / 1000;
//   model.predict([image_6_label_4]);
//   console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
//   console.log('Expecting to be 4');

//   startPrediction = new Date().getTime() / 1000;
//   model.predict([image_7_label_9]);
//   console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
//   console.log('Expecting to be 9');

//   startPrediction = new Date().getTime() / 1000;
//   model.predict([image_8_label_5]);
//   console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
//   console.log('Expecting to be 5');

//   startPrediction = new Date().getTime() / 1000;
//   model.predict([image_9_label_9]);
//   console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
//   console.log('Expecting to be 9');

//   startPrediction = new Date().getTime() / 1000;
//   model.predict([image_10_label_0]);
//   console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
//   console.log('Expecting to be 0');

//   startPrediction = new Date().getTime() / 1000;
//   model.predict([image_11_label_6]);
//   console.log('Predict took:', new Date().getTime() / 1000 - startPrediction);
//   console.log('Expecting to be 6');
// }

// console.log('Start');
// await createLayers();
// await generateModel();
// console.log('End');
