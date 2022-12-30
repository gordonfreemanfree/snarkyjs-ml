"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[896],{

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

/***/ })

}]);