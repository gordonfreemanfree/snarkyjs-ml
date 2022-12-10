import { isReady, Field } from 'snarkyjs';

await isReady;
// multiplier for decimal conversion for number to Field conversions
let scale_factor_Field: Field = Field(10000);

// Description:   Convert a Rank 2 Tensor of numbers to Rank 2 Tensor of Fields
// Input:         x - Rank 2 Tensor of type number
// Output:        y - Rank 2 Tensor of type Field
export function num2Field_t2(x: Array<number>[]): Array<Field>[] {
  let y = Array();
  x.forEach((value, index) => (y[index] = num2Field_t1(value)));
  return y;
}

// Description:   Convert a Rank 1 Tensor of numbers to Rank 1 Tensor of Fields
// Input:         x - Rank 1 Tensor of type number
// Output:        y - Rank 1 Tensor of type Field
export function num2Field_t1(x: Array<number>): Array<Field> {
  let y = Array();
  x.forEach((value, index) => (y[index] = num2Field(value)));
  return y;
}

// Description:   Convert number to a Field by multiplying it by the
// scale factor and taking the floor
// Input:         x - number
// Output:        y - Field
export function num2Field(x: number): Field {
  return Field(x);
  // commenting this scale factor out for now
  // return Field.from(Math.floor(x * this.scale_factor));
}
