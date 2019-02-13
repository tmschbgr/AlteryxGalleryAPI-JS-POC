const alteryxRequest = require('./connection');

module.exports = {

    getWorkflows: () => alteryxRequest("GET", "workflows/subscription/"),

};