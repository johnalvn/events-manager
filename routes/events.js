module.exports = function(Event){
  exports.index = function(req, res){
  	Event.find(function(error, events){
      res.render('events/index.jade', { 
        events: events
  	  })
    })
  }

  exports.new = function(req, res){
    res.render('events/new.jade')
  }

  exports.create = function(req, res){
    event = new Event({title: req.param('title'), body: req.param('body')}) 
    event.save(function(error) {
      res.redirect('/events')
    });
  }

  exports.show = function(req, res){
    event = Event.findById(req.params.id, function(err, event){
      res.render('events/show.jade', {
        event: event
      })
    })
  }
  
  return exports;
}