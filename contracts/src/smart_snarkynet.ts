// Description: Smart Contract utilizing SnarkyNet and SnarkyLayers for an implmenetation of a Deep Neural Network
// for the MNIST Handwritten Digits Dataset: http://yann.lecun.com/exdb/mnist/

import {
  UInt64,
  Field,
  shutdown,
  SmartContract,
  PublicKey,
  method,
  PrivateKey,
  Mina,
  state,
  State,
  isReady,
  AccountUpdate,
  fetchAccount,
  Sign,
  Circuit,
  Bool,
  DeployArgs,
  Permissions,
  arrayProp,
  CircuitValue,
} from 'snarkyjs';
// import { ImageVector } from './ImageClass.js';

// Import SnarkyNet and SnarkyLayers
import { SnarkyNet, SnarkyLayer1, SnarkyLayer2 } from './snarkynet';

// Import Field

let initialBalance = 10_000_000;

export class ImageVector extends CircuitValue {
  @arrayProp(Field, 100) value: Array<Field>;

  constructor(vector: Field[]) {
    super();
    this.value = this.num2Int64_t1(vector);
  }
  num2Int64_t1(x: Array<Field>): Array<Field> {
    let y = Array();
    x.forEach((value, index) => (y[index] = this.num2Int64(value)));
    return y;
  }
  num2Int64(x: Field): Field {
    return Field(x);
    // commenting this scale factor out for now
    // return Int64.from(Math.floor(x * this.scale_factor));
  }
}

export class SmartSnarkyNet extends SmartContract {
  // Field State to store the classification
  @state(Field) state: State<Field>; // stored state for classification

  model: SnarkyNet; // model object
  // reward_balance: UInt64; // balance for the reward
  // @arrayProp(input, 784) input: Array<Field>[];

  deploy(args: DeployArgs) {
    super.deploy(args);
    this.setPermissions({
      ...Permissions.default(),
    });
    // this.state.set(Field(0));
    // set the model
    // this.modelHash.set(Field(1));
    this.balance.addInPlace(UInt64.from(initialBalance));
  }

  // constructor(initialBalance: UInt64, address: PublicKey, model: SnarkyNet) {
  //   super(address);
  //   // intial balance for the reward
  //   // this.reward_balance = initialBalance;
  //   // this.balance.addInPlace(this.reward_balance);

  //   // set the initial values
  //   // this.state.set(Field(0));

  //   // set the model
  //   // this.model = model;
  // }

  // @method async update() {
  //   let currentState = this.state.get();
  // }
  // array<T>(elementType, length): Provable<T[]>;

  @method predict(input: ImageVector, model: SnarkyNet) {
    // run the model and obtain the predictions
    let currentModel = model;
    let prediction = currentModel.predict(input);
    // console.log('prediction: ', prediction);
    console.log('prediction to string: ', prediction.toString());

    let max01 = Field(0);
    let classification01 = Field(0);

    [max01, classification01] = Circuit.if(
      prediction[0].gt(prediction[1]),
      (() => {
        // TRUE
        console.log(
          'we are in the circuit if, current max is',
          max01.toString()
        );
        return [prediction[0], Field(0)];
      })(),
      (() => {
        // FALSE
        console.log("we're in the false part");
        classification01 = Field(1);
        return [prediction[1], Field(1)];
      })()
    );

    let max12 = Field(0);
    let classification12 = Field(0);
    [max12, classification12] = Circuit.if(
      max01.gt(prediction[2]),
      (() => {
        // TRUE
        console.log(
          'we are in the circuit if, current max is',
          max01.toString()
        );
        return [max01, classification01];
      })(),
      (() => {
        // FALSE
        console.log("we're in the false part");
        return [prediction[2], Field(2)];
      })()
    );

    let max23 = Field(0);
    let classification23 = Field(0);
    [max23, classification23] = Circuit.if(
      max12.gt(prediction[3]),
      (() => {
        // TRUE
        console.log('we are in the circuit if, current max is');
        return [max12, classification12];
      })(),
      (() => {
        // FALSE
        console.log("we're in the false part");
        return [prediction[3], Field(3)];
      })()
    );

    let max34 = Field(0);
    let classification34 = Field(0);
    [max34, classification34] = Circuit.if(
      max23.gt(prediction[4]),
      (() => {
        // TRUE
        console.log('we are in the circuit if, current max is');
        return [max23, classification23];
      })(),
      (() => {
        // FALSE
        console.log("we're in the false part");
        return [prediction[4], Field(4)];
      })()
    );

    let max45 = Field(0);
    let classification45 = Field(0);
    [max45, classification45] = Circuit.if(
      max34.gt(prediction[5]),
      (() => {
        // TRUE
        console.log('we are in the circuit if, current max is');
        return [max34, classification34];
      })(),
      (() => {
        // FALSE
        console.log("we're in the false part");
        return [prediction[5], Field(5)];
      })()
    );

    let max56 = Field(0);
    let classification56 = Field(0);

    [max56, classification56] = Circuit.if(
      max45.gt(prediction[6]),
      (() => {
        // TRUE
        console.log('we are in the circuit if, current max is');
        return [max45, classification45];
      })(),
      (() => {
        // FALSE
        console.log("we're in the false part");
        return [prediction[6], Field(6)];
      })()
    );

    let max67 = Field(0);
    let classification67 = Field(0);
    [max67, classification67] = Circuit.if(
      max56.gt(prediction[7]),
      (() => {
        // TRUE
        console.log('we are in the circuit if, current max is');
        return [max56, classification56];
      })(),
      (() => {
        // FALSE
        console.log("we're in the false part");
        return [prediction[7], Field(7)];
      })()
    );

    let max78 = Field(0);
    let classification78 = Field(0);
    [max78, classification78] = Circuit.if(
      max67.gt(prediction[8]),
      (() => {
        // TRUE
        console.log('we are in the circuit if, current max is');
        return [max67, classification67];
      })(),
      (() => {
        // FALSE
        console.log("we're in the false part");

        return [prediction[8], Field(8)];
      })()
    );

    let max89 = Field(0);
    let classification89 = Field(0);
    [max89, classification89] = Circuit.if(
      max78.gt(prediction[9]),
      (() => {
        // TRUE
        console.log('we are in the circuit if, current max is');
        return [max78, classification78];
      })(),
      (() => {
        // FALSE
        console.log("we're in the false part");
        return [prediction[9], Field(9)];
      })()
    );

    console.log('max12 is', max89.toString());
    console.log('classification89 is', classification89.toString());
    // for (let i = 0; i < prediction.length; i++) {
    //   // console.log('x is', Field(x[i].toString()));
    //   let checkSize = Field(prediction[i].toString()).gt(max);
    //   console.log('max is', max.toString());
    //   console.log('x[i] is', Field(prediction[i].toString()).toString());
    //   // console.log('classification is', classification.toString());
    //   console.log('checkSize is', checkSize.toBoolean());

    //   // const classification1 = Circuit.if(
    //   //   Field(x[i].toString()).gt(max),
    //   //   () => {
    //   //     // (max = Field(x[i].toString())),
    //   //     //   (classification = Field(i)),
    //   //     //   console.log('classification is', classification.toString()),
    //   //     //   console.log('max in circuit if is', max.toString());
    //   //     return Field(i);
    //   //   },
    //   //   () => {
    //   //     return classification;
    //   //   }
    //   // );

    //   max = Circuit.if(
    //     Field(prediction[i].toString()).gt(max),
    //     (() => {
    //       // TRUE
    //       max = Field(prediction[i].toString());
    //       console.log(
    //         'we are in the circuit if, current max is',
    //         max.toString()
    //       );
    //       return max;
    //     })(),
    //     (() => {
    //       // FALSE
    //       console.log("we're in the false part");
    //       return max;
    //     })()
    //   );
    //   console.log("we're out of the circuit if", max.toString());
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

    // prediction = currentModel.predict(input);
    // let comparison = Field(0);
    // let max = new Field(0);
    // let classes = new Field(0);
    // for (let i = 0; i < 10; i++) {
    //   // for (let i = 0; i < 10; i++) {
    //   // Circuit.if (prediction[i].gt(max)) {
    //   //   max = prediction[i];
    //   //   // classes = Field(i);
    //   console.log('prediction[i]: ', prediction);
    //   console.log('prediction[i] to string: ', prediction.toString());
    //   console.log('prediction[i] type', typeof prediction);
    //   console.log('prediction[i] type', typeof Field(prediction));
    //   let test = Field(prediction);
    //   console.log('test: ', test);
    // console.log(Field(prediction[i]).gt(max));
    // Circuit.if(
    //   test.gt(max),
    //   (() => {
    //     // TRUE
    //     max = test;
    //   })(),
    //   (() => {
    //     // FALSE
    //     max = max;
    //   })()
    // );
    // }
  }

  // console.log('Classification of', i, ': ', x[i].toString(), '%');
  // let checkSize = comparison.gt(new Field(prediction[i].toString()));
  // Circuit.if(checkSize, (max = prediction[i]), (max = max));

  //   let delta = x[i].sub(max);
  //   output[i] = Circuit.if(
  //     delta.sgn.equals(Sign.one).toBoolean(),
  //     Bool(true),
  //     Bool(false)
  //   );
  // }
  // console.log('Classification result is: ', classes.toString());
  // this.state.set(classes);
  // }
}
