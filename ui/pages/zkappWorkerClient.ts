import { fetchAccount, PublicKey, PrivateKey, Field } from 'snarkyjs'

import type {
  ZkappWorkerRequest,
  ZkappWorkerReponse,
  WorkerFunctions,
} from './zkappWorker'

export default class ZkappWorkerClient {
  // ---------------------------------------------------------------------------------------

  loadSnarkyJS() {
    return this._call('loadSnarkyJS', {})
  }

  setActiveInstanceToBerkeley() {
    return this._call('setActiveInstanceToBerkeley', {})
  }

  loadContract() {
    return this._call('loadContract', {})
  }

  loadLayer1() {
    return this._call('loadLayer1', {})
  }

  loadLayer2() {
    return this._call('loadLayer2', {})
  }
  loadInputImage() {
    return this._call('loadInputImage', {})
  }

  initLayer1(args: { weights_l1_8x8: Array<Field>[]; activation: string }) {
    return this._call('initLayer1', { args })
  }

  initLayer2(args: { weights_l2_8x8: Array<Field>[]; activation: string }) {
    return this._call('initLayer2', { args })
  }
  initInputImage(args: { selectedImage: Array<Field> }) {
    return this._call('initInputImage', { args })
  }

  compileContract() {
    return this._call('compileContract', {})
  }

  fetchAccount({
    publicKey,
  }: {
    publicKey: PublicKey
  }): ReturnType<typeof fetchAccount> {
    const result = this._call('fetchAccount', {
      publicKey58: publicKey.toBase58(),
    })
    return result as ReturnType<typeof fetchAccount>
  }

  initZkappInstance(publicKey: PublicKey) {
    return this._call('initZkappInstance', {
      publicKey58: publicKey.toBase58(),
    })
  }

  async getNum(): Promise<Field> {
    const result = await this._call('getNum', {})
    return Field.fromJSON(JSON.parse(result as string))
  }

  createPredictUpdateTransaction(args: {
    selectedImage: Array<Field>
    weights_l1_8x8: Array<Field>[]
    weights_l2_8x8: Array<Field>[]
  }) {
    console.log('in createPredictUpdateTransaction zkaapWorkerClient')
    console.log(args.selectedImage)
    console.log(args.weights_l1_8x8)
    console.log(args.weights_l2_8x8)
    return this._call('createPredictUpdateTransaction', {
      selectedImage: args.selectedImage,
      weights_l1_8x8: args.weights_l1_8x8,
      weights_l2_8x8: args.weights_l2_8x8,
    })
  }

  proveUpdateTransaction() {
    return this._call('proveUpdateTransaction', {})
  }

  async getTransactionJSON() {
    const result = await this._call('getTransactionJSON', {})
    return result
  }

  // ---------------------------------------------------------------------------------------

  worker: Worker

  promises: {
    [id: number]: { resolve: (res: any) => void; reject: (err: any) => void }
  }

  nextId: number

  constructor() {
    this.worker = new Worker(new URL('./zkappWorker.ts', import.meta.url))
    this.promises = {}
    this.nextId = 0

    this.worker.onmessage = (event: MessageEvent<ZkappWorkerReponse>) => {
      this.promises[event.data.id].resolve(event.data.data)
      delete this.promises[event.data.id]
    }
  }

  _call(fn: WorkerFunctions, args: any) {
    return new Promise((resolve, reject) => {
      this.promises[this.nextId] = { resolve, reject }

      const message: ZkappWorkerRequest = {
        id: this.nextId,
        fn,
        args,
      }

      this.worker.postMessage(message)

      this.nextId++
    })
  }
}
