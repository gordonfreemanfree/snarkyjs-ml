import { Mina, isReady, PublicKey, Field, fetchAccount } from 'snarkyjs'

// import { weights_l1_8x8 } from '../public/weights_l1_8x8'
// import { weights_l2_8x8 } from '../public/weights_l2_8x8'

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>

// ---------------------------------------------------------------------------------------

import type { SmartSnarkyNet } from '../../contracts/src/SmartSnarkyNet'
import type {
  SnarkyLayer1,
  SnarkyLayer2,
} from '../../contracts/src/snarkyLayer'
import type { InputImage } from '../../contracts/src/inputImage'

const state = {
  SmartSnarkyNet: null as null | typeof SmartSnarkyNet,
  zkapp: null as null | SmartSnarkyNet,
  transaction: null as null | Transaction,
}

const layer1_state = {
  SnarkyLayer1: null as null | typeof SnarkyLayer1,
  layer1: null as null | SnarkyLayer1,
}
const layer2_state = {
  SnarkyLayer2: null as null | typeof SnarkyLayer2,
  layer2: null as null | SnarkyLayer1,
}

const inputImage_state = {
  InputImage: null as null | typeof InputImage,
  image1: null as null | InputImage,
}

// ---------------------------------------------------------------------------------------

const functions = {
  loadSnarkyJS: async (args: {}) => {
    await isReady
  },
  setActiveInstanceToBerkeley: async (args: {}) => {
    const Berkeley = Mina.BerkeleyQANet(
      'https://proxy.berkeley.minaexplorer.com/graphql',
    )
    Mina.setActiveInstance(Berkeley)
  },
  loadContract: async (args: {}) => {
    const { SmartSnarkyNet } = await import(
      '../../contracts/build/src/SmartSnarkyNet.js'
    )
    state.SmartSnarkyNet = SmartSnarkyNet
  },

  loadLayer1: async (args: {}) => {
    const { SnarkyLayer1 } = await import(
      '../../contracts/build/src/snarkyLayer.js'
    )
    layer1_state.SnarkyLayer1 = SnarkyLayer1
  },

  loadLayer2: async (args: {}) => {
    const { SnarkyLayer2 } = await import(
      '../../contracts/build/src/snarkyLayer.js'
    )
    layer2_state.SnarkyLayer2 = SnarkyLayer2
  },

  loadInputImage: async (args: {}) => {
    const { InputImage } = await import(
      '../../contracts/build/src/inputImage.js'
    )
    inputImage_state.InputImage = InputImage
  },

  compileContract: async (args: {}) => {
    await state.SmartSnarkyNet!.compile()
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58)
    return await fetchAccount({ publicKey })
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58)
    state.zkapp = new state.SmartSnarkyNet!(publicKey)
  },
  getNum: async (args: {}) => {
    const currentNum = await state.zkapp!.classification.get()
    return JSON.stringify(currentNum.toJSON())
  },

  initLayer1: async (args: {
    weights_l1_8x8: Array<Field>[]
    activation: string
  }) => {
    let weight = args.weights_l1_8x8
    let activation = args.activation

    layer1_state.layer1 = new layer1_state.SnarkyLayer1!(weight, activation)
  },

  initLayer2: async (args: {
    weights_l2_8x8: Array<Field>[]
    activation: string
  }) => {
    layer2_state.layer2 = new layer2_state.SnarkyLayer2!(
      args.weights_l2_8x8,
      args.activation,
    )
  },

  initInputImage: async (args: { selectedImage: Array<Field> }) => {
    console.log('in initInputImage')
    inputImage_state.image1 = new inputImage_state.InputImage!(
      args.selectedImage,
    )
  },

  createPredictUpdateTransaction: async (args: {
    selectedImage: Array<Field>
    weights_l1_8x8: Array<Field>[]
    weights_l2_8x8: Array<Field>[]
  }) => {
    console.log('in createPredictUpdateTransaction')
    console.log('selectedImage is', args.selectedImage)
    console.log('weights_l1_8x8 is', args.weights_l1_8x8)
    console.log('weights_l2_8x8 is', args.weights_l2_8x8)

    layer1_state.layer1 = new layer1_state.SnarkyLayer1!(
      args.weights_l1_8x8,
      'relu',
    )

    layer2_state.layer2 = new layer2_state.SnarkyLayer2!(
      args.weights_l2_8x8,
      'softmax',
    )

    // const imageArray_0 = [
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(3),
    //   Field(3),
    //   Field(3),
    //   Field(3),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(4),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(1),
    //   Field(1),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(4),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(3),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(3),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    //   Field(0),
    // ]
    // console.log('inputImage_state.inputImage1', imageArray_0)

    inputImage_state.image1 = new inputImage_state.InputImage!(
      args.selectedImage,
    )
    console.log('inputImage_state.inputImage1', inputImage_state.image1)
    console.log('layer1_state.layer1', layer1_state.layer1)
    console.log('layer2_state.layer2', layer2_state.layer2)

    const transaction = await Mina.transaction(() => {
      state.zkapp!.predict(
        inputImage_state.image1!,
        layer1_state.layer1!,
        layer2_state.layer2!,
      )
    })
    state.transaction = transaction
    console.log('transaction', transaction)
  },
  proveUpdateTransaction: async (args: {}) => {
    await state.transaction!.prove()
  },
  getTransactionJSON: async (args: {}) => {
    return state.transaction!.toJSON()
  },
}

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions

export type ZkappWorkerRequest = {
  id: number
  fn: WorkerFunctions
  args: any
}

export type ZkappWorkerReponse = {
  id: number
  data: any
}
if (process.browser) {
  addEventListener(
    'message',
    async (event: MessageEvent<ZkappWorkerRequest>) => {
      const returnData = await functions[event.data.fn](event.data.args)

      const message: ZkappWorkerReponse = {
        id: event.data.id,
        data: returnData,
      }
      postMessage(message)
    },
  )
}
