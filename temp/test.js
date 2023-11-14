var jsonld = require('..');

const doc = {
    "http://schema.org/name": "Manu Sporny",
    "http://schema.org/url": "http://manu.sporny.org/",
    "http://schema.org/image": "http://manu.sporny.org/images/manu.png"
};

const context = {
    "name": "http://schema.org/name",
    "homepage": "http://schema.org/url",
    "image": "http://schema.org/image"
};

// compact a document according to a particular context
const compacted = jsonld.compact(doc, context);
console.log("================= compacted =================");
console.dir(compacted, { depth: 4 });

const expanded = jsonld.expand(compacted);
console.log("================= expanded =================");
console.dir(expanded, { depth: 4 });

const flattened = jsonld.flatten(doc);
console.log("================= flattened =================");
console.dir(flattened, { depth: 4 });

const canonized = jsonld.canonize(doc, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads'
});
console.log("================= canonized =================");
console.log(canonized);

// var r = jsonld.get('https://json-ld.org/contexts/person.jsonld');
// console.dir(r, { depth: 4 });
