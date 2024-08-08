const util = require('util');
const http = require("http");
const vm = require('vm');
const crypto = require('crypto');

const vhttp = {
    Agent: function () { },
    STATUS_CODES: http.STATUS_CODES
};

const modules = {
    "crypto": crypto,
    "node:crypto": crypto,
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
jsonld.sbox = sbox;

for (var k in jsonld) {
    var v = jsonld[k];
    if (util.isAsyncFunction(v))
        jsonld[k + "_sync"] = util.sync(v, true);
}

module.exports = jsonld;
