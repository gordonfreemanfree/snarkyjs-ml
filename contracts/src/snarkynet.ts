// Description: SnarkyNet class to run the model

export { SnarkyNet };

import { CircuitValue, Field, isReady } from 'snarkyjs';
import { InputImage } from './inputImage.js';
import { SnarkyLayer1, SnarkyLayer2 } from './snarkyLayer.js';
import { SnarkyTensor } from './snarkyTensor.js';

await isReady;

class SnarkyNet extends CircuitValue {
  layers: [SnarkyLayer1, SnarkyLayer2];

  constructor(layers: [SnarkyLayer1, SnarkyLayer2]) {
    super();

    // SnarkyLayers
    this.layers = layers; // SnarkyJS Layers
  }

  predict(inputs: InputImage): Field[] {
    console.log('in predict start');
    // Prediction method to run the model
    // Step 1. Convert initial inputs to a float
    let x = [inputs.value];
    console.log('in predict after num2Field_t2');
    // Step 2. Call the SnarkyLayers
    this.layers.forEach((layer) => (x = layer.call(x)));
    console.log('in predict after layers.forEach');
    // Step 3. Parse Classes
    // console.log('x is', x.toString());
    // console.log('x[0] is', x[0].toString());
    return x[0];
  }

  // parse_classes(x: Array<Field>): Field[] {
  //   console.log('in parse_classes after output');
  //   console.log(' - Results - ');
  //   for (let i = 0; i < x.length; i++) {
  //     console.log('Classification of', i, ': ', x[i].toString(), '%');
  //   }
  //   return x;
  // }
}
