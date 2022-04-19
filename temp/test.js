var jsonld = require('..');
var ssl = require('ssl');

ssl.loadRootCerts()

const doc = {
    "http://schema.org/name": "Manu Sporny",
    "http://schema.org/url": { "@id": "http://manu.sporny.org/" },
    "http://schema.org/image": { "@id": "http://manu.sporny.org/images/manu.png" }
};

const context = {
    "name": "http://schema.org/name",
    "homepage": { "@id": "http://schema.org/url", "@type": "@id" },
    "image": { "@id": "http://schema.org/image", "@type": "@id" }
};

// compact a document according to a particular context
const compacted = jsonld.compact(doc, context);
console.dir(compacted, { depth: 4 });

const expanded = jsonld.expand(compacted);

console.dir(expanded, { depth: 4 });

const flattened = jsonld.flatten(doc);
console.dir(flattened, { depth: 4 });

const canonized = jsonld.canonize(doc, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads'
});

console.log(canonized);

var r = jsonld.get('https://json-ld.org/contexts/person.jsonld');
console.dir(r, { depth: 4 });
