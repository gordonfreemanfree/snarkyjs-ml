import { Field, CircuitValue, arrayProp } from 'snarkyjs';

// This is the class that will be used to store the image vector
// the size of the matrix is 100x1
export class ImageVector extends CircuitValue {
  @arrayProp(Field, 100) value: Array<Field>;

  constructor(vector: number[]) {
    super();
    this.value = this.num2Int64_t1(vector);
  }
  num2Int64_t1(x: Array<number>): Array<Field> {
    let y = Array();
    x.forEach((value, index) => (y[index] = this.num2Int64(value)));
    return y;
  }
  num2Int64(x: number): Field {
    return Field(x);
    // commenting this scale factor out for now
    // return Int64.from(Math.floor(x * this.scale_factor));
  }
}
