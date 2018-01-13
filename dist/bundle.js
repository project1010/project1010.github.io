/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Generator", function() { return Generator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__student_model__ = __webpack_require__(1);
//console.log("tyo")

var Generator = /** @class */ (function () {
    function Generator() {
        var _this = this;
        this.studentData = [];
        var button = document.getElementById("add");
        var sortButton = document.getElementById("sort");
        button.addEventListener("click", function (e) { return _this.addData(); });
        sortButton.addEventListener("click", function (e) { return _this.sortByMark(); });
    }
    ;
    Generator.prototype.addData = function () {
        var itemId = this.guid();
        var name = document.getElementById("name").value;
        var mark = Number(document.getElementById("mark").value);
        if (name != "") {
            var studentObj = new __WEBPACK_IMPORTED_MODULE_0__student_model__["a" /* StudentModel */](itemId, name, mark);
            this.studentData.push(studentObj);
            console.log(this.studentData);
            this.renderData();
        }
    };
    Generator.prototype.renderData = function () {
        var _this = this;
        document.getElementById("main").innerHTML = "";
        this.clearForm();
        for (var i = 0; i < this.studentData.length; i++) {
            var list = document.createElement("tr");
            list.innerHTML = '<td class="padding-16"><b>' + this.studentData[i].Name + '</b></td><td class="padding-16"><b>' + this.studentData[i].Marks + '</b></td>';
            var deleteButton = document.createElement("input");
            deleteButton.className = "btn btn-danger";
            deleteButton.type = "button";
            deleteButton.value = "Delete";
            deleteButton.id = this.studentData[i].ItemId;
            deleteButton.addEventListener("click", function (e) { return _this.deleteData(e); });
            var td = document.createElement("td");
            td.appendChild(deleteButton);
            list.appendChild(td);
            console.log(list);
            document.getElementById("main").appendChild(list);
        }
        this.showHide();
    };
    Generator.prototype.showHide = function () {
        var table = document.getElementById("main-table");
        var noData = document.getElementById("no-data");
        if (this.studentData.length == 0) {
            table.style.display = "none";
            noData.style.display = "inherit";
        }
        else {
            table.style.display = "table";
            noData.style.display = "none";
        }
    };
    Generator.prototype.deleteData = function (e) {
        var removeIndex = this.studentData.map(function (item) { return item.ItemId; }).indexOf(e.srcElement.id);
        this.studentData.splice(removeIndex, 1);
        this.renderData();
    };
    Generator.prototype.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
    Generator.prototype.sortByMark = function () {
        if (Generator.clickState == 0) {
            this.studentData.sort(function (a, b) {
                return b.Marks - a.Marks;
            });
            console.log("1");
            Generator.clickState = 1;
        }
        else {
            this.studentData.sort(function (a, b) {
                return a.Marks - b.Marks;
            });
            console.log("2");
            Generator.clickState = 0;
        }
        this.renderData();
    };
    Generator.prototype.clearForm = function () {
        document.getElementById("name").value = "";
        document.getElementById("mark").value = null;
    };
    Generator.clickState = 0;
    return Generator;
}());

var generateData = new Generator();
generateData.renderData();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudentModel; });
var StudentModel = /** @class */ (function () {
    function StudentModel(ItemId, Name, Marks) {
        this.ItemId = ItemId;
        this.Name = Name;
        this.Marks = Marks;
    }
    return StudentModel;
}());



/***/ })
/******/ ]);