var utils = require('../utils/utils').Utils,
    constants = require('../constants'),
    empresa = require('../models/empresa');

var wf_empresa = {
    list: function() {
        empresa.find({}, function(err, documentColl) {
            if(err) {
                throw err;
            }
            return documentColl;
        });
    },
    find: function(id) {
        empresa.findById(id, function(err, document) {
            if(err) {
                throw err;
            }
            return document;
        });
    },
    findByLocation: function(longitude, latitude, limit, distance) {
        var limit = limit || constants.models.empresa.limit;
        // get the max distance or set it to 8 kilometers
        var maxDistance = distance || constants.models.empresa.distance;

        // get coordinates [ <longitude> , <latitude> ]
        var coords = [];
        coords[0] = longitude || 0;
        coords[1] = latitude || 0;
        empresa.find({ loc: { $near: coords, $maxDistance: maxDistance } })
                       .limit(limit)
                       .exec(function(err, documentColl) {
                            if(err) {
                                throw err;
                            }
                            return documentColl;
                       });
    },
    create: function(document) {
        var empresa = new empresa();
        for(p in empresa) {
            if(document[p]) {
                empresa[p] = document[p];
            }
        }
        if(!empresa.cnpj) {
            throw new Error("cnpj is required");
        }
        // Using RegEx - search is case insensitive
        empresa.findOne({ name: { $regex: new RegExp(empresa.cnpj, "i") } }, function(err, doc) { 
            if(err) {
                throw err;
            }
            if(!doc) {
                empresa.save(function(err) {
                    if(err) {
                        throw err;
                    }
                    return empresa;
                });
            } 
            else {
                throw new Error(messages.duplicated);
            }
        });
    }
};

module.exports = wf_empresa;