module.exports = function(db, mongoose){
  return db.model('Event', new mongoose.Schema({
    title: String,
    body: String
  }))
}
