var express = require('express'),
    router = express.Router(),
    estabelecimento = require('../models/estabelecimento').Estabelecimento,
    messages = require('../constants').messages,
    utils = require('../utils/utils').Utils,
    constants = require('../constants');


router.get('/', function(req, res, next) {
    estabelecimento.find({}, function(err, docs) {
        if(!err) {
            res.status(200).json({ estabelecimentos: docs });
        } 
        else {
            res.status(500).json({ message: err });
        }
    });
}).
get('/:id', function(req, res, next) {
    var id = req.params.id;
    estabelecimento.findById(id, function(err, doc) {
	    if(!err && doc) {
            res.status(200).json(doc);
        } 
        else if(err) {
            res.status(500).json({ message: messages.generic_exception + err });
        }
        else {
            res.status(404).json({ message: messages.not_foud_exception });
        }
  });
}).
get('/:longitude/:latitude', function(req, res, next) {
    var limit = req.params.limit || 10;
    // get the max distance or set it to 8 kilometers
    var maxDistance = req.params.distance || 8;

    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = req.params.longitude || 0;
    coords[1] = req.params.latitude || 0;
    estabelecimento.find({
        loc: {
            $near: coords,
            $maxDistance: maxDistance
      }
    }).limit(limit).exec(function(err, documents) {
        if(err) {
          return res.status(500).json({ message: messages.generic_exception + err });
        }
        res.status(200).json(documents);
    });
}).
post('/', function(req, res, next) {
    var baseUri = req.protocol + '://' + req.get('Host');
    var nome = req.body.nome; 
    var descricao = req.body.descricao; 
    var tag = req.body.tag;
    var loc = req.body.loc;

    // Using RegEx - search is case insensitive
    estabelecimento.findOne({ name: { $regex: new RegExp(nome, "i") } }, function(err, doc) { 
        if(!err && !doc) {
            var doc = new estabelecimento();

            doc.nome = nome;
            doc.descricao = descricao;
            doc.tag = tag;
            doc.loc = loc;
            
            doc.save(function(err) {
                if(!err) {
                    var hateoasLink = utils.hateoas.addHateoasSelfLink(baseUri, constants.routes.estabelecimento.uri, doc.id);
                    res.status(201).json({
                        nome: doc.nome,
                        links: hateoasLink
                    });
                } 
                else {
                res.status(500).json({ message: messages.generic_exception + err });
                }
            });
        } 
        else if(!err) {
            res.status(403).json({ message: messages.duplicated} );
        } 
        else {
            res.status(500).json({ message: err });
        }
  });
}).
put('/:id', function(req, res, next) {
    var baseUri = req.protocol + '://' + req.get('Host');
    var id = req.params.id;
    var nome = req.body.nome; 
    var descricao = req.body.descricao; 
    var tag = req.body.tag;
    var loc = req.body.loc;
      
    estabelecimento.findById(id, function(err, doc) {
        if(!err && doc) {
            doc.nome = nome;
            doc.descricao = descricao;
            doc.tag = tag;
            doc.loc = loc;

            doc.save(function(err) {
                if(!err) {
                    var hateoasLink = utils.hateoas.addHateoasSelfLink(baseUri, constants.routes.estabelecimento.uri, doc.id);
                    res.status(200).json({ nome: doc.nome, links: hateoasLink });
                } 
                else {
                    res.status(500).json({ message: messages.generic_exception + err });
                }
            });
        } 
        else if(!err) {
            res.status(404).json({ message: messages.not_foud_exception });
        } 
        else {
            res.status(500).json({ message: messages.generic_exception + err });
        }
    });
}).
delete('/:id', function(req, res, next){
    var id = req.body.id === undefined ? req.params.id : req.body.id;
    estabelecimento.findById(id, function(err, doc) {
        if(!err && doc) {
            doc.remove();
            res.status(200).json({ message: messages.removed });
        }
        else if(!err) {
            res.status(404).json({ message: messages.not_foud_exception });
        }
        else {
            res.status(403).json({ message: messages.generic_exception + err });
        }
    });
});

module.exports = router;