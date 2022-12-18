/**
 * This script can be used to interact with the Add contract, after deploying it.
 *
 * We call the update() method on the contract, create a proof and send it to the chain.
 * The endpoint that we interact with is read from your config.json.
 *
 * This simulates a user interacting with the zkApp from a browser, except that here, sending the transaction happens
 * from the script and we're using your pre-funded zkApp account to pay the transaction fee. In a real web app, the user's wallet
 * would send the transaction and pay the fee.
 *
 * To run locally:
 * Build the project: `$ npm run build`
 * Run with node:     `$ node build/src/interact.js <network>`.
 */
import { Field, Mina, Poseidon, PrivateKey, shutdown } from 'snarkyjs';
import fs from 'fs/promises';
import { SmartSnarkyNet } from './SmartSnarkyNet.js';
import { SnarkyLayer1, SnarkyLayer2 } from './snarkyLayer.js';
import { weights_l1_5x5 } from './assets/weights_l1_5x5.js';
import { weights_l2_5x5 } from './assets/weights_l2_5x5.js';
import { num2Field_t1, num2Field_t2 } from './utils/scaledWeights2Int65.js';
import { InputImage } from './inputImage.js';
import { image_0_label_7_5x5 } from './assets/image_0_label_7_5x5.js';
import { image_2_label_1_5x5 } from './assets/image_2_label_1_5x5.js';
import { image_1_label_2_5x5 } from './assets/image_1_label_2_5x5.js';
import { image_3_label_0_5x5 } from './assets/image_3_label_0_5x5.js';
import { image_0_label_7_8x8 } from './assets/image_0_label_7_8x8.js';
import { weights_l1_8x8 } from './assets/weights_l1_8x8.js';
import { weights_l2_8x8 } from './assets/weights_l2_8x8.js';

// check command line arg
let network = process.argv[2];
if (!network)
  throw Error(`Missing <network> argument.

Usage:
node build/src/interact.js <network>

Example:
node build/src/interact.js berkeley
`);
Error.stackTraceLimit = 1000;

// parse config and private key from file
type Config = { networks: Record<string, { url: string; keyPath: string }> };
let configJson: Config = JSON.parse(await fs.readFile('config.json', 'utf8'));
let config = configJson.networks[network];
let key: { privateKey: string } = JSON.parse(
  await fs.readFile(config.keyPath, 'utf8')
);
let zkAppKey = PrivateKey.fromBase58(key.privateKey);
console.log('zkAppKey', zkAppKey.toPublicKey().toString());

// set up Mina instance and contract we interact with
const Network = Mina.Network(config.url);
Mina.setActiveInstance(Network);
let zkAppAddress = zkAppKey.toPublicKey();
let zkApp = new SmartSnarkyNet(zkAppAddress);

// compile the contract to create prover keys
console.log('compile the contract...');
await SmartSnarkyNet.compile();
console.log('zkapp compiled');

// ------------------ init layers ------------------
let snarkyLayer1s = new SnarkyLayer1(preprocessWeights(weights_l1_8x8), 'relu');

let snarkyLayer2s = new SnarkyLayer2(
  preprocessWeights(weights_l2_8x8),
  'softmax'
);
// // ------------------ send transaction ------------------
// console.log('build transaction and create proof...');
// let txInit = await Mina.transaction(
//   { feePayerKey: zkAppKey, fee: 0.1e9 },
//   () => {
//     zkApp.initState(snarkyLayer1s, snarkyLayer2s);
//     zkApp.sign(zkAppKey);
//   }
// );
// // await txInit.prove();
// await txInit.sign();
// console.log('send transaction...');
// let sentTxInit = await txInit.send();

// if (sentTxInit.hash() !== undefined) {
//   console.log(`
// Success! Init transaction sent.

// Your smart contract state will be updated
// as soon as the transaction is included in a block:
// https://berkeley.minaexplorer.com/transaction/${sentTxInit.hash()}
// `);
// }

// ------------------ load weights and image ------------------
// call predict() and send transaction
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

// ------------------ send transaction ------------------
console.log('build transaction and create proof...');
let tx = await Mina.transaction({ feePayerKey: zkAppKey, fee: 0.2e9 }, () => {
  zkApp.predict(
    new InputImage(preprocessImage(image_0_label_7_8x8)),
    snarkyLayer1s,
    snarkyLayer2s
  );
});
await tx.prove();
// await tx.sign();
console.log('proof created');
console.log('send transaction...');
let sentTx = await tx.send();

if (sentTx.hash() !== undefined) {
  console.log(`
Success! Update transaction sent.

Your smart contract state will be updated
as soon as the transaction is included in a block:
https://berkeley.minaexplorer.com/transaction/${sentTx.hash()}
`);
}
shutdown();
