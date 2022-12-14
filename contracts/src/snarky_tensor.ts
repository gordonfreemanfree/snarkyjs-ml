// Description: SnarkyTensor allows for the methods utilized for manipulating tensors

// TODO: float to Field conversion is currently dependend on the Math library
// therefore it cannot be considered a pure snarkyJS implementation and so it is not secure.

export { SnarkyTensor };

import {
  Circuit,
  Field,
  PrivateKey,
  SmartContract,
  isReady,
  UInt64,
  CircuitValue,
} from 'snarkyjs';

await isReady;

class SnarkyTensor extends CircuitValue {
  // multiplier for decimal conversion for number to Field conversions
  // scale_factor: number;
  scale_factor_Field: Field;

  constructor(power: Field = Field(10000000)) {
    // Multiplier for representing decimals
    // this.scale_factor = Math.pow(10, power);
    // this.scale_factor = power;
    super();
    this.scale_factor_Field = power;
  }

  // Description:   Perform a dot product for two rank 2 tensors of type Field
  // Input:         m1 - Rank 2 Tensor of type Field
  //                m2 - Rank 2 Tensor of type Field
  // Output:        y - Dot product Rank 2 Tensor of type Field
  dot_product_t2(m1: Array<Field>[], m2: Array<Field>[]): Array<Field>[] {
    console.log('in the dot product');
    // Perform a dot product on the two rank 2 tensors
    let y = Array();
    let m2_t = this.transpose(m2);
    // let m2_t = m2;
    for (let i = 0; i < m1.length; i++) {
      console.log('in the for loop', i);
      let m_array = Array();
      for (let j = 0; j < m2_t.length; j++) {
        console.log('in the for loop', j);
        m_array[j] = this.dot_product_t1(m1[i], m2_t[j]);
      }
      y[i] = m_array;
    }
    return y;
  }

  // Description:   Perform a dot product for two rank 1 tensors of type Field
  // Input:         m1 - Rank 1 Tensor of type Field
  //                m2 - Rank 1 Tensor of type Field
  // Output:        y - Dot product Rank 0 Tensor of type Field
  dot_product_t1(v1: Array<Field>, v2: Array<Field>): Field {
    let y = Field.zero;
    console.assert(
      v1.length === v2.length,
      "tensor dimensions do not fit, can't do dot_product_t1"
    );
    v1.forEach(
      (v1_value, i) =>
        // (y = y.add(v1_value.mul(v2[i]).div(this.scale_factor_Field)))
        (y = y.add(v1_value.mul(v2[i])))
    );
    return y;
  }

  // Description:   Transpose a rank 2 tensor of type Field
  // Input:         x - Rank 2 Tensor of type Field
  // Output:        y - Transposed Rank 2 Tensor of type Field of x
  transpose(x: Array<Field>[]): Array<Field>[] {
    // Transpose the rank 2 tensor
    let y = Array();
    for (let i = 0; i < x[0].length; i++) {
      let m_array = Array();
      for (let j = 0; j < x.length; j++) {
        m_array[j] = x[j][i];
      }
      y[i] = m_array;
    }
    return y;
  }

  exp_part(x: UInt64, y: number, z: number): UInt64 {
    // Portion of the Expotential Calculation
    // (x^y)/z
    let result = UInt64.from(x);
    result = result.div(UInt64.from(z));
    for (let i = 1; i < y; i++) {
      result = result.mul(x).div(UInt64.from(this.scale_factor_Field));
      result = result.mul(UInt64.from(x));
    }
    return result;
  }

  // Description:   Calculate the expotential
  // Input:         Rank 0 Tensor of type Field for the power
  // Output:        Rank 0 Tensor of type Field result of calculation
  exp(x: UInt64): UInt64 {
    // Expotential Implementation
    // 1 + x + (x^2)/2 + (x^3)/6 + (x^4)/24 + (x^5)/120 + (x^6)/720 + (x^7)/5040
    // return this.num2Field(1)
    return UInt64.one
      .add(UInt64.from(x))
      .add(this.exp_part(x, 2, 2))
      .add(this.exp_part(x, 3, 6))
      .add(this.exp_part(x, 4, 24))
      .add(this.exp_part(x, 5, 120))
      .add(this.exp_part(x, 6, 720))
      .add(this.exp_part(x, 7, 5040));
  }
}
