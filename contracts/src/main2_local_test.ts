import { SmartSnarkyNet } from './smartSnarkyNet.js';
import { SnarkyLayer1, SnarkyLayer2 } from './snarkyLayer.js';
import { weights_l1_5x5 } from './assets/weights_l1_5x5.js';
import { weights_l2_5x5 } from './assets/weights_l2_5x5.js';
import { num2Field_t1, num2Field_t2 } from './utils/scaledWeights2Int65.js';
import { InputImage } from './inputImage.js';

import {
  isReady,
  shutdown,
  Field,
  Mina,
  PrivateKey,
  AccountUpdate,
} from 'snarkyjs';
import { image_0_label_7_5x5 } from './assets/image_0_label_7_5x5.js';
import { image_2_label_1_5x5 } from './assets/image_2_label_1_5x5.js';
import { image_1_label_2_5x5 } from './assets/image_1_label_2_5x5.js';
import { image_3_label_0_5x5 } from './assets/image_3_label_0_5x5.js';

(async function main() {
  await isReady;

  function preprocessWeights(weightsScaled: number[][]): Array<Field>[] {
    const weights_l1_preprocessed = num2Field_t2(weightsScaled);
    // const weights_l2_preprocessed = await num2Field_t2(weights_l2);
    return weights_l1_preprocessed;
  }

  function preprocessImage(image: number[]): Array<Field> {
    const imagePreprocessed = num2Field_t1(image);
    console.log('imagePreprocessed', imagePreprocessed.toString());
    return imagePreprocessed;
  }

  console.log('SnarkyJS loaded');

  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  const deployerAccount = Local.testAccounts[0].privateKey;

  const useProof = false;

  if (useProof) {
    SmartSnarkyNet.compile();
  }

  // ----------------------------------------------------

  // create a destination we will deploy the smart contract to
  const zkAppPrivateKey = PrivateKey.random();
  const zkAppAddress = zkAppPrivateKey.toPublicKey();

  // create an instance of Square - and deploy it to zkAppAddress
  const zkAppInstance = new SmartSnarkyNet(zkAppAddress);
  const deploy_txn = await Mina.transaction(deployerAccount, () => {
    AccountUpdate.fundNewAccount(deployerAccount);
    zkAppInstance.deploy({ zkappKey: zkAppPrivateKey });
    zkAppInstance.sign(zkAppPrivateKey);
  });
  await deploy_txn.send();

  // get the initial state of Square after deployment
  const num0 = zkAppInstance.classification.get();
  console.log('state after init:', num0.toString());

  // ----------------------------------------------------

  let snarkyLayer1s = new SnarkyLayer1(
    preprocessWeights(weights_l1_5x5),
    'relu'
  );

  let snarkyLayer2s = new SnarkyLayer2(
    preprocessWeights(weights_l2_5x5),
    'softmax'
  );
  // ----------------------------------------------------

  const txnInit = await Mina.transaction(deployerAccount, () => {
    zkAppInstance.initState(snarkyLayer1s, snarkyLayer2s);
    zkAppInstance.sign(zkAppPrivateKey);
  });
  await txnInit.send();
  console.log(
    'layer1 state after init:',
    zkAppInstance.layer1Hash.get().toString()
  );
  console.log(
    'layer1 state after init:',
    zkAppInstance.layer2Hash.get().toString()
  );
  // ----------------------------------------------------

  const txn1 = await Mina.transaction(deployerAccount, () => {
    zkAppInstance.predict(
      new InputImage(preprocessImage(image_0_label_7_5x5)),
      snarkyLayer1s,
      snarkyLayer2s
    );
    zkAppInstance.sign(zkAppPrivateKey);
  });
  await txn1.send();

  const classification1 = zkAppInstance.classification.get();
  console.log('state after txn1, should be 7:', classification1.toString());

  // ----------------------------------------------------

  // ----------------------------------------------------

  try {
    const txn2 = await Mina.transaction(deployerAccount, () => {
      zkAppInstance.predict(
        new InputImage(preprocessImage(image_1_label_2_5x5)),
        snarkyLayer1s,
        snarkyLayer2s
      );
      zkAppInstance.sign(zkAppPrivateKey);
    });
    await txn2.send();
  } catch (ex) {
    // console.log(ex.message);
    console.log("error, but it's ok");
  }
  const num2 = zkAppInstance.classification.get();
  console.log('classification after txn2, should be 2:', num2.toString());

  // ----------------------------------------------------
  // ----------------------------------------------------

  const txn3 = await Mina.transaction(deployerAccount, () => {
    zkAppInstance.predict(
      new InputImage(preprocessImage(image_3_label_0_5x5)),
      snarkyLayer1s,
      snarkyLayer2s
    );
    if (!useProof) {
      zkAppInstance.sign(zkAppPrivateKey);
    }
  });
  if (useProof) {
    await txn3.prove();
  }
  await txn3.send();

  const num3 = zkAppInstance.classification.get();
  console.log('classification after txn3, should be 0:', num3.toString());

  // ----------------------------------------------------

  //   try {
  //     const txn2 = await Mina.transaction(deployerAccount, () => {
  //       zkAppInstance.update(Field(75));
  //       zkAppInstance.sign(zkAppPrivateKey);
  //     });
  //     await txn2.send();
  //   } catch (ex) {
  //     console.log(ex.message);
  //   }
  //   const num2 = zkAppInstance.num.get();
  //   console.log('state after txn2:', num2.toString());

  //   // ----------------------------------------------------

  //   const txn3 = await Mina.transaction(deployerAccount, () => {
  //     zkAppInstance.update(Field(81));
  //     if (!useProof) {
  //       zkAppInstance.sign(zkAppPrivateKey);
  //     }
  //   });
  //   if (useProof) {
  //     await txn3.prove();
  //   }
  //   await txn3.send();

  //   const num3 = zkAppInstance.num.get();
  //   console.log('state after txn3:', num3.toString());

  //   // ----------------------------------------------------

  console.log('Shutting down');

  await shutdown();
})();
