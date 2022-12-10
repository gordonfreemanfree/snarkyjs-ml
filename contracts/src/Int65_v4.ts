import {
  Circuit,
  Field,
  CircuitValue,
  prop,
  Sign,
  UInt32,
  UInt64,
  Int64,
  isReady,
} from 'snarkyjs';

export { Int65 };

class Int65 extends CircuitValue {
  // * in the range [-2^64+1, 2^64-1], unlike a normal int64
  // * under- and overflowing is disallowed, similar to UInt64, unlike a normal int64+

  @prop magnitude: UInt64; // absolute value
  @prop sgn: Sign; // +/- 1

  // Some thoughts regarding the representation as field elements:
  // toFields returns the in-circuit representation, so the main objective is to minimize the number of constraints
  // that result from this representation. Therefore, I think the only candidate for an efficient 1-field representation
  // is the one where the Int64 is the field: toFields = Int64 => [Int64.magnitude.mul(Int64.sign)]. Anything else involving
  // bit packing would just lead to very inefficient circuit operations.
  //
  // So, is magnitude * sign ("1-field") a more efficient representation than (magnitude, sign) ("2-field")?
  // Several common operations like add, mul, etc, operate on 1-field so in 2-field they result in one additional multiplication
  // constraint per operand. However, the check operation (constraining to 64 bits + a sign) which is called at the introduction
  // of every witness, and also at the end of add, mul, etc, operates on 2-field. So here, the 1-field representation needs
  // to add an additional magnitude * sign = Int64 multiplication constraint, which will typically cancel out most of the gains
  // achieved by 1-field elsewhere.
  // There are some notable operations for which 2-field is definitely better:
  //
  // * div and mod (which do integer division with rounding on the magnitude)
  // * converting the Int64 to a Currency.Amount.Signed (for the zkapp balance), which has the exact same (magnitude, sign) representation we use here.
  //
  // The second point is one of the main things an Int64 is used for, and was the original motivation to use 2 fields.
  // Overall, I think the existing implementation is the optimal one.

  constructor(magnitude: UInt64, sgn = Sign.one) {
    super(magnitude, sgn);
  }

  /**
   * Creates a new {@link Int64} from a {@link Field}.
   *
   * Does check if the {@link Field} is within range.
   */
  private static fromFieldUnchecked(x: Field) {
    let TWO64 = 1n << 64n;
    let xBigInt = x.toBigInt();
    let isValidPositive = xBigInt < TWO64; // covers {0,...,2^64 - 1}
    let isValidNegative = Field.ORDER - xBigInt < TWO64; // {-2^64 + 1,...,-1}
    if (!isValidPositive && !isValidNegative)
      throw Error(`Int64: Expected a value between (-2^64, 2^64), got ${x}`);
    let magnitude = Field(isValidPositive ? x.toString() : x.neg().toString());
    let sign = isValidPositive ? Sign.one : Sign.minusOne;
    return new Int65(new UInt64(magnitude), sign);
  }

  // this doesn't check ranges because we assume they're already checked on UInts
  /**
   * Creates a new {@link Int64} from a {@link Field}.
   *
   * **Does not** check if the {@link Field} is within range.
   */
  static fromUnsigned(x: UInt64 | UInt32) {
    return new Int65(x instanceof UInt32 ? x.toUInt64() : x);
  }

  // this checks the range if the argument is a constant
  /**
   * Creates a new {@link Int65}.
   *
   * Check the range if the argument is a constant.
   */
  static from(
    x: Int65 | Int64 | UInt32 | UInt64 | Field | number | string | bigint
  ) {
    if (x instanceof Int65) return x;
    // if (x instanceof Int64) return Int65.fromFieldUnchecked(x.toField())
    if (x instanceof Int64) return new Int65(x.magnitude, x.sgn);
    if (x instanceof UInt64 || x instanceof UInt32) {
      return Int65.fromUnsigned(x);
    }
    return Int65.fromFieldUnchecked(Field(x));
  }
  /**
   * Turns the {@link Int64} into a string.
   */
  toString() {
    let abs = this.magnitude.toString();
    let sgn = this.isPositive().toBoolean() || abs === '0' ? '' : '-';
    return sgn + abs;
  }

  isConstant() {
    return this.magnitude.isConstant() && this.sgn.isConstant();
    // return new UInt64(this.magnitude.value).isConstant() && this.sgn.isConstant()
  }

  // --- circuit-compatible operations below ---
  // the assumption here is that all Int64 values that appear in a circuit are already checked as valid
  // this is because Circuit.witness calls .check, which calls .check on each prop, i.e. UInt64 and Sign
  // so we only have to do additional checks if an operation on valid inputs can have an invalid outcome (example: overflow)
  /**
   * Static method to create a {@link Int64} with value `0`.
   */
  static get zero() {
    return new Int65(UInt64.zero);
  }
  /**
   * Static method to create a {@link Int64} with value `1`.
   */
  static get one() {
    return new Int65(UInt64.one);
  }
  /**
   * Static method to create a {@link Int64} with value `-1`.
   */
  static get minusOne() {
    return new Int65(UInt64.one).neg();
  }

  /**
   * Returns the {@link Field} value.
   */
  toField() {
    // return this.magnitude.value.mul(this.sgn.value)
    return new Field(this.magnitude.value).mul(this.sgn.value);
  }
  /**
   * Static method to create a {@link Int64} from a {@link Field}.
   */
  static fromField(x: Field): Int65 {
    // constant case - just return unchecked value
    if (x.isConstant()) return Int65.fromFieldUnchecked(x);
    // variable case - create a new checked witness and prove consistency with original field
    let xInt = Circuit.witness(Int65, () => Int65.fromFieldUnchecked(x));
    xInt.toField().assertEquals(x); // sign(x) * |x| === x
    return xInt;
  }

  /**
   * Negates the value.
   *
   * `Int64.from(5).neg()` will turn into `Int64.from(-5)`
   */
  neg() {
    // doesn't need further check if `this` is valid
    return new Int65(this.magnitude, this.sgn.neg());
  }
  /**
   * Addition with overflow checking.
   */
  add(y: Int65 | Int64 | number | string | bigint | UInt64 | UInt32) {
    let y_ = Int65.from(y);
    return Int65.fromField(this.toField().add(y_.toField()));
  }
  /**
   * Subtraction with underflow checking.
   */
  sub(y: Int65 | Int64 | number | string | bigint | UInt64 | UInt32) {
    let y_ = Int65.from(y);
    return Int65.fromField(this.toField().sub(y_.toField()));
  }
  /**
   * Multiplication with overflow checking.
   */
  mul(y: Int65 | Int64 | number | string | bigint | UInt64 | UInt32) {
    let y_ = Int65.from(y);
    return Int65.fromField(this.toField().mul(y_.toField()));
  }
  /**
   * Integer division.
   *
   * `x.div(y)` returns the floor of `x / y`, that is, the greatest
   * `z` such that `z * y <= x`.
   *
   */
  div(y: Int65 | Int64 | number | string | bigint | UInt64 | UInt32) {
    let y_ = Int65.from(y);
    let { quotient } = this.magnitude.divMod(y_.magnitude);
    let sign = this.sgn.mul(y_.sgn);
    return new Int65(quotient, sign);
  }
  ///**
  // * Integer division.
  // *
  divRest(y: Int65 | Int64 | number | string | bigint | UInt64 | UInt32) {
    let y_ = Int65.from(y);
    let { rest } = this.magnitude.divMod(y_.magnitude);
    let sign = this.sgn.mul(y_.sgn);
    return new Int65(rest, sign);
  }

  /**
   * Integer remainder.
   *
   * `x.mod(y)` returns the value `z` such that `0 <= z < y` and
   * `x - z` is divisble by `y`.
   */
  mod(y: UInt64 | number | string | bigint | UInt32) {
    let y_ = UInt64.from(y);
    let rest = this.magnitude.divMod(y_).rest.value;
    rest = Circuit.if(this.isPositive(), rest, y_.value.sub(rest));
    return new Int65(new UInt64(rest));
  }

  /**
   * Checks if two values are equal.
   */
  equals(y: Int65 | Int64 | number | string | bigint | UInt64 | UInt32) {
    let y_ = Int65.from(y);
    return this.toField().equals(y_.toField());
  }
  /**
   * Asserts that two values are equal.
   */
  assertEquals(
    y: Int65 | Int64 | number | string | bigint | UInt64 | UInt32,
    message?: string
  ) {
    let y_ = Int65.from(y);
    this.toField().assertEquals(y_.toField(), message);
  }
  /**
   * Checks if the value is postive.
   */
  isPositive() {
    return this.sgn.isPositive();
  }
}

// test();

async function test() {
  await isReady;
  console.log('Starting test');

  let x = new Int65(new UInt64(128), Sign.minusOne);
  let y = new Int65(new UInt64(128), Sign.one);
  console.log('numbers assigned');
  // check arithmetic

  x.add(y).assertEquals(Int65.zero);
  console.log('add ok');
  console.assert(x.sub(y).toString() === '-256');
  console.log('sub ok');
  console.assert(y.add(x.neg()).toString() === '256');
  console.log('neg ok');
  console.assert(x.mul(y).toString() == (-(128 ** 2)).toString());
  console.log('mul ok');
  console.assert(y.div(x).neg().toString() === '1');
  console.log('div ok');
  console.assert(y.div(new Int65(new UInt64(129))).toString() === '0');
  console.log('div ok');

  // check if size limits are enforced correctly

  // should work
  new Int65(UInt64.MAXINT()).add(Int65.zero);

  new Int65(UInt64.MAXINT(), Sign.minusOne).add(Int65.zero);

  // should fail
  let fail = true;
  try {
    new Int65(UInt64.MAXINT().add(UInt64.one));
    fail = false;
  } catch {}
  try {
    new Int65(UInt64.MAXINT().add(UInt64.one), Sign.minusOne);
    fail = false;
  } catch {}
  try {
    new Int65(UInt64.MAXINT().add(UInt64.one), Sign.minusOne).add(Int65.zero);
    fail = false;
  } catch {}
  console.assert(fail === true);
  console.log('everything ok!');
}
