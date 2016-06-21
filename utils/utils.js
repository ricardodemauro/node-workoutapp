var utils = {
   hateoas: {
        startUriRegex: new RegExp("^\/"),
        endUriRegex: new RegExp('\/$'),
        addHateoasSelfLink: function(baseUri, resource, id, linkColl) {
            resource = utils.hateoas.normalizePath(resource);
            baseUri = utils.hateoas.normalizePath(baseUri);

            var route = baseUri + '/' + resource + '/' + id;
            return utils.hateoas.addHateoasLink(route, 'self', linkColl);
        },
        addHateoasLink: function(href, rel, linkColl) {
            linkColl = linkColl || []; 
            var link = {
                'rel': rel,
                'href': href
            };
            linkColl.push(link);
            return linkColl;
        },
        normalizePath: function(path) {
            return path.replace(utils.hateoas.startUriRegex, '').replace(utils.hateoas.endUriRegex, '');
        }
   },
   http: {
       getHost: function(req) {
            return req.get('host');
       },
       getPort: function(req) {
           return req.get('port');
       },
       getProtocol: function(req) {
           return req.get('protocol');
       }
   }
};

module.exports = {
    Utils: utils
};