import {
  AccountUpdate,
  Field,
  isReady,
  Mina,
  PrivateKey,
  PublicKey,
  shutdown,
} from 'snarkyjs';

import { image_1_label_2 } from '../assets/image_1_label_2_10x10';
import { image_2_label_1 } from '../assets/image_2_label_1_10x10';
import { image_3_label_0 } from '../assets/image_3_label_0';
import { image_0_label_7 } from '../assets/test_images_5x5';

import { weights_l1_5x5 } from '../assets/weights_l1_5x5';
import { weights_l2_5x5 } from '../assets/weights_l2_5x5';

import { SmartSnarkyNet } from '../SmartSnarkyNet';
import { SnarkyNet } from '../snarkynet';
import { SnarkyLayer1, SnarkyLayer2 } from '../snarkyLayer';
import { num2Field_t1, num2Field_t2 } from '../utils/scaledWeights2Int65';
import { InputImage } from '../inputImage';
import { image_0_label_7_5x5 } from '../assets/image_0_label_7_5x5';

await isReady;

const initialBalance = 10_000_000;

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

function createLocalBlockchain() {
  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  return [
    Local.testAccounts[0].privateKey,
    Local.testAccounts[1].privateKey,
    Local.testAccounts[2].privateKey,
    Local.testAccounts[3].privateKey,
    Local.testAccounts[4].privateKey,
  ];
}

async function localDeploy(
  zkAppInstance: SmartSnarkyNet,
  zkAppPrivatekey: PrivateKey,
  deployerAccount: PrivateKey
) {
  const txn = await Mina.transaction(deployerAccount, () => {
    AccountUpdate.fundNewAccount(deployerAccount, { initialBalance });
    zkAppInstance.deploy({ zkappKey: zkAppPrivatekey });
    // zkAppInstance.init(initial);
    zkAppInstance.sign(zkAppPrivatekey);
  });
  await txn.send();
}

describe('SmartSnarkyNet', () => {
  let deployerAccount: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey;
  let bob: PrivateKey;
  let alice: PrivateKey;
  let charlie: PrivateKey;
  let olivia: PrivateKey;
  // let mallory: PrivateKey;

  beforeEach(async () => {
    await isReady;
    [
      deployerAccount,
      bob,
      alice,
      charlie,
      olivia,
      // mallory,
    ] = createLocalBlockchain();
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    // fundAccounts(bob);
    // fundAccounts(alice);
    // fundAccounts(charlie);
    // fundAccounts(olivia);
    // fundAccounts(mallory);
  });
  afterAll(async () => {
    // `shutdown()` internally calls `process.exit()` which will exit the running Jest process early.
    // Specifying a timeout of 0 is a workaround to defer `shutdown()` until Jest is done running all tests.
    // This should be fixed with https://github.com/MinaProtocol/mina/issues/10943
    setTimeout(shutdown, 0);
  });

  it('generates and deploys the `Multisignature` smart contract', async () => {
    const zkAppInstance = new SmartSnarkyNet(zkAppAddress);
    let initial = Field.zero;
    await localDeploy(zkAppInstance, zkAppPrivateKey, deployerAccount);
    // const state = zkAppInstance.state.get();
    // expect(state).toEqual(Field(0));
  });

  it('call predict', async () => {
    const zkAppInstance = new SmartSnarkyNet(zkAppAddress);
    let initial = Field.zero;
    await localDeploy(zkAppInstance, zkAppPrivateKey, deployerAccount);
    let snarkyLayer1s = new SnarkyLayer1(
      preprocessWeights(weights_l1_5x5),
      'relu'
    );

    let snarkyLayer2s = new SnarkyLayer2(
      preprocessWeights(weights_l2_5x5),
      'softmax'
    );
    // create an instance of the model

    let model = new SnarkyNet([snarkyLayer1s, snarkyLayer2s]);
    // const state = zkAppInstance.state.get();
    // expect(state).toEqual(Field(0));
    let pred = zkAppInstance.predict(
      new InputImage(preprocessImage(image_0_label_7_5x5)),
      snarkyLayer1s,
      snarkyLayer2s
    );
  });
});
