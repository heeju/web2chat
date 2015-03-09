// Setup basic express server
var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , pjax = require('./pjax.js')
  , io = require('socket.io')(server)
  , port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));
app.use(pjax());
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

/*
 * Set route
 */

// app.use(pjaxRouter);

app.all('/', indexRoute);
app.all('/signin', signinRoute);
app.all('/contacts/:groupname?', contactsRoute);
app.all('/chat/:id?', chatsRoute);

var wrapPath = __dirname + '/public/index.html';

function indexRoute(req, res, next) {
  console.log('index');
  res.redirect('/contacts');
}

function signinRoute(req, res, next) {
  console.log('signinRoute')
  res.render(__dirname + '/public/index.html');
}

function contactsRoute(req, res, next) {
  console.log('contactsRoute')

  var path = __dirname + '/public/contacts.html'
  if (req.get('X-PJAX') === 'true') {
    console.log('pjax');
    res.render(path);
  } else {
    res.render(wrapPath);
  }
}

function chatsRoute(req, res, next) {
  console.log('chatsRoute')
  res.render(__dirname + '/public/chat.html');
}

function wrap(res) {

}


function isPJAX() {

}

/*
 * socket
 */
io.on('connection', function(socket) {

});