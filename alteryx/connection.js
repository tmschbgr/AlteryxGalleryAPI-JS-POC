const rp = require('request-promise');
const oauthSignature = require('oauth-signature');

const alteryxRequest = (_method, _uri, _body = {}) => {

    const method = _method;
    const uri = `${process.env.GALLERY_URL}/gallery/api/v1/${_uri}`;
    let qs = {
        oauth_consumer_key: process.env.ALTERYX_KEY,
        oauth_signature_method: "HMAC-SHA1",
        oauth_nonce: Math.floor(Math.random() * 1e9).toString(),
        oauth_timestamp: Math.floor(new Date().getTime() / 1000).toString(),
        oauth_version: "1.0",
    };
    qs.oauth_signature = oauthSignature.generate(method, uri, qs, process.env.ALTERYX_SECRET, null, { encodeSignature: false });

    return rp({
        method,
        uri,
        qs,
        json: true
    });

};

module.exports = alteryxRequest;