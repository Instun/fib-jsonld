/*
 * Copyright (c) 2017-2021 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const { parseLinkHeader, buildHeaders } = require('./util');
const { LINK_HEADER_CONTEXT } = require('./constants');
const JsonLdError = require('./JsonLdError');
const { prependBase } = require('./url');
const { LruCache } = require('util');
const http = require('http');

var cache = new LruCache(128);

/**
 * Creates a built-in node document loader.
 *
 * @param options the options to use:
 *          [secure]: require all URLs to use HTTPS. (default: false)
 *          [headers]: an object (map) of headers which will be passed as
 *            request headers for the requested document. Accept is not
 *            allowed. (default: none).
 *
 * @return the node document loader.
 */
module.exports = (headers = {}) => {
  headers = buildHeaders(headers);
  // if no default user-agent header, copy headers and set one
  if (!('user-agent' in headers)) {
    headers = Object.assign({}, headers, {
      'user-agent': 'jsonld.js'
    });
  }

  return loadDocument;

  function loadDocument(url) {
    const isHttp = url.startsWith('http:');
    const isHttps = url.startsWith('https:');
    if (!isHttp && !isHttps) {
      throw new JsonLdError(
        'URL could not be dereferenced; only "http" and "https" URLs are ' +
        'supported.',
        'jsonld.InvalidUrl', { code: 'loading document failed', url });
    }

    var body;
    try {
      body = cache.get(url, url => {
        const res = http.get(url, { headers });
        if (res.statusCode >= 400) {
          throw new JsonLdError(
            `URL "${url}" could not be dereferenced: ${res.statusMessage}`,
            'jsonld.InvalidUrl', {
            code: 'loading document failed',
            url,
            httpStatusCode: res.statusCode
          });
        }

        return res.json()
      });
    } catch (e) {
      throw new JsonLdError(
        `URL "${url}" could not be dereferenced, an error occurred.`,
        'jsonld.LoadDocumentError',
        { code: 'loading document failed', url, cause: e });
    }

    return {
      contextUrl: null,
      documentUrl: url,
      document: body || null
    };
  }
};

