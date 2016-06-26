
/*
 * subdomain middleware
 * keep shipping next()
 */

module.exports = function(options) {

  // options?
  options = options || {};

  options.removeWWW = options.removeWWW || false;
  options.ignoreWWW = options.ignoreWWW || false;

  // return middleware
  return function(request, response, next) {
    // get host & protocol
    var host = request.headers.host,
        protocol = request.socket.encrypted ? 'https' : 'http',
        subdomains = request.subdomains.reverse();

    // remove 'www' prefix from URL? (tacky, right?)
    if (options.removeWWW === true) {
      if (/^www/.test(host)) {
        return response.redirect(protocol + '://' + host.replace(/^www\./, '') + request.url);
      };
    };

    // subdomain specific middleware
    if ( subdomains.length == 0 || (options.ignoreWWW && subdomains[0] == 'wwww') ) {
      // not a subdomain or ignoring www subdomain
      next();
    } else {
      // max to path for subdomain
      if ( subdomains.length ) {
        request.url = '/' + subdomains.join('/') + request.url;
        next();
      } else {
        next();
      }
    };
  };

};
