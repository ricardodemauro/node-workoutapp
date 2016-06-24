var utils = require('../utils/utils').Utils,
    constants = require('../constants'),
    empresa = require('../models/empresa');

var wf_empresa = {
    __dbEmpresa: null,
    __parseDocument: function(document) {
        var newDoc = new empresa();
        for(p in empresa) {
            if(document[p]) {
                newDoc[p] = document[p];
            }
        }
        newDoc.telefone = document.telefone;
        newDoc.tag = document.data;
        newDoc.loc = document.loc;
        return newDoc;
    },
    init: function(dbEmpresa) {
        ___dbEmpresa = dbEmpresa;
        return this;
    },
    list: function(callback) {
        empresa.find({}, callback);
    },
    findById: function(id, callback) {
        empresa.findById(id, callback);
    },
    findByLocation: function(longitude, latitude, limit, distance, callback) {
        var limit = limit || constants.models.empresa.limit;
        // get the max distance or set it to 8 kilometers
        var maxDistance = distance || constants.models.empresa.distance;

        // get coordinates [ <longitude> , <latitude> ]
        var coords = [];
        coords[0] = longitude || 0;
        coords[1] = latitude || 0;
        empresa.find({ loc: { $near: coords, $maxDistance: maxDistance } })
                       .limit(limit)
                       .exec(callback);
    },
    create: function(document, callback) {
        var newDoc = __parseDocument(document);
        if(!newDoc.cnpj) {
            var err = new Error("cnpj is required");
            callback(err);
        }
        // Using RegEx - search is case insensitive
        empresa.findOne({ name: { $regex: new RegExp(newDoc.cnpj) } }, function(err, doc) { 
            if(err) {
                callback(err);
            }
            if(!doc) {
                empresa.save(callback);
            } 
            else {
                var err = new Error(messages.duplicated);
                callback(err);
            }
        });
    },
    update: function(document, callback) {
        var updateDoc = __parseDocument(document);
        
        updateDoc.findById(updateDoc.id, function(err, doc) {
            if(!err && doc) {
                updateDoc.save(callback);
            } 
            else if(!err) {
                var err = new Error(messages.not_found_exception);
                
                callback(err);
            } 
            else {
                var err = new Error(messages.not_found_exception);
                
                callback(err);
            }
        });
    }
};

module.exports = wf_empresa;