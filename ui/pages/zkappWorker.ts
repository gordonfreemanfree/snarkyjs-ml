import {
  Mina,
  isReady,
  PublicKey,
  PrivateKey,
  Field,
  fetchAccount,
} from 'snarkyjs'

import { weights_l1_8x8 } from '../public/weights_l1_8x8'
import { weights_l2_8x8 } from '../public/weights_l2_8x8'

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

    const weights_l1_8x8 = [
      [
        Field(0),
        Field(277),
        Field(353),
        Field(0),
        Field(21),
        Field(262),
        Field(0),
        Field(0),
        Field(196),
        Field(282),
      ],
      [
        Field(0),
        Field(2494),
        Field(1097),
        Field(1),
        Field(1),
        Field(387),
        Field(0),
        Field(1),
        Field(942),
        Field(2215),
      ],
      [
        Field(0),
        Field(12567),
        Field(4751),
        Field(1),
        Field(2),
        Field(443),
        Field(1),
        Field(2),
        Field(1839),
        Field(4803),
      ],
      [
        Field(0),
        Field(17341),
        Field(8278),
        Field(0),
        Field(1825),
        Field(2115),
        Field(0),
        Field(15),
        Field(2161),
        Field(6257),
      ],
      [
        Field(0),
        Field(14890),
        Field(5036),
        Field(5),
        Field(7),
        Field(1327),
        Field(1951),
        Field(7),
        Field(115),
        Field(3851),
      ],
      [
        Field(0),
        Field(12545),
        Field(8302),
        Field(0),
        Field(2),
        Field(5600),
        Field(0),
        Field(13),
        Field(3516),
        Field(10706),
      ],
      [
        Field(0),
        Field(7660),
        Field(5674),
        Field(0),
        Field(0),
        Field(3501),
        Field(0),
        Field(0),
        Field(4313),
        Field(7980),
      ],
      [
        Field(0),
        Field(1354),
        Field(1279),
        Field(0),
        Field(256),
        Field(0),
        Field(0),
        Field(0),
        Field(47),
        Field(493),
      ],
      [
        Field(0),
        Field(1237),
        Field(611),
        Field(413),
        Field(347),
        Field(0),
        Field(966),
        Field(1),
        Field(0),
        Field(200),
      ],
      [
        Field(1),
        Field(21),
        Field(1374),
        Field(1961),
        Field(2439),
        Field(1333),
        Field(2500),
        Field(837),
        Field(11),
        Field(496),
      ],
      [
        Field(24),
        Field(448),
        Field(2696),
        Field(3),
        Field(1830),
        Field(947),
        Field(7),
        Field(2018),
        Field(1534),
        Field(1825),
      ],
      [
        Field(29),
        Field(1356),
        Field(514),
        Field(352),
        Field(968),
        Field(6),
        Field(1054),
        Field(1276),
        Field(364),
        Field(853),
      ],
      [
        Field(314),
        Field(2021),
        Field(15),
        Field(525),
        Field(1217),
        Field(3),
        Field(818),
        Field(1325),
        Field(1143),
        Field(1128),
      ],
      [
        Field(621),
        Field(1925),
        Field(5),
        Field(0),
        Field(888),
        Field(1402),
        Field(1342),
        Field(1001),
        Field(1192),
        Field(1214),
      ],
      [
        Field(2293),
        Field(2588),
        Field(5),
        Field(2),
        Field(374),
        Field(3416),
        Field(2614),
        Field(973),
        Field(630),
        Field(727),
      ],
      [
        Field(3909),
        Field(5),
        Field(2),
        Field(4),
        Field(0),
        Field(3747),
        Field(306),
        Field(7865),
        Field(193),
        Field(5001),
      ],
      [
        Field(5415),
        Field(1),
        Field(7699),
        Field(12),
        Field(1964),
        Field(0),
        Field(561),
        Field(0),
        Field(0),
        Field(0),
      ],
      [
        Field(10),
        Field(4),
        Field(3013),
        Field(394),
        Field(2927),
        Field(218),
        Field(2993),
        Field(1879),
        Field(1657),
        Field(509),
      ],
      [
        Field(1304),
        Field(32),
        Field(1542),
        Field(514),
        Field(973),
        Field(173),
        Field(5),
        Field(1889),
        Field(1429),
        Field(1016),
      ],
      [
        Field(1667),
        Field(1009),
        Field(11),
        Field(1370),
        Field(8),
        Field(78),
        Field(193),
        Field(631),
        Field(189),
        Field(45),
      ],
      [
        Field(1766),
        Field(1664),
        Field(751),
        Field(2401),
        Field(1130),
        Field(5),
        Field(1833),
        Field(126),
        Field(77),
        Field(753),
      ],
      [
        Field(2069),
        Field(8),
        Field(374),
        Field(1955),
        Field(2415),
        Field(782),
        Field(1933),
        Field(1698),
        Field(771),
        Field(3),
      ],
      [
        Field(2734),
        Field(41),
        Field(49),
        Field(3),
        Field(1024),
        Field(1337),
        Field(1657),
        Field(1980),
        Field(19),
        Field(446),
      ],
      [
        Field(9220),
        Field(3),
        Field(7),
        Field(0),
        Field(0),
        Field(3429),
        Field(1909),
        Field(12940),
        Field(28),
        Field(5885),
      ],
      [
        Field(8232),
        Field(0),
        Field(8726),
        Field(7),
        Field(6606),
        Field(0),
        Field(8421),
        Field(0),
        Field(0),
        Field(0),
      ],
      [
        Field(2888),
        Field(16),
        Field(773),
        Field(1847),
        Field(5),
        Field(1187),
        Field(1122),
        Field(10),
        Field(1487),
        Field(515),
      ],
      [
        Field(3476),
        Field(13),
        Field(498),
        Field(1265),
        Field(199),
        Field(2543),
        Field(11),
        Field(23),
        Field(1940),
        Field(1029),
      ],
      [
        Field(2346),
        Field(200),
        Field(3),
        Field(71),
        Field(311),
        Field(2173),
        Field(1183),
        Field(3),
        Field(1523),
        Field(1982),
      ],
      [
        Field(104),
        Field(14),
        Field(1041),
        Field(2216),
        Field(3),
        Field(785),
        Field(3231),
        Field(723),
        Field(1434),
        Field(423),
      ],
      [
        Field(771),
        Field(16),
        Field(1041),
        Field(1971),
        Field(1719),
        Field(323),
        Field(618),
        Field(63),
        Field(3254),
        Field(0),
      ],
      [
        Field(2007),
        Field(2038),
        Field(1675),
        Field(1083),
        Field(2084),
        Field(6),
        Field(20),
        Field(6),
        Field(5922),
        Field(429),
      ],
      [
        Field(3310),
        Field(2038),
        Field(28),
        Field(0),
        Field(1496),
        Field(7),
        Field(0),
        Field(6324),
        Field(6),
        Field(3187),
      ],
      [
        Field(2),
        Field(3),
        Field(17),
        Field(19),
        Field(2994),
        Field(0),
        Field(6568),
        Field(2),
        Field(0),
        Field(1676),
      ],
      [
        Field(853),
        Field(361),
        Field(629),
        Field(2009),
        Field(2327),
        Field(2289),
        Field(6),
        Field(6),
        Field(364),
        Field(11),
      ],
      [
        Field(1354),
        Field(1187),
        Field(426),
        Field(1265),
        Field(1942),
        Field(2658),
        Field(2),
        Field(331),
        Field(1287),
        Field(285),
      ],
      [
        Field(190),
        Field(1823),
        Field(6),
        Field(949),
        Field(688),
        Field(1233),
        Field(1114),
        Field(2056),
        Field(2400),
        Field(905),
      ],
      [
        Field(1),
        Field(346),
        Field(2111),
        Field(2162),
        Field(5),
        Field(2042),
        Field(2165),
        Field(1893),
        Field(1814),
        Field(7),
      ],
      [
        Field(1212),
        Field(67),
        Field(2112),
        Field(1271),
        Field(1705),
        Field(2190),
        Field(0),
        Field(758),
        Field(1349),
        Field(1495),
      ],
      [
        Field(1411),
        Field(892),
        Field(2029),
        Field(6),
        Field(1861),
        Field(2289),
        Field(165),
        Field(223),
        Field(498),
        Field(1870),
      ],
      [
        Field(2),
        Field(8462),
        Field(2966),
        Field(9),
        Field(5670),
        Field(137),
        Field(5),
        Field(3982),
        Field(32),
        Field(5),
      ],
      [
        Field(8),
        Field(2),
        Field(160),
        Field(3348),
        Field(5637),
        Field(0),
        Field(5700),
        Field(1),
        Field(0),
        Field(6220),
      ],
      [
        Field(1633),
        Field(728),
        Field(647),
        Field(1568),
        Field(3048),
        Field(695),
        Field(7),
        Field(4197),
        Field(8),
        Field(2356),
      ],
      [
        Field(707),
        Field(2335),
        Field(3),
        Field(184),
        Field(850),
        Field(2),
        Field(190),
        Field(1257),
        Field(1160),
        Field(859),
      ],
      [
        Field(912),
        Field(2952),
        Field(1273),
        Field(29),
        Field(304),
        Field(819),
        Field(1224),
        Field(565),
        Field(1231),
        Field(6),
      ],
      [
        Field(1),
        Field(803),
        Field(712),
        Field(477),
        Field(72),
        Field(837),
        Field(472),
        Field(275),
        Field(2),
        Field(320),
      ],
      [
        Field(324),
        Field(1697),
        Field(711),
        Field(480),
        Field(540),
        Field(584),
        Field(3),
        Field(990),
        Field(753),
        Field(2274),
      ],
      [
        Field(313),
        Field(2645),
        Field(9),
        Field(3),
        Field(672),
        Field(9),
        Field(517),
        Field(1716),
        Field(336),
        Field(2137),
      ],
      [
        Field(1),
        Field(10724),
        Field(5029),
        Field(2255),
        Field(6193),
        Field(5),
        Field(5),
        Field(6856),
        Field(5),
        Field(3),
      ],
      [
        Field(3),
        Field(3),
        Field(0),
        Field(4748),
        Field(7358),
        Field(3),
        Field(3065),
        Field(1329),
        Field(0),
        Field(5322),
      ],
      [
        Field(1136),
        Field(1464),
        Field(1003),
        Field(2097),
        Field(1761),
        Field(9),
        Field(2512),
        Field(1294),
        Field(0),
        Field(1296),
      ],
      [
        Field(1653),
        Field(1437),
        Field(399),
        Field(1798),
        Field(1433),
        Field(5),
        Field(1656),
        Field(1661),
        Field(7),
        Field(1027),
      ],
      [
        Field(1535),
        Field(794),
        Field(467),
        Field(128),
        Field(742),
        Field(4),
        Field(104),
        Field(417),
        Field(867),
        Field(1345),
      ],
      [
        Field(794),
        Field(457),
        Field(7),
        Field(0),
        Field(295),
        Field(10),
        Field(1264),
        Field(376),
        Field(398),
        Field(835),
      ],
      [
        Field(489),
        Field(951),
        Field(4),
        Field(1064),
        Field(756),
        Field(870),
        Field(1327),
        Field(2262),
        Field(652),
        Field(250),
      ],
      [
        Field(1303),
        Field(1774),
        Field(4),
        Field(2205),
        Field(309),
        Field(1644),
        Field(2),
        Field(3371),
        Field(533),
        Field(2),
      ],
      [
        Field(0),
        Field(4406),
        Field(1713),
        Field(728),
        Field(2447),
        Field(3),
        Field(9),
        Field(1585),
        Field(3),
        Field(0),
      ],
      [
        Field(0),
        Field(77),
        Field(0),
        Field(318),
        Field(305),
        Field(195),
        Field(356),
        Field(591),
        Field(94),
        Field(892),
      ],
      [
        Field(19),
        Field(0),
        Field(2575),
        Field(5674),
        Field(539),
        Field(12),
        Field(9),
        Field(0),
        Field(7),
        Field(1805),
      ],
      [
        Field(881),
        Field(6),
        Field(3330),
        Field(5053),
        Field(0),
        Field(499),
        Field(71),
        Field(23),
        Field(11),
        Field(4694),
      ],
      [
        Field(3317),
        Field(2),
        Field(2201),
        Field(4346),
        Field(1),
        Field(211),
        Field(7),
        Field(2334),
        Field(49),
        Field(3516),
      ],
      [
        Field(3641),
        Field(0),
        Field(2927),
        Field(5457),
        Field(13),
        Field(372),
        Field(0),
        Field(4418),
        Field(865),
        Field(2041),
      ],
      [
        Field(2587),
        Field(9),
        Field(1394),
        Field(5729),
        Field(0),
        Field(3),
        Field(533),
        Field(13),
        Field(14),
        Field(898),
      ],
      [
        Field(1423),
        Field(55),
        Field(0),
        Field(5264),
        Field(0),
        Field(258),
        Field(6),
        Field(11),
        Field(220),
        Field(427),
      ],
      [
        Field(17),
        Field(24),
        Field(393),
        Field(3),
        Field(98),
        Field(2),
        Field(0),
        Field(3),
        Field(2),
        Field(1),
      ],
    ]
    // const weights_l2_8x8 = [
    //   [
    //     Field(1553),
    //     Field(9),
    //     Field(6),
    //     Field(16),
    //     Field(287),
    //     Field(1365),
    //     Field(5),
    //     Field(1378),
    //     Field(1180),
    //     Field(578),
    //   ],
    //   [
    //     Field(1123),
    //     Field(1499),
    //     Field(1671),
    //     Field(53),
    //     Field(4),
    //     Field(496),
    //     Field(1591),
    //     Field(4),
    //     Field(517),
    //     Field(360),
    //   ],
    //   [
    //     Field(3),
    //     Field(6),
    //     Field(982),
    //     Field(441),
    //     Field(305),
    //     Field(13),
    //     Field(598),
    //     Field(2412),
    //     Field(10),
    //     Field(308),
    //   ],
    //   [
    //     Field(3),
    //     Field(315),
    //     Field(552),
    //     Field(1029),
    //     Field(490),
    //     Field(262),
    //     Field(4),
    //     Field(1119),
    //     Field(151),
    //     Field(1992),
    //   ],
    //   [
    //     Field(1964),
    //     Field(6),
    //     Field(1169),
    //     Field(1032),
    //     Field(310),
    //     Field(3),
    //     Field(5),
    //     Field(462),
    //     Field(4),
    //     Field(11),
    //   ],
    //   [
    //     Field(14),
    //     Field(7),
    //     Field(112),
    //     Field(5),
    //     Field(2012),
    //     Field(728),
    //     Field(1412),
    //     Field(5),
    //     Field(5),
    //     Field(741),
    //   ],
    //   [
    //     Field(3),
    //     Field(2752),
    //     Field(109),
    //     Field(930),
    //     Field(455),
    //     Field(425),
    //     Field(8),
    //     Field(352),
    //     Field(758),
    //     Field(2),
    //   ],
    //   [
    //     Field(3),
    //     Field(5),
    //     Field(1432),
    //     Field(854),
    //     Field(693),
    //     Field(1278),
    //     Field(14),
    //     Field(5),
    //     Field(1325),
    //     Field(260),
    //   ],
    //   [
    //     Field(292),
    //     Field(7),
    //     Field(5),
    //     Field(1),
    //     Field(1056),
    //     Field(2),
    //     Field(1174),
    //     Field(12),
    //     Field(1213),
    //     Field(875),
    //   ],
    //   [
    //     Field(598),
    //     Field(6),
    //     Field(5),
    //     Field(1804),
    //     Field(3),
    //     Field(1318),
    //     Field(921),
    //     Field(5),
    //     Field(485),
    //     Field(303),
    //   ],
    // ]

    layer1_state.layer1 = new layer1_state.SnarkyLayer1!(weights_l1_8x8, 'relu')

    layer2_state.layer2 = new layer2_state.SnarkyLayer2!(
      weights_l2_8x8,
      'softmax',
    )

    const imageArray_0 = [
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(3),
      Field(3),
      Field(3),
      Field(3),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(4),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(1),
      Field(1),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(4),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(3),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
      Field(3),
      Field(0),
      Field(0),
      Field(0),
      Field(0),
    ]
    console.log('inputImage_state.inputImage1', imageArray_0)

    inputImage_state.image1 = new inputImage_state.InputImage!(imageArray_0)
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
