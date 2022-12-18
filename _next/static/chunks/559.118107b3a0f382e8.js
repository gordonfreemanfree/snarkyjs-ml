"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[559],{

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

/***/ })

}]);