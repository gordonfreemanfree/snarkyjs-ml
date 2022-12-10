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
} from 'snarkyjs';

// Import SnarkyNet and SnarkyLayers
import { SnarkyNet, SnarkyLayer } from './snarkynet.js';

// Import Field

let initialBalance = 10_000_000;

export class SmartSnarkyNet extends SmartContract {
  // Field State to store the classification
  @state(Field) state: State<Field>; // stored state for classification
  @state(Field) modelHash: State<Field>;
  model: SnarkyNet; // model object
  reward_balance: UInt64; // balance for the reward
  // @arrayProp(input, 784) input: Array<Field>[];

  deploy(args: DeployArgs) {
    super.deploy(args);
    this.setPermissions({
      ...Permissions.default(),
    });
    this.state.set(Field(0));
    this.modelHash.set(Field(1));
    this.balance.addInPlace(UInt64.from(initialBalance));
  }

  // constructor(initialBalance: UInt64, address: PublicKey, model: SnarkyNet) {
  //   super(address);
  //   // intial balance for the reward
  //   this.reward_balance = initialBalance;
  //   this.balance.addInPlace(this.reward_balance);

  //   // set the initial values
  //   this.state.set(Field(0));

  //   // set the model
  //   this.model = model;
  // }
  // array<T>(elementType, length): Provable<T[]>

  @method async predict(input: Array<Field>[]) {
    // run the model and obtain the predictions
    let prediction = this.model.predict(input);
    // let comparison = Field(0);
    let max = new Field(0);
    let classes = new Field(0);
    for (let i = 0; i < prediction.length; i++) {
      if (prediction[i].gt(max)) {
        max = prediction[i];
        classes = Field(i);
      }
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
    console.log('Classification result is: ', classes.toString());
    this.state.set(classes);
  }
}
