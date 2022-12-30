"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[292,559,896],{

/***/ 6292:
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(__webpack_module__, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SmartSnarkyNet": function() { return /* binding */ SmartSnarkyNet; }
/* harmony export */ });
/* harmony import */ var snarkyjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6400);
/* harmony import */ var _snarkyLayer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8559);
/* harmony import */ var _inputImage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3896);
/* harmony import */ var _snarkynet_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7101);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_snarkyLayer_js__WEBPACK_IMPORTED_MODULE_1__, _snarkynet_js__WEBPACK_IMPORTED_MODULE_3__]);
([_snarkyLayer_js__WEBPACK_IMPORTED_MODULE_1__, _snarkynet_js__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// Description: Smart Contract utilizing SnarkyNet and SnarkyLayers for an implmenetation of a Deep Neural Network
// for the MNIST Handwritten Digits Dataset: http://yann.lecun.com/exdb/mnist/
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




class SmartSnarkyNet extends snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .SmartContract */ .C3 {
    constructor() {
        super(...arguments);
        // Field State to store the classification
        this.classification = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .State */ .ZM)(); // stored state for classification
        this.layer1Hash = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .State */ .ZM)(); // stored state for classification
        this.layer2Hash = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .State */ .ZM)(); // stored state for classification
    }
    // model: SnarkyNet; // model object
    deploy(args) {
        super.deploy(args);
        this.setPermissions({
            ...snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Permissions["default"] */ .Pl["default"](),
            editState: snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Permissions.proofOrSignature */ .Pl.proofOrSignature(),
        });
        // this.balance.addInPlace(UInt64.from(10_000_000));
        this.classification.set((0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0));
        this.layer1Hash.set((0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0));
        this.layer2Hash.set((0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0));
    }
    // TODO: make this a real init method
    initState(layer1, layer2) {
        super.init();
        // Initialize contract state
        this.classification.set((0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0));
        this.layer1Hash.set(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Poseidon.hash */ .jm.hash(layer1.toFields()));
        this.layer2Hash.set(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Poseidon.hash */ .jm.hash(layer2.toFields()));
        // TODO:
        this.requireSignature();
    }
    predict(input, layer1, layer2) {
        // create the model
        let model = new _snarkynet_js__WEBPACK_IMPORTED_MODULE_3__/* .SnarkyNet */ .q([layer1, layer2]);
        // check that the layers are correct
        let layerState = this.classification.get();
        this.layer1Hash.assertEquals(layerState);
        this.layer1Hash.assertEquals(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Poseidon.hash */ .jm.hash(layer1.toFields()));
        // check that the layers are correct
        let layerState2 = this.classification.get();
        this.layer2Hash.assertEquals(layerState2);
        this.layer2Hash.assertEquals(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Poseidon.hash */ .jm.hash(layer2.toFields()));
        // run the model and obtain the predictions
        let currentModel = model;
        let prediction = currentModel.predict(input);
        console.log('prediction: ', prediction);
        // console.log('prediction to string: ', prediction.toString());
        let max01 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        let classification01 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        // find the max value and its index
        // TODO: make this a loop
        // there is a bug in the snarkyjs library that prevents this from working in a loop
        [max01, classification01] = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Circuit["if"] */ .dx["if"](prediction[0].gt(prediction[1]), (() => {
            // TRUE
            return [prediction[0], (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0)];
        })(), (() => {
            // FALSE
            classification01 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(1);
            return [prediction[1], (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(1)];
        })());
        let max12 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        let classification12 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        [max12, classification12] = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Circuit["if"] */ .dx["if"](max01.gt(prediction[2]), (() => {
            // TRUE
            return [max01, classification01];
        })(), (() => {
            // FALSE
            return [prediction[2], (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(2)];
        })());
        let max23 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        let classification23 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        [max23, classification23] = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Circuit["if"] */ .dx["if"](max12.gt(prediction[3]), (() => {
            // TRUE
            return [max12, classification12];
        })(), (() => {
            // FALSE
            return [prediction[3], (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(3)];
        })());
        let max34 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        let classification34 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        [max34, classification34] = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Circuit["if"] */ .dx["if"](max23.gt(prediction[4]), (() => {
            // TRUE
            return [max23, classification23];
        })(), (() => {
            // FALSE
            return [prediction[4], (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(4)];
        })());
        let max45 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        let classification45 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        [max45, classification45] = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Circuit["if"] */ .dx["if"](max34.gt(prediction[5]), (() => {
            // TRUE
            return [max34, classification34];
        })(), (() => {
            // FALSE
            return [prediction[5], (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(5)];
        })());
        let max56 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        let classification56 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        [max56, classification56] = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Circuit["if"] */ .dx["if"](max45.gt(prediction[6]), (() => {
            // TRUE
            return [max45, classification45];
        })(), (() => {
            // FALSE
            return [prediction[6], (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(6)];
        })());
        let max67 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        let classification67 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        [max67, classification67] = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Circuit["if"] */ .dx["if"](max56.gt(prediction[7]), (() => {
            // TRUE
            return [max56, classification56];
        })(), (() => {
            // FALSE
            return [prediction[7], (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(7)];
        })());
        let max78 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        let classification78 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        [max78, classification78] = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Circuit["if"] */ .dx["if"](max67.gt(prediction[8]), (() => {
            // TRUE
            return [max67, classification67];
        })(), (() => {
            // FALSE
            return [prediction[8], (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(8)];
        })());
        let max89 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        let classification89 = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(0);
        [max89, classification89] = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Circuit["if"] */ .dx["if"](max78.gt(prediction[9]), (() => {
            // TRUE
            return [max78, classification78];
        })(), (() => {
            // FALSE
            return [prediction[9], (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(9)];
        })());
        // ---------------------------- set the classification ----------------------------
        let classification = this.classification.get();
        this.classification.assertEquals(classification);
        this.classification.set(classification89);
    }
}
__decorate([
    (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .state */ .SB)(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN),
    __metadata("design:type", Object)
], SmartSnarkyNet.prototype, "classification", void 0);
__decorate([
    (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .state */ .SB)(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN),
    __metadata("design:type", Object)
], SmartSnarkyNet.prototype, "layer1Hash", void 0);
__decorate([
    (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .state */ .SB)(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN),
    __metadata("design:type", Object)
], SmartSnarkyNet.prototype, "layer2Hash", void 0);
__decorate([
    snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_snarkyLayer_js__WEBPACK_IMPORTED_MODULE_1__.SnarkyLayer1, _snarkyLayer_js__WEBPACK_IMPORTED_MODULE_1__.SnarkyLayer2]),
    __metadata("design:returntype", void 0)
], SmartSnarkyNet.prototype, "initState", null);
__decorate([
    snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_inputImage_js__WEBPACK_IMPORTED_MODULE_2__.InputImage,
        _snarkyLayer_js__WEBPACK_IMPORTED_MODULE_1__.SnarkyLayer1,
        _snarkyLayer_js__WEBPACK_IMPORTED_MODULE_1__.SnarkyLayer2]),
    __metadata("design:returntype", void 0)
], SmartSnarkyNet.prototype, "predict", null);
//# sourceMappingURL=SmartSnarkyNet.js.map
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3896:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputImage": function() { return /* binding */ InputImage; }
/* harmony export */ });
/* harmony import */ var snarkyjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6400);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// This is the class that will be used to store the image matrix
// the size of the matrix is 1x100
class InputImage extends snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .CircuitValue */ .wA {
    constructor(value) {
        super();
        this.value = this.num2Int64_t1(value);
    }
    num2Int64_t1(x) {
        let y = Array();
        x.forEach((value, index) => (y[index] = this.num2Int64(value)));
        return y;
    }
    num2Int64(x) {
        return (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(x);
    }
}
__decorate([
    (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .arrayProp */ .Ae)(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN, 64),
    __metadata("design:type", Array)
], InputImage.prototype, "value", void 0);
//# sourceMappingURL=inputImage.js.map

/***/ }),

/***/ 8559:
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(__webpack_module__, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnarkyLayer1": function() { return /* binding */ SnarkyLayer1; },
/* harmony export */   "SnarkyLayer2": function() { return /* binding */ SnarkyLayer2; }
/* harmony export */ });
/* harmony import */ var snarkyjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6400);
/* harmony import */ var _snarkyTensor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2655);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_snarkyTensor_js__WEBPACK_IMPORTED_MODULE_1__]);
_snarkyTensor_js__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// Description: SnarkyNet and SnarkyLayers allow for the implementation of a SnarkyJS
// version of a Deep Neural Network.
// SnarkyLayers are defined to represent the Dense Neural Network layers combined in
// SnarkyNet for prediction.
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// await isReady;
// create a layer
class SnarkyLayer1 extends _snarkyTensor_js__WEBPACK_IMPORTED_MODULE_1__/* .SnarkyTensor */ .J {
    constructor(weights, activation = 'relu', // default activation function
    alpha = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(10) // alread scaled by 1000
    ) {
        super();
        // this.scale_factor_Field = Field(10000000);
        // Activation Function
        this.activation = this.activation_selection(activation);
        // Set alpha
        // this.alpha = this.num2int65(alpha);
        this.alpha = alpha;
        // Weights
        this.weights = weights;
    }
    // // Description:   Perform a dot product for two rank 2 tensors of type Field
    // // Input:         m1 - Rank 2 Tensor of type Field
    // //                m2 - Rank 2 Tensor of type Field
    // // Output:        y - Dot product Rank 2 Tensor of type Field
    // dot_product_t2(m1: Array<Field>[], m2: Array<Field>[]): Array<Field>[] {
    //   console.log('in the dot product');
    //   // Perform a dot product on the two rank 2 tensors
    //   let y = Array();
    //   let m2_t = this.transpose(m2);
    //   // let m2_t = m2;
    //   for (let i = 0; i < m1.length; i++) {
    //     console.log('in the for loop', i);
    //     let m_array = Array();
    //     for (let j = 0; j < m2_t.length; j++) {
    //       console.log('in the for loop', j);
    //       m_array[j] = this.dot_product_t1(m1[i], m2_t[j]);
    //     }
    //     y[i] = m_array;
    //   }
    //   return y;
    // }
    // // Description:   Perform a dot product for two rank 1 tensors of type Field
    // // Input:         m1 - Rank 1 Tensor of type Field
    // //                m2 - Rank 1 Tensor of type Field
    // // Output:        y - Dot product Rank 0 Tensor of type Field
    // dot_product_t1(v1: Array<Field>, v2: Array<Field>): Field {
    //   let y = Field.zero;
    //   console.assert(
    //     v1.length === v2.length,
    //     "tensor dimensions do not fit, can't do dot_product_t1"
    //   );
    //   v1.forEach(
    //     (v1_value, i) =>
    //       // (y = y.add(v1_value.mul(v2[i]).div(this.scale_factor_Field)))
    //       (y = y.add(v1_value.mul(v2[i])))
    //   );
    //   return y;
    // }
    // // Description:   Transpose a rank 2 tensor of type Field
    // // Input:         x - Rank 2 Tensor of type Field
    // // Output:        y - Transposed Rank 2 Tensor of type Field of x
    // transpose(x: Array<Field>[]): Array<Field>[] {
    //   // Transpose the rank 2 tensor
    //   let y = Array();
    //   for (let i = 0; i < x[0].length; i++) {
    //     let m_array = Array();
    //     for (let j = 0; j < x.length; j++) {
    //       m_array[j] = x[j][i];
    //     }
    //     y[i] = m_array;
    //   }
    //   return y;
    // }
    // exp_part(x: UInt64, y: number, z: number): UInt64 {
    //   // Portion of the Expotential Calculation
    //   // (x^y)/z
    //   let result = UInt64.from(x);
    //   result = result.div(UInt64.from(z));
    //   for (let i = 1; i < y; i++) {
    //     result = result.mul(x).div(UInt64.from(this.scale_factor_Field));
    //     result = result.mul(UInt64.from(x));
    //   }
    //   return result;
    // }
    // // Description:   Calculate the expotential
    // // Input:         Rank 0 Tensor of type Field for the power
    // // Output:        Rank 0 Tensor of type Field result of calculation
    // exp(x: UInt64): UInt64 {
    //   // Expotential Implementation
    //   // 1 + x + (x^2)/2 + (x^3)/6 + (x^4)/24 + (x^5)/120 + (x^6)/720 + (x^7)/5040
    //   // return this.num2Field(1)
    //   return UInt64.one
    //     .add(UInt64.from(x))
    //     .add(this.exp_part(x, 2, 2))
    //     .add(this.exp_part(x, 3, 6))
    //     .add(this.exp_part(x, 4, 24))
    //     .add(this.exp_part(x, 5, 120))
    //     .add(this.exp_part(x, 6, 720))
    //     .add(this.exp_part(x, 7, 5040));
    // }
    call(input) {
        console.log('in the call function');
        // Equivalent: output = activation( dot( input, weight ) )
        return this.activation_t2(this.dot_product_t2(input, this.weights));
    }
    // Select Activation Function
    activation_selection(activation) {
        // Select the activation function
        if (activation == 'relu') {
            return this.relu_t1;
        } // RelU Activation Function
        else if (activation == 'relu_leaky') {
            return this.relu_leaky_t1;
        } // Leaky RelU Activation Function
        else if (activation == 'softmax') {
            return this.softmax_t1;
        } // Softmax Activation Function
        // else if (activation == 'tayler') {
        //   return this.tayler;
        // }
        else {
            throw Error('Activation Function Not Valid');
        } // Invalid Activation Function
    }
    // Activation
    activation_t2(x) {
        console.log('in the activation_t2 function');
        // Applying activation functions for a rank 2 tensor
        let result = Array();
        // x.forEach((value, index) => (result[index] = this.activation(value)));
        x.forEach((value, index) => (result[index] = this.relu_t1(value)));
        return result;
    }
    // Activation Functions (implemented for rank 1 tensors)
    relu_t1(x) {
        // RelU implementation for an Array
        // Equivalent: result = max( x, 0 )
        let result = Array();
        x.forEach((value, i) => (result[i] = value));
        return result;
    }
    relu_leaky_t1(x) {
        // Leaky RelU implementation for an Array
        let result = Array();
        x.forEach((value, i) => (result[i] = value));
        return result;
    }
    softmax_t1(x) {
        // Softmax Implementation for an Array
        console.log('in the softmax_t1 function');
        console.log('x before exp part is', x.toString());
        let sum = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .UInt64.zero */ .zM.zero;
        let result = Array();
        // Equivalent: result = x / ( x1 + .. + xn )
        console.log('x before exp part is', x.toString());
        // preventing overflow
        let reduced_x = Array();
        x.forEach((value, i) => (reduced_x[i] = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .UInt64.from */ .zM.from(value).div(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .UInt64.from */ .zM.from(1000000))));
        console.log('x after overflow prevention is', reduced_x.toString());
        reduced_x.forEach((value) => console.log(this.exp(value).toString()));
        console.log('x after exp is', reduced_x.toString());
        // result returned as percentage
        reduced_x.forEach((value) => (sum = sum.add(this.exp(value))));
        console.log('sum is', sum.toString());
        reduced_x.forEach((value, i) => {
            let quotientAndRemainder = this.exp(value).divMod(sum);
            result[i] = quotientAndRemainder.rest;
        });
        console.log('result is', result.toString());
        return result;
    }
}
__decorate([
    (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .matrixProp */ .HM)(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN, 64, 10),
    __metadata("design:type", Array)
], SnarkyLayer1.prototype, "weights", void 0);
class SnarkyLayer2 extends _snarkyTensor_js__WEBPACK_IMPORTED_MODULE_1__/* .SnarkyTensor */ .J {
    constructor(weights, activation = 'relu', // default activation function
    alpha = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(10) // alread scaled by 1000
    ) {
        super();
        // this.scale_factor_Field = Field(10000000);
        // Activation Function
        this.activation = this.activation_selection(activation);
        // Set alpha
        // this.alpha = this.num2int65(alpha);
        this.alpha = alpha;
        // Weights
        this.weights = weights;
    }
    // // Description:   Perform a dot product for two rank 2 tensors of type Field
    // // Input:         m1 - Rank 2 Tensor of type Field
    // //                m2 - Rank 2 Tensor of type Field
    // // Output:        y - Dot product Rank 2 Tensor of type Field
    // dot_product_t2(m1: Array<Field>[], m2: Array<Field>[]): Array<Field>[] {
    //   console.log('in the dot product');
    //   // Perform a dot product on the two rank 2 tensors
    //   let y = Array();
    //   let m2_t = this.transpose(m2);
    //   // let m2_t = m2;
    //   for (let i = 0; i < m1.length; i++) {
    //     console.log('in the for loop', i);
    //     let m_array = Array();
    //     for (let j = 0; j < m2_t.length; j++) {
    //       console.log('in the for loop', j);
    //       m_array[j] = this.dot_product_t1(m1[i], m2_t[j]);
    //     }
    //     y[i] = m_array;
    //   }
    //   return y;
    // }
    // // Description:   Perform a dot product for two rank 1 tensors of type Field
    // // Input:         m1 - Rank 1 Tensor of type Field
    // //                m2 - Rank 1 Tensor of type Field
    // // Output:        y - Dot product Rank 0 Tensor of type Field
    // dot_product_t1(v1: Array<Field>, v2: Array<Field>): Field {
    //   let y = Field.zero;
    //   console.assert(
    //     v1.length === v2.length,
    //     "tensor dimensions do not fit, can't do dot_product_t1"
    //   );
    //   v1.forEach(
    //     (v1_value, i) =>
    //       // (y = y.add(v1_value.mul(v2[i]).div(this.scale_factor_Field)))
    //       (y = y.add(v1_value.mul(v2[i])))
    //   );
    //   return y;
    // }
    // // Description:   Transpose a rank 2 tensor of type Field
    // // Input:         x - Rank 2 Tensor of type Field
    // // Output:        y - Transposed Rank 2 Tensor of type Field of x
    // transpose(x: Array<Field>[]): Array<Field>[] {
    //   // Transpose the rank 2 tensor
    //   let y = Array();
    //   for (let i = 0; i < x[0].length; i++) {
    //     let m_array = Array();
    //     for (let j = 0; j < x.length; j++) {
    //       m_array[j] = x[j][i];
    //     }
    //     y[i] = m_array;
    //   }
    //   return y;
    // }
    // exp_part(x: UInt64, y: number, z: number): UInt64 {
    //   // Portion of the Expotential Calculation
    //   // (x^y)/z
    //   let result = UInt64.from(x);
    //   result = result.div(UInt64.from(z));
    //   for (let i = 1; i < y; i++) {
    //     result = result.mul(x).div(UInt64.from(this.scale_factor_Field));
    //     result = result.mul(UInt64.from(x));
    //   }
    //   return result;
    // }
    // // Description:   Calculate the expotential
    // // Input:         Rank 0 Tensor of type Field for the power
    // // Output:        Rank 0 Tensor of type Field result of calculation
    // exp(x: UInt64): UInt64 {
    //   // Expotential Implementation
    //   // 1 + x + (x^2)/2 + (x^3)/6 + (x^4)/24 + (x^5)/120 + (x^6)/720 + (x^7)/5040
    //   // return this.num2Field(1)
    //   return UInt64.one
    //     .add(UInt64.from(x))
    //     .add(this.exp_part(x, 2, 2))
    //     .add(this.exp_part(x, 3, 6))
    //     .add(this.exp_part(x, 4, 24))
    //     .add(this.exp_part(x, 5, 120))
    //     .add(this.exp_part(x, 6, 720))
    //     .add(this.exp_part(x, 7, 5040));
    // }
    call(input) {
        console.log('in the call function');
        // Equivalent: output = activation( dot( input, weight ) )
        return this.activation_t2(this.dot_product_t2(input, this.weights));
    }
    // Select Activation Function
    activation_selection(activation) {
        // Select the activation function
        if (activation == 'relu') {
            return this.relu_t1;
        } // RelU Activation Function
        else if (activation == 'relu_leaky') {
            return this.relu_leaky_t1;
        } // Leaky RelU Activation Function
        else if (activation == 'softmax') {
            return this.softmax_t1;
        } // Softmax Activation Function
        // else if (activation == 'tayler') {
        //   return this.tayler;
        // }
        else {
            throw Error('Activation Function Not Valid');
        } // Invalid Activation Function
    }
    // Activation
    activation_t2(x) {
        console.log('in the activation_t2 function');
        // Applying activation functions for a rank 2 tensor
        let result = Array();
        // x.forEach((value, index) => (result[index] = this.activation(value)));
        x.forEach((value, index) => (result[index] = this.relu_t1(value)));
        return result;
    }
    // Activation Functions (implemented for rank 1 tensors)
    relu_t1(x) {
        // RelU implementation for an Array
        // Equivalent: result = max( x, 0 )
        let result = Array();
        x.forEach((value, i) => (result[i] = value));
        return result;
    }
    relu_leaky_t1(x) {
        // Leaky RelU implementation for an Array
        let result = Array();
        x.forEach((value, i) => (result[i] = value));
        return result;
    }
    softmax_t1(x) {
        // Softmax Implementation for an Array
        console.log('in the softmax_t1 function');
        console.log('x before exp part is', x.toString());
        let sum = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .UInt64.zero */ .zM.zero;
        let result = Array();
        // Equivalent: result = x / ( x1 + .. + xn )
        console.log('x before exp part is', x.toString());
        // preventing overflow
        let reduced_x = Array();
        x.forEach((value, i) => (reduced_x[i] = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .UInt64.from */ .zM.from(value).div(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .UInt64.from */ .zM.from(1000000))));
        console.log('x after overflow prevention is', reduced_x.toString());
        reduced_x.forEach((value) => console.log(this.exp(value).toString()));
        console.log('x after exp is', reduced_x.toString());
        // result returned as percentage
        reduced_x.forEach((value) => (sum = sum.add(this.exp(value))));
        console.log('sum is', sum.toString());
        reduced_x.forEach((value, i) => {
            let quotientAndRemainder = this.exp(value).divMod(sum);
            result[i] = quotientAndRemainder.rest;
        });
        console.log('result is', result.toString());
        return result;
    }
}
__decorate([
    (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .matrixProp */ .HM)(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN, 10, 10),
    __metadata("design:type", Array)
], SnarkyLayer2.prototype, "weights", void 0);
//# sourceMappingURL=snarkyLayer.js.map
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2655:
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(__webpack_module__, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": function() { return /* binding */ SnarkyTensor; }
/* harmony export */ });
/* harmony import */ var snarkyjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6400);
// Description: SnarkyTensor allows for the methods utilized for manipulating tensors
// TODO: float to Field conversion is currently dependend on the Math library
// therefore it cannot be considered a pure snarkyJS implementation and so it is not secure.


await snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .isReady */ .DK;
class SnarkyTensor extends snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .CircuitValue */ .wA {
    constructor(power = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(10000000)) {
        // Multiplier for representing decimals
        // this.scale_factor = Math.pow(10, power);
        // this.scale_factor = power;
        super();
        this.scale_factor_Field = power;
    }
    // Description:   Perform a dot product for two rank 2 tensors of type Field
    // Input:         m1 - Rank 2 Tensor of type Field
    //                m2 - Rank 2 Tensor of type Field
    // Output:        y - Dot product Rank 2 Tensor of type Field
    dot_product_t2(m1, m2) {
        console.log('in the dot product');
        // Perform a dot product on the two rank 2 tensors
        let y = Array();
        let m2_t = this.transpose(m2);
        // let m2_t = m2;
        for (let i = 0; i < m1.length; i++) {
            console.log('in the for loop', i);
            let m_array = Array();
            for (let j = 0; j < m2_t.length; j++) {
                console.log('in the for loop', j);
                m_array[j] = this.dot_product_t1(m1[i], m2_t[j]);
            }
            y[i] = m_array;
        }
        return y;
    }
    // Description:   Perform a dot product for two rank 1 tensors of type Field
    // Input:         m1 - Rank 1 Tensor of type Field
    //                m2 - Rank 1 Tensor of type Field
    // Output:        y - Dot product Rank 0 Tensor of type Field
    dot_product_t1(v1, v2) {
        let y = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field.zero */ .gN.zero;
        console.assert(v1.length === v2.length, "tensor dimensions do not fit, can't do dot_product_t1");
        v1.forEach((v1_value, i) => 
        // (y = y.add(v1_value.mul(v2[i]).div(this.scale_factor_Field)))
        (y = y.add(v1_value.mul(v2[i]))));
        return y;
    }
    // Description:   Transpose a rank 2 tensor of type Field
    // Input:         x - Rank 2 Tensor of type Field
    // Output:        y - Transposed Rank 2 Tensor of type Field of x
    transpose(x) {
        // Transpose the rank 2 tensor
        let y = Array();
        for (let i = 0; i < x[0].length; i++) {
            let m_array = Array();
            for (let j = 0; j < x.length; j++) {
                m_array[j] = x[j][i];
            }
            y[i] = m_array;
        }
        return y;
    }
    exp_part(x, y, z) {
        // Portion of the Expotential Calculation
        // (x^y)/z
        let result = snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .UInt64.from */ .zM.from(x);
        result = result.div(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .UInt64.from */ .zM.from(z));
        for (let i = 1; i < y; i++) {
            result = result.mul(x).div(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .UInt64.from */ .zM.from(this.scale_factor_Field));
            result = result.mul(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .UInt64.from */ .zM.from(x));
        }
        return result;
    }
    // Description:   Calculate the expotential
    // Input:         Rank 0 Tensor of type Field for the power
    // Output:        Rank 0 Tensor of type Field result of calculation
    exp(x) {
        // Expotential Implementation
        // 1 + x + (x^2)/2 + (x^3)/6 + (x^4)/24 + (x^5)/120 + (x^6)/720 + (x^7)/5040
        // return this.num2Field(1)
        return snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .UInt64.one.add */ .zM.one.add(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .UInt64.from */ .zM.from(x))
            .add(this.exp_part(x, 2, 2))
            .add(this.exp_part(x, 3, 6))
            .add(this.exp_part(x, 4, 24))
            .add(this.exp_part(x, 5, 120))
            .add(this.exp_part(x, 6, 720))
            .add(this.exp_part(x, 7, 5040));
    }
}
//# sourceMappingURL=snarkyTensor.js.map
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ 7101:
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.a(__webpack_module__, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": function() { return /* binding */ SnarkyNet; }
/* harmony export */ });
/* harmony import */ var snarkyjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6400);
// Description: SnarkyNet class to run the model


await snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .isReady */ .DK;
class SnarkyNet extends snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .CircuitValue */ .wA {
    constructor(layers) {
        super();
        // SnarkyLayers
        this.layers = layers; // SnarkyJS Layers
    }
    predict(inputs) {
        console.log('in predict start');
        // Prediction method to run the model
        // Step 1. Convert initial inputs to a float
        let x = [inputs.value];
        console.log('in predict after num2Field_t2');
        // Step 2. Call the SnarkyLayers
        this.layers.forEach((layer) => (x = layer.call(x)));
        console.log('in predict after layers.forEach');
        // Step 3. Parse Classes
        // console.log('x is', x.toString());
        // console.log('x[0] is', x[0].toString());
        return x[0];
    }
}
//# sourceMappingURL=snarkynet.js.map
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

}]);