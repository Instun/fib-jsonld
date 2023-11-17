const util = require('util');
const http = require("http");
const vm = require('vm');

const vhttp = {
    Agent: function(){},
    STATUS_CODES: http.STATUS_CODES
};

const modules = {
    "crypto": require("crypto"),
    "http": vhttp,
    "https": vhttp,
    "@digitalbazaar/http-client": {
        "httpClient": {
            "get": http.promises.get
        }
    }
};

const sbox = new vm.SandBox(modules);

const jsonld = sbox.require("jsonld", __dirname);

for (var k in jsonld) {
    var v = jsonld[k];
    exports[k] = util.isAsyncFunction(v) ? util.sync(v, true) : v;
}
