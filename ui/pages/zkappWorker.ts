import {
  Mina,
  isReady,
  PublicKey,
  PrivateKey,
  Field,
  fetchAccount,
} from 'snarkyjs'

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>

// ---------------------------------------------------------------------------------------

import type { SmartSnarkyNet } from '../../contracts/src/smartSnarkyNet'
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
  inputImage: null as null | InputImage,
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
      '../../contracts/build/src/smartSnarkynet.js'
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

  // loadModel: async (args: {}) => {
  //   const { SnarkyNet } = await import('../../contracts/build/src/snarkyNet.js')
  //   return SnarkyNet
  // },

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
    console.log('in initLayer1')
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

  createUpdateTransaction: async (args: {
    selectedImage: Array<Field>
    weights_l1_8x8: Array<Field>[]
    weights_l2_8x8: Array<Field>[]
  }) => {
    // layer1_state.layer1 = new layer1_state.SnarkyLayer1!(
    //   args.weights_l1_8x8,
    //   'relu',
    // )

    // layer2_state.layer2 = new layer2_state.SnarkyLayer2!(
    //   args.weights_l2_8x8,
    //   'softmax',
    // )
    const selectedImage = new inputImage_state.InputImage!(args.selectedImage)

    const transaction = await Mina.transaction(() => {
      state.zkapp!.predict(
        selectedImage,
        layer1_state.layer1,
        layer2_state.layer2,
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
