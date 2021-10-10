'use strict';

const Default = require('./DefaultService');

module.exports.getRoute = function getRoute(req, res, next) {
    Default.getRoute(req.swagger.params, res, next);
};
module.exports.postRoute = function postRoute(req, res, next) {
    Default.postRoute(req.swagger.params, res, next);
};
module.exports.putRoute = function putRoute(req, res, next) {
    Default.putRoute(req.swagger.params, res, next);
};
module.exports.deleteRoute = function deleteRoute(req, res, next) {
    Default.deleteRoute(req.swagger.params, res, next);
};