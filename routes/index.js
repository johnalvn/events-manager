function routes(params){
  routes.index = function(req, res){
    res.render('index', { title: 'Express' });
  };

  routes.events = require('./events.js')(params)

  return routes
}
module.exports = routes


