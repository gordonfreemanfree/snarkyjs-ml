import { Int65 } from '../Int65_v4.js';
import { isReady } from 'snarkyjs';

await isReady;
// multiplier for decimal conversion for number to Int65 conversions
let scale_factor_int65: Int65 = Int65.from(10000);

// Description:   Convert a Rank 2 Tensor of numbers to Rank 2 Tensor of Int65s
// Input:         x - Rank 2 Tensor of type number
// Output:        y - Rank 2 Tensor of type Int65
export function num2int65_t2(x: Array<number>[]): Array<Int65>[] {
  let y = Array();
  x.forEach((value, index) => (y[index] = num2int65_t1(value)));
  return y;
}

// Description:   Convert a Rank 1 Tensor of numbers to Rank 1 Tensor of Int65s
// Input:         x - Rank 1 Tensor of type number
// Output:        y - Rank 1 Tensor of type Int65
export function num2int65_t1(x: Array<number>): Array<Int65> {
  let y = Array();
  x.forEach((value, index) => (y[index] = num2int65(value)));
  return y;
}

// Description:   Convert number to a Int65 by multiplying it by the
// scale factor and taking the floor
// Input:         x - number
// Output:        y - Int65
export function num2int65(x: number): Int65 {
  return Int65.from(x);
  // commenting this scale factor out for now
  // return Int65.from(Math.floor(x * this.scale_factor));
}
