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

const canonized = jsonld.canonize({
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/security/suites/jws-2020/v1",
    { "@vocab": "https://example.com/#" }
  ],
  "id": "https://example.com/credential/123456",
  "type": ["VerifiableCredential", "VerifiableBusinessCard"],
  "name": "Verifiable Business Card",
  "relatedLink": [
    {
      "type": "LinkRole",
      "target": "https://example.com/organizations/example-org/presentations/available",
      "linkRelationship": "OrganizationPresentationEndpoint"
    }
  ],
  "issuanceDate": "2016-12-31T23:59:59Z",
  "expirationDate": "2038-01-19T03:14:08Z",
  "issuer": {
    "id": "did:example:123",
    "type": "Organization",
    "name": "Grady, Purdy and Pacocha",
    "description": "Secured 24/7 neural-net",
    "address": {
      "type": "PostalAddress",
      "streetAddress": "0516 Kendrick Heights",
      "addressLocality": "Port Reba",
      "addressRegion": "South Carolina",
      "postalCode": "53062-7356",
      "addressCountry": "Austria"
    },
    "email": "Cora31@example.net",
    "phoneNumber": "555-158-2528",
    "faxNumber": "555-577-3567"
  },
  "credentialSubject": {
    "type": ["Organization"],
    "name": "Steel Manufacturer Org",
    "url": "https://www.example.com/"
  }
}
);
console.log("================= canonized =================");
console.log(canonized);

// var r = jsonld.get('https://json-ld.org/contexts/person.jsonld');
// console.dir(r, { depth: 4 });
