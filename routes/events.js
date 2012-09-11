module.exports = function(Event){
  exports.index = function(req, res){
  	Event.find(function(error, events){
      res.render('events/index.jade', { 
        events: events
  	  })
    })
  }

  exports.new = function(req, res){
    event = new Event({})
    res.render('events/new.jade', {
      event: event,
      request: req
    })
  }

  exports.create = function(req, res){
    event = new Event({
      title: req.param('title'),
      description: req.param('description'),
      place: req.param('place'),
      date: req.param('date')
    }) 
    event.save(function(error) {
      res.redirect('/events')
    });
  }

  exports.show = function(req, res){
    Event.findById(req.params.id, function(err, event){
      res.render('events/show.jade', {
        event: event
      })
    })
  }
  
  exports.edit = function(req, res){
    Event.findById(req.params.id, function(err, event){
      res.render('events/edit.jade', {
        event: event,
        request: req
      })
    })
  }
  
  exports.update = function(req, res){
    Event.findById(req.params.id, function(err, event){
      event.set({
        title: req.param('title'),
        description: req.param('description'),
        place: req.param('place'),
        date: req.param('date')
      })
      event.save(function(error){
        res.redirect('/events/' + req.params.id)
      })
    })
  }
  
  exports.destroy = function(req, res){
    Event.findById(req.params.id, function(err, event){
      event.remove(function(err, event){
        res.redirect('/events')
      })
    })
  }
  
  return exports;
}