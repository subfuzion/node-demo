var app = require('./app'),
    debug = require('debug')('demo:server'),
    port = process.env.PORT || 3000;

app.listen(port, function() {
  debug('server listening on port ' + port);
});


