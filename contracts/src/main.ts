import {
  isReady,
  Mina,
  PrivateKey,
  fetchAccount,
  shutdown,
  Field,
  UInt64,
  AccountUpdate,
  setGraphqlEndpoint,
} from 'snarkyjs';

await isReady;

import { SmartSnarkyNet } from './SmartSnarkyNet.js';
import { SnarkyNet } from './snarkynet.js';
import { SnarkyLayer1, SnarkyLayer2 } from './snarkyLayer.js';
import { weights_l1 } from './assets/weights_l1_scaled_3_10x10.js';
import { weights_l2 } from './assets/weights_l2_scaled_3_10x10.js';
import { scaleImage } from './utils/preprocessingWeightsFloat2Int.js';

import {
  image_0_label_7,
  image_1_label_2,
  image_2_label_1,
  image_3_label_0,
  image_4_label_4,
  image_5_label_1,
  image_6_label_4,
  image_7_label_9,
  image_9_label_9,
  image_10_label_0,
} from './assets/test_images_10x10.js';

import { deploy } from './utils/deploy.js';
import { makeAndSendTransaction } from './utils/utils.js';
import { num2Field_t2 } from './utils/scaledWeights2Int65.js';

const initialBalance = 10_000_000;

function preprocessWeights(weightsScaled: number[][]): Array<Field>[] {
  const weights_l1_preprocessed = num2Field_t2(weightsScaled);
  // const weights_l2_preprocessed = await num2Field_t2(weights_l2);
  return weights_l1_preprocessed;
}

async function localDeploy(
  zkAppInstance: SmartSnarkyNet,
  zkAppPrivatekey: PrivateKey,
  deployerAccount: PrivateKey
  // initial: Field
) {
  const txn = await Mina.transaction(deployerAccount, () => {
    AccountUpdate.fundNewAccount(deployerAccount, { initialBalance });
    zkAppInstance.deploy({ zkappKey: zkAppPrivatekey });
    // zkAppInstance.init(initial);
    zkAppInstance.sign(zkAppPrivatekey);
  });
  await txn.send();
}

export async function runSnarkNet() {
  // Wait for it to be ready
  await isReady;

  // get current time
  let startTime = new Date().getTime() / 1000;
  console.log('Ready');

  // Local instance of Mina
  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);

  // create two accounts
  const account1 = Local.testAccounts[0].privateKey;
  const account2 = Local.testAccounts[1].privateKey;

  const zkappPrivkey = PrivateKey.fromBase58(
    'EKEksspc7D7suPXs8rPf7Lb9h6NVk3j4QFeU6ufQnDg5cU8dGSsw'
  );
  const zkappPubkey = zkappPrivkey.toPublicKey();
  console.log('zkappPubkey', zkappPubkey.toBase58());
  let transactionFee = 100_000_000;

  // weights for the model
  console.log('Create Layers', new Date().getTime() / 1000 - startTime);
  // let layers = [
  //   new SnarkyLayer1(preprocessWeights(weights_l1), 'relu'),
  //   new SnarkyLayer2(preprocessWeights(weights_l2), 'softmax'),
  // ];

  // let snarkyLayer1s = new SnarkyLayer1(preprocessWeights(weights_l1), 'relu');

  // let snarkyLayer2s = new SnarkyLayer2(
  //   preprocessWeights(weights_l2),
  //   'softmax'
  // );
  // create an instance of the model
  console.log('Create SNAPP Instance', new Date().getTime() / 1000 - startTime);

  // let snappInstance: SmartSnarkyNet;

  // // Deploys the snapp
  console.log('Deploy the SNAPP', new Date().getTime() / 1000 - startTime);
  // await Mina.transaction(account1, async () => {
  //   // account2 sends 1000000000 to the new snapp account
  //   const amount = UInt64.from(1000000000);
  //   const p = await AccountUpdate.createSigned(account2);
  //   p.balance.subInPlace(amount);

  //   // deploy the SNAPP with the weights
  //   console.log('Deploy SnarkyNet', new Date().getTime() / 1000 - startTime);
  //   snappInstance = new SmartSnarkyNet(
  //     amount,
  //     snappPubkey,
  //     new SnarkyNet(layers)
  //   );
  // })
  //   .send()
  //   .wait();
  let zkapp = new SmartSnarkyNet(
    // new UInt64(1000000000),
    zkappPubkey
    // new SnarkyNet([snarkyLayer1s, snarkyLayer2s])
  );
  console.log('Compiling smart contract...');
  let { verificationKey } = await SmartSnarkyNet.compile();
  console.log('smart contract compiled...');

  // await deploy(
  //   // deployerPrivateKey,
  //   account1,
  //   // zkAppPrivateKey,
  //   zkappPrivkey,
  //   // zkAppPublicKey,
  //   zkappPubkey,
  //   // zkapp,
  //   zkapp,
  //   verificationKey
  // );

  const zkAppInstance = new SmartSnarkyNet(zkappPubkey);
  localDeploy(zkAppInstance, zkappPrivkey, account1);
  console.log('Deployed');
  //////////////////////////////// Test 1 ////////////////////////////////
  // console.log(
  //   'Test 1 - Start: Run prediction on image_4:',
  //   new Date().getTime() / 1000 - startTime
  // );

  console.log('build transaction and create proof...');
  let tx = await Mina.transaction(
    { feePayerKey: zkappPrivkey, fee: 0.1e9 },
    () => {
      zkAppInstance.classification.get();
    }
  );
  await tx.prove();
  console.log('send transaction...');
  let sentTx = await tx.send();
  console.log('wait for transaction...', sentTx);
  if (sentTx.hash() !== undefined) {
    console.log(`
Success! Update transaction sent.`);
  }
  // await makeAndSendTransaction({
  //   feePayerPrivateKey: zkappPrivkey,
  //   zkAppPublicKey: zkappPubkey,
  //   mutateZkApp: () =>
  //     zkapp.predict(new ImageVector(scaleImage(image_3_label_0))),
  //   transactionFee: transactionFee,
  //   getState: () => zkapp.state.get(),
  //   statesEqual: (num1, num2) => num1.equals(num2).toBoolean(),
  // });

  // await Mina.transaction(account1, async () => {
  //   await snappInstance.predict([image_a_7]);
  // })
  //   .send()
  //   .wait()
  //   .catch((e) => console.log(e));
  console.log('Test 1 - End', new Date().getTime() / 1000 - startTime);
  // const a = await Mina.getAccount(snappPubkey);
  // // console.log('Class State:', a.snapp.appState[0].toString());

  await fetchAccount({ publicKey: zkappPubkey });
  let state = await zkapp.classification.get();
  console.log('Class State after the update:', state.toString());
  // Shutdown
  shutdown();
}

// export async function createModel() {
//   let layers = [
//     new SnarkyLayer1(preprocessWeights(weights_l1), 'relu'),
//     new SnarkyLayer2(preprocessWeights(weights_l2), 'softmax'),
//   ];
//   console.log(layers);
// }

console.log('Start');
await runSnarkNet();
// await createModel();

console.log('End');
