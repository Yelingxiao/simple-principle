(function(graph){
      function require(module){
        function localRequire(relativePath){
          return require(graph[module].dependecies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
          eval(code)
        })(localRequire,exports,graph[module].code);
        return exports;
      }
      require('./src/index.js')
    })({"./src/index.js":{"dependecies":{"./demo.js":"./src/demo.js"},"code":"\"use strict\";\n\nvar _demo = _interopRequireDefault(require(\"./demo.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n(0, _demo[\"default\"])();\nconsole.log('hello world');"},"./src/demo.js":{"dependecies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar demo = function demo() {\n  console.log('hello demo');\n};\n\nvar _default = demo;\nexports[\"default\"] = _default;"}})