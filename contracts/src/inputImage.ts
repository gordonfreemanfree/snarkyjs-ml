export { InputImage };

import { Field, CircuitValue, arrayProp } from 'snarkyjs';

// This is the class that will be used to store the image matrix
// the size of the matrix is 1x100
class InputImage extends CircuitValue {
  @arrayProp(Field, 64) value: Array<Field>;

  constructor(value: Array<Field>) {
    super();
    this.value = this.num2Int64_t1(value);
  }
  num2Int64_t1(x: Array<Field>): Array<Field> {
    let y = Array();
    x.forEach((value, index) => (y[index] = this.num2Int64(value)));
    return y;
  }
  num2Int64(x: Field): Field {
    return Field(x);
  }
}
