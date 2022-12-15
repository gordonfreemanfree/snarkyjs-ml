// Description: SnarkyNet and SnarkyLayers allow for the implementation of a SnarkyJS
// version of a Deep Neural Network.
// SnarkyLayers are defined to represent the Dense Neural Network layers combined in
// SnarkyNet for prediction.

export { SnarkyLayer1, SnarkyLayer2 };

import { Field, isReady, UInt64, matrixProp, CircuitValue } from 'snarkyjs';

import { SnarkyTensor } from './snarkyTensor.js';

await isReady;
// create a layer
class SnarkyLayer1 extends SnarkyTensor {
  @matrixProp(Field, 25, 10) weights: Array<Field>[]; // weights
  activation: Function; // activation function
  alpha: Field; // alpha value for leaky relu / it is scaled by 1000
  decimal: number; // multiplier for decimals
  zero: Field; // zero
  scale_factor_Field: Field;

  constructor(
    weights: Array<Field>[],
    activation = 'relu', // default activation function
    alpha = Field(10) // alread scaled by 1000
  ) {
    super();
    // this.scale_factor_Field = Field(10000000);
    // Activation Function
    this.activation = this.activation_selection(activation);

    // Set alpha
    // this.alpha = this.num2int65(alpha);
    this.alpha = alpha;

    // Weights
    this.weights = weights;
  }
  // // Description:   Perform a dot product for two rank 2 tensors of type Field
  // // Input:         m1 - Rank 2 Tensor of type Field
  // //                m2 - Rank 2 Tensor of type Field
  // // Output:        y - Dot product Rank 2 Tensor of type Field
  // dot_product_t2(m1: Array<Field>[], m2: Array<Field>[]): Array<Field>[] {
  //   console.log('in the dot product');
  //   // Perform a dot product on the two rank 2 tensors
  //   let y = Array();
  //   let m2_t = this.transpose(m2);
  //   // let m2_t = m2;
  //   for (let i = 0; i < m1.length; i++) {
  //     console.log('in the for loop', i);
  //     let m_array = Array();
  //     for (let j = 0; j < m2_t.length; j++) {
  //       console.log('in the for loop', j);
  //       m_array[j] = this.dot_product_t1(m1[i], m2_t[j]);
  //     }
  //     y[i] = m_array;
  //   }
  //   return y;
  // }

  // // Description:   Perform a dot product for two rank 1 tensors of type Field
  // // Input:         m1 - Rank 1 Tensor of type Field
  // //                m2 - Rank 1 Tensor of type Field
  // // Output:        y - Dot product Rank 0 Tensor of type Field
  // dot_product_t1(v1: Array<Field>, v2: Array<Field>): Field {
  //   let y = Field.zero;
  //   console.assert(
  //     v1.length === v2.length,
  //     "tensor dimensions do not fit, can't do dot_product_t1"
  //   );
  //   v1.forEach(
  //     (v1_value, i) =>
  //       // (y = y.add(v1_value.mul(v2[i]).div(this.scale_factor_Field)))
  //       (y = y.add(v1_value.mul(v2[i])))
  //   );
  //   return y;
  // }

  // // Description:   Transpose a rank 2 tensor of type Field
  // // Input:         x - Rank 2 Tensor of type Field
  // // Output:        y - Transposed Rank 2 Tensor of type Field of x
  // transpose(x: Array<Field>[]): Array<Field>[] {
  //   // Transpose the rank 2 tensor
  //   let y = Array();
  //   for (let i = 0; i < x[0].length; i++) {
  //     let m_array = Array();
  //     for (let j = 0; j < x.length; j++) {
  //       m_array[j] = x[j][i];
  //     }
  //     y[i] = m_array;
  //   }
  //   return y;
  // }

  // exp_part(x: UInt64, y: number, z: number): UInt64 {
  //   // Portion of the Expotential Calculation
  //   // (x^y)/z
  //   let result = UInt64.from(x);
  //   result = result.div(UInt64.from(z));
  //   for (let i = 1; i < y; i++) {
  //     result = result.mul(x).div(UInt64.from(this.scale_factor_Field));
  //     result = result.mul(UInt64.from(x));
  //   }
  //   return result;
  // }

  // // Description:   Calculate the expotential
  // // Input:         Rank 0 Tensor of type Field for the power
  // // Output:        Rank 0 Tensor of type Field result of calculation
  // exp(x: UInt64): UInt64 {
  //   // Expotential Implementation
  //   // 1 + x + (x^2)/2 + (x^3)/6 + (x^4)/24 + (x^5)/120 + (x^6)/720 + (x^7)/5040
  //   // return this.num2Field(1)
  //   return UInt64.one
  //     .add(UInt64.from(x))
  //     .add(this.exp_part(x, 2, 2))
  //     .add(this.exp_part(x, 3, 6))
  //     .add(this.exp_part(x, 4, 24))
  //     .add(this.exp_part(x, 5, 120))
  //     .add(this.exp_part(x, 6, 720))
  //     .add(this.exp_part(x, 7, 5040));
  // }

  call(input: Array<Field>[]): Array<Field>[] {
    console.log('in the call function');
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
    // x.forEach((value, index) => (result[index] = this.activation(value)));
    x.forEach((value, index) => (result[index] = this.relu_t1(value)));
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
  scale_factor_Field: Field;

  constructor(
    weights: Array<Field>[],
    activation = 'relu', // default activation function
    alpha = Field(10) // alread scaled by 1000
  ) {
    super();
    // this.scale_factor_Field = Field(10000000);
    // Activation Function
    this.activation = this.activation_selection(activation);

    // Set alpha
    // this.alpha = this.num2int65(alpha);
    this.alpha = alpha;

    // Weights
    this.weights = weights;
  }
  // // Description:   Perform a dot product for two rank 2 tensors of type Field
  // // Input:         m1 - Rank 2 Tensor of type Field
  // //                m2 - Rank 2 Tensor of type Field
  // // Output:        y - Dot product Rank 2 Tensor of type Field
  // dot_product_t2(m1: Array<Field>[], m2: Array<Field>[]): Array<Field>[] {
  //   console.log('in the dot product');
  //   // Perform a dot product on the two rank 2 tensors
  //   let y = Array();
  //   let m2_t = this.transpose(m2);
  //   // let m2_t = m2;
  //   for (let i = 0; i < m1.length; i++) {
  //     console.log('in the for loop', i);
  //     let m_array = Array();
  //     for (let j = 0; j < m2_t.length; j++) {
  //       console.log('in the for loop', j);
  //       m_array[j] = this.dot_product_t1(m1[i], m2_t[j]);
  //     }
  //     y[i] = m_array;
  //   }
  //   return y;
  // }

  // // Description:   Perform a dot product for two rank 1 tensors of type Field
  // // Input:         m1 - Rank 1 Tensor of type Field
  // //                m2 - Rank 1 Tensor of type Field
  // // Output:        y - Dot product Rank 0 Tensor of type Field
  // dot_product_t1(v1: Array<Field>, v2: Array<Field>): Field {
  //   let y = Field.zero;
  //   console.assert(
  //     v1.length === v2.length,
  //     "tensor dimensions do not fit, can't do dot_product_t1"
  //   );
  //   v1.forEach(
  //     (v1_value, i) =>
  //       // (y = y.add(v1_value.mul(v2[i]).div(this.scale_factor_Field)))
  //       (y = y.add(v1_value.mul(v2[i])))
  //   );
  //   return y;
  // }

  // // Description:   Transpose a rank 2 tensor of type Field
  // // Input:         x - Rank 2 Tensor of type Field
  // // Output:        y - Transposed Rank 2 Tensor of type Field of x
  // transpose(x: Array<Field>[]): Array<Field>[] {
  //   // Transpose the rank 2 tensor
  //   let y = Array();
  //   for (let i = 0; i < x[0].length; i++) {
  //     let m_array = Array();
  //     for (let j = 0; j < x.length; j++) {
  //       m_array[j] = x[j][i];
  //     }
  //     y[i] = m_array;
  //   }
  //   return y;
  // }

  // exp_part(x: UInt64, y: number, z: number): UInt64 {
  //   // Portion of the Expotential Calculation
  //   // (x^y)/z
  //   let result = UInt64.from(x);
  //   result = result.div(UInt64.from(z));
  //   for (let i = 1; i < y; i++) {
  //     result = result.mul(x).div(UInt64.from(this.scale_factor_Field));
  //     result = result.mul(UInt64.from(x));
  //   }
  //   return result;
  // }

  // // Description:   Calculate the expotential
  // // Input:         Rank 0 Tensor of type Field for the power
  // // Output:        Rank 0 Tensor of type Field result of calculation
  // exp(x: UInt64): UInt64 {
  //   // Expotential Implementation
  //   // 1 + x + (x^2)/2 + (x^3)/6 + (x^4)/24 + (x^5)/120 + (x^6)/720 + (x^7)/5040
  //   // return this.num2Field(1)
  //   return UInt64.one
  //     .add(UInt64.from(x))
  //     .add(this.exp_part(x, 2, 2))
  //     .add(this.exp_part(x, 3, 6))
  //     .add(this.exp_part(x, 4, 24))
  //     .add(this.exp_part(x, 5, 120))
  //     .add(this.exp_part(x, 6, 720))
  //     .add(this.exp_part(x, 7, 5040));
  // }

  call(input: Array<Field>[]): Array<Field>[] {
    console.log('in the call function');
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
    // x.forEach((value, index) => (result[index] = this.activation(value)));
    x.forEach((value, index) => (result[index] = this.relu_t1(value)));
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
