!function(){var t,n,e,r,o,a,i,c,u,s,l={3454:function(t,n,e){"use strict";var r,o;t.exports=(null==(r=e.g.process)?void 0:r.env)&&"object"==typeof(null==(o=e.g.process)?void 0:o.env)?e.g.process:e(7663)},8913:function(t,n,e){"use strict";var r=e(6400);let o={SmartSnarkyNet:null,zkapp:null,transaction:null},a={SnarkyLayer1:null,layer1:null},i={SnarkyLayer2:null,layer2:null},c={InputImage:null,inputImage1:null},u={async loadSnarkyJS(t){await r.DK},async setActiveInstanceToBerkeley(t){let n=r.No.BerkeleyQANet("https://proxy.berkeley.minaexplorer.com/graphql");r.No.setActiveInstance(n)},async loadContract(t){let{SmartSnarkyNet:n}=await e.e(354).then(e.bind(e,1354));o.SmartSnarkyNet=n},async loadLayer1(t){let{SnarkyLayer1:n}=await e.e(559).then(e.bind(e,8559));a.SnarkyLayer1=n},async loadLayer2(t){let{SnarkyLayer2:n}=await e.e(559).then(e.bind(e,8559));i.SnarkyLayer2=n},async loadInputImage(t){let{InputImage:n}=await e.e(896).then(e.bind(e,3896));c.InputImage=n},async compileContract(t){await o.SmartSnarkyNet.compile()},async fetchAccount(t){let n=r.nh.fromBase58(t.publicKey58);return await (0,r.$G)({publicKey:n})},async initZkappInstance(t){let n=r.nh.fromBase58(t.publicKey58);o.zkapp=new o.SmartSnarkyNet(n)},async getNum(t){let n=await o.zkapp.classification.get();return JSON.stringify(n.toJSON())},async initLayer1(t){console.log("in initLayer1");let n=t.weights_l1_8x8,e=t.activation;a.layer1=new a.SnarkyLayer1(n,e)},async initLayer2(t){i.layer2=new i.SnarkyLayer2(t.weights_l2_8x8,t.activation)},async createUpdateTransaction(t){c.inputImage1=new c.InputImage(t.selectedImage),console.log("inputImage_state.inputImage1",c.inputImage1);let n=await r.No.transaction(()=>{});o.transaction=n,console.log("transaction",n)},async proveUpdateTransaction(t){await o.transaction.prove()},getTransactionJSON:async t=>o.transaction.toJSON()};addEventListener("message",async t=>{let n=await u[t.data.fn](t.data.args),e={id:t.data.id,data:n};postMessage(e)})},7663:function(t){!function(){var n={229:function(t){var n,e,r,o=t.exports={};function a(){throw Error("setTimeout has not been defined")}function i(){throw Error("clearTimeout has not been defined")}function c(t){if(n===setTimeout)return setTimeout(t,0);if((n===a||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(r){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:a}catch(t){n=a}try{e="function"==typeof clearTimeout?clearTimeout:i}catch(r){e=i}}();var u=[],s=!1,l=-1;function f(){s&&r&&(s=!1,r.length?u=r.concat(u):l=-1,u.length&&p())}function p(){if(!s){var t=c(f);s=!0;for(var n=u.length;n;){for(r=u,u=[];++l<n;)r&&r[l].run();l=-1,n=u.length}r=null,s=!1,function(t){if(e===clearTimeout)return clearTimeout(t);if((e===i||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(t);try{e(t)}catch(r){try{return e.call(null,t)}catch(n){return e.call(this,t)}}}(t)}}function y(t,n){this.fun=t,this.array=n}function d(){}o.nextTick=function(t){var n=Array(arguments.length-1);if(arguments.length>1)for(var e=1;e<arguments.length;e++)n[e-1]=arguments[e];u.push(new y(t,n)),1!==u.length||s||c(p)},y.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=d,o.addListener=d,o.once=d,o.off=d,o.removeListener=d,o.removeAllListeners=d,o.emit=d,o.prependListener=d,o.prependOnceListener=d,o.listeners=function(t){return[]},o.binding=function(t){throw Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw Error("process.chdir is not supported")},o.umask=function(){return 0}}},e={};function r(t){var o=e[t];if(void 0!==o)return o.exports;var a=e[t]={exports:{}},i=!0;try{n[t](a,a.exports,r),i=!1}finally{i&&delete e[t]}return a.exports}r.ab="//";var o=r(229);t.exports=o}()}},f={};function p(t){var n=f[t];if(void 0!==n)return n.exports;var e=f[t]={exports:{}},r=!0;try{l[t](e,e.exports,p),r=!1}finally{r&&delete f[t]}return e.exports}p.m=l,p.x=function(){var t=p.O(void 0,[829],function(){return p(8913)});return p.O(t)},t="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",n="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",e="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",r=function(t){t&&!t.d&&(t.d=1,t.forEach(function(t){t.r--}),t.forEach(function(t){t.r--?t.r++:t()}))},p.a=function(o,a,i){i&&((c=[]).d=1);var c,u,s,l,f=new Set,p=o.exports,y=new Promise(function(t,n){l=n,s=t});y[n]=p,y[t]=function(t){c&&t(c),f.forEach(t),y.catch(function(){})},o.exports=y,a(function(o){u=o.map(function(o){if(null!==o&&"object"==typeof o){if(o[t])return o;if(o.then){var a=[];a.d=0,o.then(function(t){i[n]=t,r(a)},function(t){i[e]=t,r(a)});var i={};return i[t]=function(t){t(a)},i}}var c={};return c[t]=function(){},c[n]=o,c});var a,i=function(){return u.map(function(t){if(t[e])throw t[e];return t[n]})},s=new Promise(function(n){(a=function(){n(i)}).r=0;var e=function(t){t===c||f.has(t)||(f.add(t),t&&!t.d&&(a.r++,t.push(a)))};u.map(function(n){n[t](e)})});return a.r?s:i()},function(t){t?l(y[e]=t):s(p),r(c)}),c&&(c.d=0)},o=[],p.O=function(t,n,e,r){if(n){r=r||0;for(var a=o.length;a>0&&o[a-1][2]>r;a--)o[a]=o[a-1];o[a]=[n,e,r];return}for(var i=1/0,a=0;a<o.length;a++){for(var n=o[a][0],e=o[a][1],r=o[a][2],c=!0,u=0;u<n.length;u++)i>=r&&Object.keys(p.O).every(function(t){return p.O[t](n[u])})?n.splice(u--,1):(c=!1,r<i&&(i=r));if(c){o.splice(a--,1);var s=e();void 0!==s&&(t=s)}}return t},p.d=function(t,n){for(var e in n)p.o(n,e)&&!p.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:n[e]})},p.f={},p.e=function(t){return Promise.all(Object.keys(p.f).reduce(function(n,e){return p.f[e](t,n),n},[]))},p.u=function(t){return"static/chunks/"+(829===t?"cc8f0cfa":t)+"."+({354:"e21a8478afc9778b",559:"4bac96749071aded",829:"062289123384ca11",896:"b951d3e94f790fae"})[t]+".js"},p.miniCssF=function(t){},p.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(t){if("object"==typeof window)return window}}(),p.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},p.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},p.tt=function(){return void 0===a&&(a={createScriptURL:function(t){return t}},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(a=trustedTypes.createPolicy("nextjs#bundler",a))),a},p.tu=function(t){return p.tt().createScriptURL(t)},p.p="/snarkyjs-ml//_next/",i={812:1},p.f.i=function(t,n){i[t]||importScripts(p.tu(p.p+p.u(t)))},u=(c=self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push.bind(c),c.push=function(t){var n=t[0],e=t[1],r=t[2];for(var o in e)p.o(e,o)&&(p.m[o]=e[o]);for(r&&r(p);n.length;)i[n.pop()]=1;u(t)},s=p.x,p.x=function(){return p.e(829).then(s)},_N_E=p.x()}();