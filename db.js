var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/*var Box = new Schema({
  event_name:String,
  booth_name:String,
  or_name:String,
  x :Number,
  y :Number,
  w :Number,
  h :Number,
  status: String
})
*/

/*module.exports = mongoose.model('User',{
        username: String,
    password: String,
    email: String,
    gender: String,
    address: String
}); */

var User = new Schema({
  email: String,
password: String,
buddyname:String,
buddydetail:String,
buddyinterest:String,
status:Number


})

var Buddy = new Schema({
  name: String,
  detail: String,
  interest:String

})





mongoose.model('User', User, 'User');
mongoose.model('Buddy', Buddy, 'Buddy');


// Mongoose connection to MongoDB
const db ="mongodb://tongman4:cartoon@ds119044.mlab.com:19044/tongman4"
mongoose.Promise =  global.Promise;
mongoose.connect(db, function(err){
  if(err){
    console.error("Error! + err");
  }
});
