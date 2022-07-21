const app = require('./server/routes/app');
const http = require('http');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
