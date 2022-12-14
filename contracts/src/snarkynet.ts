// Description: SnarkyNet and SnarkyLayers allow for the implementation of a SnarkyJS
// version of a Deep Neural Network.
// SnarkyLayers are defined to represent the Dense Neural Network layers combined in
// SnarkyNet for prediction.

export { SnarkyLayer1, SnarkyLayer2, SnarkyNet };

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
  Int64,
  Struct,
  arrayProp,
} from 'snarkyjs';
import { ImageVector } from './ImageClass.js';

import { SnarkyTensor } from './snarky_tensor';

await isReady;
// create a layer
class SnarkyLayer1 extends SnarkyTensor {
  @matrixProp(Field, 100, 10) weights: Array<Field>[]; // weights
  activation: Function; // activation function
  alpha: Field; // alpha value for leaky relu / it is scaled by 1000
  decimal: number; // multiplier for decimals
  zero: Field; // zero

  constructor(
    weights: Array<Field>[],
    activation = 'relu', // default activation function
    alpha = Field(10) // alread scaled by 1000
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

  call(input: Array<Field>[]): Array<Field>[] {
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
    // else if (activation == 'tayler') {
    //   return this.tayler;
    // }
    else {
      throw Error('Activation Function Not Valid');
    } // Invalid Activation Function
  }

  // Activation
  activation_t2(x: Array<Field>[]): Array<Field>[] {
    console.log('in the activation_t2 function');
    // Applying activation functions for a rank 2 tensor
    let result = Array();
    x.forEach((value, index) => (result[index] = this.activation(value)));
    return result;
  }

  // Activation Functions (implemented for rank 1 tensors)
  relu_t1(x: Array<Field>): Array<Field> {
    // RelU implementation for an Array
    // Equivalent: result = max( x, 0 )
    let result = Array();
    x.forEach((value, i) => (result[i] = value));
    return result;
  }

  relu_leaky_t1(x: Array<Field>): Array<Field> {
    // Leaky RelU implementation for an Array
    let result = Array();
    x.forEach((value, i) => (result[i] = value));
    return result;
  }

  softmax_t1(x: Array<Field>): Array<UInt64> {
    // Softmax Implementation for an Array
    console.log('in the softmax_t1 function');
    console.log('x before exp part is', x.toString());
    let sum = UInt64.zero;
    let result = Array<UInt64>();
    // Equivalent: result = x / ( x1 + .. + xn )
    console.log('x before exp part is', x.toString());
    // preventing overflow
    let reduced_x = Array<UInt64>();
    // x.forEach((value, i) => (reduced_x[i] = value.div(Field(1))));
    x.forEach(
      (value, i) =>
        (reduced_x[i] = UInt64.from(value).div(UInt64.from(1000000)))
    );
    console.log('x after overflow prevention is', reduced_x.toString());
    reduced_x.forEach((value) => console.log(this.exp(value).toString()));
    console.log('x after exp is', reduced_x.toString());

    // result returned as percentage
    reduced_x.forEach((value) => (sum = sum.add(this.exp(value))));
    console.log('sum is', sum.toString());
    // reduced_x.forEach(
    //   (value, i) => (result[i] = this.exp(value).div(sum).mul(Field.from(100))) // percentage
    // );
    // reduced_x.forEach(
    //   (value, i) => (result[i] = this.exp(value).divMod(sum)) // percentage
    // );
    reduced_x.forEach((value, i) => {
      let quotientAndRemainder = this.exp(value).divMod(sum);
      result[i] = quotientAndRemainder.rest;
    });
    console.log('result is', result.toString());

    return result;
  }

  // tayler(x: Array<Field>): Array<Field> {
  //   console.log('taylor_softmax_manual_typescript');
  //   var fn: Array<Field> = [
  //     new Field(1),
  //     new Field(1),
  //     new Field(1),
  //     new Field(1),
  //     new Field(1),
  //     new Field(1),
  //     new Field(1),
  //     new Field(1),
  //     new Field(1),
  //     new Field(1),
  //   ];

  //   // var sum_fn = new Field(Field(0), Field(1))
  //   var sum_fn = Field.zero;

  //   console.log('sum_fn initial value: ' + sum_fn.toString());
  //   var out: Array<Field> = [
  //     Field.zero,
  //     Field.zero,
  //     Field.zero,
  //     Field.zero,
  //     Field.zero,
  //     Field.zero,
  //     Field.zero,
  //     Field.zero,
  //     Field.zero,
  //     Field.zero,
  //   ];

  //   for (let i = 0; i < x.length; i++) {
  //     // fn[i] = fn[i].add(Math.pow(x[i], 1)) //?
  //     fn[i] = fn[i].add(x[i]);

  //     console.log('for loop 1', fn[i].toString(), 'is is', i);
  //   }
  //   for (let i = 0; i < x.length; i++) {
  //     fn[i] = fn[i].add(x[i].mul(x[i])).div(new Field(2)); //?
  //     console.log('for loop 2', fn[i].toString(), 'is is', i);
  //   }
  //   // for (let i = 0; i < x.length; i++) {
  //   //   fn[i] += Math.pow(x[i], 3) / 3 //?
  //   // }
  //   // for (let i = 0; i < x.length; i++) {
  //   //   fn[i] += Math.pow(x[i], 4) / 4 //?
  //   // }

  //   for (let i = 0; i < fn.length; i++) {
  //     sum_fn = sum_fn.add(fn[i]); //?
  //     // sum_fn.forEach((value) => sum = sum.add(value))
  //     console.log('for loop 3 sum_fn is', sum_fn.toString(), 'is is', i);
  //   }

  //   let test = Field.zero;
  //   for (let i = 0; i < fn.length; i++) {
  //     test = fn[i].divRest(sum_fn).mul(Field(100)); // devided by 100 to get percentage
  //     console.log('test is', test.toString(), 'is is', i);
  //     out[i] = test;
  //     console.log('fn[i] is', fn[i].toString(), 'sum_fn is', sum_fn.toString());
  //     console.log('for loop 4', out[i].toString(), 'is is', i);
  //   }
  //   console.log('out', out.toString());
  //   console.log(out[0].toString());
  //   console.log(out[1].toString());
  //   return out;
  // }
}

class SnarkyLayer2 extends SnarkyTensor {
  @matrixProp(Field, 10, 10) weights: Array<Field>[]; // weights
  activation: Function; // activation function
  alpha: Field; // alpha value for leaky relu / it is scaled by 1000
  decimal: number; // multiplier for decimals
  zero: Field; // zero

  constructor(
    weights: Array<Field>[],
    activation = 'relu', // default activation function
    alpha = Field(10) // alread scaled by 1000
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

  call(input: Array<Field>[]): Array<Field>[] {
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
    // else if (activation == 'tayler') {
    //   return this.tayler;
    // }
    else {
      throw Error('Activation Function Not Valid');
    } // Invalid Activation Function
  }

  // Activation
  activation_t2(x: Array<Field>[]): Array<Field>[] {
    console.log('in the activation_t2 function');
    // Applying activation functions for a rank 2 tensor
    let result = Array();
    x.forEach((value, index) => (result[index] = this.activation(value)));
    return result;
  }

  // Activation Functions (implemented for rank 1 tensors)
  relu_t1(x: Array<Field>): Array<Field> {
    // RelU implementation for an Array
    // Equivalent: result = max( x, 0 )
    let result = Array();
    x.forEach((value, i) => (result[i] = value));
    return result;
  }

  relu_leaky_t1(x: Array<Field>): Array<Field> {
    // Leaky RelU implementation for an Array
    let result = Array();
    x.forEach((value, i) => (result[i] = value));
    return result;
  }

  softmax_t1(x: Array<Field>): Array<UInt64> {
    // Softmax Implementation for an Array
    console.log('in the softmax_t1 function');
    console.log('x before exp part is', x.toString());
    let sum = UInt64.zero;
    let result = Array<UInt64>();
    // Equivalent: result = x / ( x1 + .. + xn )
    console.log('x before exp part is', x.toString());
    // preventing overflow
    let reduced_x = Array<UInt64>();
    // x.forEach((value, i) => (reduced_x[i] = value.div(Field(1))));
    x.forEach(
      (value, i) =>
        (reduced_x[i] = UInt64.from(value).div(UInt64.from(1000000)))
    );
    console.log('x after overflow prevention is', reduced_x.toString());
    reduced_x.forEach((value) => console.log(this.exp(value).toString()));
    console.log('x after exp is', reduced_x.toString());

    // result returned as percentage
    reduced_x.forEach((value) => (sum = sum.add(this.exp(value))));
    console.log('sum is', sum.toString());
    // reduced_x.forEach(
    //   (value, i) => (result[i] = this.exp(value).div(sum).mul(Field.from(100))) // percentage
    // );
    // reduced_x.forEach(
    //   (value, i) => (result[i] = this.exp(value).divMod(sum)) // percentage
    // );
    reduced_x.forEach((value, i) => {
      let quotientAndRemainder = this.exp(value).divMod(sum);
      result[i] = quotientAndRemainder.rest;
    });
    console.log('result is', result.toString());

    return result;
  }
}

class Array10 extends CircuitValue {
  @arrayProp(Field, 10) value: Array<Field>;
  constructor(value: Array<Field>) {
    super();
    this.value = value;
  }
}

class SnarkyNet extends SnarkyTensor {
  // layers: Array<SnarkyLayer>; // Array of SnarkyLayer
  // @matrixProp(SnarkyLayer1, 2, 1) layers: [SnarkyLayer1, SnarkyLayer2];

  layers: [SnarkyLayer1, SnarkyLayer2];
  constructor(layers: [SnarkyLayer1, SnarkyLayer2]) {
    super();

    // SnarkyLayers
    this.layers = layers; // SnarkyJS Layers
  }

  predict(inputs: ImageVector): Field[] {
    console.log('in predict start');
    // Prediction method to run the model
    // Step 1. Convert initial inputs to a float
    // let x = this.num2Field_t2(inputs);
    let x = [inputs.value];
    console.log('in predict after num2Field_t2');
    // Step 2. Call the SnarkyLayers
    this.layers.forEach((layer) => (x = layer.call(x)));
    console.log('in predict after layers.forEach');
    // Step 3. Parse Classes
    console.log('x is', x.toString());
    console.log('x[0] is', x[0].toString());
    // let array10 = this.parse_classes(x[0]);

    return this.parse_classes(x[0]);
  }

  parse_classes(x: Array<Field>): Field[] {
    // Return an array of Bool if it exceeds the threshold
    console.log('in parse_classes');
    console.log('x is', x.toString());
    // let output = Array<Bool>();
    console.log('in parse_classes after output');
    // determine if values exceed the threshold
    // let max = Field.from(90);
    // let results: Array<Field> = [];

    // let results = new Array10(x);
    let max = new Field(0);
    let classification = new Field(0);
    console.log(' - Results - ');
    for (let i = 0; i < x.length; i++) {
      console.log('Classification of', i, ': ', x[i].toString(), '%');
      // results.value.push(x[i]);
      // results.value[i] = x[i];
    }
    // for (let i = 0; i < x.length; i++) {
    //   // console.log('x is', Field(x[i].toString()));
    //   let checkSize = Field(x[i].toString()).gt(max);
    //   console.log('max is', max.toString());
    //   console.log('x[i] is', Field(x[i].toString()).toString());
    //   // console.log('classification is', classification.toString());
    //   console.log('checkSize is', checkSize.toBoolean());

    // const classification1 = Circuit.if(
    //   Field(x[i].toString()).gt(max),
    //   () => {
    //     // (max = Field(x[i].toString())),
    //     //   (classification = Field(i)),
    //     //   console.log('classification is', classification.toString()),
    //     //   console.log('max in circuit if is', max.toString());
    //     return Field(i);
    //   },
    //   () => {
    //     return classification;
    //   }
    // );

    // max = Circuit.if(
    //   Field(x[i].toString()).gt(max),
    //   (() => {
    //     // TRUE
    //     max = Field(x[i].toString());
    //     console.log(
    //       'we are in the circuit if, current max is',
    //       max.toString()
    //     );
    //     return max;
    //   })(),
    //   (() => {
    //     // FALSE
    //     console.log("we're in the false part");
    //     return max;
    //   })()
    // );
    // Define the true and false blocks of the if statement
    // const trueBlock = () => {
    //   max = Field(x[i].toString());
    //   console.log('we are in the circuit if, current max is', max.toString());
    //   return max;
    // };
    // const falseBlock = () => {
    //   console.log("we're in the false part");
    //   return max;
    // };

    // // Use the Circuit.if function to check the condition and execute the appropriate block
    // max = Circuit.if(
    //   Field(x[i].toString()).gt(max),
    //   trueBlock(),
    //   falseBlock()
    // );

    return x;
    // console.log('max is', results.toString());
  }
}
