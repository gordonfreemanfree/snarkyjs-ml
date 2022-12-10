// Description: SnarkyNet and SnarkyLayers allow for the implementation of a SnarkyJS
// version of a Deep Neural Network.
// SnarkyLayers are defined to represent the Dense Neural Network layers combined in
// SnarkyNet for prediction.

export { SnarkyLayer, SnarkyNet };

import {
  method,
  Circuit,
  Bool,
  Field,
  isReady,
  Sign,
  UInt64,
  CircuitValue,
  matrixProp,
} from 'snarkyjs';

import { SnarkyTensor } from './snarky_tensor.js';
import { Int65 } from './Int65_v4.js';

await isReady;
// create a layer
class SnarkyLayer extends SnarkyTensor {
  @matrixProp(Int65, 784, 128) weights: Array<Int65>[]; // weights
  activation: Function; // activation function
  alpha: Int65; // alpha value for leaky relu / it is scaled by 1000
  decimal: number; // multiplier for decimals
  zero: Int65; // zero

  constructor(
    weights: Array<Int65>[],
    activation = 'relu', // default activation function
    alpha = Int65.from(10) // alread scaled by 1000
  ) {
    super();

    // Activation Function
    this.activation = this.activation_selection(activation);

    // Set alpha
    // this.alpha = this.num2int65(alpha);
    this.alpha = alpha;

    // Weights
    this.weights = weights;
  }

  call(input: Array<Int65>[]): Array<Int65>[] {
    console.log('in the call function');
    // Dense layer implementation
    // Equivalent: output = activation( dot( input, weight ) )
    return this.activation_t2(this.dot_product_t2(input, this.weights));
  }

  // Select Activation Function
  activation_selection(activation: string): Function {
    // Select the activation function
    if (activation == 'relu') {
      return this.relu_t1;
    } // RelU Activation Function
    else if (activation == 'relu_leaky') {
      return this.relu_leaky_t1;
    } // Leaky RelU Activation Function
    else if (activation == 'softmax') {
      return this.softmax_t1;
    } // Softmax Activation Function
    else if (activation == 'tayler') {
      return this.tayler;
    } else {
      throw Error('Activation Function Not Valid');
    } // Invalid Activation Function
  }

  // Activation
  activation_t2(x: Array<Int65>[]): Array<Int65>[] {
    console.log('in the activation_t2 function');
    // Applying activation functions for a rank 2 tensor
    let result = Array();
    x.forEach((value, index) => (result[index] = this.activation(value)));
    return result;
  }

  // Activation Functions (implemented for rank 1 tensors)
  relu_t1(x: Array<Int65>): Array<Int65> {
    // RelU implementation for an Array
    // Equivalent: result = max( x, 0 )
    let result = Array();
    x.forEach(
      (value, i) =>
        (result[i] = Circuit.if(
          value.sgn.equals(Sign.one).toBoolean(),
          value,
          Int65.zero
        ))
    );
    return result;
  }

  relu_leaky_t1(x: Array<Int65>): Array<Field> {
    // Leaky RelU implementation for an Array
    let result = Array();
    x.forEach(
      (value, i) =>
        (result[i] = Circuit.if(
          value.sgn.equals(Sign.one).toBoolean(),
          value,
          value.mul(this.alpha)
        ))
    );
    return result;
  }

  softmax_t1(x: Array<Int65>): Array<Int65> {
    // Softmax Implementation for an Array
    console.log('in the softmax_t1 function');
    let sum = Int65.zero;
    let result = Array<Int65>();
    // Equivalent: result = x / ( x1 + .. + xn )
    console.log('x before is', x.toString());
    // preventing overflow
    let reduced_x = Array<Int65>();
    x.forEach((value, i) => (reduced_x[i] = value.div(Int65.from(1000))));
    console.log('x after overflow prevention is', reduced_x.toString());
    reduced_x.forEach((value) => console.log(this.exp(value).toString()));
    console.log('x after exp is', reduced_x.toString());

    // result returned as percentage
    reduced_x.forEach((value) => (sum = sum.add(this.exp(value))));
    console.log('sum is', sum.toString());
    // reduced_x.forEach(
    //   (value, i) => (result[i] = this.exp(value).div(sum).mul(Int65.from(100))) // percentage
    // );
    reduced_x.forEach(
      (value, i) =>
        (result[i] = this.exp(value).divRest(sum).mul(Int65.from(100))) // percentage
    );
    console.log('result is', result.toString());
    return result;
  }

  tayler(x: Array<Int65>): Array<Int65> {
    console.log('taylor_softmax_manual_typescript');
    var fn: Array<Int65> = [
      new Int65(new UInt64(1), Sign.one),
      new Int65(new UInt64(1), Sign.one),
      new Int65(new UInt64(1), Sign.one),
      new Int65(new UInt64(1), Sign.one),
      new Int65(new UInt64(1), Sign.one),
      new Int65(new UInt64(1), Sign.one),
      new Int65(new UInt64(1), Sign.one),
      new Int65(new UInt64(1), Sign.one),
      new Int65(new UInt64(1), Sign.one),
      new Int65(new UInt64(1), Sign.one),
    ];

    // var sum_fn = new Int65(Field(0), Field(1))
    var sum_fn = Int65.zero;

    console.log('sum_fn initial value: ' + sum_fn.toString());
    var out: Array<Int65> = [
      Int65.zero,
      Int65.zero,
      Int65.zero,
      Int65.zero,
      Int65.zero,
      Int65.zero,
      Int65.zero,
      Int65.zero,
      Int65.zero,
      Int65.zero,
    ];

    for (let i = 0; i < x.length; i++) {
      // fn[i] = fn[i].add(Math.pow(x[i], 1)) //?
      fn[i] = fn[i].add(x[i]);

      console.log('for loop 1', fn[i].toString(), 'is is', i);
    }
    for (let i = 0; i < x.length; i++) {
      fn[i] = fn[i].add(x[i].mul(x[i])).div(new Int65(new UInt64(2), Sign.one)); //?
      console.log('for loop 2', fn[i].toString(), 'is is', i);
    }
    // for (let i = 0; i < x.length; i++) {
    //   fn[i] += Math.pow(x[i], 3) / 3 //?
    // }
    // for (let i = 0; i < x.length; i++) {
    //   fn[i] += Math.pow(x[i], 4) / 4 //?
    // }

    for (let i = 0; i < fn.length; i++) {
      sum_fn = sum_fn.add(fn[i]); //?
      // sum_fn.forEach((value) => sum = sum.add(value))
      console.log('for loop 3 sum_fn is', sum_fn.toString(), 'is is', i);
    }

    let test = Int65.zero;
    for (let i = 0; i < fn.length; i++) {
      test = fn[i].divRest(sum_fn).mul(Int65.from(100)); // devided by 100 to get percentage
      console.log('test is', test.toString(), 'is is', i);
      out[i] = test;
      console.log('fn[i] is', fn[i].toString(), 'sum_fn is', sum_fn.toString());
      console.log('for loop 4', out[i].toString(), 'is is', i);
    }
    console.log('out', out.toString());
    console.log(out[0].toString());
    console.log(out[1].toString());
    return out;
  }
}

class SnarkyNet extends SnarkyTensor {
  layers: Array<SnarkyLayer>; // Array of SnarkyLayer

  constructor(layers: Array<SnarkyLayer>) {
    super();

    // SnarkyLayers
    this.layers = layers; // SnarkyJS Layers
  }

  predict(inputs: Array<Int65>[]): Array<Field> {
    console.log('in predict start');
    // Prediction method to run the model
    // Step 1. Convert initial inputs to a float
    // let x = this.num2int65_t2(inputs);
    let x = inputs;
    console.log('in predict after num2int65_t2');
    // Step 2. Call the SnarkyLayers
    this.layers.forEach((layer) => (x = layer.call(x)));
    console.log('in predict after layers.forEach');
    // Step 3. Parse Classes
    console.log('x is', x.toString());
    console.log('x[0] is', x[0].toString());
    // this.parse_classes(x[0]);

    return this.parse_classes(x[0]);
  }

  parse_classes(x: Array<Int65>): Array<Field> {
    // Return an array of Bool if it exceeds the threshold
    console.log('in parse_classes');
    console.log('x is', x.toString());
    // let output = Array<Bool>();
    console.log('in parse_classes after output');
    // determine if values exceed the threshold
    // let max = Int65.from(90);
    let results: Array<Field> = [];
    // let max = new Int65(new UInt64(0), Sign.one);
    console.log(' - Results - ');
    for (let i = 0; i < x.length; i++) {
      console.log('Classification of', i, ': ', x[i].toString(), '%');
      results.push(x[i].toField());
      // let checkSize = comparison.gt(new Field(x[i].toString()));
      // Circuit.if(checkSize, (max = x[i]), (max = max));
    }
    // console.log('max is', max.toString());
    return results;
  }
}
