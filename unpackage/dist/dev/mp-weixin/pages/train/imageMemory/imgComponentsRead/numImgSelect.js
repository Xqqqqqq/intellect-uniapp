(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/train/imageMemory/imgComponentsRead/numImgSelect"],{438:
/*!*********************************************************************************************!*\
  !*** F:/项目总文件夹/intellect-uniapp/pages/train/imageMemory/imgComponentsRead/numImgSelect.vue ***!
  \*********************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var r=n(/*! ./numImgSelect.vue?vue&type=template&id=763bd37e& */439),i=n(/*! ./numImgSelect.vue?vue&type=script&lang=js& */441);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);n(/*! ./numImgSelect.vue?vue&type=style&index=0&lang=scss& */443);var a,o=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */11),u=Object(o["default"])(i["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],a);u.options.__file="F:/项目总文件夹/intellect-uniapp/pages/train/imageMemory/imgComponentsRead/numImgSelect.vue",e["default"]=u.exports},439:
/*!****************************************************************************************************************************!*\
  !*** F:/项目总文件夹/intellect-uniapp/pages/train/imageMemory/imgComponentsRead/numImgSelect.vue?vue&type=template&id=763bd37e& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";n.r(e);var r=n(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./numImgSelect.vue?vue&type=template&id=763bd37e& */440);n.d(e,"render",(function(){return r["render"]})),n.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(e,"components",(function(){return r["components"]}))},440:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/项目总文件夹/intellect-uniapp/pages/train/imageMemory/imgComponentsRead/numImgSelect.vue?vue&type=template&id=763bd37e& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";var r;n.r(e),n.d(e,"render",(function(){return i})),n.d(e,"staticRenderFns",(function(){return a})),n.d(e,"recyclableRender",(function(){return s})),n.d(e,"components",(function(){return r}));var i=function(){var t=this,e=t.$createElement;t._self._c},s=!1,a=[];i._withStripped=!0},441:
/*!**********************************************************************************************************************!*\
  !*** F:/项目总文件夹/intellect-uniapp/pages/train/imageMemory/imgComponentsRead/numImgSelect.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var r=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./numImgSelect.vue?vue&type=script&lang=js& */442),i=n.n(r);for(var s in r)"default"!==s&&function(t){n.d(e,t,(function(){return r[t]}))}(s);e["default"]=i.a},442:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/项目总文件夹/intellect-uniapp/pages/train/imageMemory/imgComponentsRead/numImgSelect.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={props:{page:{type:Object,default:{pageNum:0,examNum:10,examTime:null}},allData:{type:Object,default:{}},problemList:{type:Array,default:[]}},data:function(){return{topList:[],bottomList:[],selectProblemList:this.problemList,currentTab:-1}},watch:{page:function(){this.currentTab=-1,this.topList=this.allData.startGroupVoList[this.page.pageNum].startProblemVoList,this.bottomList=this.allData.startGroupVoList[this.page.pageNum].startAnsweroList}},mounted:function(){this.topList=this.allData.startGroupVoList[this.page.pageNum].startProblemVoList,this.bottomList=this.allData.startGroupVoList[this.page.pageNum].startAnsweroList},methods:{chooseOne:function(t,e){this.currentTab=e;var n={answerId:t.id,problemId:this.topList[0].id,problemName:this.topList[0].problemName,problemPic:this.topList[0].problemPic};this.selectProblemList.push(n),this.$emit("clickSelectBottom",this.selectProblemList)}}};e.default=r},443:
/*!*******************************************************************************************************************************!*\
  !*** F:/项目总文件夹/intellect-uniapp/pages/train/imageMemory/imgComponentsRead/numImgSelect.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var r=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./numImgSelect.vue?vue&type=style&index=0&lang=scss& */444),i=n.n(r);for(var s in r)"default"!==s&&function(t){n.d(e,t,(function(){return r[t]}))}(s);e["default"]=i.a},444:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/项目总文件夹/intellect-uniapp/pages/train/imageMemory/imgComponentsRead/numImgSelect.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/train/imageMemory/imgComponentsRead/numImgSelect.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/train/imageMemory/imgComponentsRead/numImgSelect-create-component',
    {
        'pages/train/imageMemory/imgComponentsRead/numImgSelect-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(438))
        })
    },
    [['pages/train/imageMemory/imgComponentsRead/numImgSelect-create-component']]
]);
